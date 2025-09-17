import React, { useEffect } from 'react'
import { useBookContext } from "../context/BookContext";
import { useCart } from '../context/CartContext';
import { Link } from 'react-router';
import CategoryNav from './CategoryNav';
import Loading from '../components/Loading';
import SortBooks from './SortBooks';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
import { FaShoppingCart } from 'react-icons/fa';
import SEO from '../components/SEO';
import axios from 'axios';
import BASE_URL from './../../utils/baseURL';


const Shop = () => {
  const { books, loading, error, pagination = {}, fetchBooks, filters = {}, updateFilters } = useBookContext();
  const { addToCart } = useCart();

  // Category Name For Filtering
  const categories = [
    'All Collections',
    'Fiction',
    'Adventure',
    'Romance',
    'Dystopian',
    'Historical',
    'Non-Fiction',
  ];

  useEffect(() => {
    fetchBooks();
  }, [filters, fetchBooks]);


  const handleCategoryChange = (category) => {
    updateFilters({
      genre: category === 'All Collections' ? '' : category,
      page: 1
    });
  };

  const handleSortChange = (sortConfig) => {
    updateFilters({
      sortBy: sortConfig.sortBy,
      order: sortConfig.order,
      page: 1
    });
  };

  const handlePageChange = (newPage) => {
    updateFilters({ page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete Book
  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`${BASE_URL}/books/${bookId}`);
      alert('Book deleted successfully');
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
      const errorMessage = error.response?.data?.message || 'Failed to delete book';
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <SEO 
        title="Book Shop - BookClub | Buy Books Online with Best Prices"
        description="Shop from our vast collection of books across all genres. Fiction, Adventure, Romance, Non-Fiction and more. Best prices, fast delivery, and easy returns."
        keywords="buy books online, book shop, fiction books, adventure books, romance books, book store"
      />
      <div>
        {/* Category Navigation */}
        <div className='container mx-auto flex flex-wrap bg-gray-50 justify-between items-center mb-6 px-6 py-3 shadow-md rounded-lg'>
          <CategoryNav categories={categories} activeCategory={filters.genre || 'All Collections'} onCategoryChange={handleCategoryChange} />
          <SortBooks currentSort={filters} onSortChange={handleSortChange} />

        </div>
        <div className='flex flex-col justify-center items-center'>
          {loading && <Loading />}
          {error && <p className="text-red-500">Error: {error}</p>}
          {!loading && !error && books.length === 0 && <p>No books found.</p>}
        </div>
        {
          books.length > 0 && !loading && !error && (
            <div>
              {/* Result Summary */}
              <div className='mb-4 text-gray-700 text-2xl font-semibold'>
                {(() => {
                  const total = pagination.totalItems || 0;
                  const pageLimit = filters.limit > 0 ? filters.limit : total;
                  const start = total === 0 ? 0 : (pagination.currentPage - 1) * (pageLimit || 1) + 1;
                  const end = total === 0 ? 0 : Math.min(pagination.currentPage * (pageLimit || 1), total);
                  return `Showing ${start}-${end} of ${total} Books`;
                })()}
              </div>

              {/* Book Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {books.map((book) => (
                  <div key={book._id} className="bg-yellow-50 rounded-lg shadow-lg p-4 hover:scale-y-105 transition-transform duration-500">
                    <div className="relative group">
                      {/* image - external urls use anchor, internal use Link */}
                      {/^https?:\/\//i.test(book.bookUrl) ? (
                        <a href={book.bookUrl} target="_blank" rel="noopener noreferrer" className="block">
                          <img src={book.imageUrl} alt={book.title} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" />
                        </a>
                      ) : (
                        <Link to={book.bookUrl} className="block">
                          <img src={book.imageUrl} alt={book.title} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" />
                        </Link>
                      )}

                      {/* overlay shown on hover */}
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <Link to={`/books/${book._id}`} className="bg-amber-500 text-white py-2 px-4 rounded z-20">
                          View Details
                        </Link>
                      </div>

                      <div className="p-4">
                        <h3 className="text-lg font-semibold">{book.title}</h3>
                        <p className="text-gray-600">{book.author}</p>
                        <p className="text-gray-600">{book.genre}</p>
                      </div>
                    </div>
                    <div className="px-4 pb-4">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-amber-500 font-bold">${book.price.toFixed(2)}</p>
                        <div className='flex space-x-2'>
                          <Link to={`/books/edit/${book._id}`} className="text-amber-500 hover:underline text-sm">Edit</Link>
                          <button onClick={() => handleDeleteBook(book._id)} className="text-red-500 hover:underline cursor-pointer text-sm">Delete</button>
                        </div>
                      </div>
                      <button 
                        onClick={() => addToCart({ id: book._id, title: book.title, authorName: book.author, price: book.price, imageURL: book.imageUrl })}
                        className="w-full bg-amber-500 text-white py-2 px-4 rounded-lg hover:bg-amber-600 transition-colors flex items-center justify-center space-x-2"
                      >
                        <FaShoppingCart className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        }
      </div>

      {/* Pagination Controls */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className=" p-2 bg-amber-500 text-white rounded-full text-2xl hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
          >
            <MdOutlineArrowBackIos />
          </button>
          <span className="text-gray-700 text-2xl font-semibold">
            Page <span className='bg-gray-300 border border-white px-2'>{pagination.currentPage}</span> of <span className='bg-gray-300 border border-white px-2'>{pagination.totalPages}</span>
          </span>
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className="p-2 bg-amber-500 text-white rounded-full text-2xl hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
          >
            <MdOutlineArrowForwardIos />
          </button>
        </div>
      )}

    </div>
  )
}

export default Shop