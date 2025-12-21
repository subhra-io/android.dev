import { NextResponse } from 'next/server'
import { GitHubStats } from '@/types'

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'subrajitpandey'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

async function fetchGitHubData(endpoint: string) {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  }
  
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`
  }

  const response = await fetch(`https://api.github.com${endpoint}`, {
    headers,
    next: { revalidate: 300 } // Cache for 5 minutes
  })

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`)
  }

  return response.json()
}

export async function GET() {
  try {
    // Fetch user data
    const user = await fetchGitHubData(`/users/${GITHUB_USERNAME}`)
    
    // Fetch repositories
    const repos = await fetchGitHubData(`/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`)
    
    // Fetch recent commits (from all repos)
    const recentCommits = []
    const today = new Date().toISOString().split('T')[0]
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    
    let commitsToday = 0
    let commitsThisWeek = 0
    
    // Get commits from top 10 most recently updated repos
    const topRepos = repos.slice(0, 10)
    
    for (const repo of topRepos) {
      try {
        const commits = await fetchGitHubData(
          `/repos/${GITHUB_USERNAME}/${repo.name}/commits?author=${GITHUB_USERNAME}&since=${weekAgo}T00:00:00Z`
        )
        
        commits.forEach((commit: any) => {
          const commitDate = commit.commit.author.date.split('T')[0]
          if (commitDate === today) {
            commitsToday++
          }
          commitsThisWeek++
        })
        
        recentCommits.push(...commits.slice(0, 3))
      } catch (error) {
        // Skip repos that might be private or have issues
        console.log(`Skipping repo ${repo.name}:`, error)
      }
    }

    // Calculate language statistics
    const languages: { [key: string]: number } = {}
    repos.forEach((repo: any) => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1
      }
    })

    // Calculate total stars and forks
    const totalStars = repos.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0)
    const totalForks = repos.reduce((sum: number, repo: any) => sum + repo.forks_count, 0)

    const stats: GitHubStats = {
      totalCommits: recentCommits.length * 10, // Rough estimate
      totalRepos: user.public_repos,
      totalStars,
      totalForks,
      commitsThisWeek,
      commitsToday,
      languages
    }

    return NextResponse.json({
      success: true,
      data: stats
    })

  } catch (error) {
    console.error('GitHub API error:', error)
    
    // Return mock data if API fails
    const mockStats: GitHubStats = {
      totalCommits: 1250,
      totalRepos: 42,
      totalStars: 156,
      totalForks: 23,
      commitsThisWeek: 12,
      commitsToday: 3,
      languages: {
        'JavaScript': 15,
        'TypeScript': 12,
        'Python': 8,
        'Java': 5,
        'CSS': 4
      }
    }

    return NextResponse.json({
      success: false,
      data: mockStats,
      message: 'Using mock data due to API limitations'
    })
  }
}