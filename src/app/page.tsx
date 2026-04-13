"use client"

import { GrainOverlay } from "@/components/landing/dither-overlay"

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-neutral-50 flex items-center justify-center overflow-hidden">
      <GrainOverlay />

      {/* Coolvetica font */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.cdnfonts.com/css/coolvetica"
        rel="stylesheet"
      />

      {/* Source mark — top center */}
      <img
        src="/source-mark.svg"
        alt=""
        aria-hidden="true"
        className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-16 opacity-15 select-none pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* Source logo in Coolvetica */}
        <h1
          className="text-6xl md:text-7xl lg:text-8xl text-black select-none"
          style={{ fontFamily: "'Coolvetica', sans-serif", letterSpacing: '0.02em' }}
        >
          Source
        </h1>

        <p className="font-mono text-base tracking-widest text-black/35 uppercase">
          AI for the professional services industry
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-6" style={{ marginTop: '0.5rem' }}>
          <a
            href="https://cal.com/source-ai"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-lg md:text-xl tracking-wider text-black/60 hover:text-black transition-colors underline underline-offset-4 decoration-black/15"
          >
            Talk to us
          </a>
        </div>
      </div>

      {/* LinkedIn icon — bottom right */}
      <a
        href="https://www.linkedin.com/company/ai-source/"
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-6 right-6 z-10 text-black/20 hover:text-black/60 transition-colors"
      >
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </a>
    </main>
  )
}
