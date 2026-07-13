"use client"

import React, { useEffect, useRef, useState } from "react"

/**
 * Scroll-entrance wrapper for the case-studies/announcements pages — the same
 * fade + rise + de-blur language as the homepage manifesto words.
 *
 * SSR-visible by design: the server renders content shown, and only after
 * mount do below-viewport elements get hidden and observed, so no-JS clients,
 * crawlers, and broken webviews always see the content. Animates once.
 */
type Phase = "visible" | "hidden" | "revealed"

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<Phase>("visible")

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // Elements already in (or near) the first viewport stay visible — only
    // below-the-fold content takes part in the scroll entrance.
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight - 40) return

    setPhase("hidden")
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setPhase("revealed")
          io.disconnect()
        }
      },
      { rootMargin: "-60px 0px" }
    )
    io.observe(el)
    // Failsafe: never leave content hidden if the observer misbehaves.
    const failsafe = setTimeout(() => setPhase("revealed"), 4000)
    return () => {
      io.disconnect()
      clearTimeout(failsafe)
    }
  }, [])

  const hidden = phase === "hidden"
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? "translateY(0.75rem)" : "none",
        filter: hidden ? "blur(4px)" : "none",
        transition:
          phase === "revealed"
            ? `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s, filter 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s`
            : undefined,
      }}
    >
      {children}
    </div>
  )
}
