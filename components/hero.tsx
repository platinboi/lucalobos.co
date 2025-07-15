"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { GooeyText } from "@/components/ui/gooey-text-morphing"

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [isReady, setIsReady] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    
    // Wait until loading is complete before starting animations
    if (typeof window !== 'undefined') {
      if (window.isLoadingComplete) {
        setTimeout(() => setIsReady(true), 200);
      } else {
        const checkInterval = setInterval(() => {
          if (window.isLoadingComplete) {
            clearInterval(checkInterval);
            setTimeout(() => setIsReady(true), 200);
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
        className="space-y-8 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={isReady ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-2"
        >
          <span className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-full inline-block">
            Weaponized Caffeine Addiction
          </span>
        </motion.div>
        
        {/* Container for the morphing text */}
        <div className="h-40 md:h-48 lg:h-56 px-8 flex justify-center items-center">
          <GooeyText
            texts={morphingTexts}
            morphTime={1}
            cooldownTime={2}
            className="w-full"
            textClassName="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-light text-foreground leading-none"
          />
        </div>
        <p className="text-editorial-body text-secondary max-w-4xl mx-auto">
          Helping businesses and entrepreneurs automate, innovate, and stay ahead of the curve with custom AI solutions and tailored web
          applications.
        </p>
        <div className="pt-8 flex justify-center">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg rounded-full px-10 py-4 text-lg font-medium transition-all duration-300"
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

