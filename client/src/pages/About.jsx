import React, { useState, useEffect } from 'react'
import SEO from '../components/SEO'

const team = [
  { name: 'Ayesha Rahman', role: 'Founder & CEO', bio: 'Passionate about connecting readers worldwide through curated collections and vibrant communities.', avatar: '/assets/banner.webp', social: { twitter: '#', linkedin: '#' } },
  { name: 'Rafiul Islam', role: 'CTO', bio: 'Full-stack developer focused on creating seamless user experiences and robust backend systems.', avatar: '/assets/react.svg', social: { twitter: '#', github: '#' } },
  { name: 'Maya Khan', role: 'Community Manager', bio: 'Dedicated to fostering meaningful connections and organizing engaging literary events.', avatar: '/assets/newsletter.webp', social: { instagram: '#', linkedin: '#' } },
]

const features = [
  { icon: '🎯', title: 'Our Mission', desc: 'Curate high-quality reads and build a welcoming community for all readers.' },
  { icon: '💎', title: 'Our Values', desc: 'Integrity, Diversity, and Lifelong Learning. We support independent authors and local bookstores.' },
  { icon: '🚀', title: 'What we offer', desc: 'Curated book lists, member discounts, author events, and easy book discovery.' }
]

const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    let start = 0
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [end, duration])
  
  return <span>{count.toLocaleString()}</span>
}

const About = () => {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <SEO 
        title="About Us - BookClub | Meet Our Team & Mission"
        description="Learn about BookClub's mission to connect readers worldwide. Meet our passionate team dedicated to creating the best reading experience and building a vibrant book community."
        keywords="about bookclub, reading community, book lovers, literary team, book mission"
      />
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-amber-100">
              About BookClub
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              We connect readers with the best books, hand-picked collections, and a vibrant community. 
              Our mission is to make reading accessible, enjoyable, and social.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Features Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className={`group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-8 text-white shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="group">
                <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                  <CountUp end={1200} />+
                </div>
                <div className="text-lg opacity-90">Happy Members</div>
              </div>
              <div className="group">
                <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                  <CountUp end={430} />+
                </div>
                <div className="text-lg opacity-90">Curated Books</div>
              </div>
              <div className="group">
                <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                  <CountUp end={85} />+
                </div>
                <div className="text-lg opacity-90">Literary Events</div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Meet Our Amazing Team</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Passionate individuals dedicated to creating the best reading experience for our community
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {team.map((member, index) => (
              <div 
                key={member.name} 
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 transform transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${(index + 3) * 200}ms` }}
              >
                <div className="relative mb-6">
                  <img 
                    src={member.avatar} 
                    alt={member.name} 
                    className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-amber-100 group-hover:ring-amber-300 transition-all duration-300" 
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{member.name}</h3>
                <p className="text-amber-600 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed mb-6">{member.bio}</p>
                
                <div className="flex justify-center space-x-4">
                  {Object.entries(member.social).map(([platform, url]) => (
                    <a 
                      key={platform}
                      href={url}
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                    >
                      <span className="text-sm font-semibold">{platform[0].toUpperCase()}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Your Reading Journey?</h3>
            <p className="text-xl mb-8 opacity-90">Join thousands of readers discovering their next favorite book</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/books" 
                className="inline-flex items-center px-8 py-4 bg-amber-500 text-white rounded-full hover:bg-amber-600 transform hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
              >
                <span>Explore Collections</span>
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-gray-900 transform hover:scale-105 transition-all duration-300 font-semibold"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About 