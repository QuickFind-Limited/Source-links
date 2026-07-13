import React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

// Scoped to the case-studies section: globals.css maps the site's `font-sans`
// and `font-mono` utilities to --font-geist-sans / --font-geist-mono, so
// defining those variables on this wrapper resolves every descendant to Geist.
const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: "Case Studies — Source",
  description:
    "How operationally heavy businesses use Source to modernise their ERP estates — in weeks, not months, at a fixed cost.",
}

export default function CaseStudiesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${geist.variable} ${geistMono.variable} min-h-screen bg-white font-sans text-black antialiased`}>
      {children}
    </div>
  )
}
