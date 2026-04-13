"use client"

import { cn } from "@/lib/utils"
import { AsciiDivider, MetadataBar } from "./ascii-decoration"
import { DitherOverlay } from "./dither-overlay"
import { ScrollAnimate, ScrollStagger } from "@/components/ui/scroll-animate"

const features = [
  {
    number: "01",
    title: "INSTANT ANALYSIS",
    description: "Get comprehensive business insights in seconds, not weeks. Our AI processes data faster than any human consultant.",
    ascii: `┌──────┐
│ ▓▓▓▓ │
│ ▓▓▓▓ │
│ ░░░░ │
└──────┘`
  },
  {
    number: "02",
    title: "ALWAYS AVAILABLE",
    description: "No scheduling conflicts. No waiting for callbacks. Your AI consultant is ready 24/7, 365 days a year.",
    ascii: `┌──────┐
│ ○    │
│  ╲   │
│   ○  │
└──────┘`
  },
  {
    number: "03",
    title: "ZERO OVERHEAD",
    description: "No travel expenses. No hourly billing surprises. One flat rate for unlimited strategic advice.",
    ascii: `┌──────┐
│ $$$$ │
│ ──── │
│ FREE │
└──────┘`
  },
  {
    number: "04",
    title: "DATA-DRIVEN",
    description: "Every recommendation backed by analysis, not gut feelings. Transparent reasoning you can verify.",
    ascii: `┌──────┐
│ ╔══╗ │
│ ║██║ │
│ ╚══╝ │
└──────┘`
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="relative bg-black text-white py-24 px-6 overflow-hidden">
      <DitherOverlay intensity="medium" className="mix-blend-overlay" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <ScrollAnimate animation="fade-up" duration={600}>
        <div className="mb-16">
          <MetadataBar
            items={[
              { label: "SECTION", value: "02" },
              { label: "TYPE", value: "CAPABILITIES" }
            ]}
            inverted
            className="mb-6"
          />
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            WHY SWITCH TO AI?
          </h2>
          <p className="mt-4 text-white/60 font-mono max-w-xl">
            Traditional consulting is broken. Expensive, slow, and often biased.
            Here&apos;s how we&apos;re different.
          </p>
        </div>
        </ScrollAnimate>
        
        <AsciiDivider inverted className="mb-12" />
        
        {/* Features grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <ScrollAnimate key={feature.number} animation="fade-up" duration={500} delay={i * 100}>
            <div
              className={cn(
                "group relative border border-white/20 p-6 hover:border-white/40 transition-colors"
              )}
            >
              {/* Feature number */}
              <div className="absolute -top-3 left-4 bg-black px-2 font-mono text-xs text-white/40">
                [{feature.number}]
              </div>
              
              {/* ASCII decoration */}
              <pre className="font-mono text-xs text-white/20 mb-4 leading-none hidden sm:block" aria-hidden="true">
                {feature.ascii}
              </pre>
              
              <h3 className="text-xl font-bold tracking-tight mb-3">
                {feature.title}
              </h3>
              <p className="text-white/60 font-mono text-sm leading-relaxed">
                {feature.description}
              </p>
              
              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-white/20 group-hover:border-white/40 transition-colors" />
            </div>
            </ScrollAnimate>
          ))}
        </div>
        
        {/* Bottom comparison */}
        <ScrollAnimate animation="fade-up" duration={600}>
        <div className="mt-24">
          <h3 className="text-2xl font-bold tracking-tight mb-8 text-center">
            THE COMPARISON
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Traditional consultant */}
            <div className="border border-white/10 p-6 bg-white/5">
              <div className="font-mono text-xs text-white/40 mb-4">TRADITIONAL CONSULTANT</div>
              <ul className="space-y-3 font-mono text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-white/40">[-]</span>
                  <span className="text-white/60">$200-$500 per hour</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/40">[-]</span>
                  <span className="text-white/60">Weeks for initial analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/40">[-]</span>
                  <span className="text-white/60">Limited availability</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/40">[-]</span>
                  <span className="text-white/60">Subjective opinions</span>
                </li>
              </ul>
            </div>
            
            {/* AI consultant */}
            <div className="border border-white p-6">
              <div className="font-mono text-xs text-white/60 mb-4">AI CONSULTANT</div>
              <ul className="space-y-3 font-mono text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-white">[+]</span>
                  <span>Flat monthly rate</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white">[+]</span>
                  <span>Instant responses</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white">[+]</span>
                  <span>24/7 availability</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white">[+]</span>
                  <span>Data-driven insights</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        </ScrollAnimate>
      </div>
    </section>
  )
}
