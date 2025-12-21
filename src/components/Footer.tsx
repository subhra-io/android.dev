'use client'

import { Github, Linkedin, Twitter, Heart, ArrowUp } from 'lucide-react'

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/subrajitpandey',
    icon: <Github className="w-5 h-5" />
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/subrajit-pandey-6a7950201',
    icon: <Linkedin className="w-5 h-5" />
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/subrajitpandey',
    icon: <Twitter className="w-5 h-5" />
  }
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-navy-800 border-t border-navy-600">
      <div className="container-custom py-8 sm:py-12">
        <div className="flex flex-col items-center space-y-6 sm:space-y-8">
          {/* Social Links */}
          <div className="flex space-x-5 sm:space-x-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy-300 hover:text-green-400 transition-all duration-300 hover:transform hover:-translate-y-1"
                aria-label={social.name}
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6">
                  {social.icon}
                </div>
              </a>
            ))}
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm">
            <button
              onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-navy-300 hover:text-green-400 transition-colors font-mono"
            >
              About
            </button>
            <button
              onClick={() => document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-navy-300 hover:text-green-400 transition-colors font-mono"
            >
              Experience
            </button>
            <button
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-navy-300 hover:text-green-400 transition-colors font-mono"
            >
              Projects
            </button>
            <button
              onClick={() => document.querySelector('#travel')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-navy-300 hover:text-green-400 transition-colors font-mono"
            >
              Travel
            </button>
            <button
              onClick={() => document.querySelector('#blog')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-navy-300 hover:text-green-400 transition-colors font-mono"
            >
              Blog
            </button>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-navy-300 hover:text-green-400 transition-colors font-mono"
            >
              Contact
            </button>
          </div>

          {/* Copyright */}
          <div className="text-center space-y-2">
            <p className="text-navy-400 text-xs sm:text-sm font-mono flex items-center justify-center">
              Built with <Heart className="w-3 h-3 sm:w-4 sm:h-4 mx-1 text-red-400" /> by Subrajit Pandey
            </p>
            <p className="text-navy-500 text-xs">
              © {new Date().getFullYear()} Subrajit Pandey. All rights reserved.
            </p>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 sm:p-3 bg-navy-600 hover:bg-green-400/20 rounded-full text-navy-300 hover:text-green-400 transition-all duration-300 hover:transform hover:-translate-y-1 group"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-700 py-3 sm:py-4">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-navy-500 space-y-2 md:space-y-0 text-center">
            <div>
              Designed & Built with Next.js, TypeScript, and Tailwind CSS
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span>Version 2.0</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Last updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}