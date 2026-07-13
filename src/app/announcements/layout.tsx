import React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

// Same scoped-Geist approach as /case-studies: globals.css maps the site's
// `font-sans` / `font-mono` utilities to --font-geist-sans / --font-geist-mono,
// so defining those variables on this wrapper resolves the whole section to Geist.
const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: "Announcements — Source",
  description: "News and announcements from Source.",
}

export default function AnnouncementsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${geist.variable} ${geistMono.variable} min-h-screen bg-white font-sans text-black antialiased`}>
      {children}
    </div>
  )
}
