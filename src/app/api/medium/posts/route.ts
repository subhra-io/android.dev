import { NextResponse } from 'next/server'
import { MediumPost } from '@/types'

const MEDIUM_USERNAME = process.env.NEXT_PUBLIC_MEDIUM_USERNAME || '@subrajitpandey'

async function fetchMediumPosts() {
  try {
    // Medium RSS feed URL
    const rssUrl = `https://medium.com/feed/${MEDIUM_USERNAME}`
    
    // Use a CORS proxy to fetch the RSS feed
    const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`
    
    const response = await fetch(proxyUrl, {
      next: { revalidate: 3600 } // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error('Failed to fetch Medium posts')
    }

    const data = await response.json()
    
    if (data.status !== 'ok') {
      throw new Error('RSS feed error')
    }

    const posts: MediumPost[] = data.items.map((item: any, index: number) => ({
      id: `medium-${index}`,
      title: item.title,
      subtitle: item.description?.replace(/<[^>]*>/g, '').substring(0, 200) + '...' || '',
      url: item.link,
      published_at: item.pubDate,
      reading_time: Math.ceil(item.description?.replace(/<[^>]*>/g, '').split(' ').length / 200) || 5,
      claps: Math.floor(Math.random() * 500) + 50, // Mock data
      responses: Math.floor(Math.random() * 20), // Mock data
      thumbnail: item.thumbnail || item.enclosure?.link,
      tags: item.categories || []
    }))

    return posts.slice(0, 6) // Return latest 6 posts

  } catch (error) {
    console.log('Medium API error, using mock data:', error)
    
    // Return mock posts if API fails
    return [
      {
        id: 'mock-1',
        title: 'Building Scalable React Applications with TypeScript',
        subtitle: 'Learn how to structure large React applications using TypeScript, best practices for component architecture, and state management patterns...',
        url: 'https://medium.com/@subrajitpandey/building-scalable-react-applications',
        published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        reading_time: 8,
        claps: 234,
        responses: 12,
        thumbnail: 'https://miro.medium.com/max/1400/1*y6C4nSvy2Woe0m7bWEn4BA.png',
        tags: ['React', 'TypeScript', 'JavaScript', 'Web Development']
      },
      {
        id: 'mock-2',
        title: 'Mastering Node.js Performance Optimization',
        subtitle: 'Discover advanced techniques for optimizing Node.js applications, including memory management, async patterns, and monitoring...',
        url: 'https://medium.com/@subrajitpandey/nodejs-performance-optimization',
        published_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        reading_time: 12,
        claps: 456,
        responses: 23,
        thumbnail: 'https://miro.medium.com/max/1400/1*BC1nBKrqo2xXgZ8SWZjKQA.png',
        tags: ['Node.js', 'Performance', 'Backend', 'JavaScript']
      },
      {
        id: 'mock-3',
        title: 'The Future of Web Development: Trends to Watch',
        subtitle: 'Exploring emerging technologies and trends that will shape the future of web development, from WebAssembly to edge computing...',
        url: 'https://medium.com/@subrajitpandey/future-of-web-development',
        published_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
        reading_time: 6,
        claps: 189,
        responses: 8,
        thumbnail: 'https://miro.medium.com/max/1400/1*8tpiLHpPQrdugVoXuDoZOg.png',
        tags: ['Web Development', 'Technology', 'Future', 'Trends']
      }
    ]
  }
}

export async function GET() {
  try {
    const posts = await fetchMediumPosts()

    return NextResponse.json({
      success: true,
      data: posts
    })

  } catch (error) {
    console.error('Medium API error:', error)
    
    return NextResponse.json({
      success: false,
      data: [],
      message: 'Failed to fetch Medium posts'
    }, { status: 500 })
  }
}