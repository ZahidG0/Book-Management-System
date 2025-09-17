import React, { useState } from 'react'
import { FaDownload, FaEye, FaStar, FaFilter } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import SEO from '../components/SEO'
import ebooks from '../db/eBook'



const categories = ['All', 'Business', 'Technology', 'Self-Help', 'Arts']
const formats = ['All', 'PDF', 'EPUB']

const Ebooks = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedFormat, setSelectedFormat] = useState('All')
  const [sortBy, setSortBy] = useState('popular')
  const { addToCart } = useCart()

  const filteredBooks = ebooks
    .filter(book => selectedCategory === 'All' || book.category === selectedCategory)
    .filter(book => selectedFormat === 'All' || book.format === selectedFormat)
    .sort((a, b) => {
      if (sortBy === 'popular') return b.downloads - a.downloads
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      return 0
    })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SEO 
        title="Digital eBooks Library - BookClub | Download & Read Instantly"
        description="Browse thousands of digital eBooks across all genres. Download instantly in PDF and EPUB formats. Technology, Business, Self-Help books and more available now."
        keywords="ebooks, digital books, pdf books, epub books, instant download, online library, digital reading"
      />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Digital Library</h1>
          <p className="text-xl max-w-2xl mx-auto">Discover thousands of eBooks across various genres. Download instantly and read anywhere.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-600" />
              <span className="font-semibold">Filters:</span>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border rounded-lg px-3 py-2"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Format</label>
              <select 
                value={selectedFormat} 
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="border rounded-lg px-3 py-2"
              >
                {formats.map(format => <option key={format} value={format}>{format}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Sort By</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-lg px-3 py-2"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 text-lg">
            Showing {filteredBooks.length} eBook{filteredBooks.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* eBooks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book) => (
            <div key={book.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="relative">
                <img src={book.cover} alt={book.title} className="w-full h-48 object-cover" />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {book.format}
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-3">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                    {book.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-gray-800">{book.title}</h3>
                <p className="text-gray-600 mb-3">by {book.author}</p>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="font-semibold">{book.rating}</span>
                  </div>
                  <span className="text-gray-500 mx-2">•</span>
                  <span className="text-gray-600">{book.pages} pages</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-blue-600">${book.price}</span>
                  <div className="flex items-center text-gray-500">
                    <FaDownload className="mr-1" />
                    <span className="text-sm">{book.downloads.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                    <FaEye className="mr-2" />
                    Preview
                  </button>
                  <button 
                    onClick={() => addToCart({ id: book.id, title: book.title, authorName: book.author, price: book.price, imageURL: book.cover })}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <FaDownload className="mr-2" />
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-20 bg-white rounded-3xl shadow-lg p-12">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our eBooks?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Read Anywhere</h3>
              <p className="text-gray-600">Compatible with all devices - phone, tablet, computer</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Instant Download</h3>
              <p className="text-gray-600">Get your books immediately after purchase</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-semibold mb-2">Lifetime Access</h3>
              <p className="text-gray-600">Download and re-download anytime you want</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ebooks