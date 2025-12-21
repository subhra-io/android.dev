'use client'

import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { 
  MapPin, 
  Calendar, 
  Camera, 
  Play, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Heart,
  Share2,
  Download,
  Maximize2
} from 'lucide-react'

interface TravelMedia {
  id: string
  type: 'image' | 'video'
  src: string
  thumbnail?: string
  title: string
  location: string
  date: string
  description: string
  tags: string[]
  coordinates?: {
    lat: number
    lng: number
  }
}

const travelMedia: TravelMedia[] = [
  {
    id: '1',
    type: 'image',
    src: '/travel/placeholder-travel.svg',
    title: 'Sunset at Goa Beach',
    location: 'Goa, India',
    date: '2024-03-15',
    description: 'Amazing sunset view at Anjuna Beach. The colors were absolutely breathtaking!',
    tags: ['beach', 'sunset', 'goa', 'nature'],
    coordinates: { lat: 15.5937, lng: 73.7460 }
  },
  {
    id: '2',
    type: 'video',
    src: '/travel/placeholder-travel.svg',
    thumbnail: '/travel/placeholder-travel.svg',
    title: 'Adventure in Manali',
    location: 'Manali, Himachal Pradesh',
    date: '2024-02-20',
    description: 'Paragliding adventure in the beautiful valleys of Manali. What an adrenaline rush!',
    tags: ['adventure', 'mountains', 'paragliding', 'himachal'],
    coordinates: { lat: 32.2396, lng: 77.1887 }
  },
  {
    id: '3',
    type: 'image',
    src: '/travel/placeholder-travel.svg',
    title: 'Kerala Backwaters',
    location: 'Alleppey, Kerala',
    date: '2024-01-10',
    description: 'Peaceful houseboat journey through the serene backwaters of Kerala.',
    tags: ['backwaters', 'kerala', 'houseboat', 'peaceful'],
    coordinates: { lat: 9.4981, lng: 76.3388 }
  },
  {
    id: '4',
    type: 'image',
    src: '/travel/placeholder-travel.svg',
    title: 'Rajasthan Palace',
    location: 'Udaipur, Rajasthan',
    date: '2023-12-05',
    description: 'The magnificent City Palace of Udaipur showcasing royal architecture.',
    tags: ['palace', 'architecture', 'rajasthan', 'heritage'],
    coordinates: { lat: 24.5854, lng: 73.6833 }
  },
  {
    id: '5',
    type: 'video',
    src: '/travel/placeholder-travel.svg',
    thumbnail: '/travel/placeholder-travel.svg',
    title: 'Mumbai City Life',
    location: 'Mumbai, Maharashtra',
    date: '2023-11-18',
    description: 'Time-lapse of the bustling streets of Mumbai - the city that never sleeps!',
    tags: ['city', 'timelapse', 'mumbai', 'urban'],
    coordinates: { lat: 19.0760, lng: 72.8777 }
  },
  {
    id: '6',
    type: 'image',
    src: '/travel/placeholder-travel.svg',
    title: 'Ladakh Mountains',
    location: 'Leh, Ladakh',
    date: '2023-09-12',
    description: 'Breathtaking mountain ranges of Ladakh with crystal clear blue skies.',
    tags: ['mountains', 'ladakh', 'landscape', 'adventure'],
    coordinates: { lat: 34.1526, lng: 77.5771 }
  },
  {
    id: '7',
    type: 'image',
    src: '/travel/placeholder-travel.svg',
    title: 'Ancient Hampi Ruins',
    location: 'Hampi, Karnataka',
    date: '2023-08-25',
    description: 'Exploring the ancient ruins of Hampi, a UNESCO World Heritage Site.',
    tags: ['heritage', 'ruins', 'hampi', 'history'],
    coordinates: { lat: 15.3350, lng: 76.4600 }
  },
  {
    id: '8',
    type: 'video',
    src: '/travel/placeholder-travel.svg',
    thumbnail: '/travel/placeholder-travel.svg',
    title: 'River Rafting in Rishikesh',
    location: 'Rishikesh, Uttarakhand',
    date: '2023-07-14',
    description: 'Thrilling white water rafting experience in the holy city of Rishikesh.',
    tags: ['rafting', 'adventure', 'rishikesh', 'river'],
    coordinates: { lat: 30.0869, lng: 78.2676 }
  },
  {
    id: '9',
    type: 'image',
    src: '/travel/placeholder-travel.svg',
    title: 'Darjeeling Tea Gardens',
    location: 'Darjeeling, West Bengal',
    date: '2023-06-08',
    description: 'Lush green tea gardens of Darjeeling with the Himalayas in the background.',
    tags: ['tea', 'gardens', 'darjeeling', 'himalayas'],
    coordinates: { lat: 27.0360, lng: 88.2627 }
  },
  {
    id: '10',
    type: 'image',
    src: '/travel/placeholder-travel.svg',
    title: 'Andaman Coral Reefs',
    location: 'Havelock Island, Andaman',
    date: '2023-05-20',
    description: 'Underwater photography of beautiful coral reefs in the crystal clear waters.',
    tags: ['underwater', 'coral', 'andaman', 'diving'],
    coordinates: { lat: 12.0067, lng: 92.9797 }
  }
]

