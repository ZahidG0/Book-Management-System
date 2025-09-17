import { createContext, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../utils/baseURL";

const BookContext = createContext();

export const BookProvider = ({ children }) => {

    const [books, setBooks] = useState([]);
    const [currentBook, setCurrentBook] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        // limit: 0 means no limit (request all items) — server treats 0 as no-limit
        limit: 8,
        page: 1,
        sortBy: "title",
        genre: "",
        minYear: "",
        maxYear: "",
        author: "",
        minPrice: 0,
        maxPrice: 1000,
        search: "",
        order: "asc",
    });

    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
    });

    // এখানে আপনার বই সংক্রান্ত ফাংশনগুলো থাকতে পারে
    // যেমন: addBook, updateBook, deleteBook, book ইত্যাদি

    // Fetch books from the backend when the component mounts
    const fetchBooks = useCallback(async () => {
        setLoading(true);
        setError(null);
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value === "" || value === null || value === undefined) {
                params.delete(key);
            } else {
                params.append(key, value);
            }
        });
        // Debug: log the outgoing request URL
        const requestUrl = `${BASE_URL}/books?${params.toString()}`;
        console.debug('[BookContext] fetching books from:', requestUrl, 'filters:', filters);
        try {
            const response = await axios.get(requestUrl);
            const data = response.data;
            console.debug('[BookContext] server response count:', data && data.count, 'books.length:', data && data.books && data.books.length);
            if (Array.isArray(data.books)) {
                setBooks(data.books);
                setPagination({
                    currentPage: data.currentPage,
                    totalPages: data.totalPages,
                    totalItems: data.totalCount,
                });
            } else {
                setBooks([]);
            }
        } catch (error) {
            console.error("Error fetching books:", error);
            setBooks([]);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    const updateFilters = useCallback((newFilters) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...newFilters,
            page: Object.prototype.hasOwnProperty.call(newFilters, "page") ? newFilters.page : 1, // Reset to page 1 if other filters change
        }));
    }, []);

    // Fetch books details
    const fetchBookDetails = useCallback(async (bookId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${BASE_URL}/books/${bookId}`);
            const data = response.data;
            // server returns { message, book }
            if (data && data.book) {
                setCurrentBook(data.book);
            } else {
                setCurrentBook(null);
            }
        } catch (error) {
            console.error("Error fetching book details:", error);
            setCurrentBook(null);
        } finally {
            setLoading(false);
        }
    }, []);

    // Call fetchBooks when the component mounts
    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    // Book Details Page
    const addBook = (book) => {
        // send to server and refresh list
        (async () => {
            try {
                setLoading(true);
                const res = await axios.post(`${BASE_URL}/books`, book);
                if (res.status === 201) {
                    // refresh list from server
                    fetchBooks();
                }
            } catch (err) {
                console.error('Error adding book', err);
            } finally {
                setLoading(false);
            }
        })();
    };

    const updateBook = (updatedBook) => {
        setBooks(books.map((book) => (book._id === updatedBook._id ? updatedBook : book)));
    };

    const deleteBook = (bookId) => {
        setBooks(books.filter((book) => book._id !== bookId));
    };

    const value = { books, addBook, updateBook, deleteBook, currentBook, setCurrentBook, loading, setLoading, error, setError, filters, setFilters, pagination, setPagination, fetchBooks, updateFilters, fetchBookDetails };
    return (
        <BookContext.Provider value={value}>
            {children}
        </BookContext.Provider>
    );
}

export const useBookContext = () => {
    const context = useContext(BookContext);
    if (!context) {
        throw new Error("useBookContext must be used within a BookProvider");
    }
    return context;
};
