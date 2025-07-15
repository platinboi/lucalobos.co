"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [atTop, setAtTop] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 10)
      setAtTop(scrollY < 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      } ${atTop ? "top-[3.5rem]" : "top-0"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-xl font-semibold text-foreground">
            lucalobos.co
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8">
              <button 
                onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Experience
              </button>
              <button 
                onClick={() => document.getElementById('featured-projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Projects
              </button>
              <button 
                onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Tools
              </button>
              <button 
                onClick={() => document.getElementById('values')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Core Values
              </button>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Contact
              </button>
            </nav>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="text-foreground" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 dark:bg-background/95 backdrop-blur-md border-t border-border"
          >
            <div className="px-4 py-6 space-y-4">
              <button
                onClick={() => {
                  setIsOpen(false)
                  setTimeout(() => {
                    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
                  }, 100)
                }}
                className="block text-lg font-medium text-foreground hover:text-primary transition-colors w-full text-left"
              >
                Experience
              </button>
              <button
                onClick={() => {
                  setIsOpen(false)
                  setTimeout(() => {
                    document.getElementById('featured-projects')?.scrollIntoView({ behavior: 'smooth' })
                  }, 100)
                }}
                className="block text-lg font-medium text-foreground hover:text-primary transition-colors w-full text-left"
              >
                Projects
              </button>
              <button
                onClick={() => {
                  setIsOpen(false)
                  setTimeout(() => {
                    document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })
                  }, 100)
                }}
                className="block text-lg font-medium text-foreground hover:text-primary transition-colors w-full text-left"
              >
                Tools
              </button>
              <button
                onClick={() => {
                  setIsOpen(false)
                  setTimeout(() => {
                    document.getElementById('values')?.scrollIntoView({ behavior: 'smooth' })
                  }, 100)
                }}
                className="block text-lg font-medium text-foreground hover:text-primary transition-colors w-full text-left"
              >
                Core Values
              </button>
              <button
                onClick={() => {
                  setIsOpen(false)
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                  }, 100)
                }}
                className="block text-lg font-medium text-foreground hover:text-primary transition-colors w-full text-left"
              >
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

