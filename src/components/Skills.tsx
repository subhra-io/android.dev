'use client'

import { useInView } from 'react-intersection-observer'
import { Code, Database, Server, Smartphone, Cloud, Settings } from 'lucide-react'

const skillCategories = [
  {
    title: 'Frontend',
    icon: <Code className="w-6 h-6" />,
    color: 'from-blue-400 to-purple-400',
    skills: [
      { name: 'React', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'TypeScript', level: 88 },
      { name: 'JavaScript', level: 92 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'Tailwind CSS', level: 90 }
    ]
  },
  {
    title: 'Backend',
    icon: <Server className="w-6 h-6" />,
    color: 'from-green-400 to-blue-400',
    skills: [
      { name: 'Node.js', level: 87 },
      { name: 'Python', level: 82 },
      { name: 'Express.js', level: 85 },
      { name: 'GraphQL', level: 78 },
      { name: 'REST APIs', level: 90 },
      { name: 'Microservices', level: 75 }
    ]
  },
  {
    title: 'Database',
    icon: <Database className="w-6 h-6" />,
    color: 'from-purple-400 to-pink-400',
    skills: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 88 },
      { name: 'Redis', level: 75 },
      { name: 'MySQL', level: 80 },
      { name: 'Prisma', level: 82 },
      { name: 'Firebase', level: 78 }
    ]
  },
  {
    title: 'DevOps & Cloud',
    icon: <Cloud className="w-6 h-6" />,
    color: 'from-yellow-400 to-orange-400',
    skills: [
      { name: 'AWS', level: 80 },
      { name: 'Docker', level: 85 },
      { name: 'Kubernetes', level: 70 },
      { name: 'CI/CD', level: 82 },
      { name: 'Nginx', level: 75 },
      { name: 'Linux', level: 88 }
    ]
  },
  {
    title: 'Mobile',
    icon: <Smartphone className="w-6 h-6" />,
    color: 'from-pink-400 to-red-400',
    skills: [
      { name: 'React Native', level: 78 },
      { name: 'Flutter', level: 65 },
      { name: 'iOS Development', level: 60 },
      { name: 'Android Development', level: 62 },
      { name: 'Expo', level: 80 },
      { name: 'PWA', level: 85 }
    ]
  },
  {
    title: 'Tools & Others',
    icon: <Settings className="w-6 h-6" />,
    color: 'from-indigo-400 to-purple-400',
    skills: [
      { name: 'Git', level: 92 },
      { name: 'VS Code', level: 95 },
      { name: 'Figma', level: 75 },
      { name: 'Postman', level: 88 },
      { name: 'Jest', level: 80 },
      { name: 'Webpack', level: 75 }
    ]
  }
]

interface SkillBarProps {
  name: string
  level: number
  delay: number
}

function SkillBar({ name, level, delay }: SkillBarProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-navy-200 text-sm font-medium">{name}</span>
        <span className="text-navy-300 text-xs font-mono">{level}%</span>
      </div>
      <div className="w-full bg-navy-600 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-1000 ease-out"
          style={{
            width: inView ? `${level}%` : '0%',
            transitionDelay: `${delay}ms`
          }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="skills" className="py-20 bg-navy-800/30" ref={ref}>
      <div className="container-custom">
        <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="section-title">Skills & Technologies</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={category.title}
                className="bg-navy-600/50 rounded-lg p-6 border border-navy-500 hover:border-green-400/50 transition-all duration-300 group"
                style={{ animationDelay: `${categoryIndex * 100}ms` }}
              >
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} mr-4 group-hover:scale-110 transition-transform`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-navy-100">{category.title}</h3>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={categoryIndex * 200 + skillIndex * 100}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Skills Tags */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-semibold text-navy-100 mb-8">Other Technologies I've Worked With</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Sass/SCSS', 'Webpack', 'Vite', 'Babel', 'ESLint', 'Prettier',
                'Storybook', 'Cypress', 'Playwright', 'Jenkins', 'GitHub Actions',
                'Terraform', 'Ansible', 'Elasticsearch', 'RabbitMQ', 'Socket.io',
                'WebRTC', 'Three.js', 'D3.js', 'Chart.js', 'Stripe API'
              ].map((tech, index) => (
                <span
                  key={tech}
                  className="skill-tag hover:bg-green-400/20 hover:text-green-400 transition-all duration-300 cursor-default"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}