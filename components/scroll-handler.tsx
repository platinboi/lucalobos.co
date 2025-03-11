'use client'

import { useEffect, useState, ReactNode } from 'react'

interface ScrollHandlerProps {
  children: ReactNode
}

export default function ScrollHandler({ children }: ScrollHandlerProps) {
  // Start with null to avoid hydration mismatch
  const [atTop, setAtTop] = useState<boolean | null>(null)

  useEffect(() => {
    // Set initial state only on the client side
    setAtTop(window.scrollY < 10)
    
    const handleScroll = () => {
      setAtTop(window.scrollY < 10)
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll)
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Only apply the padding when we have a client-side value
  return (
    <div className={`transition-all duration-300 ${atTop === null ? '' : atTop ? 'pt-[calc(3.5rem+3rem)]' : 'pt-[3rem]'}`}>
      {children}
    </div>
  )
} 