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
    title: 'Tech Hub Adventures',
    location: 'Hyderabad, Telangana',
    date: '2024-08-15',
    description: 'Exploring the vibrant tech city of Hyderabad, from Charminar to HITEC City. The perfect blend of tradition and innovation!',
    tags: ['city', 'tech', 'hyderabad', 'culture'],
    coordinates: { lat: 17.3850, lng: 78.4867 }
  },
  {
    id: '2',
    type: 'image',
    src: '/travel/placeholder-travel.svg',
    title: 'Garden City Vibes',
    location: 'Bengaluru, Karnataka',
    date: '2024-07-20',
    description: 'Living and working in the Silicon Valley of India. From Lalbagh to Brigade Road, every corner has a story!',
    tags: ['city', 'work', 'bengaluru', 'gardens'],
    coordinates: { lat: 12.9716, lng: 77.5946 }
  },
  {
    id: '3',
    type: 'image',
    src: '/travel/placeholder-travel.svg',
    title: 'Temple City Heritage',
    location: 'Bhubaneswar, Odisha',
    date: '2024-06-10',
    description: 'Discovering the ancient temples and rich cultural heritage of Bhubaneswar, the Temple City of India.',
    tags: ['heritage', 'temples', 'bhubaneswar', 'culture'],
    coordinates: { lat: 20.2961, lng: 85.8245 }
  },
  {
    id: '4',
    type: 'image',
    src: '/travel/placeholder-travel.svg',
    title: 'Sacred Beach Town',
    location: 'Puri, Odisha',
    date: '2024-06-12',
    description: 'Spiritual vibes at the famous Jagannath Temple and peaceful moments at Puri Beach. A perfect blend of devotion and relaxation.',
    tags: ['beach', 'spiritual', 'puri', 'temple'],
    coordinates: { lat: 19.8135, lng: 85.8312 }
  },
  {
    id: '5',
    type: 'image',
    src: '/travel/placeholder-travel.svg',
    title: 'Taj Mahal Wonder',
    location: 'Agra, Uttar Pradesh',
    date: '2024-05-18',
    description: 'Standing before the magnificent Taj Mahal at sunrise. No words can describe the beauty of this wonder of the world!',
    tags: ['heritage', 'tajmahal', 'agra', 'wonder'],
    coordinates: { lat: 27.1751, lng: 78.0421 }
  },
  {
    id: '6',
    type: 'image',
    src: '/travel/placeholder-travel.svg',
    title: 'Tribal Heritage',
    location: 'Kalahandi, Odisha',
    date: '2024-04-25',
    description: 'Exploring the rich tribal culture and natural beauty of Kalahandi district. Amazing local traditions and warm hospitality!',
    tags: ['tribal', 'culture', 'kalahandi', 'nature'],
    coordinates: { lat: 20.1333, lng: 83.1667 }
  },
  {
    id: '7',
    type: 'image',
    src: '/travel/placeholder-travel.svg',
    title: 'District Headquarters',
    location: 'Bhawanipatna, Odisha',
    date: '2024-04-26',
    description: 'Visiting the administrative center of Kalahandi district. Learning about local governance and community development.',
    tags: ['city', 'administrative', 'bhawanipatna', 'local'],
    coordinates: { lat: 19.9067, lng: 83.1711 }
  },
  {
    id: '8',
    type: 'image',
    src: '/travel/placeholder-travel.svg',
    title: 'Capital Chronicles',
    location: 'New Delhi, Delhi',
    date: '2024-03-15',
    description: 'Exploring the heart of India - from India Gate to Red Fort, every monument tells the story of our nation!',
    tags: ['capital', 'monuments', 'delhi', 'heritage'],
    coordinates: { lat: 28.6139, lng: 77.2090 }
  },
  {
    id: '9',
    type: 'image',
    src: '/travel/placeholder-travel.svg',
    title: 'Village Roots',
    location: 'Narasighapuram, Tamil Nadu',
    date: '2024-02-20',
    description: 'Connecting with my roots in this beautiful Tamil Nadu village. Traditional South Indian culture and amazing hospitality!',
    tags: ['village', 'roots', 'tamilnadu', 'tradition'],
    coordinates: { lat: 11.5000, lng: 79.0000 }
  },
  {
    id: '10',
    type: 'image',
    src: '/travel/placeholder-travel.svg',
    title: 'Shore Temple Wonders',
    location: 'Mahabalipuram, Tamil Nadu',
    date: '2024-02-22',
    description: 'Ancient rock-cut temples by the sea! Mahabalipuram\'s UNESCO World Heritage sites are absolutely breathtaking.',
    tags: ['heritage', 'temples', 'mahabalipuram', 'unesco'],
    coordinates: { lat: 12.6269, lng: 80.1928 }
  },
  {
    id: '11',
    type: 'image',
    src: '/travel/placeholder-travel.svg',
    title: 'Hill Station Escape',
    location: 'Yelagiri Hills, Tamil Nadu',
    date: '2024-02-24',
    description: 'Cool breeze and scenic views at Yelagiri Hills. Perfect weekend getaway from the city heat!',
    tags: ['hills', 'nature', 'yelagiri', 'weekend'],
    coordinates: { lat: 12.6167, lng: 78.6500 }
  },
  {
    id: '12',
    type: 'image',
    src: '/travel/placeholder-travel.svg',
    title: 'Industrial Town',
    location: 'Ranipet, Tamil Nadu',
    date: '2024-02-25',
    description: 'Exploring the industrial landscape of Ranipet. Interesting mix of manufacturing and local culture.',
    tags: ['industrial', 'town', 'ranipet', 'local'],
    coordinates: { lat: 12.9249, lng: 79.3308 }
  },
  {
    id: '13',
    type: 'image',
    src: '/travel/placeholder-travel.svg',
    title: 'Fort City Heritage',
    location: 'Vellore, Tamil Nadu',
    date: '2024-02-26',
    description: 'The magnificent Vellore Fort and its rich history. Amazing architecture and well-preserved heritage!',
    tags: ['fort', 'heritage', 'vellore', 'history'],
    coordinates: { lat: 12.9165, lng: 79.1325 }
  },
  {
    id: '14',
    type: 'image',
    src: '/travel/placeholder-travel.svg',
    title: 'Silk City Charm',
    location: 'Berhampur, Odisha',
    date: '2024-01-15',
    description: 'Famous for its silk sarees and rich cultural heritage. Berhampur\'s traditional crafts are truly amazing!',
    tags: ['silk', 'crafts', 'berhampur', 'tradition'],
    coordinates: { lat: 19.3149, lng: 84.7941 }
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
              Capturing memories from my adventures across incredible India. From tech hubs to ancient temples, 
              hill stations to heritage sites - each photo tells a story of exploration and discovery.
            </p>
            
            {/* Stats */}
            <div className="flex justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">14+</div>
                <div className="text-navy-400 text-sm">Destinations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">100+</div>
                <div className="text-navy-400 text-sm">Photos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">8</div>
                <div className="text-navy-400 text-sm">States Visited</div>
              </div>
            </div>
            
            {/* Instagram Link */}
            <div className="text-center mb-8">
              <a
                href="https://www.instagram.com/nikheeeeeell"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors"
              >
                <Camera className="w-4 h-4 mr-2" />
                Follow my journey on Instagram @nikheeeeeell
              </a>
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