'use client'

import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 2
      })
    }, 40)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 bg-navy-700 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="mb-8">
          <div className="text-4xl font-bold text-green-400 font-mono mb-2">SP</div>
          <div className="text-navy-200 font-mono text-sm">Loading Portfolio</div>
        </div>
        
        <div className="w-64 h-1 bg-navy-600 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="mt-4 text-navy-300 font-mono text-xs">
          {progress}%
        </div>
        
        <div className="mt-8 flex justify-center space-x-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}