import { NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI only if API key is available
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null

interface ProgressData {
  dailyStats: {
    date: string
    systemDesignTopics: number
    dsaProblems: number
    articlesRead: number
    studyHours: number
    mood: string
    notes?: string
  }[]
  currentStreak: number
  totalStudyHours: number
  strengths: string[]
  weaknesses: string[]
  goals: string[]
}

const ANALYSIS_SYSTEM_PROMPT = `
You are an expert learning analyst who provides insightful, personalized feedback on learning progress.
Analyze the user's learning data and provide actionable insights in a supportive, encouraging tone.

ANALYSIS AREAS:
1. Progress Trends: Identify patterns in learning consistency and growth
2. Strengths: Highlight areas where the user is excelling
3. Areas for Improvement: Gently point out areas that need attention
4. Personalized Recommendations: Specific, actionable next steps
5. Motivation: Encouraging insights about their journey

TONE:
- Supportive and encouraging (like Lipu would be)
- Data-driven but human
- Specific and actionable
- Celebrate wins, gently address challenges
- Forward-looking and optimistic

RESPONSE FORMAT:
Return a JSON object with:
- overallProgress: General assessment (string)
- keyInsights: Array of 3-4 main insights
- recommendations: Array of specific actionable recommendations
- motivationalMessage: Encouraging message from Lipu's perspective
- nextMilestone: Suggested next goal to work towards
- consistencyScore: 1-10 rating of learning consistency
- improvementAreas: Areas that need focus
- celebrateWins: Recent achievements to celebrate
`;

export async function POST(request: Request) {
  let progressData: ProgressData | undefined
  
  try {
    const body = await request.json()
    const { progressData: requestProgressData }: { progressData: ProgressData } = body
    
    progressData = requestProgressData

    if (!openai || !process.env.OPENAI_API_KEY) {
      return getFallbackAnalysis(progressData)
    }

    const contextPrompt = `
LEARNING PROGRESS DATA:
Recent Daily Stats (last 7 days):
${progressData.dailyStats.map(day => 
  `${day.date}: ${day.systemDesignTopics} SD topics, ${day.dsaProblems} DSA problems, ${day.articlesRead} articles, ${day.studyHours}h study, mood: ${day.mood}`
).join('\n')}

Overall Stats:
- Current Streak: ${progressData.currentStreak} days
- Total Study Hours: ${progressData.totalStudyHours}
- Identified Strengths: ${progressData.strengths.join(', ')}
- Identified Weaknesses: ${progressData.weaknesses.join(', ')}
- Current Goals: ${progressData.goals.join(', ')}

Analyze this data and provide insights that would help the user improve their learning journey.
Focus on patterns, trends, and actionable recommendations.
Return your response as a valid JSON object matching the specified format.
`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: ANALYSIS_SYSTEM_PROMPT },
        { role: "user", content: contextPrompt }
      ],
      max_tokens: 500,
      temperature: 0.6,
    })

    const aiResponse = completion.choices[0]?.message?.content || "{}"
    
    try {
      const analysis = JSON.parse(aiResponse)
      
      return NextResponse.json({
        success: true,
        data: analysis,
        isAiGenerated: true
      })
    } catch (parseError) {
      console.error('Failed to parse AI analysis:', parseError)
      return getFallbackAnalysis(progressData)
    }

  } catch (error) {
    console.error('Progress analysis AI API error:', error)
    // Provide default progress data if undefined
    const defaultProgressData: ProgressData = {
      dailyStats: [],
      currentStreak: 1,
      totalStudyHours: 0,
      strengths: [],
      weaknesses: [],
      goals: []
    }
    return getFallbackAnalysis(progressData || defaultProgressData)
  }
}

function getFallbackAnalysis(progressData: ProgressData) {
  const recentDays = progressData.dailyStats.slice(-7)
  const avgDailyStudy = recentDays.reduce((sum, day) => sum + day.studyHours, 0) / recentDays.length
  const totalProblems = recentDays.reduce((sum, day) => sum + day.dsaProblems, 0)
  
  const analysis = {
    overallProgress: `You're maintaining a ${progressData.currentStreak}-day streak with an average of ${avgDailyStudy.toFixed(1)} hours of daily study. Great consistency!`,
    keyInsights: [
      `Your study streak of ${progressData.currentStreak} days shows excellent commitment`,
      `You've solved ${totalProblems} DSA problems this week - solid progress!`,
      `Your consistency in daily learning is building strong foundations`,
      progressData.totalStudyHours > 50 ? 'You\'ve accumulated significant study hours - expertise is building!' : 'Keep building those study hours - you\'re on the right track!'
    ],
    recommendations: [
      'Continue your daily learning routine to maintain momentum',
      'Focus on your identified weak areas during peak energy hours',
      'Document key learnings to reinforce understanding',
      'Set weekly mini-goals to maintain motivation'
    ],
    motivationalMessage: `I'm so proud of your ${progressData.currentStreak}-day streak, babe! Your dedication to learning every day shows real commitment. Keep pushing forward - you're building something amazing! 💕`,
    nextMilestone: progressData.currentStreak < 30 ? 'Reach a 30-day learning streak' : 'Master advanced system design patterns',
    consistencyScore: Math.min(10, Math.max(1, Math.round(progressData.currentStreak / 3))),
    improvementAreas: progressData.weaknesses.length > 0 ? progressData.weaknesses : ['Time management', 'Consistent practice'],
    celebrateWins: [
      `${progressData.currentStreak}-day learning streak`,
      `${progressData.totalStudyHours} total study hours`,
      'Consistent daily progress'
    ]
  }

  return NextResponse.json({
    success: false,
    data: analysis,
    isAiGenerated: false,
    message: 'Using fallback analysis - AI service not available'
  })
}