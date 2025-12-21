'use client'

import { useInView } from 'react-intersection-observer'
import { MapPin, Calendar, Coffee } from 'lucide-react'
import Image from 'next/image'

const skills = [
  'Kotlin',
  'Java',
  'Android SDK',
  'Jetpack Compose',
  'MVVM Architecture',
  'React',
  'Next.js',
  'JavaScript (ES6+)',
  'TypeScript',
  'Node.js (Learning)',
  'REST APIs',
  'MongoDB',
  'PostgreSQL',
  'Git & CI/CD',
  'System Design Basics'
]

export default function About() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="about" className="py-20" ref={ref}>
      <div className="container-custom">
        <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="section-title">About Me</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 space-y-6">
              <div className="text-navy-300 space-y-4 text-lg leading-relaxed">
               <p>
  Hello! I'm Subrajit, a passionate Android and web developer based in India who enjoys building products that solve real-world problems. 
  My journey into development began during college, when experimenting with HTML, CSS, and JavaScript sparked my curiosity 
  about how applications work end to end.
</p>

<p>
  Over time, I expanded into mobile development and have worked on Android applications as well as modern web apps. 
  These days, my primary focus is creating reliable, scalable, and user-centric experiences across platforms, 
  while actively learning backend technologies to better understand system design and data flow.
</p>

<p>
  When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, 
  and sharing what I learn through blogs and community discussions. I’m always excited to grow as a 
  full-stack engineer and build products that are accessible, inclusive, and impactful.
</p>

              </div>

              <div>
                <h3 className="text-xl font-semibold text-navy-100 mb-4">
                  Here are a few technologies I've been working with recently:
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {skills.map((skill, index) => (
                    <div
                      key={skill}
                      className="flex items-center text-navy-300 font-mono text-sm"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="text-green-400 mr-2">▹</span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="relative group">
                <div className="relative z-10 bg-navy-600 rounded-lg p-6 border border-navy-500 group-hover:transform group-hover:-translate-y-2 transition-all duration-300">
                  <div className="w-full h-64 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/profile-image.jpeg" 
                      alt="Subrajit Pandey"
                      width={256}
                      height={256}
                      className="w-full h-full object-cover rounded-lg"
                      priority
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-navy-300">
                      <MapPin className="w-4 h-4 mr-2 text-green-400" />
                      <span className="text-sm">Based in India</span>
                    </div>
                    <div className="flex items-center text-navy-300">
                      <Calendar className="w-4 h-4 mr-2 text-green-400" />
                      <span className="text-sm">Available for opportunities</span>
                    </div>
                    <div className="flex items-center text-navy-300">
                      <Coffee className="w-4 h-4 mr-2 text-green-400" />
                      <span className="text-sm">Fueled by coffee & curiosity</span>
                    </div>
                  </div>
                </div>
                
                {/* Decorative border */}
                <div className="absolute inset-0 border-2 border-green-400 rounded-lg transform translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}