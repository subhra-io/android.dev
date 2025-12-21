'use client'

import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Github, ExternalLink, Folder, Star, GitFork } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'Chotta Credit',
    description: 'A credit management application focused on financial accessibility for gig workers and delivery agents. Built with modern Android architecture and microservices.',
    longDescription: 'Chotta Credit is a comprehensive credit application designed specifically for gig workers and delivery agents. The app features advanced system design, OAuth authentication, and microservices architecture to provide seamless financial services to underserved communities.',
    technologies: ['Kotlin', 'Android Jetpack Compose', 'System Design', 'API Integration', 'OAuth', 'Microservices Architecture', 'Algorithms'],
    githubUrl: 'https://github.com/subhra-io/chotta-credit',
    liveUrl: null,
    imageUrl: '/chotta_credit.png',
    featured: true,
    category: 'mobile',
    stars: 0,
    forks: 0,
    status: 'Ongoing',
    duration: 'Nov 2025 – Ongoing'
  },
  {
    id: 2,
    title: 'Foodlee',
    description: 'A full-stack food ordering application built with Kotlin Multiplatform and Jetpack Compose. Features comprehensive system design and API integration.',
    longDescription: 'Foodlee is a modern food ordering application developed using Kotlin Multiplatform (KMP) for cross-platform compatibility. The app includes full-stack implementation with robust system design, seamless API integration, and a beautiful user interface built with Jetpack Compose.',
    technologies: ['Kotlin', 'Kotlin Multiplatform (KMP)', 'Android Jetpack Compose', 'System Design', 'API Integration', 'Full-Stack Development'],
    githubUrl: 'https://github.com/subhra-io/foodlee',
    liveUrl: null,
    imageUrl: '/foodlee.png',
    featured: true,
    category: 'mobile',
    stars: 0,
    forks: 0,
    status: 'Completed',
    duration: 'Nov 2024 – July 2025'
  },
  {
    id: 3,
    title: 'LocationTracker',
    description: 'An optimized location tracking application for Android with efficient battery usage and accurate location updates.',
    technologies: ['JavaScript', 'Android', 'Location Services', 'GPS', 'Battery Optimization'],
    githubUrl: 'https://github.com/subhra-io/LocationTracker',
    liveUrl: null,
    featured: false,
    category: 'mobile',
    stars: 0,
    forks: 0
  },
  {
    id: 4,
    title: 'openid4vp-verifier',
    description: 'OpenID for Verifiable Presentations (OpenID4VP) verifier implementation for secure identity verification.',
    technologies: ['JavaScript', 'OpenID', 'Verifiable Credentials', 'Identity Verification', 'Security'],
    githubUrl: 'https://github.com/subhra-io/openid4vp-verifier',
    liveUrl: null,
    featured: false,
    category: 'api',
    stars: 0,
    forks: 0
  },
  {
    id: 5,
    title: 'subhrajitpandeyBHEl',
    description: 'Android application project developed for BHEL with modern Android development practices.',
    technologies: ['Kotlin', 'Android', 'MVVM', 'Material Design'],
    githubUrl: 'https://github.com/subhra-io/subhrajitpandeyBHEl',
    liveUrl: null,
    featured: false,
    category: 'mobile',
    stars: 0,
    forks: 0
  }
]

const categories = ['all', 'mobile', 'api']

interface ProjectCardProps {
  project: typeof projects[0]
  featured?: boolean
}

