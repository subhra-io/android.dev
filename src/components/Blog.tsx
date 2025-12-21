'use client'

import { useInView } from 'react-intersection-observer'
import { Calendar, Clock, ExternalLink, Heart, MessageCircle } from 'lucide-react'
import useSWR from 'swr'
import { format } from 'date-fns'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface BlogPostProps {
  post: any
  index: number
}

function BlogPost({ post, index }: BlogPostProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <article
      ref={ref}
      className={`project-card group transition-all duration-1000 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {post.thumbnail && (
        <div className="mb-4 sm:mb-6 overflow-hidden rounded-lg">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Fallback to a default image if the thumbnail fails to load
              const target = e.target as HTMLImageElement
              target.src = 'https://miro.medium.com/v2/resize:fit:1400/1*y6C4nSvy2Woe0m7bWEn4BA.png'
            }}
          />
        </div>
      )}
      
      <div className="flex items-center text-navy-400 text-xs sm:text-sm mb-2 sm:mb-3 space-x-3 sm:space-x-4">
        <div className="flex items-center">
          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          {format(new Date(post.published_at), 'MMM dd, yyyy')}
        </div>
        <div className="flex items-center">
          <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          {post.reading_time} min read
        </div>
      </div>
      
      <h3 className="text-lg sm:text-xl font-semibold text-navy-100 mb-2 sm:mb-3 group-hover:text-green-400 transition-colors line-clamp-2">
        {post.title}
      </h3>
      
      <p className="text-navy-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-3">
        {post.subtitle}
      </p>
      
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
        {post.tags.slice(0, 3).map((tag: string) => (
          <span key={tag} className="px-2 py-1 bg-navy-600 text-navy-200 rounded-full text-xs font-mono">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 sm:space-x-4 text-navy-400 text-xs sm:text-sm">
          <div className="flex items-center">
            <Heart className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            {post.claps}
          </div>
          <div className="flex items-center">
            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            {post.responses}
          </div>
        </div>
        
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-400 hover:text-green-300 transition-colors inline-flex items-center text-xs sm:text-sm font-medium"
        >
          Read More
          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
        </a>
      </div>
    </article>
  )
}

function BlogSkeleton() {
  return (
    <div className="project-card animate-pulse">
      <div className="w-full h-40 sm:h-48 bg-navy-500 rounded-lg mb-4 sm:mb-6"></div>
      <div className="flex space-x-3 sm:space-x-4 mb-2 sm:mb-3">
        <div className="h-3 sm:h-4 bg-navy-500 rounded w-16 sm:w-20"></div>
        <div className="h-3 sm:h-4 bg-navy-500 rounded w-12 sm:w-16"></div>
      </div>
      <div className="h-5 sm:h-6 bg-navy-500 rounded mb-2 sm:mb-3"></div>
      <div className="space-y-2 mb-4 sm:mb-6">
        <div className="h-3 sm:h-4 bg-navy-500 rounded"></div>
        <div className="h-3 sm:h-4 bg-navy-500 rounded w-3/4"></div>
      </div>
      <div className="flex space-x-2 mb-4 sm:mb-6">
        <div className="h-5 sm:h-6 bg-navy-500 rounded-full w-12 sm:w-16"></div>
        <div className="h-5 sm:h-6 bg-navy-500 rounded-full w-16 sm:w-20"></div>
      </div>
      <div className="flex justify-between">
        <div className="flex space-x-3 sm:space-x-4">
          <div className="h-3 sm:h-4 bg-navy-500 rounded w-8 sm:w-12"></div>
          <div className="h-3 sm:h-4 bg-navy-500 rounded w-6 sm:w-8"></div>
        </div>
        <div className="h-3 sm:h-4 bg-navy-500 rounded w-16 sm:w-20"></div>
      </div>
    </div>
  )
}

export default function Blog() {
  const { data, error, isLoading } = useSWR('/api/medium/posts', fetcher, {
    refreshInterval: 3600000, // Refresh every hour
  })

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const posts = data?.data || []

  return (
    <section id="blog" className="py-20 bg-navy-800/30" ref={ref}>
      <div className="container-custom">
        <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="section-title">Latest Blog Posts</h2>
          
          <div className="text-center mb-12">
            <p className="text-navy-300 max-w-2xl mx-auto">
              I write about Android development, mobile app architecture, government technology, and my journey as a software developer. 
              Here are some of my recent articles from Medium.
            </p>
          </div>

          {error && (
            <div className="text-center py-12">
              <p className="text-navy-400">Unable to load blog posts at the moment.</p>
              <a
                href="https://medium.com/@subhrajeetpandey2001"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-4"
              >
                Visit My Medium Profile
              </a>
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(6)].map((_, index) => (
                <BlogSkeleton key={index} />
              ))}
            </div>
          ) : posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {posts.map((post: any, index: number) => (
                  <BlogPost key={post.id} post={post} index={index} />
                ))}
              </div>
              
              <div className="text-center mt-12">
                <a
                  href="https://medium.com/@subhrajeetpandey2001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  View All Articles
                </a>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-navy-300 mb-6">
                I'm working on some exciting articles! Check back soon or visit my Medium profile.
              </p>
              <a
                href="https://medium.com/@subhrajeetpandey2001"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Follow Me on Medium
              </a>
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="mt-16 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-lg p-8 text-center border border-green-400/20">
            <h3 className="text-2xl font-semibold text-navy-100 mb-4">
              Stay Updated
            </h3>
            <p className="text-navy-300 mb-6 max-w-md mx-auto">
              Get notified when I publish new articles about Android development, mobile architecture, and programming.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-navy-600 border border-navy-500 rounded-lg text-navy-100 placeholder-navy-400 focus:outline-none focus:border-green-400 transition-colors"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}