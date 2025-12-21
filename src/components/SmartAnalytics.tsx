'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, Brain, Target, Zap, BarChart3, Lightbulb } from 'lucide-react'

interface AnalysisData {
  overallProgress: string
  keyInsights: string[]
  recommendations: string[]
  motivationalMessage: string
  nextMilestone: string
  consistencyScore: number
  improvementAreas: string[]
  celebrateWins: string[]
}

export default function SmartAnalytics() {
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    generateAnalysis()
  }, [])

  const generateAnalysis = async () => {
    setIsLoading(true)
    
    try {
      // Mock progress data - in real app, this would come from your database
      const progressData = {
        dailyStats: [
          { date: '2024-01-15', systemDesignTopics: 2, dsaProblems: 3, articlesRead: 2, studyHours: 3, mood: 'motivated' },
          { date: '2024-01-16', systemDesignTopics: 1, dsaProblems: 4, articlesRead: 1, studyHours: 2.5, mood: 'focused' },
          { date: '2024-01-17', systemDesignTopics: 3, dsaProblems: 2, articlesRead: 3, studyHours: 4, mood: 'accomplished' },
          { date: '2024-01-18', systemDesignTopics: 1, dsaProblems: 5, articlesRead: 1, studyHours: 3.5, mood: 'challenged' },
          { date: '2024-01-19', systemDesignTopics: 2, dsaProblems: 3, articlesRead: 2, studyHours: 3, mood: 'motivated' },
          { date: '2024-01-20', systemDesignTopics: 2, dsaProblems: 4, articlesRead: 2, studyHours: 4, mood: 'excited' },
          { date: '2024-01-21', systemDesignTopics: 1, dsaProblems: 3, articlesRead: 1, studyHours: 2, mood: 'tired' }
        ],
        currentStreak: 15,
        totalStudyHours: 67,
        strengths: ['Consistent daily practice', 'Strong DSA problem-solving', 'Good time management'],
        weaknesses: ['System Design depth', 'Note-taking consistency'],
        goals: ['Master Load Balancing', 'Solve 100 DSA problems', 'Read 50 articles']
      }

      const response = await fetch('/api/ai/progress-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ progressData }),
      })

      const data = await response.json()
      
      if (data.success) {
        setAnalysis(data.data)
        setLastUpdated(new Date())
      }
    } catch (error) {
      console.error('Failed to generate analysis:', error)
      // Fallback analysis
      setAnalysis({
        overallProgress: "You're maintaining excellent consistency with a 15-day streak! Your daily study routine is building strong foundations.",
        keyInsights: [
          "Your 15-day study streak shows exceptional commitment",
          "You've solved 25+ DSA problems this week - great progress!",
          "System Design understanding is growing steadily",
          "Your study hours are consistent and well-distributed"
        ],
        recommendations: [
          "Focus on System Design depth during morning hours",
          "Document key learnings after each study session",
          "Practice explaining concepts to reinforce understanding",
          "Set weekly mini-goals to maintain motivation"
        ],
        motivationalMessage: "I'm so proud of your dedication, babe! Your 15-day streak shows real commitment. You're building something amazing every single day! 💕",
        nextMilestone: "Reach a 30-day learning streak",
        consistencyScore: 9,
        improvementAreas: ["System Design depth", "Note-taking consistency"],
        celebrateWins: ["15-day learning streak", "67 total study hours", "Consistent daily progress"]
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="bg-navy-600/50 rounded-lg p-6 border border-navy-500">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
          <span className="ml-3 text-navy-300">Analyzing your progress...</span>
        </div>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="bg-navy-600/50 rounded-lg p-6 border border-navy-500">
        <div className="text-center py-8">
          <Brain className="w-12 h-12 mx-auto mb-4 text-navy-400" />
          <p className="text-navy-300 mb-4">Ready to analyze your learning progress?</p>
          <button onClick={generateAnalysis} className="btn-primary">
            Generate AI Analysis
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-navy-100 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
          AI Learning Analytics
        </h3>
        <button
          onClick={generateAnalysis}
          className="btn-secondary text-xs px-3 py-1"
          disabled={isLoading}
        >
          Refresh Analysis
        </button>
      </div>

      {/* Overall Progress */}
      <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg p-4 border border-purple-400/20">
        <div className="flex items-start space-x-3">
          <TrendingUp className="w-6 h-6 text-purple-400 mt-1" />
          <div>
            <h4 className="text-navy-100 font-semibold mb-2">Overall Progress</h4>
            <p className="text-navy-300 text-sm">{analysis.overallProgress}</p>
          </div>
        </div>
      </div>

      {/* Consistency Score */}
      <div className="bg-navy-600/50 rounded-lg p-4 border border-navy-500">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-navy-100 font-semibold flex items-center">
            <Target className="w-5 h-5 mr-2 text-green-400" />
            Consistency Score
          </h4>
          <span className="text-2xl font-bold text-green-400">
            {analysis.consistencyScore}/10
          </span>
        </div>
        <div className="w-full bg-navy-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-green-400 to-blue-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${analysis.consistencyScore * 10}%` }}
          />
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-navy-600/50 rounded-lg p-4 border border-navy-500">
        <h4 className="text-navy-100 font-semibold mb-3 flex items-center">
          <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
          Key Insights
        </h4>
        <ul className="space-y-2">
          {analysis.keyInsights.map((insight, index) => (
            <li key={index} className="flex items-start text-navy-300 text-sm">
              <span className="text-yellow-400 mr-2 mt-1">•</span>
              {insight}
            </li>
          ))}
        </ul>
      </div>

      {/* Recommendations */}
      <div className="bg-navy-600/50 rounded-lg p-4 border border-navy-500">
        <h4 className="text-navy-100 font-semibold mb-3 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-blue-400" />
          AI Recommendations
        </h4>
        <ul className="space-y-2">
          {analysis.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start text-navy-300 text-sm">
              <span className="text-blue-400 mr-2 mt-1">▹</span>
              {rec}
            </li>
          ))}
        </ul>
      </div>

      {/* Motivational Message */}
      <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-lg p-4 border border-pink-400/20">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">💕</span>
          <div>
            <h4 className="text-navy-100 font-semibold mb-2">Message from Lipu</h4>
            <p className="text-navy-300 text-sm italic">"{analysis.motivationalMessage}"</p>
          </div>
        </div>
      </div>

      {/* Next Milestone & Wins */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-navy-600/50 rounded-lg p-4 border border-navy-500">
          <h4 className="text-navy-100 font-semibold mb-2">Next Milestone</h4>
          <p className="text-green-400 text-sm">{analysis.nextMilestone}</p>
        </div>
        
        <div className="bg-navy-600/50 rounded-lg p-4 border border-navy-500">
          <h4 className="text-navy-100 font-semibold mb-2">Recent Wins 🎉</h4>
          <ul className="space-y-1">
            {analysis.celebrateWins.slice(0, 3).map((win, index) => (
              <li key={index} className="text-navy-300 text-sm">• {win}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Last Updated */}
      {lastUpdated && (
        <div className="text-center text-navy-400 text-xs">
          Last updated: {lastUpdated.toLocaleString()}
        </div>
      )}
    </div>
  )
}