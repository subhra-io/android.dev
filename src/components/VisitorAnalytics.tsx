'use client'

import { useState, useEffect } from 'react'
import { Eye, Users, TrendingUp } from 'lucide-react'

interface VisitorStats {
  totalVisitors: number
  uniqueVisitors: number
}

export default function VisitorAnalytics() {
  const [stats, setStats] = useState<VisitorStats>({ totalVisitors: 0, uniqueVisitors: 0 })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const recordVisit = async () => {
      try {
        // Record the visit
        await fetch('/api/analytics/visitors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userAgent: navigator.userAgent,
            ip: 'visitor', // In production, you'd get the real IP
          }),
        })

        // Fetch updated stats
        const response = await fetch('/api/analytics/visitors')
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Error recording visit:', error)
      } finally {
        setIsLoading(false)
      }
    }

    recordVisit()
  }, [])

  if (isLoading) {
    return (
      <div className="fixed bottom-4 right-4 bg-navy-600/90 backdrop-blur-sm rounded-lg p-3 border border-navy-500 shadow-lg">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-400"></div>
          <span className="text-navy-300 text-sm">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 bg-navy-600/90 backdrop-blur-sm rounded-lg p-3 border border-navy-500 shadow-lg z-50">
      <div className="flex items-center space-x-4 text-sm">
        <div className="flex items-center space-x-1">
          <Eye className="w-4 h-4 text-green-400" />
          <span className="text-navy-300">Visits:</span>
          <span className="text-green-400 font-semibold">{stats.totalVisitors.toLocaleString()}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Users className="w-4 h-4 text-blue-400" />
          <span className="text-navy-300">Unique:</span>
          <span className="text-blue-400 font-semibold">{stats.uniqueVisitors.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}