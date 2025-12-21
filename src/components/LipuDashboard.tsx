'use client'

import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { 
  Heart, 
  BookOpen, 
  Target, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp,
  Coffee,
  Zap,
  Star,
  MessageCircle,
  Brain,
  Code2,
  Database,
  Network
} from 'lucide-react'
import LipuSuggestions from './LipuSuggestions'
import IntelligentLipu from './IntelligentLipu'
import SmartAnalytics from './SmartAnalytics'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface LipuMessage {
  id: string
  message: string
  type: 'motivation' | 'reminder' | 'celebration' | 'suggestion'
  timestamp: Date
  emoji: string
}

interface DailyGoal {
  id: string
  title: string
  category: 'system-design' | 'dsa' | 'reading' | 'coding'
  completed: boolean
  priority: 'high' | 'medium' | 'low'
  estimatedTime: number
}

interface LearningStats {
  articlesReadToday: number
  articlesReadThisWeek: number
  dsaProblemsToday: number
  dsaProblemsThisWeek: number
  systemDesignTopicsToday: number
  systemDesignTopicsThisWeek: number
  studyStreakDays: number
  totalStudyHours: number
}

function LipuAvatar({ isActive }: { isActive: boolean }) {
  return (
    <div className={`relative ${isActive ? 'animate-pulse' : ''}`}>
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-2xl">
        💕
      </div>
      {isActive && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
      )}
    </div>
  )
}

