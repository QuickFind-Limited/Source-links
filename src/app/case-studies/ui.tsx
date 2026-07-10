import Link from "next/link"
import { DitherOverlay } from "@/components/landing/dither-overlay"

export const CAL_LINK = "https://cal.com/source-ai/30min"

/* ── Section chrome ─────────────────────────────────────────────────────── */

export function CsHeader() {
  return (
    <header className="mx-auto flex w-full max-w-[1320px] items-center justify-between px-6 pt-8 sm:px-10 lg:pt-10">
      <Link href="/" aria-label="Source — home">
        <img src="/source-mark.svg" alt="Source" className="h-10 w-auto select-none md:h-12" />
      </Link>
      <nav className="flex items-center gap-5 sm:gap-7">
        <Link
          href="/case-studies"
          className="text-sm font-medium text-black transition-colors"
        >
          Case Studies
        </Link>
        <a
          href="/careers"
          className="text-sm text-black/45 transition-colors hover:text-black"
        >
          Careers
        </a>
      </nav>
    </header>
  )
}

export function CsFooter() {
  return (
    <footer className="mx-auto mt-24 w-full max-w-[1320px] px-6 pb-12 sm:px-10 lg:mt-28">
      <div className="h-px w-full bg-black/[0.07]" />
      <div className="flex flex-col gap-2 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-black/40">
          © {new Date().getFullYear()} Source — QuickFind AI
        </p>
        <a
          href={CAL_LINK}
          target="_blank"
          rel="noreferrer"
          className="text-[13px] text-black/40 transition-colors hover:text-black"
        >
          Book an intro call →
        </a>
      </div>
    </footer>
  )
}

/* ── Banner — photo when provided, else dark Source × client lockup ─────── */

export function CaseBanner({
  client,
  image,
  compact = false,
}: {
  client: string
  image?: string
  compact?: boolean
}) {
  if (image) {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-[6px] bg-[#0a0a0a] ${
          compact ? "aspect-[3.2/1]" : "aspect-[16/9] sm:aspect-[2.15/1]"
        }`}
      >
        <img
          src={image}
          alt={`${client} — case study`}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    )
  }
  return (
    <div
      className={`relative w-full overflow-hidden rounded-[6px] bg-[#0a0a0a] ${
        compact ? "aspect-[3.2/1]" : "aspect-[2.15/1] max-sm:aspect-[1.6/1]"
      }`}
    >
      {/* Layered grayscale glow, echoing the banded gradient of the design */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 34%, rgba(255,255,255,0.07) 35%, rgba(255,255,255,0.01) 62%, rgba(255,255,255,0.05) 63%, rgba(0,0,0,0) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 18% 108%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 55%), radial-gradient(90% 70% at 88% -12%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 50%)",
        }}
      />
      <DitherOverlay inverted intensity="medium" />
      <div
        className={`absolute inset-0 flex items-center justify-center px-8 text-white ${
          compact ? "gap-4 sm:gap-6" : "gap-5 sm:gap-8"
        }`}
      >
        <span
          className={`font-medium tracking-[-0.02em] ${
            compact ? "text-xl sm:text-2xl" : "text-2xl sm:text-4xl"
          }`}
        >
          Source
        </span>
        <span className={`text-white/35 ${compact ? "text-lg sm:text-xl" : "text-xl sm:text-3xl"}`}>×</span>
        <span
          className={`text-center font-medium tracking-[-0.02em] text-white/85 ${
            compact ? "text-xl sm:text-2xl" : "text-2xl sm:text-4xl"
          }`}
        >
          {client}
        </span>
      </div>
    </div>
  )
}

/* ── Quote card — bordered figure with the oversized quote glyph ────────── */

export function QuoteCard({ text, attribution }: { text: string; attribution: string }) {
  return (
    <figure className="flex max-w-[640px] flex-col gap-3 rounded-[4px] border border-black/80 p-4">
      <svg
        className="h-6 w-[30px] rotate-180"
        viewBox="0 0 30.012 24.008"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M 4.689 0 L 13.482 0 L 13.482 8.84 C 13.482 16.005 8.206 21.495 2.227 24.008 L 0 21.961 C 3.165 19.076 4.689 15.354 4.689 9.026 Z M 21.219 0 L 30.012 0 L 30.012 8.84 C 30.012 16.005 24.736 21.495 18.757 24.008 L 16.53 21.961 C 19.695 19.076 21.219 15.354 21.219 9.026 Z"
          fill="currentColor"
        />
      </svg>
      <blockquote className="text-balance text-xl leading-[1.25] tracking-[-0.02em] text-black">
        {text}
      </blockquote>
      <figcaption className="text-sm font-medium text-black/60">{attribution}</figcaption>
    </figure>
  )
}
