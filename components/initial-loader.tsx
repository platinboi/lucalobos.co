"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SingleMorphText } from "@/components/ui/single-morph-text"

// Create a reliable global variable to track loading state
declare global {
  interface Window {
    isLoadingComplete?: boolean;
  }
}

export default function InitialLoader() {
  // Use null for all initial states to prevent hydration mismatches
  const [mounted, setMounted] = useState(false)
  const [phase, setPhase] = useState<null | 'initial' | 'morphing' | 'tagline' | 'complete'>(null)
  const [isVisible, setIsVisible] = useState(true)

  // Only run animations on the client side
  useEffect(() => {
    // Mark as mounted first
    setMounted(true)
    
    // Set global loading state to false initially
    if (typeof window !== 'undefined') {
      window.isLoadingComplete = false;
    }
    
    // Sequence the animations with precise timing for a polished experience
    const initialTimer = setTimeout(() => setPhase('initial'), 100) // Slight delay for initial render
    const morphTimer = setTimeout(() => setPhase('morphing'), 1000)  // Give more time to see the full name
    const taglineTimer = setTimeout(() => setPhase('tagline'), 1800) // Allow morphing to complete fully
    const completeTimer = setTimeout(() => {
      // Mark loading as complete globally first
      if (typeof window !== 'undefined') {
        window.isLoadingComplete = true;
      }
      
      // Then set the phase to complete
      setPhase('complete')
      
      // Add a small delay before hiding the loader to ensure smooth transition
      setTimeout(() => {
        setIsVisible(false)
      }, 200) // Increased for smoother transition
    }, 3000) // Allow more time to see and read the tagline
    
    // Clean up all timers
    return () => {
      clearTimeout(initialTimer)
      clearTimeout(morphTimer)
      clearTimeout(taglineTimer)
      clearTimeout(completeTimer)
    }
  }, [])

  // Don't render anything during SSR
  if (!mounted) return null
  
  // Hide if animation is complete and visibility is false
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.05] via-background to-background" />
      
      {/* Main content container */}
      <div className="relative z-10 text-center px-4 w-full max-w-md">
        {/* Fixed height container for all text phases */}
        <div className="h-24 md:h-32 flex items-center justify-center relative">
          {/* Container with fixed dimensions to ensure stable positioning */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Initial phase - full name */}
            {phase === 'initial' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground whitespace-nowrap">
                  Luca Lo Bosco
                </span>
              </motion.div>
            )}
            
            {/* Morphing phase */}
            {phase === 'morphing' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <SingleMorphText 
                  fromText="Luca Lo Bosco"
                  toText="L"
                  morphTime={0.8}
                  className="filter-none"
                  textClassName="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground whitespace-nowrap"
                />
              </div>
            )}
            
            {/* Tagline phase - just "L" */}
            {phase === 'tagline' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">
                  L
                </span>
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Tagline section */}
        <AnimatePresence>
          {phase === 'tagline' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="mt-6 sm:mt-8"
            >
              <div className="h-px w-20 sm:w-24 mx-auto bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground">
                The last &apos;L&apos; you should be taking
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

