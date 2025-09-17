import React, { useState } from 'react'
import { FaCheck, FaCrown, FaStar, FaBook, FaUsers, FaGift } from 'react-icons/fa'
import SEO from '../components/SEO'

const plans = [
  {
    id: 'basic',
    name: 'Basic Reader',
    price: 9.99,
    period: 'month',
    popular: false,
    features: [
      '5 books per month',
      'Basic book recommendations',
      'Community access',
      'Mobile app access',
      'Email support'
    ],
    color: 'gray'
  },
  {
    id: 'premium',
    name: 'Premium Reader',
    price: 19.99,
    period: 'month',
    popular: true,
    features: [
      'Unlimited books',
      'AI-powered recommendations',
      'Exclusive content',
      'Priority support',
      'Offline reading',
      'Book clubs access',
      'Author events'
    ],
    color: 'amber'
  },
  {
    id: 'family',
    name: 'Family Plan',
    price: 29.99,
    period: 'month',
    popular: false,
    features: [
      'Up to 6 accounts',
      'All Premium features',
      'Parental controls',
      'Kids content library',
      'Family reading challenges',
      'Shared wishlists'
    ],
    color: 'blue'
  }
]

const benefits = [
  { icon: FaBook, title: 'Vast Library', desc: 'Access to over 100,000 books across all genres' },
  { icon: FaStar, title: 'Personalized', desc: 'AI recommendations based on your reading history' },
  { icon: FaUsers, title: 'Community', desc: 'Join book clubs and connect with fellow readers' },
  { icon: FaGift, title: 'Exclusive Content', desc: 'Early access to new releases and author interviews' }
]

const Membership = () => {
  const [billingCycle, setBillingCycle] = useState('monthly')
  const [selectedPlan, setSelectedPlan] = useState('premium')

  const getPrice = (price) => {
    return billingCycle === 'yearly' ? (price * 10).toFixed(2) : price.toFixed(2)
  }

  const getSavings = (price) => {
    return billingCycle === 'yearly' ? ((price * 12 - price * 10) / (price * 12) * 100).toFixed(0) : 0
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <SEO 
        title="Membership Plans - BookClub | Unlimited Books & Premium Features"
        description="Join BookClub with flexible membership plans. Get unlimited access to 100K+ books, AI recommendations, exclusive content, and join our reading community. Free trial available."
        keywords="book membership, unlimited books, reading subscription, book club membership, premium reading"
      />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Choose Your Reading Journey</h1>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Unlock unlimited access to our vast library and join a community of passionate readers
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex bg-white/20 rounded-full p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full transition-all ${
                billingCycle === 'monthly' ? 'bg-white text-purple-600' : 'text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full transition-all ${
                billingCycle === 'yearly' ? 'bg-white text-purple-600' : 'text-white'
              }`}
            >
              Yearly <span className="text-xs bg-yellow-400 text-purple-800 px-2 py-1 rounded-full ml-2">Save 17%</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative bg-white rounded-3xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 ${
                plan.popular ? 'ring-4 ring-amber-400 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-center py-2 font-semibold">
                  <FaCrown className="inline mr-2" />
                  Most Popular
                </div>
              )}
              
              <div className={`p-8 ${plan.popular ? 'pt-16' : ''}`}>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">${getPrice(plan.price)}</span>
                    <span className="text-gray-600 ml-2">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
                  </div>
                  {billingCycle === 'yearly' && getSavings(plan.price) > 0 && (
                    <p className="text-green-600 text-sm font-semibold mt-1">
                      Save {getSavings(plan.price)}% with yearly billing
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <FaCheck className={`text-${plan.color}-500 mr-3 flex-shrink-0`} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg'
                      : selectedPlan === plan.id
                      ? `bg-${plan.color}-500 text-white`
                      : `border-2 border-${plan.color}-500 text-${plan.color}-500 hover:bg-${plan.color}-500 hover:text-white`
                  }`}
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Choose Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-3xl shadow-lg p-12 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Join Our Community?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl text-white p-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">100K+</div>
              <div className="text-purple-200">Books Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-purple-200">Active Readers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-purple-200">Books Read</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9★</div>
              <div className="text-purple-200">User Rating</div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-lg mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">Yes, you can cancel your subscription at any time. No questions asked.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-lg mb-2">Do you offer a free trial?</h3>
              <p className="text-gray-600">Yes! All plans come with a 7-day free trial. No credit card required.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-lg mb-2">Can I switch plans later?</h3>
              <p className="text-gray-600">Absolutely! You can upgrade or downgrade your plan at any time from your account settings.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-lg mb-2">Is there a student discount?</h3>
              <p className="text-gray-600">Yes, we offer 50% off for students with a valid student ID. Contact support for details.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Reading?</h2>
          <p className="text-xl text-gray-600 mb-8">Join thousands of readers who have already discovered their next favorite book</p>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
            Start Your Free Trial
          </button>
          <p className="text-gray-500 mt-4">No credit card required • Cancel anytime</p>
        </div>
      </div>
    </div>
  )
}

export default Membership