import React from 'react'

const NavigationLoader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 h-1 bg-gradient-to-r from-amber-500 to-orange-500">
      <div className="h-full bg-gradient-to-r from-white/50 to-transparent animate-pulse" />
    </div>
  )
}

export const ZHLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center animate-spin">
          <div className="text-2xl font-bold text-white">
            ZH
          </div>
        </div>
        <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-amber-200 animate-pulse" />
      </div>
    </div>
  )
}

export default NavigationLoader