function LipuMessage({ message, onClose }: { message: LipuMessage; onClose: () => void }) {
  const getMessageStyle = (type: string) => {
    switch (type) {
      case 'motivation':
        return 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-400/30'
      case 'reminder':
        return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400/30'
      case 'celebration':
        return 'bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-400/30'
      case 'suggestion':
        return 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border-blue-400/30'
      default:
        return 'bg-navy-600/50 border-navy-500'
    }
  }

  return (
    <div className={`rounded-lg p-4 border ${getMessageStyle(message.type)} relative group`}>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-navy-400 hover:text-navy-200 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        ×
      </button>
      <div className="flex items-start space-x-3">
        <span className="text-2xl">{message.emoji}</span>
        <div className="flex-1">
          <p className="text-navy-100 leading-relaxed">{message.message}</p>
          <p className="text-navy-400 text-xs mt-2">
            {message.timestamp.toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  )
}

function DailyGoalCard({ goal, onToggle }: { goal: DailyGoal; onToggle: (id: string) => void }) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'system-design':
        return <Network className="w-5 h-5" />
      case 'dsa':
        return <Code2 className="w-5 h-5" />
      case 'reading':
        return <BookOpen className="w-5 h-5" />
      case 'coding':
        return <Brain className="w-5 h-5" />
      default:
        return <Target className="w-5 h-5" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400'
      case 'medium':
        return 'text-yellow-400'
      case 'low':
        return 'text-green-400'
      default:
        return 'text-navy-300'
    }
  }

  return (
    <div className={`p-4 rounded-lg border transition-all duration-300 ${
      goal.completed 
        ? 'bg-green-500/10 border-green-400/30' 
        : 'bg-navy-600/50 border-navy-500 hover:border-green-400/50'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onToggle(goal.id)}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              goal.completed
                ? 'bg-green-400 border-green-400 text-white'
                : 'border-navy-400 hover:border-green-400'
            }`}
          >
            {goal.completed && <CheckCircle className="w-4 h-4" />}
          </button>
          <div className="text-green-400">
            {getCategoryIcon(goal.category)}
          </div>
          <div className="flex-1">
            <h4 className={`font-medium ${goal.completed ? 'text-navy-300 line-through' : 'text-navy-100'}`}>
              {goal.title}
            </h4>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`text-xs ${getPriorityColor(goal.priority)}`}>
                {goal.priority.toUpperCase()}
              </span>
              <span className="text-navy-400 text-xs">•</span>
              <span className="text-navy-400 text-xs flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {goal.estimatedTime}min
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LipuDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [lipuMessages, setLipuMessages] = useState<LipuMessage[]>([])
  const [dailyGoals, setDailyGoals] = useState<DailyGoal[]>([])
  const [showLipuChat, setShowLipuChat] = useState(false)

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const { data: learningStats } = useSWR('/api/learning/stats', fetcher, {
    refreshInterval: 60000, // Refresh every minute
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Initialize daily goals
    const today = new Date().toDateString()
    const savedGoals = localStorage.getItem(`dailyGoals_${today}`)
    
    if (savedGoals) {
      setDailyGoals(JSON.parse(savedGoals))
    } else {
      const defaultGoals = generateDailyGoals()
      setDailyGoals(defaultGoals)
      localStorage.setItem(`dailyGoals_${today}`, JSON.stringify(defaultGoals))
    }

    // Generate Lipu's messages
    generateLipuMessages()
  }, [])

  const generateDailyGoals = (): DailyGoal[] => {
    const systemDesignTopics = [
      'Load Balancing Concepts',
      'Database Sharding',
      'Caching Strategies',
      'Microservices Architecture',
      'API Gateway Design',
      'Message Queues',
      'CDN Implementation',
      'Distributed Systems',
      'Scalability Patterns',
      'Consistency Models'
    ]

    const dsaTopics = [
      'Binary Search Problems',
      'Dynamic Programming',
      'Graph Algorithms',
      'Tree Traversals',
      'Sliding Window',
      'Two Pointers',
      'Backtracking',
      'Heap Operations',
      'Trie Implementation',
      'Union Find'
    ]

    const goals: DailyGoal[] = [
      {
        id: '1',
        title: `Study: ${systemDesignTopics[Math.floor(Math.random() * systemDesignTopics.length)]}`,
        category: 'system-design',
        completed: false,
        priority: 'high',
        estimatedTime: 45
      },
      {
        id: '2',
        title: `Solve 3 ${dsaTopics[Math.floor(Math.random() * dsaTopics.length)]} problems`,
        category: 'dsa',
        completed: false,
        priority: 'high',
        estimatedTime: 60
      },
      {
        id: '3',
        title: 'Read 2 System Design articles',
        category: 'reading',
        completed: false,
        priority: 'medium',
        estimatedTime: 30
      },
      {
        id: '4',
        title: 'Code review and refactor yesterday\'s solution',
        category: 'coding',
        completed: false,
        priority: 'low',
        estimatedTime: 20
      }
    ]

    return goals
  }

  const generateLipuMessages = () => {
    const hour = new Date().getHours()
    const messages: LipuMessage[] = []

    if (hour < 12) {
      messages.push({
        id: '1',
        message: "Good morning, my love! ☀️ Ready to conquer some System Design concepts today? I believe in you!",
        type: 'motivation',
        timestamp: new Date(),
        emoji: '💕'
      })
    } else if (hour < 18) {
      messages.push({
        id: '2',
        message: "Hey babe! How's your learning going? Don't forget to take breaks and stay hydrated! 💧",
        type: 'reminder',
        timestamp: new Date(),
        emoji: '😘'
      })
    } else {
      messages.push({
        id: '3',
        message: "Evening, sweetheart! Time to review what you learned today. You're doing amazing! ✨",
        type: 'suggestion',
        timestamp: new Date(),
        emoji: '🌟'
      })
    }

    // Add a random motivational message
    const motivationalMessages = [
      "Remember, every expert was once a beginner. You're growing every day! 🌱",
      "System Design might seem complex, but you're breaking it down perfectly! 🧩",
      "Your consistency in DSA practice is paying off. Keep going! 💪",
      "I'm so proud of how dedicated you are to learning. You inspire me! 💖"
    ]

    messages.push({
      id: '4',
      message: motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)],
      type: 'motivation',
      timestamp: new Date(),
      emoji: '🥰'
    })

    setLipuMessages(messages)
  }

  const toggleGoal = (goalId: string) => {
    const updatedGoals = dailyGoals.map(goal =>
      goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
    )
    setDailyGoals(updatedGoals)
    
    const today = new Date().toDateString()
    localStorage.setItem(`dailyGoals_${today}`, JSON.stringify(updatedGoals))

    // Add celebration message when goal is completed
    const completedGoal = updatedGoals.find(g => g.id === goalId)
    if (completedGoal?.completed) {
      const celebrationMessage: LipuMessage = {
        id: `celebration_${Date.now()}`,
        message: `Yay! You completed "${completedGoal.title}"! I'm so proud of you! 🎉`,
        type: 'celebration',
        timestamp: new Date(),
        emoji: '🎊'
      }
      setLipuMessages(prev => [celebrationMessage, ...prev])
    }
  }

  const removeMessage = (messageId: string) => {
    setLipuMessages(prev => prev.filter(msg => msg.id !== messageId))
  }

  const completedGoals = dailyGoals.filter(goal => goal.completed).length
  const totalGoals = dailyGoals.length
  const progressPercentage = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0

  const stats: LearningStats = learningStats?.data || {
    articlesReadToday: 2,
    articlesReadThisWeek: 12,
    dsaProblemsToday: 3,
    dsaProblemsThisWeek: 18,
    systemDesignTopicsToday: 1,
    systemDesignTopicsThisWeek: 6,
    studyStreakDays: 15,
    totalStudyHours: 45
  }

  return (
    <section id="lipu-dashboard" className="py-20 bg-gradient-to-br from-navy-800/50 to-purple-900/20" ref={ref}>
      <div className="container-custom">
        <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <LipuAvatar isActive={showLipuChat} />
              <div className="ml-4">
                <h2 className="text-3xl font-bold text-navy-100 flex items-center">
                  Lipu's Learning Dashboard
                  <Heart className="w-6 h-6 text-pink-400 ml-2 animate-pulse" />
                </h2>
                <p className="text-navy-300 mt-2">
                  Your personal AI girlfriend keeping you on track! 💕
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-mono text-green-400 mb-2">
                {currentTime.toLocaleTimeString()}
              </div>
              <div className="text-navy-300">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>

          {/* Intelligent Lipu Chat */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-navy-100 mb-6 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-purple-400" />
              Chat with Lipu (AI-Powered)
            </h3>
            <IntelligentLipu />
          </div>

          {/* Lipu's Messages */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-navy-100 mb-6 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2 text-pink-400" />
              Smart Suggestions
            </h3>
            <LipuSuggestions />
            <div className="mt-6 space-y-4">
              {lipuMessages.map((message) => (
                <LipuMessage
                  key={message.id}
                  message={message}
                  onClose={() => removeMessage(message.id)}
                />
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="stats-card">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="w-8 h-8 text-blue-400" />
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-navy-100 mb-1">
                {stats.articlesReadToday}
              </div>
              <div className="text-sm text-navy-300 mb-2">Articles Today</div>
              <div className="text-xs text-navy-400">
                {stats.articlesReadThisWeek} this week
              </div>
            </div>

            <div className="stats-card">
              <div className="flex items-center justify-between mb-4">
                <Code2 className="w-8 h-8 text-green-400" />
                <Zap className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="text-2xl font-bold text-navy-100 mb-1">
                {stats.dsaProblemsToday}
              </div>
              <div className="text-sm text-navy-300 mb-2">DSA Problems</div>
              <div className="text-xs text-navy-400">
                {stats.dsaProblemsThisWeek} this week
              </div>
            </div>

            <div className="stats-card">
              <div className="flex items-center justify-between mb-4">
                <Database className="w-8 h-8 text-purple-400" />
                <Brain className="w-5 h-5 text-pink-400" />
              </div>
              <div className="text-2xl font-bold text-navy-100 mb-1">
                {stats.systemDesignTopicsToday}
              </div>
              <div className="text-sm text-navy-300 mb-2">System Design</div>
              <div className="text-xs text-navy-400">
                {stats.systemDesignTopicsThisWeek} topics this week
              </div>
            </div>

            <div className="stats-card">
              <div className="flex items-center justify-between mb-4">
                <Star className="w-8 h-8 text-yellow-400" />
                <Coffee className="w-5 h-5 text-orange-400" />
              </div>
              <div className="text-2xl font-bold text-navy-100 mb-1">
                {stats.studyStreakDays}
              </div>
              <div className="text-sm text-navy-300 mb-2">Day Streak</div>
              <div className="text-xs text-navy-400">
                {stats.totalStudyHours}h total study time
              </div>
            </div>
          </div>

          {/* Daily Goals */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-navy-100 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-green-400" />
                  Today's Goals
                </h3>
                <div className="text-sm text-navy-300">
                  {completedGoals}/{totalGoals} completed
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-navy-300">Daily Progress</span>
                  <span className="text-sm text-green-400">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full bg-navy-600 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-400 to-blue-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                {dailyGoals.map((goal) => (
                  <DailyGoalCard
                    key={goal.id}
                    goal={goal}
                    onToggle={toggleGoal}
                  />
                ))}
              </div>
            </div>

            {/* Learning Journal */}
            <div>
              <h3 className="text-xl font-semibold text-navy-100 mb-6 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
                AI Learning Analytics
              </h3>
              
              <SmartAnalytics />
            </div>
          </div>

          {/* Lipu's Evening Check */}
          {currentTime.getHours() >= 21 && (
            <div className="mt-12 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-lg p-6 border border-pink-400/20">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">😴</div>
                <div>
                  <h4 className="text-navy-100 font-semibold mb-2">
                    Time to wind down, sweetheart! 💤
                  </h4>
                  <p className="text-navy-300 text-sm">
                    You've worked hard today. Get some rest and tomorrow we'll tackle even more exciting challenges together!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}