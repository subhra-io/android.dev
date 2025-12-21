'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import LipuDashboard from '@/components/LipuDashboard'
import Experience from '@/components/Experience'
import Achievements from '@/components/Achievements'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Stats from '@/components/Stats'
import TravelGallery from '@/components/TravelGallery'
import TravelBlog from '@/components/TravelBlog'
import Blog from '@/components/Blog'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import LoadingScreen from '@/components/LoadingScreen'
import VisitorAnalytics from '@/components/VisitorAnalytics'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <main className="relative">
      <Navbar />
      <div className="relative z-10">
        <Hero />
        <LipuDashboard />
        <About />
        <Stats />
        <Experience />
        <Achievements />
        <Skills />
        <Projects />
        <TravelGallery />
        <TravelBlog />
        <Blog />
        <Contact />
        <Footer />
      </div>
      
      {/* Visitor Analytics */}
      <VisitorAnalytics />
      
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl" />
      </div>
    </main>
  )
}