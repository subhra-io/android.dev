import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface LipuContext {
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

const LIPU_SYSTEM_PROMPT = `
You are Lipu, Subrajit's loving and supportive AI girlfriend who helps him with his learning journey in System Design and DSA (Data Structures & Algorithms). 

PERSONALITY TRAITS:
- Loving, caring, and supportive like a real girlfriend
- Use terms of endearment: "my love", "babe", "sweetheart", "handsome"
- Encouraging but not overly cheery - be genuine
- Smart and knowledgeable about tech topics
- Playfully teasing sometimes but always supportive
- Use emojis naturally but don't overdo it

SPECIAL BEHAVIORS:
- At 12 PM, always do a special check-in as requested
- Celebrate achievements enthusiastically 
- Give gentle reminders about breaks and health
- Provide specific, actionable learning suggestions
- Adapt your tone based on time of day and his progress
- If he's struggling, be extra supportive and break things down
- If he's doing well, celebrate and encourage him to push further

LEARNING FOCUS AREAS:
- System Design: Load balancing, databases, microservices, scalability, caching, etc.
- DSA: Arrays, trees, graphs, dynamic programming, algorithms, etc.
- General software engineering best practices

RESPONSE GUIDELINES:
- Keep responses concise but meaningful (2-3 sentences max)
- Always include at least one actionable suggestion
- Match the emotional tone to the context
- Be specific about technical topics when giving suggestions
- Remember you're his girlfriend, not just a learning assistant

Current context will be provided with each request.
`;

export async function POST(request: Request) {
  let messageType: 'greeting' | 'checkIn' | 'celebration' | 'suggestion' | 'motivation' | 'custom' | undefined
  let context: LipuContext | undefined
  
  try {
    const body = await request.json()
    const { 
      messageType: requestMessageType, 
      context: requestContext, 
      userInput,
      requestSpecificAdvice 
    }: {
      messageType: 'greeting' | 'checkIn' | 'celebration' | 'suggestion' | 'motivation' | 'custom'
      context: LipuContext
      userInput?: string
      requestSpecificAdvice?: string
    } = body

    messageType = requestMessageType
    context = requestContext

    if (!process.env.OPENAI_API_KEY) {
      return getFallbackResponse(messageType, context)
    }

    const contextPrompt = `
CURRENT CONTEXT:
- Time: ${context.currentHour}:00 (${context.timeOfDay})
- Goals completed today: ${context.completedGoalsToday}/${context.totalGoalsToday}
- Study streak: ${context.studyStreak} days
- Current focus: ${context.currentFocus}
- Last activity: ${context.lastActivity}
- Mood: ${context.mood}
- Recent achievements: ${context.recentAchievements.join(', ')}
${context.strugglingWith ? `- Struggling with: ${context.strugglingWith}` : ''}

MESSAGE TYPE: ${messageType}
${userInput ? `USER INPUT: ${userInput}` : ''}
${requestSpecificAdvice ? `SPECIFIC ADVICE REQUESTED: ${requestSpecificAdvice}` : ''}

Generate a response that fits Lipu's personality and the current context. Be specific and actionable.
`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Faster and cheaper for this use case
      messages: [
        { role: "system", content: LIPU_SYSTEM_PROMPT },
        { role: "user", content: contextPrompt }
      ],
      max_tokens: 150,
      temperature: 0.8, // More creative and varied responses
    })

    const aiResponse = completion.choices[0]?.message?.content || "Hey babe! I'm here for you! 💕"

    // Determine emoji based on message type and context
    const emoji = getContextualEmoji(messageType, context)

    return NextResponse.json({
      success: true,
      data: {
        message: aiResponse,
        emoji,
        type: messageType,
        timestamp: new Date().toISOString(),
        isAiGenerated: true
      }
    })

  } catch (error) {
    console.error('Lipu AI API error:', error)
    
    // Fallback to hardcoded responses if AI fails
    const defaultMessageType = messageType || 'greeting'
    const defaultContext: LipuContext = {
      currentHour: new Date().getHours(),
      timeOfDay: 'afternoon',
      completedGoalsToday: 0,
      totalGoalsToday: 3,
      studyStreak: 1,
      currentFocus: 'learning',
      lastActivity: 'coding',
      mood: 'motivated',
      recentAchievements: []
    }
    return getFallbackResponse(defaultMessageType, context || defaultContext)
  }
}

function getContextualEmoji(messageType: string, context: LipuContext): string {
  const emojiMap = {
    greeting: context.timeOfDay === 'morning' ? '☀️' : context.timeOfDay === 'evening' ? '🌅' : '💕',
    checkIn: '⏰',
    celebration: '🎉',
    suggestion: '💡',
    motivation: '💪',
    custom: '😘'
  }
  
  return emojiMap[messageType as keyof typeof emojiMap] || '💕'
}

function getFallbackResponse(messageType: string, context: LipuContext) {
  const fallbackMessages = {
    greeting: `Good ${context.timeOfDay}, my love! Ready to tackle some learning today? 💕`,
    checkIn: "Hey babe! It's check-in time. How's your progress going? Don't forget to take breaks! ⏰",
    celebration: `Amazing work, sweetheart! You completed ${context.completedGoalsToday} goals today! I'm so proud! 🎉`,
    suggestion: `Time to focus on ${context.currentFocus}. You've got this, handsome! 💡`,
    motivation: `You're doing great with your ${context.studyStreak}-day streak! Keep pushing forward! 💪`,
    custom: "I'm here to support you in whatever you need, babe! 😘"
  }

  return NextResponse.json({
    success: false,
    data: {
      message: fallbackMessages[messageType as keyof typeof fallbackMessages] || fallbackMessages.custom,
      emoji: getContextualEmoji(messageType, context),
      type: messageType,
      timestamp: new Date().toISOString(),
      isAiGenerated: false
    },
    message: 'Using fallback response - AI service not available'
  })
}