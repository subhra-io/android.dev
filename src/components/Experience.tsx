'use client'

import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Calendar, MapPin, Award, Smartphone, Users, Trophy, Star, Download } from 'lucide-react'

const experiences = [
  {
    id: 'uidai-fulltime',
    company: 'UIDAI (Unique Identification Authority of India)',
    position: 'Software Developer - Mobile Applications',
    location: 'Bengaluru, KA',
    startDate: 'Oct 2024',
    endDate: 'Present',
    description: [
      'Collaborated with the Android team on projects utilizing MVVM architecture, LiveData, WorkManager, and Coroutines.',
      'Developed a cross-platform application using Kotlin Multiplatform (KMP) and Android Jetpack Compose.',
      'Integrated backend services such as Redis, Kafka, and load balancers to ensure efficient data handling and real-time processing.',
      'Worked on scalable mobile solutions serving millions of users nationwide.',
      'Contributed to critical government digital infrastructure projects with focus on security and performance.'
    ],
    technologies: [
      'Kotlin Multiplatform',
      'Jetpack Compose',
      'MVVM',
      'LiveData',
      'WorkManager',
      'Coroutines',
      'Redis',
      'Kafka',
      'Load Balancers'
    ],
    companyUrl: 'https://uidai.gov.in',
    achievements: [
      {
        type: 'app',
        title: 'AadhaarFaceRD - Face Authentication App',
        description:
          'Developed a headless face authentication application for government services like Jeevan Pramaan and eKYC, enabling secure biometric verification.',
        event: 'Google Play Store',
        date: '2024',
        certificate: null,
        playStoreUrl: 'https://play.google.com/store/apps/details?id=in.gov.uidai.facerd',
        downloads: '40M+',
        rating: '3.6'
      },
      {
        type: 'app',
        title: 'Aadhaar - Digital Identity Platform',
        description:
          'Contributed to next-generation digital identity platform for Bharat, reimagining how residents engage with their identity with enhanced control and privacy.',
        event: 'Google Play Store',
        date: '2024',
        certificate: null,
        playStoreUrl: 'https://play.google.com/store/apps/details?id=in.gov.uidai.pehchaan',
        downloads: '10M+',
        rating: '4.2'
      },
      {
        type: 'award',
        title: 'International Innovation Award 2024',
        description:
          'Aadhaar Face Authentication was awarded for innovation and large-scale impact in public digital infrastructure.',
        event: 'Global Innovation Forum – Kuala Lumpur',
        date: '2024',
        certificate: null,
        playStoreUrl: null,
        downloads: null,
        rating: null
      }
    ]
  },
  {
    id: 'nextlearn',
    company: 'NextLearn Technologies',
    position: 'Android Developer Consultant',
    location: 'WFH, KA',
    startDate: 'Jun 2024',
    endDate: 'Oct 2024',
    description: [
      'Designed the system architecture for an Android application using the MVVM architecture.',
      'Assisted in integrating the application with MongoDB, ensuring scalability and efficient database interactions.',
      'Provided technical consultation on mobile app development best practices.',
      'Worked remotely to deliver high-quality Android solutions within project timelines.'
    ],
    technologies: [
      'Android',
      'MVVM',
      'MongoDB',
      'System Architecture',
      'Kotlin',
      'Java'
    ],
    companyUrl: null,
    achievements: []
  },
  {
    id: 'uidai-intern',
    company: 'UIDAI (Unique Identification Authority of India)',
    position: 'Software Developer Intern - Android/iOS',
    location: 'Bengaluru, KA',
    startDate: 'May 2023',
    endDate: 'May 2024',
    description: [
      'Worked alongside the Android team on projects related to Aadhaar face authentication (faceRD) and universal USB detection.',
      'Implemented various Android concepts including MVVM, LiveData, WorkManager, Navigation, and Shared Preferences.',
      'Developed expertise in Coroutines techniques, file I/O, concurrency, and multi-threading.',
      'Worked with Fragments, Custom view components, RecyclerView, Android SDK and NDK, CMake.',
      'Gained experience with Android Architecture Components and modern development practices.'
    ],
    technologies: [
      'Android SDK',
      'NDK',
      'MVVM',
      'LiveData',
      'WorkManager',
      'Coroutines',
      'CMake',
      'Kotlin',
      'Java'
    ],
    companyUrl: 'https://uidai.gov.in',
    achievements: []
  },
  {
    id: 'isan',
    company: 'ISAN Data System Pvt. Ltd.',
    position: 'React Native Intern',
    location: 'India',
    startDate: 'May 2024',
    endDate: 'Jun 2024',
    description: [
      'Contributed to a production React Native application used by real users.',
      'Implemented UI features and business logic using component-driven architecture.',
      'Integrated REST APIs and ensured smooth data flow between frontend and backend.',
      'Debugged cross-platform issues and improved application stability on Android.'
    ],
    technologies: [
      'React Native',
      'JavaScript',
      'Redux',
      'REST APIs',
      'Git'
    ],
    companyUrl: null,
    achievements: []
  },
  {
    id: 'codeclause',
    company: 'CodeClause',
    position: 'Web Developer Intern',
    location: 'Remote',
    startDate: 'Jul 2024',
    endDate: 'Aug 2024',
    description: [
      'Built responsive web applications using React, HTML, CSS, and JavaScript.',
      'Developed reusable UI components to improve code maintainability and scalability.',
      'Collaborated with designers to translate Figma designs into pixel-accurate interfaces.',
      'Followed modern frontend development workflows including version control and code reviews.'
    ],
    technologies: [
      'React',
      'JavaScript',
      'HTML',
      'CSS',
      'Git'
    ],
    companyUrl: 'https://codeclause.com',
    achievements: []
  },
  {
    id: 'projects',
    company: 'Independent Projects',
    position: 'Android & Full-Stack Developer',
    location: 'Remote',
    startDate: '2023',
    endDate: 'Present',
    description: [
      'Designed and developed Android applications using MVVM and Jetpack Compose.',
      'Built web applications with React and Next.js while learning backend development.',
      'Implemented REST APIs, authentication flows, and database integrations.',
      'Explored system design concepts including caching, concurrency, and performance optimization.',
      'Worked with modern technologies such as Firebase, gRPC, FlatBuffers, and Kotlin Multiplatform.'
    ],
    technologies: [
      'Kotlin',
      'Android',
      'Jetpack Compose',
      'React',
      'Next.js',
      'Node.js',
      'MongoDB',
      'Firebase'
    ],
    companyUrl: null,
    achievements: []
  }
]

