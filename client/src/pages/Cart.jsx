import React from 'react'
import { useCart } from '../context/CartContext'
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa'
import SEO from '../components/SEO'

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <SEO 
          title="Shopping Cart - BookClub | Your Selected Books"
          description="Review your selected books and proceed to checkout. Secure payment, fast delivery, and easy returns on all book purchases."
          keywords="shopping cart, book checkout, buy books, book payment"
        />
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some books to get started!</p>
            <a 
              href="/books" 
              className="inline-block bg-amber-500 text-white px-8 py-3 rounded-lg hover:bg-amber-600 transition-colors font-semibold"
            >
              Browse Books
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO 
        title={`Shopping Cart (${items.length} items) - BookClub | Checkout Your Books`}
        description={`You have ${items.length} book${items.length !== 1 ? 's' : ''} in your cart. Total: $${totalPrice.toFixed(2)}. Proceed to secure checkout now.`}
        keywords="shopping cart, book checkout, buy books, book payment, secure checkout"
      />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
            <button 
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Clear Cart
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {items.map((item) => (
              <div key={item.id} className="flex items-center p-6 border-b border-gray-200 last:border-b-0">
                <img 
                  src={item.imageURL || '/assets/banner.webp'} 
                  alt={item.title}
                  className="w-20 h-28 object-cover rounded-lg mr-6"
                />
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-gray-600 mb-2">{item.authorName}</p>
                  <p className="text-amber-600 font-bold text-lg">${item.price}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      <FaMinus className="w-3 h-3" />
                    </button>
                    <span className="w-12 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      <FaPlus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</span>
            </div>
            
            <div className="flex space-x-4">
              <a 
                href="/books"
                className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg text-center hover:bg-gray-300 transition-colors font-semibold"
              >
                Continue Shopping
              </a>
              <button className="flex-1 bg-amber-500 text-white py-3 px-6 rounded-lg hover:bg-amber-600 transition-colors font-semibold">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart