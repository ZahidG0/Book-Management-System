import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import SEO from '../components/SEO';

const contactInfo = [
  {
    icon: '📧',
    title: 'Email Us',
    content: 'hello@bookclub.example',
    link: 'mailto:hello@bookclub.example',
    description: 'Send us an email anytime'
  },
  {
    icon: '📞',
    title: 'Call Us',
    content: '+1 (555) 123-4567',
    link: 'tel:+15551234567',
    description: 'Mon-Fri 9AM-6PM EST'
  },
  {
    icon: '📍',
    title: 'Visit Us',
    content: '123 Book Street, Reading City',
    link: '#map',
    description: 'Our cozy office space'
  }
]

const socialLinks = [
  { name: 'Twitter', icon: '🐦', url: '#', color: 'hover:bg-blue-500' },
  { name: 'Facebook', icon: '📘', url: '#', color: 'hover:bg-blue-600' },
  { name: 'Instagram', icon: '📷', url: '#', color: 'hover:bg-pink-500' },
  { name: 'LinkedIn', icon: '💼', url: '#', color: 'hover:bg-blue-700' }
]

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [status, setStatus] = useState('idle');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const onSubmit = async (data) => {
    setStatus('sending');
    try {
      await new Promise((r) => setTimeout(r, 1500));
      console.log('Contact form submitted', data);
      setStatus('success');
      reset();
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error('Contact submit error', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <SEO 
        title="Contact Us - BookClub | Get in Touch with Our Team"
        description="Have questions about BookClub? Contact our friendly team for support, partnerships, or feedback. We're here to help with all your reading needs."
        keywords="contact bookclub, customer support, book help, reading assistance, partnership inquiry"
      />
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Have questions or want to collaborate? We'd love to hear from you.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Contact Info Cards */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <div 
                key={info.title}
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 text-center transform transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{info.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{info.title}</h3>
                <a 
                  href={info.link}
                  className="text-amber-600 hover:text-amber-700 font-semibold text-lg block mb-2 transition-colors duration-300"
                >
                  {info.content}
                </a>
                <p className="text-gray-600">{info.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Contact Section */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="lg:flex">
              {/* Contact Form */}
              <div className="lg:w-3/5 p-8 lg:p-12">
                <div className="max-w-md mx-auto lg:mx-0">
                  <h2 className="text-3xl font-bold mb-4 text-gray-800">Send us a message</h2>
                  <p className="text-gray-600 mb-8">We'll get back to you within 24 hours. Promise! 📚</p>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                        <input
                          {...register('firstName', { required: 'First name is required' })}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-colors duration-300"
                          placeholder="John"
                        />
                        {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                        <input
                          {...register('lastName', { required: 'Last name is required' })}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-colors duration-300"
                          placeholder="Doe"
                        />
                        {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <input
                        {...register('email', { 
                          required: 'Email is required', 
                          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email' } 
                        })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-colors duration-300"
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                      <select
                        {...register('subject', { required: 'Please select a subject' })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-colors duration-300"
                      >
                        <option value="">Choose a topic...</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="partnership">Partnership</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.subject && <p className="text-sm text-red-500 mt-1">{errors.subject.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                      <textarea
                        {...register('message', { 
                          required: 'Message is required', 
                          minLength: { value: 10, message: 'Please write at least 10 characters' } 
                        })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-colors duration-300 h-32 resize-none"
                        placeholder="Tell us more about your inquiry..."
                      />
                      {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>}
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        type="submit"
                        className={`inline-flex items-center px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 ${
                          status === 'sending' 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl'
                        }`}
                        disabled={status === 'sending'}
                      >
                        {status === 'sending' ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                          </>
                        )}
                      </button>

                      {status === 'success' && (
                        <div className="flex items-center text-green-600 font-semibold">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Message sent successfully!
                        </div>
                      )}
                      {status === 'error' && (
                        <div className="flex items-center text-red-600 font-semibold">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Failed to send. Please try again.
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              {/* Contact Info & Map */}
              <div className="lg:w-2/5 bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                <div className="h-full flex flex-col">
                  {/* Contact Details */}
                  <div className="p-8 lg:p-12">
                    <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">📧</span>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Email</h4>
                          <p className="opacity-90">hello@bookclub.example</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">📞</span>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Phone</h4>
                          <p className="opacity-90">+1 (555) 123-4567</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">📍</span>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Address</h4>
                          <p className="opacity-90">123 Book Street<br />Reading City, RC 12345</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h4 className="font-semibold mb-4">Follow Us</h4>
                      <div className="flex space-x-3">
                        {socialLinks.map((social) => (
                          <a 
                            key={social.name}
                            href={social.url}
                            className={`w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 transform hover:scale-110 ${social.color}`}
                            title={social.name}
                          >
                            <span className="text-xl">{social.icon}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Map */}
                  <div className="flex-1 min-h-[300px]" id="map">
                    <iframe
                      title="Our location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086951084983!2d-122.42067968468139!3d37.77851917975879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c0b0c6b5f%3A0x8f5b4b1e7b1ecb0!2sCivic%20Center%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1669823156454!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      className="rounded-bl-3xl lg:rounded-bl-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Frequently Asked Questions</h2>
            <p className="text-gray-600">Quick answers to common questions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-lg mb-3 text-gray-800">How quickly do you respond?</h3>
              <p className="text-gray-600">We typically respond to all inquiries within 24 hours during business days.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-lg mb-3 text-gray-800">Do you offer partnerships?</h3>
              <p className="text-gray-600">Yes! We're always open to collaborating with authors, publishers, and book enthusiasts.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-lg mb-3 text-gray-800">Can I suggest books?</h3>
              <p className="text-gray-600">Absolutely! We love book recommendations from our community members.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-lg mb-3 text-gray-800">Is there a mobile app?</h3>
              <p className="text-gray-600">We're currently working on a mobile app. Stay tuned for updates!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact