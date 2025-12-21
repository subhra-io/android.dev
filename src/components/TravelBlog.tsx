'use client'

import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Eye, 
  Heart, 
  Share2, 
  ArrowRight,
  Mountain,
  Camera,
  Plane,
  Coffee
} from 'lucide-react'

interface TravelPost {
  id: string
  title: string
  excerpt: string
  content: string
  location: string
  date: string
  readTime: number
  views: number
  likes: number
  coverImage: string
  tags: string[]
  category: 'adventure' | 'culture' | 'food' | 'nature' | 'city'
  featured: boolean
}

const travelPosts: TravelPost[] = [
  {
    id: '1',
    title: 'Paragliding Adventures in the Himalayas',
    excerpt: 'An adrenaline-pumping experience soaring through the clouds above Manali with breathtaking mountain views.',
    content: 'The moment I stepped off that cliff, everything changed. The rush of wind, the panoramic view of snow-capped peaks, and the feeling of absolute freedom - paragliding in Manali was truly life-changing...',
    location: 'Manali, Himachal Pradesh',
    date: '2024-02-20',
    readTime: 8,
    views: 1250,
    likes: 89,
    coverImage: '/travel/placeholder-travel.svg',
    tags: ['adventure', 'himalayas', 'paragliding', 'mountains'],
    category: 'adventure',
    featured: true
  },
  {
    id: '2',
    title: 'Backwaters Bliss: A Kerala Houseboat Journey',
    excerpt: 'Floating through the serene backwaters of Alleppey, discovering the peaceful side of Kerala.',
    content: 'Waking up to the gentle lapping of water against the houseboat, surrounded by lush green paddy fields and coconut palms swaying in the breeze...',
    location: 'Alleppey, Kerala',
    date: '2024-01-10',
    readTime: 6,
    views: 980,
    likes: 67,
    coverImage: '/travel/placeholder-travel.svg',
    tags: ['backwaters', 'kerala', 'peaceful', 'nature'],
    category: 'nature',
    featured: true
  },
  {
    id: '3',
    title: 'Street Food Adventures in Mumbai',
    excerpt: 'Exploring the incredible street food scene of Mumbai, from vada pav to kulfi.',
    content: 'Mumbai\'s street food is not just about taste - it\'s about the experience, the chaos, the flavors that dance on your tongue...',
    location: 'Mumbai, Maharashtra',
    date: '2023-11-18',
    readTime: 5,
    views: 1450,
    likes: 112,
    coverImage: '/travel/placeholder-travel.svg',
    tags: ['food', 'mumbai', 'street-food', 'culture'],
    category: 'food',
    featured: false
  },
  {
    id: '4',
    title: 'Royal Rajasthan: Palaces and Heritage',
    excerpt: 'Stepping into the royal history of Udaipur, exploring magnificent palaces and rich cultural heritage.',
    content: 'The City Palace of Udaipur stands as a testament to the grandeur of Rajputana architecture...',
    location: 'Udaipur, Rajasthan',
    date: '2023-12-05',
    readTime: 7,
    views: 890,
    likes: 78,
    coverImage: '/travel/placeholder-travel.svg',
    tags: ['heritage', 'palace', 'rajasthan', 'architecture'],
    category: 'culture',
    featured: false
  },
  {
    id: '5',
    title: 'Spiritual Journey in Rishikesh',
    excerpt: 'Finding inner peace and adventure in the yoga capital of the world.',
    content: 'Rishikesh offers the perfect blend of spirituality and adventure, where you can meditate by the Ganges in the morning and go river rafting in the afternoon...',
    location: 'Rishikesh, Uttarakhand',
    date: '2023-07-14',
    readTime: 9,
    views: 1120,
    likes: 95,
    coverImage: '/travel/placeholder-travel.svg',
    tags: ['spiritual', 'yoga', 'rishikesh', 'ganges'],
    category: 'culture',
    featured: false
  },
  {
    id: '6',
    title: 'Tea Gardens and Mountain Railways',
    excerpt: 'Exploring the lush tea gardens of Darjeeling and riding the famous toy train.',
    content: 'The mist-covered hills of Darjeeling, dotted with tea gardens as far as the eye can see...',
    location: 'Darjeeling, West Bengal',
    date: '2023-06-08',
    readTime: 6,
    views: 750,
    likes: 56,
    coverImage: '/travel/placeholder-travel.svg',
    tags: ['tea', 'mountains', 'darjeeling', 'train'],
    category: 'nature',
    featured: false
  }
]

interface BlogCardProps {
  post: TravelPost
  index: number
  featured?: boolean
}

