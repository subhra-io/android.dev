'use client'

import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, Instagram } from 'lucide-react'

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/subrajitpandey',
    icon: <Github className="w-5 h-5" />,
    color: 'hover:text-gray-400'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/subrajit-pandey-6a7950201',
    icon: <Linkedin className="w-5 h-5" />,
    color: 'hover:text-blue-400'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/subrajitpandey',
    icon: <Twitter className="w-5 h-5" />,
    color: 'hover:text-blue-400'
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/subrajitpandey',
    icon: <Instagram className="w-5 h-5" />,
    color: 'hover:text-pink-400'
  }
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real app, you would send the data to your backend
      console.log('Form submitted:', formData)
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact" className="py-20" ref={ref}>
      <div className="container-custom">
        <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <p className="text-green-400 font-mono text-lg mb-4">What's Next?</p>
            <h2 className="text-4xl md:text-5xl font-bold text-navy-100 mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-navy-300 max-w-2xl mx-auto leading-relaxed">
              I'm currently looking for new opportunities, my inbox is always open. 
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-navy-100 mb-6">
                  Let's Connect
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-green-400/20 rounded-lg">
                      <Mail className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-navy-200 font-medium">Email</p>
                      <a
                        href="mailto:subrajitpandey@example.com"
                        className="text-navy-300 hover:text-green-400 transition-colors"
                      >
                        subrajitpandey@example.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-400/20 rounded-lg">
                      <MapPin className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-navy-200 font-medium">Location</p>
                      <p className="text-navy-300">India</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-400/20 rounded-lg">
                      <Phone className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-navy-200 font-medium">Response Time</p>
                      <p className="text-navy-300">Usually within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold text-navy-100 mb-4">
                  Follow Me
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-navy-600 rounded-lg text-navy-300 ${social.color} transition-all duration-300 hover:transform hover:-translate-y-1`}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-lg p-6 border border-green-400/20">
                <h4 className="text-lg font-semibold text-navy-100 mb-3">
                  Quick Contact
                </h4>
                <p className="text-navy-300 text-sm mb-4">
                  For quick questions or just to say hello!
                </p>
                <a
                  href="mailto:subrajitpandey@example.com"
                  className="btn-primary"
                >
                  Say Hello
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-navy-600/50 rounded-lg p-8 border border-navy-500">
              <h3 className="text-2xl font-semibold text-navy-100 mb-6">
                Send a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-navy-200 font-medium mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-navy-700 border border-navy-500 rounded-lg text-navy-100 placeholder-navy-400 focus:outline-none focus:border-green-400 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-navy-200 font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-navy-700 border border-navy-500 rounded-lg text-navy-100 placeholder-navy-400 focus:outline-none focus:border-green-400 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-navy-200 font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-navy-700 border border-navy-500 rounded-lg text-navy-100 placeholder-navy-400 focus:outline-none focus:border-green-400 transition-colors"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-navy-200 font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-navy-700 border border-navy-500 rounded-lg text-navy-100 placeholder-navy-400 focus:outline-none focus:border-green-400 transition-colors resize-none"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-400 mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </div>
                  )}
                </button>
                
                {submitStatus === 'success' && (
                  <div className="text-green-400 text-center font-medium">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="text-red-400 text-center font-medium">
                    Something went wrong. Please try again or email me directly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}