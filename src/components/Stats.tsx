'use client'

import { useEffect, useState } from 'react'
import { Github, Music, Code, BookOpen, Activity, Star, GitFork, Calendar } from 'lucide-react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface StatCardProps {
  icon: React.ReactNode
  title: string
  value: string | number
  subtitle?: string
  color: string
  isLoading?: boolean
}

function StatCard({ icon, title, value, subtitle, color, isLoading }: StatCardProps) {
  return (
    <div className="stats-card group hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color} group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        {isLoading && (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-400"></div>
        )}
      </div>
      <div className="text-2xl font-bold text-navy-100 mb-1">
        {isLoading ? '...' : value}
      </div>
      <div className="text-sm text-navy-300 mb-2">{title}</div>
      {subtitle && (
        <div className="text-xs text-navy-400">{subtitle}</div>
      )}
    </div>
  )
}

function SpotifyCard() {
  const { data, error, isLoading } = useSWR('/api/spotify/now-playing', fetcher, {
    refreshInterval: 30000, // Refresh every 30 seconds
  })

  const track = data?.data?.item
  const isPlaying = data?.data?.is_playing

  return (
    <div className="stats-card col-span-2 group hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-lg bg-green-400/20 group-hover:scale-110 transition-transform">
            <Music className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-navy-100">
              {isPlaying ? 'Currently Playing' : 'Last Played'}
            </h3>
            <p className="text-sm text-navy-300">Spotify</p>
          </div>
        </div>
        {isPlaying && (
          <div className="flex space-x-1">
            <div className="w-1 h-4 bg-green-400 animate-pulse rounded"></div>
            <div className="w-1 h-6 bg-green-400 animate-pulse rounded" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1 h-3 bg-green-400 animate-pulse rounded" style={{ animationDelay: '0.4s' }}></div>
          </div>
        )}
      </div>
      
      {isLoading ? (
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-navy-500 rounded-lg animate-pulse"></div>
          <div className="flex-1">
            <div className="h-4 bg-navy-500 rounded animate-pulse mb-2"></div>
            <div className="h-3 bg-navy-500 rounded animate-pulse w-2/3"></div>
          </div>
        </div>
      ) : track ? (
        <div className="flex items-center space-x-4">
          <img
            src={track.album.images[0]?.url || '/placeholder-album.svg'}
            alt={track.album.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-navy-100 font-medium truncate">{track.name}</p>
            <p className="text-navy-300 text-sm truncate">
              by {track.artists.map((artist: any) => artist.name).join(', ')}
            </p>
            <p className="text-navy-400 text-xs truncate">{track.album.name}</p>
          </div>
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-navy-300">No track information available</p>
        </div>
      )}
    </div>
  )
}

export default function Stats() {
  const { data: githubData, isLoading: githubLoading } = useSWR('/api/github/stats', fetcher, {
    refreshInterval: 300000, // Refresh every 5 minutes
  })

  const { data: leetcodeData, isLoading: leetcodeLoading } = useSWR('/api/leetcode/stats', fetcher, {
    refreshInterval: 3600000, // Refresh every hour
  })

  const github = githubData?.data
  const leetcode = leetcodeData?.data

  return (
    <section id="stats" className="py-20 bg-navy-800/50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title justify-center">
            Live Stats
          </h2>
          <p className="text-navy-300 max-w-2xl mx-auto">
            Real-time data from my coding journey across different platforms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Github className="w-6 h-6 text-white" />}
            title="GitHub Repos"
            value={github?.totalRepos || 0}
            subtitle="Public repositories"
            color="bg-gray-600/20"
            isLoading={githubLoading}
          />
          
          <StatCard
            icon={<Star className="w-6 h-6 text-yellow-400" />}
            title="GitHub Stars"
            value={github?.totalStars || 0}
            subtitle="Total stars received"
            color="bg-yellow-400/20"
            isLoading={githubLoading}
          />
          
          <StatCard
            icon={<Code className="w-6 h-6 text-green-400" />}
            title="LeetCode Solved"
            value={leetcode?.totalSolved || 0}
            subtitle={`${leetcode?.easySolved || 0}E • ${leetcode?.mediumSolved || 0}M • ${leetcode?.hardSolved || 0}H`}
            color="bg-green-400/20"
            isLoading={leetcodeLoading}
          />
          
          <StatCard
            icon={<Activity className="w-6 h-6 text-blue-400" />}
            title="Commits Today"
            value={github?.commitsToday || 0}
            subtitle={`${github?.commitsThisWeek || 0} this week`}
            color="bg-blue-400/20"
            isLoading={githubLoading}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SpotifyCard />
          
          <div className="stats-card group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-purple-400/20 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div className="text-2xl font-bold text-navy-100 mb-1">
              {leetcode?.acceptanceRate?.toFixed(1) || 0}%
            </div>
            <div className="text-sm text-navy-300 mb-2">LeetCode Acceptance</div>
            <div className="text-xs text-navy-400">
              Rank: #{leetcode?.ranking?.toLocaleString() || 'N/A'}
            </div>
          </div>
        </div>

        {/* Language Stats */}
        {github?.languages && (
          <div className="mt-8 stats-card">
            <h3 className="text-lg font-semibold text-navy-100 mb-4 flex items-center">
              <Code className="w-5 h-5 mr-2 text-green-400" />
              Most Used Languages
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(github.languages)
                .sort(([,a], [,b]) => (b as number) - (a as number))
                .slice(0, 5)
                .map(([language, count]) => (
                  <div key={language} className="text-center">
                    <div className="text-lg font-bold text-navy-100">{count as number}</div>
                    <div className="text-sm text-navy-300">{language}</div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}