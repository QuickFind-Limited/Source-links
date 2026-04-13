import React from "react"
import type { Metadata, Viewport } from 'next'

import { Analytics } from '@vercel/analytics/next'
import './globals.css'

import { Space_Grotesk, JetBrains_Mono, Geist_Mono as V0_Font_Geist_Mono } from 'next/font/google'

// Initialize fonts
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })

const _spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: '--font-space-grotesk' });
const _jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: '--font-jetbrains-mono' });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  title: 'Source — AI for Professional Services',
  description: 'AI for the professional services industry.',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Source',
    description: 'AI for the professional services industry.',
    siteName: 'Source',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Source — AI Migration Dashboard',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Source',
    description: 'AI for the professional services industry.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_spaceGrotesk.variable} ${_jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
