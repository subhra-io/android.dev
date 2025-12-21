'use client'

import { useState, useEffect } from 'react'
import { Clock, Lightbulb, Target, Coffee, Moon, Sun, Zap } from 'lucide-react'

interface LipuSuggestion {
  id: string
  title: string
  description: string
  type: 'study' | 'break' | 'review' | 'motivation'
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
  icon: React.ReactNode
  action?: string
}

const suggestions: LipuSuggestion[] = [
  // Morning suggestions
  {
    id: 'morning-1',
    title: 'Start with System Design Fundamentals',
    description: 'Your brain is fresh! Perfect time to tackle complex system design concepts.',
    type: 'study',
    timeOfDay: 'morning',
    icon: <Sun className="w-5 h-5" />,
    action: 'Begin studying'
  },
  {
    id: 'morning-2',
    title: 'Review Yesterday\'s DSA Solutions',
    description: 'Quick review of yesterday\'s problems to reinforce learning.',
    type: 'review',
    timeOfDay: 'morning',
    icon: <Target className="w-5 h-5" />,
    action: 'Start review'
  },

  // Afternoon suggestions
  {
    id: 'afternoon-1',
    title: 'Practice DSA Problems',
    description: 'Great time for hands-on coding and problem-solving.',
    type: 'study',
    timeOfDay: 'afternoon',
    icon: <Zap className="w-5 h-5" />,
    action: 'Start coding'
  },
  {
    id: 'afternoon-2',
    title: 'Take a Coffee Break',
    description: 'You\'ve been working hard! Time for a 15-minute break.',
    type: 'break',
    timeOfDay: 'afternoon',
    icon: <Coffee className="w-5 h-5" />,
    action: 'Take break'
  },

  // Evening suggestions
  {
    id: 'evening-1',
    title: 'Read System Design Articles',
    description: 'Wind down with some reading. Perfect for absorbing new concepts.',
    type: 'study',
    timeOfDay: 'evening',
    icon: <Lightbulb className="w-5 h-5" />,
    action: 'Start reading'
  },
  {
    id: 'evening-2',
    title: 'Update Learning Journal',
    description: 'Reflect on today\'s learning and plan for tomorrow.',
    type: 'review',
    timeOfDay: 'evening',
    icon: <Target className="w-5 h-5" />,
    action: 'Update journal'
  },

  // Night suggestions
  {
    id: 'night-1',
    title: 'Time to Rest',
    description: 'You\'ve done enough for today. Get some good sleep!',
    type: 'break',
    timeOfDay: 'night',
    icon: <Moon className="w-5 h-5" />,
    action: 'Go to sleep'
  }
]

const motivationalQuotes = [
  "Every expert was once a beginner. Keep going! 💪",
  "System Design is like building with Lego blocks - start simple, then scale! 🧱",
  "Your consistency is your superpower! I'm so proud of you! ✨",
  "Remember, I believe in you even when you don't believe in yourself! 💕",
  "Each problem you solve makes you stronger. You're growing every day! 🌱",
  "Take breaks when you need them. Self-care is part of learning! 🌸"
]

export default function LipuSuggestions() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [currentSuggestion, setCurrentSuggestion] = useState<LipuSuggestion | null>(null)
  const [motivationalQuote, setMotivationalQuote] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    updateSuggestion()
    updateMotivationalQuote()
  }, [currentTime])

  const getTimeOfDay = (hour: number): 'morning' | 'afternoon' | 'evening' | 'night' => {
    if (hour >= 6 && hour < 12) return 'morning'
    if (hour >= 12 && hour < 17) return 'afternoon'
    if (hour >= 17 && hour < 22) return 'evening'
    return 'night'
  }

  const updateSuggestion = () => {
    const hour = currentTime.getHours()
    const timeOfDay = getTimeOfDay(hour)
    
    const relevantSuggestions = suggestions.filter(s => s.timeOfDay === timeOfDay)
    if (relevantSuggestions.length > 0) {
      const randomSuggestion = relevantSuggestions[Math.floor(Math.random() * relevantSuggestions.length)]
      setCurrentSuggestion(randomSuggestion)
    }
  }

  const updateMotivationalQuote = () => {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
    setMotivationalQuote(randomQuote)
  }

  const getSuggestionStyle = (type: string) => {
    switch (type) {
      case 'study':
        return 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/30'
      case 'break':
        return 'bg-gradient-to-r from-green-500/20 to-teal-500/20 border-green-400/30'
      case 'review':
        return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400/30'
      case 'motivation':
        return 'bg-gradient-to-r from-pink-500/20 to-red-500/20 border-pink-400/30'
      default:
        return 'bg-navy-600/50 border-navy-500'
    }
  }

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Good morning, my love! ☀️"
    if (hour < 17) return "Hey there, handsome! 😘"
    if (hour < 22) return "Evening, sweetheart! 🌅"
    return "Time to rest, my dear! 🌙"
  }

  return (
    <div className="space-y-6">
      {/* Time-based greeting */}
      <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-lg p-4 border border-pink-400/20">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">💕</div>
          <div>
            <h4 className="text-navy-100 font-semibold">{getGreeting()}</h4>
            <p className="text-navy-300 text-sm">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </div>

      {/* Current suggestion */}
      {currentSuggestion && (
        <div className={`rounded-lg p-4 border ${getSuggestionStyle(currentSuggestion.type)}`}>
          <div className="flex items-start space-x-3">
            <div className="text-green-400 mt-1">
              {currentSuggestion.icon}
            </div>
            <div className="flex-1">
              <h4 className="text-navy-100 font-semibold mb-2">
                {currentSuggestion.title}
              </h4>
              <p className="text-navy-300 text-sm mb-3">
                {currentSuggestion.description}
              </p>
              {currentSuggestion.action && (
                <button className="btn-primary text-xs px-4 py-2">
                  {currentSuggestion.action}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Motivational quote */}
      <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg p-4 border border-green-400/20">
        <div className="flex items-start space-x-3">
          <div className="text-2xl">🌟</div>
          <div>
            <h4 className="text-navy-100 font-semibold mb-2">Lipu's Daily Motivation</h4>
            <p className="text-navy-300 text-sm italic">
              "{motivationalQuote}"
            </p>
          </div>
        </div>
      </div>

      {/* Study reminder based on time */}
      {currentTime.getHours() === 12 && (
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg p-4 border border-yellow-400/20">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">⏰</div>
            <div>
              <h4 className="text-navy-100 font-semibold">12 PM Check-in!</h4>
              <p className="text-navy-300 text-sm">
                Hey babe! It's 12 PM - time for our daily check-in. How's your learning going? 
                Don't forget to take breaks and stay hydrated! 💧
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}