function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  if (featured) {
    return (
      <div
        ref={ref}
        className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-16 lg:mb-20 transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="lg:col-span-7 order-2 lg:order-1">
          <div className="relative">
            <p className="text-green-400 font-mono text-xs sm:text-sm mb-2">Featured Project</p>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-navy-100 mb-3 sm:mb-4">
              {project.title}
            </h3>
            <div className="bg-navy-600 p-4 sm:p-6 rounded-lg shadow-lg relative z-10">
              <p className="text-navy-200 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                {project.longDescription || project.description}
              </p>
              {(project.status || project.duration) && (
                <div className="flex flex-wrap gap-2 sm:gap-4 text-sm">
                  {project.status && (
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'Ongoing' 
                        ? 'bg-blue-400/20 text-blue-400' 
                        : 'bg-green-400/20 text-green-400'
                    }`}>
                      {project.status}
                    </span>
                  )}
                  {project.duration && (
                    <span className="text-navy-400 text-xs sm:text-sm">
                      {project.duration}
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4 sm:mt-6 mb-4 sm:mb-6">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-2 sm:px-3 py-1 bg-navy-600 text-navy-200 rounded-full text-xs font-mono">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy-300 hover:text-green-400 transition-colors"
                  aria-label="GitHub Repository"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy-300 hover:text-green-400 transition-colors"
                  aria-label="Live Demo"
                >
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              )}
              {project.stars && (
                <div className="flex items-center text-navy-400 text-xs sm:text-sm">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  {project.stars}
                </div>
              )}
              {project.forks && (
                <div className="flex items-center text-navy-400 text-xs sm:text-sm">
                  <GitFork className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  {project.forks}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 order-1 lg:order-2">
          <div className="relative group">
            <div className="bg-green-400/20 rounded-lg aspect-video flex items-center justify-center overflow-hidden">
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="text-green-400 text-4xl sm:text-6xl">
                  <Folder />
                </div>
              )}
            </div>
            <div className="absolute inset-0 bg-navy-700/80 group-hover:bg-transparent transition-all duration-300 rounded-lg" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={`project-card group transition-all duration-1000 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="flex justify-between items-start mb-4 sm:mb-6">
        <div className="text-green-400 text-3xl sm:text-4xl">
          <Folder />
        </div>
        <div className="flex space-x-2 sm:space-x-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy-300 hover:text-green-400 transition-colors"
              aria-label="GitHub Repository"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy-300 hover:text-green-400 transition-colors"
              aria-label="Live Demo"
            >
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          )}
        </div>
      </div>
      
      <h3 className="text-lg sm:text-xl font-semibold text-navy-100 mb-2 sm:mb-3 group-hover:text-green-400 transition-colors">
        {project.title}
      </h3>
      
      <p className="text-navy-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 flex-grow">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
        {project.technologies.slice(0, 4).map((tech) => (
          <span key={tech} className="px-2 sm:px-3 py-1 bg-navy-600 text-navy-200 rounded-full text-xs font-mono">
            {tech}
          </span>
        ))}
      </div>

      {(project.stars || project.forks) && (
        <div className="flex items-center space-x-3 sm:space-x-4 text-navy-400 text-xs sm:text-sm">
          {project.stars && (
            <div className="flex items-center">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              {project.stars}
            </div>
          )}
          {project.forks && (
            <div className="flex items-center">
              <GitFork className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              {project.forks}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all')
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const featuredProjects = projects.filter(project => project.featured)
  const otherProjects = projects.filter(project => !project.featured)
  
  const filteredOtherProjects = activeCategory === 'all' 
    ? otherProjects 
    : otherProjects.filter(project => project.category === activeCategory)

  return (
    <section id="projects" className="py-20" ref={ref}>
      <div className="container-custom">
        <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="section-title">Some Things I've Built</h2>
          
          {/* Featured Projects */}
          <div className="mb-20">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} featured />
            ))}
          </div>

          {/* Other Projects */}
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl font-semibold text-navy-100 mb-6 sm:mb-8">Other Noteworthy Projects</h3>
            
            {/* Category Filter */}
            <div className="flex justify-center space-x-2 sm:space-x-4 mb-6 sm:mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 sm:px-4 py-2 rounded-full font-mono text-xs sm:text-sm transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-green-400/20 text-green-400 border border-green-400'
                      : 'text-navy-300 hover:text-green-400 border border-navy-500 hover:border-green-400/50'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredOtherProjects.map((project, index) => (
              <div key={project.id} style={{ animationDelay: `${index * 100}ms` }}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          {/* GitHub CTA */}
          <div className="text-center mt-12 sm:mt-16">
            <a
              href="https://github.com/subhra-io"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm sm:text-base"
            >
              View More on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}