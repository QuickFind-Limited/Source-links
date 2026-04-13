"use client"

import { cn } from "@/lib/utils"

interface DitherOverlayProps {
  className?: string
  intensity?: "light" | "medium" | "heavy"
  inverted?: boolean
}

export function DitherOverlay({ className, intensity = "light", inverted = false }: DitherOverlayProps) {
  const opacityMap = {
    light: "opacity-[0.03]",
    medium: "opacity-[0.06]",
    heavy: "opacity-[0.1]"
  }

  // Black dither for light backgrounds, white for dark backgrounds
  const ditherColor = inverted ? "%23fff" : "%23000"

  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none",
        opacityMap[intensity],
        className
      )}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='1' height='1' fill='${ditherColor}'/%3E%3Crect x='2' y='2' width='1' height='1' fill='${ditherColor}'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat"
      }}
      aria-hidden="true"
    />
  )
}

export function GrainOverlay({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "fixed inset-0 pointer-events-none z-50 opacity-[0.06] animate-grain",
        className
      )}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        width: "200%",
        height: "200%",
        top: "-50%",
        left: "-50%"
      }}
      aria-hidden="true"
    />
  )
}
