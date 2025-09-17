import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'

export const usePageTransition = () => {
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [location.pathname])

  return isLoading
}

export const useInitialLoad = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsInitialLoading(false)
  }

  return { isInitialLoading, handleLoadingComplete }
}