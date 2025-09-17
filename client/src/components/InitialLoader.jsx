import React, { useState, useEffect } from 'react'

const InitialLoader = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            setIsVisible(false)
            setTimeout(() => onLoadingComplete(), 200)
          }, 300)
          return 100
        }
        return prev + 2
      })
    }, 30)

    return () => clearInterval(timer)
  }, [onLoadingComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-amber-600 via-orange-500 to-amber-700">
      <div className="text-center">
        {/* ZH Logo */}
        <div className="relative mb-8">
          <div className="text-8xl font-bold text-white animate-pulse">
            <span className="inline-block animate-bounce" style={{ animationDelay: '0ms' }}>Z</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '200ms' }}>H</span>
          </div>
          <div className="absolute inset-0 text-8xl font-bold text-white/30 blur-sm">
            ZH
          </div>
        </div>

        {/* Loading Bar */}
        <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Loading Text */}
        <p className="text-white/80 mt-4 text-lg font-medium">
          Loading... {progress}%
        </p>
      </div>
    </div>
  )
}

export default InitialLoader