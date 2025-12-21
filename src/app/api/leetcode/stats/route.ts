import { NextResponse } from 'next/server'
import { LeetCodeStats } from '@/types'

const LEETCODE_USERNAME = process.env.NEXT_PUBLIC_LEETCODE_USERNAME || 'subrajitpandey'

// LeetCode doesn't have an official API, so we'll use a third-party service or scraping
// For now, we'll return mock data and you can integrate with services like:
// - https://leetcode-stats-api.herokuapp.com/
// - https://alfa-leetcode-api.onrender.com/

async function fetchLeetCodeStats() {
  try {
    // Try using a third-party LeetCode API
    const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    })

    if (response.ok) {
      const data = await response.json()
      return {
        totalSolved: data.totalSolved || 0,
        totalQuestions: data.totalQuestions || 2500,
        easySolved: data.easySolved || 0,
        mediumSolved: data.mediumSolved || 0,
        hardSolved: data.hardSolved || 0,
        acceptanceRate: data.acceptanceRate || 0,
        ranking: data.ranking || 0,
        contributionPoints: data.contributionPoints || 0,
        reputation: data.reputation || 0,
        submissionCalendar: data.submissionCalendar || {}
      }
    }
  } catch (error) {
    console.log('LeetCode API not available, using mock data')
  }

  // Return mock data if API is not available
  return {
    totalSolved: 247,
    totalQuestions: 2500,
    easySolved: 89,
    mediumSolved: 132,
    hardSolved: 26,
    acceptanceRate: 68.5,
    ranking: 125432,
    contributionPoints: 1250,
    reputation: 2840,
    submissionCalendar: generateMockCalendar()
  }
}

function generateMockCalendar() {
  const calendar: { [date: string]: number } = {}
  const today = new Date()
  
  // Generate last 365 days of mock data
  for (let i = 0; i < 365; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateString = date.toISOString().split('T')[0]
    
    // Random number of submissions (0-5) with higher probability for recent dates
    const probability = i < 30 ? 0.7 : i < 90 ? 0.4 : 0.2
    if (Math.random() < probability) {
      calendar[dateString] = Math.floor(Math.random() * 5) + 1
    }
  }
  
  return calendar
}

export async function GET() {
  try {
    const stats = await fetchLeetCodeStats()

    return NextResponse.json({
      success: true,
      data: stats
    })

  } catch (error) {
    console.error('LeetCode API error:', error)
    
    const mockStats: LeetCodeStats = {
      totalSolved: 247,
      totalQuestions: 2500,
      easySolved: 89,
      mediumSolved: 132,
      hardSolved: 26,
      acceptanceRate: 68.5,
      ranking: 125432,
      contributionPoints: 1250,
      reputation: 2840,
      submissionCalendar: generateMockCalendar()
    }

    return NextResponse.json({
      success: false,
      data: mockStats,
      message: 'Using mock data'
    })
  }
}