interface MediaModalProps {
  media: TravelMedia | null
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

function MediaModal({ media, isOpen, onClose, onNext, onPrev }: MediaModalProps) {
  if (!isOpen || !media) return null

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="relative max-w-6xl max-h-full w-full">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Navigation buttons */}
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Media content */}
        <div className="bg-navy-800 rounded-lg overflow-hidden">
          {media.type === 'image' ? (
            <img
              src={media.src}
              alt={media.title}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          ) : (
            <video
              src={media.src}
              controls
              autoPlay
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          )}
          
          {/* Media info */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{media.title}</h3>
                <div className="flex items-center text-navy-300 text-sm space-x-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {media.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(media.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="p-2 bg-navy-600 rounded-full text-navy-300 hover:text-white transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
                <button className="p-2 bg-navy-600 rounded-full text-navy-300 hover:text-white transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="p-2 bg-navy-600 rounded-full text-navy-300 hover:text-white transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <p className="text-navy-200 mb-4">{media.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {media.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-green-400/20 text-green-400 rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface MediaCardProps {
  media: TravelMedia
  index: number
  onClick: () => void
}

function MediaCard({ media, index, onClick }: MediaCardProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <div
      ref={ref}
      className={`group cursor-pointer transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-lg bg-navy-600 aspect-square">
        {/* Media preview */}
        <div className="relative w-full h-full">
          <img
            src={media.type === 'video' ? media.thumbnail || media.src : media.src}
            alt={media.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Video play button */}
          {media.type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center group-hover:bg-black/70 transition-colors">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
            </div>
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-semibold mb-1">{media.title}</h3>
              <div className="flex items-center text-white/80 text-sm">
                <MapPin className="w-3 h-3 mr-1" />
                {media.location}
              </div>
            </div>
          </div>
          
          {/* Expand icon */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center">
              <Maximize2 className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TravelGallery() {
  const [selectedMedia, setSelectedMedia] = useState<TravelMedia | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filter, setFilter] = useState<string>('all')

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const allTags = Array.from(new Set(travelMedia.flatMap(media => media.tags)))
  const filteredMedia = filter === 'all' 
    ? travelMedia 
    : travelMedia.filter(media => media.tags.includes(filter))

  const openModal = (media: TravelMedia) => {
    setSelectedMedia(media)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedMedia(null)
  }

  const nextMedia = () => {
    if (!selectedMedia) return
    const currentIndex = filteredMedia.findIndex(m => m.id === selectedMedia.id)
    const nextIndex = (currentIndex + 1) % filteredMedia.length
    setSelectedMedia(filteredMedia[nextIndex])
  }

  const prevMedia = () => {
    if (!selectedMedia) return
    const currentIndex = filteredMedia.findIndex(m => m.id === selectedMedia.id)
    const prevIndex = (currentIndex - 1 + filteredMedia.length) % filteredMedia.length
    setSelectedMedia(filteredMedia[prevIndex])
  }

  return (
    <section id="travel" className="py-20 bg-navy-800/30" ref={ref}>
      <div className="container-custom">
        <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="section-title justify-center">
              Travel Gallery
            </h2>
            <p className="text-navy-300 max-w-2xl mx-auto mb-8">
              Capturing memories from my adventures around incredible India. Each photo and video tells a story 
              of exploration, culture, and the beautiful moments that make traveling so special.
            </p>
            
            {/* Stats */}
            <div className="flex justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">10+</div>
                <div className="text-navy-400 text-sm">Destinations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">50+</div>
                <div className="text-navy-400 text-sm">Photos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">15+</div>
                <div className="text-navy-400 text-sm">Videos</div>
              </div>
            </div>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                filter === 'all'
                  ? 'bg-green-400 text-navy-900'
                  : 'bg-navy-600 text-navy-300 hover:bg-navy-500'
              }`}
            >
              All
            </button>
            {allTags.slice(0, 8).map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 capitalize ${
                  filter === tag
                    ? 'bg-green-400 text-navy-900'
                    : 'bg-navy-600 text-navy-300 hover:bg-navy-500'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMedia.map((media, index) => (
              <MediaCard
                key={media.id}
                media={media}
                index={index}
                onClick={() => openModal(media)}
              />
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="btn-primary">
              <Camera className="w-4 h-4 mr-2" />
              Load More Adventures
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <MediaModal
        media={selectedMedia}
        isOpen={isModalOpen}
        onClose={closeModal}
        onNext={nextMedia}
        onPrev={prevMedia}
      />
    </section>
  )
}