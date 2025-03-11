"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { GooeyText } from "@/components/ui/gooey-text-morphing"

export default function Hero() {
  // Hero is now always ready to animate, regardless of loader state
  const [mounted, setMounted] = useState(false)
  const [isReady, setIsReady] = useState(false)
  
  // Ensure client-side only rendering to prevent hydration errors
  useEffect(() => {
    setMounted(true)
    
    // Wait until loading is complete before starting animations
    if (typeof window !== 'undefined') {
      if (window.isLoadingComplete) {
        // Loading already complete, set ready after short delay
        setTimeout(() => setIsReady(true), 100);
      } else {
        // Set up an interval to check for loading completion
        const checkInterval = setInterval(() => {
          if (window.isLoadingComplete) {
            clearInterval(checkInterval);
            // Add a short delay after loading completes
            setTimeout(() => setIsReady(true), 100);
          }
        }, 100);
        
        return () => clearInterval(checkInterval);
      }
    }
  }, [])

  // Memoize the morphing texts to prevent unnecessary re-renders
  const morphingTexts = useMemo(() => [
    "Business Automation",
    "Web Development",
    "AI Consulting",
    "eCommerce Solutions",
    "Custom App Development",
    "Lead Generation"
  ], []);

  // Don't render during SSR
  if (!mounted) return null
  
  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-center pt-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isReady ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 text-center max-w-4xl mx-auto px-4"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={isReady ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-2"
        >
          <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full inline-block">
            Weaponized Caffeine Addiction
          </span>
        </motion.div>
        
        {/* Container for the morphing text */}
        <div className="h-24 md:h-32 flex justify-center items-center">
          <GooeyText
            texts={morphingTexts}
            morphTime={1}
            cooldownTime={2}
            className="w-full"
            textClassName="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground"
          />
        </div>
        <p className="text-lg md:text-xl text-secondary mx-auto max-w-3xl">
          Helping businesses and entrepreneurs automate, innovate, and stay ahead of the curve with custom AI solutions and tailored web
          applications.
        </p>
        <div className="pt-6">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.03] hover:shadow-lg rounded-full px-8 py-6 text-lg transition-all duration-300"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Work with me
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </motion.div>
    </section>
  )
}

