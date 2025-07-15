"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

// Create a reliable global variable to track loading state
declare global {
  interface Window {
    isLoadingComplete?: boolean;
  }
}

export default function InitialLoader() {
  const [mounted, setMounted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    setMounted(true)
    
    // Set global loading state to false initially
    if (typeof window !== 'undefined') {
      window.isLoadingComplete = false;
    }
    
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          // Mark loading as complete
          if (typeof window !== 'undefined') {
            window.isLoadingComplete = true;
          }
          // Hide loader after completion
          setTimeout(() => {
            setIsVisible(false)
          }, 500)
          return 100
        }
        // Smooth progress increment with some randomness
        return prev + Math.random() * 8 + 2
      })
    }, 100)
    
    return () => clearInterval(progressInterval)
  }, [])

  // Always render for immediate display - remove SSR blocking
  
  // Hide if loading is complete and visibility is false
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.05] via-background to-background" />
      
      {/* Main content container */}
      <div className="relative z-10 text-center px-4 w-full max-w-md">
        {/* Logo/Brand name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-foreground mb-4">
            Luca Lo Bosco
          </h1>
          <p className="text-secondary text-lg">
            Loading portfolio...
          </p>
        </motion.div>
        
        {/* Loading bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-full"
        >
          {/* Progress bar background */}
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            {/* Progress bar fill */}
            <motion.div 
              className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          
          {/* Progress percentage */}
          <motion.p 
            className="text-sm text-secondary mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Math.round(progress)}%
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}