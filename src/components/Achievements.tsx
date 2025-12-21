'use client'

import { useInView } from 'react-intersection-observer'
import { Trophy, Award, Smartphone, Star, Download, ExternalLink, Calendar, Users } from 'lucide-react'

interface AppAchievement {
  id: string
  title: string
  description: string
  playStoreUrl: string
  downloads: string
  rating: number
  icon: string
  category: string
  releaseDate: string
  features: string[]
}

interface AwardAchievement {
  id: string
  title: string
  description: string
  event: string
  date: string
  organization: string
  certificate?: string | null
  position: string
  teamSize?: number
}

const publishedApps: AppAchievement[] = [
  {
    id: '1',
    title: 'AadhaarFaceRD',
    description: 'Face authentication application for government services like Jeevan Pramaan and eKYC, enabling secure biometric verification for millions of users.',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=in.gov.uidai.facerd',
    downloads: '40,000,000+',
    rating: 3.6,
    icon: '/apps/app-icon-placeholder.svg',
    category: 'Government',
    releaseDate: 'February 2024',
    features: ['Face Authentication', 'Biometric Verification', 'Government Services', 'Secure Identity']
  },
  {
    id: '2',
    title: 'Aadhaar - Digital Identity',
    description: 'Next-generation digital identity platform for Bharat, reimagining how residents engage with their identity with enhanced control and privacy.',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=in.gov.uidai.pehchaan',
    downloads: '10,000,000+',
    rating: 4.2,
    icon: '/apps/app-icon-placeholder.svg',
    category: 'Government',
    releaseDate: 'November 2024',
    features: ['Digital Identity', 'Privacy Control', 'Multi-Profile Support', 'Offline Access']
  }
]

const awards: AwardAchievement[] = [
  {
    id: '1',
    title: 'International Innovation Award 2024',
    description: 'Aadhaar Face Authentication was awarded for innovation and large-scale impact in public digital infrastructure.',
    event: 'Global Innovation Forum – Kuala Lumpur',
    date: '2024',
    organization: 'Global Innovation Forum',
    certificate: null,
    position: 'Innovation Award',
    teamSize: 8
  },
  {
    id: '2',
    title: 'Excellence in Mobile Development',
    description: 'Recognized for outstanding contribution to cross-platform mobile application development using Kotlin Multiplatform and modern Android architecture.',
    event: 'UIDAI Internal Recognition Program',
    date: '2024',
    organization: 'UIDAI',
    certificate: null,
    position: 'Excellence Award',
    teamSize: 6
  },
  {
    id: '3',
    title: 'Outstanding Performance Award',
    description: 'Recognition for exceptional contribution to Aadhaar face authentication systems and mobile application development.',
    event: 'UIDAI Annual Awards 2024',
    date: 'December 2024',
    organization: 'UIDAI',
    certificate: null,
    position: 'Outstanding Performer',
    teamSize: 4
  }
]

export default function Achievements() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="achievements" className="py-20 bg-navy-800/30" ref={ref}>
      <div className="container-custom">
        <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="section-title justify-center">
              Achievements & Recognition
            </h2>
            <p className="text-navy-300 max-w-2xl mx-auto">
              Published government applications serving millions of users and recognized for innovation in digital infrastructure and mobile development.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 mb-12 sm:mb-16">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-1 sm:mb-2">
                {publishedApps.length}
              </div>
              <div className="text-navy-300 text-xs sm:text-sm">Published Apps</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1 sm:mb-2">
                {publishedApps.reduce((sum, app) => sum + parseInt(app.downloads.replace(/[^0-9]/g, '')), 0).toLocaleString()}+
              </div>
              <div className="text-navy-300 text-xs sm:text-sm">Total Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1 sm:mb-2">
                {(publishedApps.reduce((sum, app) => sum + app.rating, 0) / publishedApps.length).toFixed(1)}
              </div>
              <div className="text-navy-300 text-xs sm:text-sm">Avg Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-1 sm:mb-2">
                2.5M+
              </div>
              <div className="text-navy-300 text-xs sm:text-sm">Daily Transactions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1 sm:mb-2">
                {awards.length}
              </div>
              <div className="text-navy-300 text-xs sm:text-sm">Awards Won</div>
            </div>
          </div>

          {/* Published Apps */}
          <div className="mb-12 sm:mb-16">
            <h3 className="text-xl sm:text-2xl font-semibold text-navy-100 mb-6 sm:mb-8 flex items-center">
              <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-green-400 flex-shrink-0" />
              Published Apps on Play Store
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {publishedApps.map((app, index) => (
                <div
                  key={app.id}
                  className={`bg-navy-600/50 rounded-lg p-4 sm:p-6 border border-navy-500 hover:border-green-400/50 transition-all duration-500 hover:transform hover:-translate-y-2 ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                    <img
                      src={app.icon}
                      alt={app.title}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-base sm:text-lg font-semibold text-navy-100 pr-2">{app.title}</h4>
                        <a
                          href={app.playStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-400 hover:text-green-300 transition-colors flex-shrink-0"
                          title="View on Play Store"
                        >
                          <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                        </a>
                      </div>
                      <span className="inline-block px-2 py-1 bg-blue-400/20 text-blue-400 rounded text-xs">
                        {app.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-navy-300 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                    {app.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm">
                    <div className="flex items-center text-navy-300">
                      <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-green-400 flex-shrink-0" />
                      <span className="truncate">{app.downloads}</span>
                    </div>
                    <div className="flex items-center text-navy-300">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-yellow-400 flex-shrink-0" />
                      <span>{app.rating}</span>
                    </div>
                    <div className="flex items-center text-navy-300">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-blue-400 flex-shrink-0" />
                      <span className="truncate">{app.releaseDate}</span>
                    </div>
                  </div>

                  <div className="border-t border-navy-500 pt-3 sm:pt-4">
                    <h5 className="text-navy-200 text-xs font-semibold mb-2">Key Features:</h5>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {app.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-1 bg-navy-700 text-navy-300 rounded text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Awards & Recognition */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-navy-100 mb-6 sm:mb-8 flex items-center">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-yellow-400 flex-shrink-0" />
              Awards & Recognition
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {awards.map((award, index) => (
                <div
                  key={award.id}
                  className={`bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-lg p-4 sm:p-6 border border-yellow-400/20 hover:border-yellow-400/50 transition-all duration-500 hover:transform hover:-translate-y-2 ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center">
                        <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-base sm:text-lg font-semibold text-navy-100 pr-2">{award.title}</h4>
                        {award.certificate && (
                          <a
                            href={award.certificate}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-yellow-400 hover:text-yellow-300 transition-colors flex-shrink-0"
                            title="View Certificate"
                          >
                            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                          </a>
                        )}
                      </div>
                      <span className="inline-block px-2 py-1 bg-yellow-400/20 text-yellow-400 rounded text-xs font-semibold">
                        {award.position}
                      </span>
                    </div>
                  </div>

                  <p className="text-navy-300 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                    {award.description}
                  </p>

                  <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-navy-400">
                    <div className="flex items-center">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-yellow-400 flex-shrink-0" />
                      <span className="truncate">{award.event}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-yellow-400 flex-shrink-0" />
                      <span>{award.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-yellow-400 flex-shrink-0" />
                      <span className="truncate">{award.organization}</span>
                    </div>
                    {award.teamSize && (
                      <div className="flex items-center">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-yellow-400 flex-shrink-0" />
                        <span>Team of {award.teamSize} members</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}