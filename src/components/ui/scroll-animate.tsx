"use client"

import { useEffect, useRef, useState, ReactNode } from "react"

interface ScrollAnimateProps {
  children: ReactNode
  className?: string
  animation?: "fade-up" | "fade-in" | "fade-left" | "fade-right" | "zoom-in" | "scale-up"
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
}

export function ScrollAnimate({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  duration = 600,
  threshold = 0.1,
  once = true,
}: ScrollAnimateProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) {
            observer.unobserve(element)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before element is fully in view
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, once])

  const baseStyles: React.CSSProperties = {
    transitionProperty: "opacity, transform",
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    transitionDelay: `${delay}ms`,
  }

  const animations = {
    "fade-up": {
      hidden: { opacity: 0, transform: "translateY(30px)" },
      visible: { opacity: 1, transform: "translateY(0)" },
    },
    "fade-in": {
      hidden: { opacity: 0, transform: "none" },
      visible: { opacity: 1, transform: "none" },
    },
    "fade-left": {
      hidden: { opacity: 0, transform: "translateX(-30px)" },
      visible: { opacity: 1, transform: "translateX(0)" },
    },
    "fade-right": {
      hidden: { opacity: 0, transform: "translateX(30px)" },
      visible: { opacity: 1, transform: "translateX(0)" },
    },
    "zoom-in": {
      hidden: { opacity: 0, transform: "scale(0.95)" },
      visible: { opacity: 1, transform: "scale(1)" },
    },
    "scale-up": {
      hidden: { opacity: 0, transform: "scale(0.9) translateY(20px)" },
      visible: { opacity: 1, transform: "scale(1) translateY(0)" },
    },
  }

  const currentAnimation = animations[animation]
  const animationStyles = isVisible ? currentAnimation.visible : currentAnimation.hidden

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...baseStyles, ...animationStyles }}
    >
      {children}
    </div>
  )
}

// Staggered children animation wrapper
interface ScrollStaggerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  threshold?: number
}

export function ScrollStagger({
  children,
  className = "",
  staggerDelay = 100,
  threshold = 0.1,
}: ScrollStaggerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -30px 0px",
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold])

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div
              key={index}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 500ms ease-out, transform 500ms ease-out`,
                transitionDelay: isVisible ? `${index * staggerDelay}ms` : "0ms",
              }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  )
}
