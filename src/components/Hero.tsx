'use client'

import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentPlatformIndex, setCurrentPlatformIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const platforms = ["web", "mobile", "cross-platform", "Android", "iOS"]
  const baseText = "I build things for the "
  const fullText = baseText + platforms[currentPlatformIndex] + "."

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100
    const pauseTime = isDeleting ? 1000 : 2000

    if (!isDeleting && currentIndex < fullText.length) {
      // Typing forward
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, typeSpeed)
      return () => clearTimeout(timeout)
    } else if (!isDeleting && currentIndex === fullText.length) {
      // Pause before deleting
      const timeout = setTimeout(() => {
        setIsDeleting(true)
      }, pauseTime)
      return () => clearTimeout(timeout)
    } else if (isDeleting && currentIndex > baseText.length) {
      // Deleting back to base text
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1))
        setCurrentIndex(prev => prev - 1)
      }, typeSpeed)
      return () => clearTimeout(timeout)
    } else if (isDeleting && currentIndex === baseText.length) {
      // Switch to next platform
      setIsDeleting(false)
      setCurrentPlatformIndex(prev => (prev + 1) % platforms.length)
    }
  }, [currentIndex, fullText, isDeleting, baseText.length, platforms.length])

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8">
      <div className="container-custom">
        <div className="max-w-4xl">
          <div className="animate-fade-in">
            <p className="text-green-400 font-mono text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">Hi, my name is</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-navy-100 mb-3 sm:mb-4 leading-tight">
              Subrajit Pandey.
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-navy-200 mb-6 sm:mb-8 leading-tight">
              <span className="inline-block border-r-2 border-green-400 pr-1">
                {displayText}
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-navy-300 max-w-2xl mb-8 sm:mb-12 leading-relaxed">
              I'm a software developer specializing in building exceptional digital experiences. 
              Currently, I'm focused on building accessible, human-centered products and creating 
              innovative solutions that make a difference in people's lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={scrollToAbout}
                className="btn-primary text-sm sm:text-base"
              >
                Check out my work!
              </button>
              <a
                href="mailto:subrajitpandey@example.com"
                className="btn-secondary text-sm sm:text-base"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={scrollToAbout}
          className="text-navy-300 hover:text-green-400 transition-colors"
          aria-label="Scroll to about section"
        >
          <ChevronDown size={24} className="sm:w-8 sm:h-8" />
        </button>
      </div>

      {/* Floating elements - hide on very small screens */}
      <div className="hidden sm:block absolute top-1/4 right-10 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      <div className="hidden sm:block absolute top-1/3 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="hidden sm:block absolute bottom-1/4 left-10 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
    </section>
  )
}