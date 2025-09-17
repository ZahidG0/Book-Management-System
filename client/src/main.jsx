import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Cart from './pages/Cart.jsx'
import NotFound from './components/NotFound.jsx'
import Ebooks from './pages/Ebooks.jsx';
import Membership from './pages/Membership.jsx';
import AddBook from './pages/AddBook.jsx';
import Shop from './shop/Shop';
import BookDetails from './shop/BookDetails.jsx'
import EditBook from './pages/EditBook.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />} >
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/ebooks" element={<Ebooks />} />
        <Route path="/books" element={<Shop />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/books/add" element={<AddBook />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>,
)
