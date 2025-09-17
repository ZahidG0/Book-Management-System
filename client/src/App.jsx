import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './components/Navbar'
import { BookProvider } from './context/BookContext'
import { CartProvider } from './context/CartContext'
import Footer from './components/Footer'
import InitialLoader from './components/InitialLoader'
import { ZHLoader } from './components/NavigationLoader'
import { usePageTransition, useInitialLoad } from './hooks/usePageTransition'

const App = () => {
  const { isInitialLoading, handleLoadingComplete } = useInitialLoad()
  const isPageLoading = usePageTransition()

  if (isInitialLoading) {
    return <InitialLoader onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <div>
      <BookProvider>
        <CartProvider>
          {isPageLoading && <ZHLoader />}
          <Navbar />
          <main className='mx-auto p-4 min-h-[calc(100vh-100px)] mt-16'>
            <Outlet />
          </main>
          <Footer />
        </CartProvider>
      </BookProvider>
    </div>
  )
}

export default App