export default function Experience() {
  const [activeTab, setActiveTab] = useState(experiences[0].id)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const activeExperience = experiences.find(exp => exp.id === activeTab) || experiences[0]

  return (
    <section id="experience" className="py-20" ref={ref}>
      <div className="container-custom">
        <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="section-title">Where I've Worked</h2>
          
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Tab buttons */}
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible scrollbar-hide">
              <div className="flex lg:flex-col border-b-2 lg:border-b-0 lg:border-l-2 border-navy-500 min-w-max lg:min-w-0">
                {experiences.map((exp) => (
                  <button
                    key={exp.id}
                    onClick={() => setActiveTab(exp.id)}
                    className={`px-4 sm:px-6 py-3 sm:py-4 text-left font-mono text-xs sm:text-sm whitespace-nowrap lg:whitespace-normal transition-all duration-300 border-b-2 lg:border-b-0 lg:border-l-2 ${
                      activeTab === exp.id
                        ? 'text-green-400 border-green-400 bg-green-400/10'
                        : 'text-navy-300 border-transparent hover:text-green-400 hover:bg-green-400/5'
                    }`}
                  >
                    <span className="hidden sm:inline">{exp.company}</span>
                    <span className="sm:hidden">{exp.company.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-h-[350px] sm:min-h-[400px]">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-navy-100 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span>{activeExperience.position}</span>
                    <span className="text-green-400 text-base sm:text-2xl">@</span>
                    {activeExperience.companyUrl ? (
                      <a
                        href={activeExperience.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:underline inline-flex items-center gap-1 text-base sm:text-2xl"
                      >
                        {activeExperience.company}
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                      </a>
                    ) : (
                      <span className="text-green-400 text-base sm:text-2xl">{activeExperience.company}</span>
                    )}
                  </h3>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 text-navy-300 font-mono text-xs sm:text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span>{activeExperience.startDate} - {activeExperience.endDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span>{activeExperience.location}</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-2 sm:space-y-3">
                  {activeExperience.description.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start text-navy-300 leading-relaxed text-sm sm:text-base"
                    >
                      <span className="text-green-400 mr-2 sm:mr-3 mt-1.5 sm:mt-2 text-xs flex-shrink-0">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div>
                  <h4 className="text-navy-100 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Technologies used:</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {activeExperience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 sm:px-3 py-1 bg-navy-600 text-navy-200 rounded-full text-xs sm:text-sm font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements Section */}
                {activeExperience.achievements && activeExperience.achievements.length > 0 && (
                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-navy-600">
                    <h4 className="text-navy-100 font-semibold mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                      <Trophy className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400 flex-shrink-0" />
                      Key Achievements
                    </h4>
                    <div className="space-y-3 sm:space-y-4">
                      {activeExperience.achievements.map((achievement) => (
                        <div key={achievement.title} className="achievement-card">
                          {achievement.type === 'app' ? (
                            <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-navy-600/30 rounded-lg border border-navy-500">
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-lg flex items-center justify-center">
                                  <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                  <h5 className="text-navy-100 font-semibold text-sm sm:text-base pr-2">{achievement.title}</h5>
                                  {achievement.playStoreUrl && (
                                    <a
                                      href={achievement.playStoreUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-green-400 hover:text-green-300 transition-colors flex-shrink-0"
                                      title="View on Play Store"
                                    >
                                      <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    </a>
                                  )}
                                </div>
                                <p className="text-navy-300 text-xs sm:text-sm mb-2 sm:mb-3 leading-relaxed">{achievement.description}</p>
                                {achievement.downloads && achievement.rating && (
                                  <div className="flex items-center space-x-3 sm:space-x-4 text-xs text-navy-400">
                                    <div className="flex items-center">
                                      <Download className="w-3 h-3 mr-1 flex-shrink-0" />
                                      <span className="truncate">{achievement.downloads} downloads</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Star className="w-3 h-3 mr-1 text-yellow-400 flex-shrink-0" />
                                      <span>{achievement.rating} rating</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-lg border border-yellow-400/20">
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center">
                                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                  <h5 className="text-navy-100 font-semibold text-sm sm:text-base pr-2">{achievement.title}</h5>
                                  {achievement.certificate && (
                                    <a
                                      href={achievement.certificate}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-yellow-400 hover:text-yellow-300 transition-colors flex-shrink-0"
                                      title="View Certificate"
                                    >
                                      <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    </a>
                                  )}
                                </div>
                                <p className="text-navy-300 text-xs sm:text-sm mb-2 leading-relaxed">{achievement.description}</p>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:space-x-4 text-xs text-navy-400">
                                  <div className="flex items-center">
                                    <Users className="w-3 h-3 mr-1 flex-shrink-0" />
                                    <span className="truncate">{achievement.event}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                                    <span>{achievement.date}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}