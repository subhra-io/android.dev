'use client'

import { useState, useEffect } from 'react'
import { Heart, Brain, Sparkles, MessageCircle, Loader2, Send } from 'lucide-react'

interface LipuMessage {
  id: string
  message: string
  emoji: string
  type: string
  timestamp: string
  isAiGenerated: boolean
}

interface LearningContext {
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
  currentHour: number
  completedGoalsToday: number
  totalGoalsToday: number
  studyStreak: number
  lastActivity: string
  currentFocus: string
  mood: string
  recentAchievements: string[]
  strugglingWith?: string
}

export default function IntelligentLipu() {
  const [messages, setMessages] = useState<LipuMessage[]>([])
  const [isThinking, setIsThinking] = useState(false)
  const [userInput, setUserInput] = useState('')
  const [context, setContext] = useState<LearningContext>({
    timeOfDay: 'morning',
    currentHour: new Date().getHours(),
    completedGoalsToday: 2,
    totalGoalsToday: 4,
    studyStreak: 15,
    lastActivity: 'System Design reading',
    currentFocus: 'Load Balancing',
    mood: 'motivated',
    recentAchievements: ['Completed DSA problems', 'Read 2 articles'],
    strugglingWith: undefined
  })

  useEffect(() => {
    // Update context based on current time
    const hour = new Date().getHours()
    const timeOfDay = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : hour < 22 ? 'evening' : 'night'
    
    setContext(prev => ({
      ...prev,
      currentHour: hour,
      timeOfDay
    }))

    // Generate initial greeting
    generateAIMessage('greeting')
    
    // Set up periodic check-ins
    const checkInInterval = setInterval(() => {
      if (new Date().getHours() === 12 && new Date().getMinutes() === 0) {
        generateAIMessage('checkIn')
      }
    }, 60000) // Check every minute

    return () => clearInterval(checkInInterval)
  }, [])

  const generateAIMessage = async (messageType: string, userInput?: string) => {
    setIsThinking(true)
    
    try {
      const response = await fetch('/api/ai/lipu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messageType,
          context,
          userInput,
          requestSpecificAdvice: messageType === 'suggestion' ? context.currentFocus : undefined
        }),
      })

      const data = await response.json()
      
      if (data.success) {
        const newMessage: LipuMessage = {
          id: Date.now().toString(),
          message: data.data.message,
          emoji: data.data.emoji,
          type: data.data.type,
          timestamp: data.data.timestamp,
          isAiGenerated: data.data.isAiGenerated
        }
        
        setMessages(prev => [newMessage, ...prev])
      }
    } catch (error) {
      console.error('Failed to generate AI message:', error)
      // Fallback message
      const fallbackMessage: LipuMessage = {
        id: Date.now().toString(),
        message: "Hey babe! I'm here for you, even if my AI brain is taking a little break! 💕",
        emoji: '💕',
        type: messageType,
        timestamp: new Date().toISOString(),
        isAiGenerated: false
      }
      setMessages(prev => [fallbackMessage, ...prev])
    } finally {
      setIsThinking(false)
    }
  }

  const handleUserMessage = async () => {
    if (!userInput.trim()) return

    // Add user message to chat
    const userMessage: LipuMessage = {
      id: Date.now().toString(),
      message: userInput,
      emoji: '👤',
      type: 'user',
      timestamp: new Date().toISOString(),
      isAiGenerated: false
    }
    
    setMessages(prev => [userMessage, ...prev])
    const currentInput = userInput
    setUserInput('')

    // Generate AI response
    await generateAIMessage('custom', currentInput)
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'motivation':
        generateAIMessage('motivation')
        break
      case 'suggestion':
        generateAIMessage('suggestion')
        break
      case 'celebration':
        setContext(prev => ({ ...prev, completedGoalsToday: prev.completedGoalsToday + 1 }))
        generateAIMessage('celebration')
        break
      case 'checkIn':
        generateAIMessage('checkIn')
        break
    }
  }

  const getMessageStyle = (type: string) => {
    switch (type) {
      case 'greeting':
        return 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-400/30'
      case 'checkIn':
        return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400/30'
      case 'celebration':
        return 'bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-400/30'
      case 'suggestion':
        return 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border-blue-400/30'
      case 'motivation':
        return 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30'
      case 'user':
        return 'bg-navy-600/50 border-navy-400/50 ml-8'
      default:
        return 'bg-navy-600/50 border-navy-500'
    }
  }

  return (
    <div className="bg-gradient-to-br from-navy-600/30 to-purple-900/20 rounded-lg p-6 border border-navy-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-xl">
              💕
            </div>
            {isThinking && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-navy-100 flex items-center">
              Intelligent Lipu
              <Brain className="w-4 h-4 ml-2 text-purple-400" />
            </h3>
            <p className="text-navy-300 text-sm">
              AI-powered learning companion
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-xs text-navy-400">
          <Sparkles className="w-4 h-4" />
          <span>Powered by AI</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => handleQuickAction('motivation')}
          className="btn-secondary text-xs px-3 py-1"
          disabled={isThinking}
        >
          💪 Motivate Me
        </button>
        <button
          onClick={() => handleQuickAction('suggestion')}
          className="btn-secondary text-xs px-3 py-1"
          disabled={isThinking}
        >
          💡 Learning Tip
        </button>
        <button
          onClick={() => handleQuickAction('celebration')}
          className="btn-secondary text-xs px-3 py-1"
          disabled={isThinking}
        >
          🎉 I Did It!
        </button>
        <button
          onClick={() => handleQuickAction('checkIn')}
          className="btn-secondary text-xs px-3 py-1"
          disabled={isThinking}
        >
          ⏰ Check-in
        </button>
      </div>

      {/* Chat Input */}
      <div className="flex space-x-2 mb-6">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleUserMessage()}
          placeholder="Ask Lipu anything about your learning..."
          className="flex-1 px-3 py-2 bg-navy-700 border border-navy-500 rounded-lg text-navy-100 placeholder-navy-400 focus:outline-none focus:border-green-400 transition-colors text-sm"
          disabled={isThinking}
        />
        <button
          onClick={handleUserMessage}
          disabled={isThinking || !userInput.trim()}
          className="btn-primary px-3 py-2 text-sm"
        >
          {isThinking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </div>

      {/* Messages */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {isThinking && (
          <div className="flex items-center space-x-3 text-navy-300">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Lipu is thinking...</span>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`rounded-lg p-4 border ${getMessageStyle(message.type)} ${
              message.type === 'user' ? 'ml-8' : 'mr-8'
            }`}
          >
            <div className="flex items-start space-x-3">
              <span className="text-xl">{message.emoji}</span>
              <div className="flex-1">
                <p className="text-navy-100 leading-relaxed text-sm">
                  {message.message}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-navy-400 text-xs">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                  {message.isAiGenerated && (
                    <div className="flex items-center space-x-1 text-xs text-purple-400">
                      <Brain className="w-3 h-3" />
                      <span>AI</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {messages.length === 0 && !isThinking && (
          <div className="text-center py-8 text-navy-400">
            <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Start a conversation with Lipu!</p>
          </div>
        )}
      </div>

      {/* Context Display */}
      <div className="mt-6 pt-4 border-t border-navy-600">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-navy-400">Goals:</span>
            <span className="text-navy-200 ml-1">
              {context.completedGoalsToday}/{context.totalGoalsToday}
            </span>
          </div>
          <div>
            <span className="text-navy-400">Streak:</span>
            <span className="text-navy-200 ml-1">{context.studyStreak} days</span>
          </div>
          <div>
            <span className="text-navy-400">Focus:</span>
            <span className="text-navy-200 ml-1">{context.currentFocus}</span>
          </div>
          <div>
            <span className="text-navy-400">Mood:</span>
            <span className="text-navy-200 ml-1">{context.mood}</span>
          </div>
        </div>
      </div>
    </div>
  )
}