function BlogCard({ post, index, featured = false }: BlogCardProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'adventure':
        return <Mountain className="w-4 h-4" />
      case 'culture':
        return <Camera className="w-4 h-4" />
      case 'food':
        return <Coffee className="w-4 h-4" />
      case 'nature':
        return <Mountain className="w-4 h-4" />
      case 'city':
        return <Plane className="w-4 h-4" />
      default:
        return <MapPin className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'adventure':
        return 'text-red-400 bg-red-400/20'
      case 'culture':
        return 'text-purple-400 bg-purple-400/20'
      case 'food':
        return 'text-orange-400 bg-orange-400/20'
      case 'nature':
        return 'text-green-400 bg-green-400/20'
      case 'city':
        return 'text-blue-400 bg-blue-400/20'
      default:
        return 'text-navy-400 bg-navy-400/20'
    }
  }

  if (featured) {
    return (
      <article
        ref={ref}
        className={`group cursor-pointer transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ transitionDelay: `${index * 200}ms` }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
          <div className={`${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
            <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                  {getCategoryIcon(post.category)}
                  <span className="ml-1 capitalize">{post.category}</span>
                </span>
              </div>
            </div>
          </div>
          
          <div className={`${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-sm text-navy-400">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {post.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readTime} min read
                </div>
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-bold text-navy-100 group-hover:text-green-400 transition-colors">
                {post.title}
              </h2>
              
              <p className="text-navy-300 leading-relaxed">
                {post.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-navy-600 text-navy-300 rounded-full text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center space-x-4 text-sm text-navy-400">
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {post.views}
                  </div>
                  <div className="flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    {post.likes}
                  </div>
                </div>
                
                <button className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article
      ref={ref}
      className={`group cursor-pointer transition-all duration-1000 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="bg-navy-600/50 rounded-lg overflow-hidden border border-navy-500 hover:border-green-400/50 transition-all duration-300 hover:transform hover:-translate-y-2">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
              {getCategoryIcon(post.category)}
              <span className="ml-1 capitalize">{post.category}</span>
            </span>
          </div>
          
          {/* Stats overlay */}
          <div className="absolute bottom-3 right-3 flex items-center space-x-3 text-white text-xs">
            <div className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              {post.views}
            </div>
            <div className="flex items-center">
              <Heart className="w-3 h-3 mr-1" />
              {post.likes}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center space-x-4 text-xs text-navy-400 mb-3">
            <div className="flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {post.location}
            </div>
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(post.date).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {post.readTime} min
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-navy-100 mb-2 group-hover:text-green-400 transition-colors line-clamp-2">
            {post.title}
          </h3>
          
          <p className="text-navy-300 text-sm leading-relaxed mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-navy-700 text-navy-400 rounded-full text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <button className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors">
              Read More
            </button>
            <button className="p-1 text-navy-400 hover:text-green-400 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function TravelBlog() {
  const [filter, setFilter] = useState<string>('all')
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const categories = ['all', 'adventure', 'culture', 'food', 'nature', 'city']
  const featuredPosts = travelPosts.filter(post => post.featured)
  const regularPosts = travelPosts.filter(post => !post.featured)
  
  const filteredPosts = filter === 'all' 
    ? regularPosts 
    : regularPosts.filter(post => post.category === filter)

  return (
    <section id="travel-blog" className="py-20" ref={ref}>
      <div className="container-custom">
        <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="section-title justify-center">
              Travel Stories
            </h2>
            <p className="text-navy-300 max-w-2xl mx-auto">
              Adventures, experiences, and stories from my travels across incredible destinations. 
              Each journey teaches something new and creates memories that last a lifetime.
            </p>
          </div>

          {/* Featured Posts */}
          <div className="mb-20">
            <h3 className="text-2xl font-semibold text-navy-100 mb-8 flex items-center">
              <Camera className="w-6 h-6 mr-2 text-green-400" />
              Featured Adventures
            </h3>
            {featuredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} featured />
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 capitalize ${
                  filter === category
                    ? 'bg-green-400 text-navy-900'
                    : 'bg-navy-600 text-navy-300 hover:bg-navy-500'
                }`}
              >
                {category === 'all' ? 'All Stories' : category}
              </button>
            ))}
          </div>

          {/* Regular Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="btn-primary">
              <Plane className="w-4 h-4 mr-2" />
              Load More Stories
            </button>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-20 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-lg p-8 text-center border border-green-400/20">
            <h3 className="text-2xl font-semibold text-navy-100 mb-4">
              Join My Travel Journey
            </h3>
            <p className="text-navy-300 mb-6 max-w-md mx-auto">
              Get notified when I share new travel stories and adventures from around the world.
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