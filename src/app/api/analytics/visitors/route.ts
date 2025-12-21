import { NextRequest, NextResponse } from 'next/server'

// In a real application, you would use a database like Redis, MongoDB, or PostgreSQL
// For now, we'll use a simple in-memory counter (this will reset on deployment)
let visitorCount = 0
const uniqueVisitors = new Set<string>()

export async function GET() {
  try {
    return NextResponse.json({
      totalVisitors: visitorCount,
      uniqueVisitors: uniqueVisitors.size
    })
  } catch (error) {
    console.error('Error fetching visitor count:', error)
    return NextResponse.json(
      { error: 'Failed to fetch visitor count' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userAgent, ip } = await request.json()
    
    // Create a simple hash for unique visitor identification
    const visitorId = `${ip}-${userAgent}`.replace(/[^a-zA-Z0-9]/g, '')
    
    // Increment total visitors
    visitorCount++
    
    // Add to unique visitors set
    uniqueVisitors.add(visitorId)
    
    return NextResponse.json({
      success: true,
      totalVisitors: visitorCount,
      uniqueVisitors: uniqueVisitors.size
    })
  } catch (error) {
    console.error('Error recording visitor:', error)
    return NextResponse.json(
      { error: 'Failed to record visitor' },
      { status: 500 }
    )
  }
}