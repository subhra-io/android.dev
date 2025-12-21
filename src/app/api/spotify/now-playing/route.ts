import { NextResponse } from 'next/server'
import { SpotifyCurrentlyPlaying } from '@/types'

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN

async function getAccessToken() {
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    throw new Error('Missing Spotify credentials')
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN
    })
  })

  if (!response.ok) {
    throw new Error('Failed to get Spotify access token')
  }

  const data = await response.json()
  return data.access_token
}

async function getCurrentlyPlaying(accessToken: string) {
  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })

  if (response.status === 204) {
    return null // Nothing is playing
  }

  if (!response.ok) {
    throw new Error('Failed to get currently playing track')
  }

  return response.json()
}

export async function GET() {
  try {
    const accessToken = await getAccessToken()
    const currentlyPlaying = await getCurrentlyPlaying(accessToken)

    if (!currentlyPlaying || !currentlyPlaying.item) {
      return NextResponse.json({
        success: true,
        data: {
          is_playing: false,
          item: null,
          progress_ms: 0,
          timestamp: Date.now()
        }
      })
    }

    const data: SpotifyCurrentlyPlaying = {
      is_playing: currentlyPlaying.is_playing,
      item: currentlyPlaying.item,
      progress_ms: currentlyPlaying.progress_ms,
      timestamp: Date.now()
    }

    return NextResponse.json({
      success: true,
      data
    })

  } catch (error) {
    console.error('Spotify API error:', error)
    
    // Return mock data if API fails
    const mockData: SpotifyCurrentlyPlaying = {
      is_playing: true,
      item: {
        id: 'mock-track',
        name: 'Bohemian Rhapsody',
        artists: [{ 
          name: 'Queen',
          external_urls: { spotify: 'https://open.spotify.com/artist/1dfeR4HaWDbWqFHLkxsg1d' }
        }],
        album: {
          name: 'A Night at the Opera',
          images: [
            {
              url: 'https://i.scdn.co/image/ab67616d0000b273ce4f1737bc8a646c8c4bd25a',
              height: 640,
              width: 640
            }
          ]
        },
        external_urls: { spotify: 'https://open.spotify.com/track/4u7EnebtmKWzUH433cf5Qv' },
        preview_url: null,
        duration_ms: 354947
      },
      progress_ms: 120000,
      timestamp: Date.now()
    }

    return NextResponse.json({
      success: false,
      data: mockData,
      message: 'Using mock data - Spotify API not configured'
    })
  }
}