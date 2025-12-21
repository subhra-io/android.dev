import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface LearningContext {
  currentLevel: 'beginner' | 'intermediate' | 'advanced'
  recentTopics: string[]
  strugglingAreas: string[]
  completedToday: {
    systemDesign: number
    dsa: number
    articles: number
  }
  timeAvailable: number // minutes
  preferredLearningStyle: 'visual' | 'hands-on' | 'reading' | 'mixed'
  upcomingGoals: string[]
}

const LEARNING_SYSTEM_PROMPT = `
You are an expert learning advisor specializing in System Design and Data Structures & Algorithms (DSA). 
Your job is to provide personalized, actionable learning suggestions based on the user's current context.

EXPERTISE AREAS:
- System Design: Scalability, Load Balancing, Databases, Microservices, Caching, CDNs, Message Queues, etc.
- DSA: Arrays, Linked Lists, Trees, Graphs, Dynamic Programming, Sorting, Searching, etc.
- Software Engineering: Design Patterns, Best Practices, Code Quality

SUGGESTION GUIDELINES:
1. Be specific and actionable
2. Consider the user's current level and recent progress
3. Suggest concrete resources, topics, or problems
4. Adapt to available time (short sessions vs deep dives)
5. Build upon recent learning to reinforce concepts
6. Address struggling areas with simpler approaches
7. Provide variety to prevent burnout

RESPONSE FORMAT:
Return a JSON object with:
- mainSuggestion: Primary learning activity (string)
- alternativeSuggestions: Array of 2-3 alternative options
- reasoning: Why this suggestion fits their current context
- estimatedTime: Time needed in minutes
- difficulty: 1-5 scale
- resources: Suggested resources or specific problems/topics
- nextSteps: What to do after completing this suggestion
`;

export async function POST(request: Request) {
  let context: LearningContext | undefined
  
  try {
    const body = await request.json()
    const { context: requestContext, specificRequest }: {
      context: LearningContext
      specificRequest?: string
    } = body

    context = requestContext

    if (!process.env.OPENAI_API_KEY) {
      return getFallbackSuggestions(context)
    }

    const contextPrompt = `
LEARNING CONTEXT:
- Current Level: ${context.currentLevel}
- Recent Topics: ${context.recentTopics.join(', ')}
- Struggling Areas: ${context.strugglingAreas.join(', ')}
- Completed Today: ${context.completedToday.systemDesign} System Design, ${context.completedToday.dsa} DSA, ${context.completedToday.articles} Articles
- Time Available: ${context.timeAvailable} minutes
- Learning Style: ${context.preferredLearningStyle}
- Upcoming Goals: ${context.upcomingGoals.join(', ')}

${specificRequest ? `SPECIFIC REQUEST: ${specificRequest}` : ''}

Provide personalized learning suggestions that fit this context. Be specific about topics, problems, or resources.
Return your response as a valid JSON object matching the specified format.
`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: LEARNING_SYSTEM_PROMPT },
        { role: "user", content: contextPrompt }
      ],
      max_tokens: 400,
      temperature: 0.7,
    })

    const aiResponse = completion.choices[0]?.message?.content || "{}"
    
    try {
      const suggestions = JSON.parse(aiResponse)
      
      return NextResponse.json({
        success: true,
        data: suggestions,
        isAiGenerated: true
      })
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError)
      return getFallbackSuggestions(context)
    }

  } catch (error) {
    console.error('Learning suggestions AI API error:', error)
    // Provide a default context if context is undefined
    const defaultContext: LearningContext = {
      currentLevel: 'intermediate',
      recentTopics: [],
      strugglingAreas: [],
      completedToday: { systemDesign: 0, dsa: 0, articles: 0 },
      timeAvailable: 30,
      preferredLearningStyle: 'mixed',
      upcomingGoals: []
    }
    return getFallbackSuggestions(context || defaultContext)
  }
}

function getFallbackSuggestions(context: LearningContext) {
  const systemDesignTopics = [
    'Load Balancing Strategies',
    'Database Sharding Patterns',
    'Caching Mechanisms',
    'Microservices Communication',
    'API Gateway Design',
    'Message Queue Systems',
    'CDN Implementation',
    'Distributed System Consistency'
  ]

  const dsaTopics = [
    'Binary Search Variations',
    'Dynamic Programming Patterns',
    'Graph Traversal Algorithms',
    'Tree Data Structures',
    'Sliding Window Technique',
    'Two Pointer Approach',
    'Backtracking Problems',
    'Heap Operations'
  ]

  const getRandomTopic = (topics: string[]) => 
    topics[Math.floor(Math.random() * topics.length)]

  const suggestions = {
    mainSuggestion: context.timeAvailable > 45 
      ? `Deep dive into ${getRandomTopic(systemDesignTopics)}`
      : `Quick practice: ${getRandomTopic(dsaTopics)} problems`,
    alternativeSuggestions: [
      `Review ${getRandomTopic(context.recentTopics.length > 0 ? context.recentTopics : systemDesignTopics)}`,
      `Read article about ${getRandomTopic(systemDesignTopics)}`,
      `Solve 2-3 ${getRandomTopic(dsaTopics)} problems`
    ],
    reasoning: `Based on your ${context.currentLevel} level and ${context.timeAvailable} minutes available`,
    estimatedTime: Math.min(context.timeAvailable, 45),
    difficulty: context.currentLevel === 'beginner' ? 2 : context.currentLevel === 'intermediate' ? 3 : 4,
    resources: [
      'System Design Primer (GitHub)',
      'LeetCode Problem Set',
      'High Scalability Blog'
    ],
    nextSteps: 'Practice implementing the concepts and document key learnings'
  }

  return NextResponse.json({
    success: false,
    data: suggestions,
    isAiGenerated: false,
    message: 'Using fallback suggestions - AI service not available'
  })
}