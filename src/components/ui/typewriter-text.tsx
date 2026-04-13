"use client"

import { useState, useEffect } from "react"

interface TypewriterTextProps {
  text: string
  delay?: number
  speed?: number
  onComplete?: () => void
  className?: string
}

export function TypewriterText({ 
  text, 
  delay = 0, 
  speed = 30, 
  onComplete, 
  className = "" 
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        setHasStarted(true)
      }, delay)
      return () => clearTimeout(delayTimer)
    } else {
      setHasStarted(true)
    }
  }, [delay])

  useEffect(() => {
    if (!hasStarted) return
    
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)
      return () => clearTimeout(timer)
    } else if (currentIndex === text.length && onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, hasStarted, onComplete])

  return <span className={className}>{displayedText}</span>
}

interface TypewriterLineProps {
  children: React.ReactNode
  delay?: number
  speed?: number
  onComplete?: () => void
  className?: string
}

export function TypewriterLine({ 
  children, 
  delay = 0, 
  speed = 30, 
  onComplete, 
  className = "" 
}: TypewriterLineProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  
  const text = typeof children === 'string' ? children : ''

  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        setHasStarted(true)
      }, delay)
      return () => clearTimeout(delayTimer)
    } else {
      setHasStarted(true)
    }
  }, [delay])

  useEffect(() => {
    if (!hasStarted) return
    
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)
      return () => clearTimeout(timer)
    } else if (currentIndex === text.length && onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, hasStarted, onComplete])

  return <div className={className}>{displayedText}</div>
}
