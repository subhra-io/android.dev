import { NextResponse } from 'next/server'

interface JournalEntry {
  id: string
  date: string
  todaysFocus: string
  keyLearnings: string[]
  tomorrowsPlan: string
  mood: 'excited' | 'motivated' | 'tired' | 'accomplished' | 'challenged'
  difficultyLevel: 1 | 2 | 3 | 4 | 5
  notes: string
  timestamp: string
}

// Mock data for demonstration
const mockJournalEntries: JournalEntry[] = [
  {
    id: '1',
    date: new Date().toISOString().split('T')[0],
    todaysFocus: 'System Design: Load Balancing & Database Sharding',
    keyLearnings: [
      'Horizontal vs Vertical scaling trade-offs',
      'Consistent hashing for load distribution',
      'Database partitioning strategies',
      'CAP theorem implications in distributed systems'
    ],
    tomorrowsPlan: 'Dive deeper into Microservices Architecture and API Gateway patterns',
    mood: 'accomplished',
    difficultyLevel: 4,
    notes: 'Had a breakthrough understanding of consistent hashing today. Lipu\'s encouragement really helped me push through the complex concepts!',
    timestamp: new Date().toISOString()
  }
]

export async function GET() {
  try {
    // In a real app, you'd query your database for journal entries
    const today = new Date().toISOString().split('T')[0]
    const todaysEntry = mockJournalEntries.find(entry => entry.date === today)

    return NextResponse.json({
      success: true,
      data: {
        todaysEntry,
        recentEntries: mockJournalEntries.slice(0, 5)
      }
    })

  } catch (error) {
    console.error('Journal API error:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch journal entries'
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { todaysFocus, keyLearnings, tomorrowsPlan, mood, difficultyLevel, notes } = body

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      todaysFocus,
      keyLearnings: Array.isArray(keyLearnings) ? keyLearnings : [keyLearnings],
      tomorrowsPlan,
      mood,
      difficultyLevel,
      notes,
      timestamp: new Date().toISOString()
    }

    // In a real app, you'd save this to your database
    mockJournalEntries.unshift(newEntry)

    return NextResponse.json({
      success: true,
      data: newEntry,
      message: 'Journal entry saved successfully'
    })

  } catch (error) {
    console.error('Error saving journal entry:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Failed to save journal entry'
    }, { status: 500 })
  }
}