"use client"

import { GrainOverlay } from "@/components/landing/dither-overlay"

export default function EnterprisePage() {
  return (
    <main className="relative min-h-screen bg-neutral-50">
      <GrainOverlay />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between bg-neutral-50/80 backdrop-blur-sm border-b border-black/5">
        <a 
          href="/" 
          className="font-mono text-2xl font-bold tracking-tight text-black transition-all hover:text-white hover:[text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]"
        >
          Source.
        </a>
        
        <div className="flex items-center gap-4">
          <a
            href="/careers"
            className="font-mono text-xs tracking-wider text-black/60 hover:text-black transition-colors"
          >
            CAREERS
          </a>
          <a
            href="mailto:liam@source.shop"
            className="px-4 py-2 bg-black text-white font-mono text-xs tracking-wider hover:bg-black/90 transition-colors"
          >
            CONTACT
          </a>
        </div>
      </header>

      {/* Main Content */}
      <section className="relative pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Label */}
          <div className="font-mono text-[10px] tracking-widest text-black/40 mb-8">
            FOR ERP PROVIDERS
          </div>
          
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight mb-8">
            Migration at Scale
          </h1>
          
          {/* Description */}
          <p className="font-mono text-base text-black/50 max-w-xl mb-16 leading-relaxed">
            Any system, any customer—Source can handle them. 
            Onboard customers in days, not months. Cut onboarding time down and scale your business without scaling headcount.
          </p>

          {/* Divider */}
          <div className="border-t border-black/10 mb-16" />

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="font-mono text-[10px] tracking-widest text-black/40 mb-4">
                01
              </div>
              <h3 className="text-xl font-normal tracking-tight mb-3">
                Scale Without Headcount
              </h3>
              <p className="font-mono text-sm text-black/50 leading-relaxed">
                Migrate hundreds of customers without hiring more implementation consultants. AI handles the heavy lifting.
              </p>
            </div>
            
            <div>
              <div className="font-mono text-[10px] tracking-widest text-black/40 mb-4">
                02
              </div>
              <h3 className="text-xl font-normal tracking-tight mb-3">
                Days, Not Months
              </h3>
              <p className="font-mono text-sm text-black/50 leading-relaxed">
                Onboard like a SaaS tool, not like a traditional ERP. Decrease dependency on consultants and accelerate time-to-value.
              </p>
            </div>
            
            <div>
              <div className="font-mono text-[10px] tracking-widest text-black/40 mb-4">
                03
              </div>
              <h3 className="text-xl font-normal tracking-tight mb-3">
                White-Label Ready
              </h3>
              <p className="font-mono text-sm text-black/50 leading-relaxed">
                Deploy Source as part of your onboarding workflow. Custom branding and seamless integration with your platform.
              </p>
            </div>
            
            <div>
              <div className="font-mono text-[10px] tracking-widest text-black/40 mb-4">
                04
              </div>
              <h3 className="text-xl font-normal tracking-tight mb-3">
                Volume Pricing
              </h3>
              <p className="font-mono text-sm text-black/50 leading-relaxed">
                Flexible pricing models for ERP providers migrating hundreds or thousands of customers per year.
              </p>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="pt-8 border-t border-black/10">
            <div className="font-mono text-[10px] tracking-widest text-black/40 mb-4">
              GET STARTED
            </div>
            <a
              href="mailto:liam@source.shop?subject=ERP%20Provider%20Partnership"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-mono text-xs tracking-wider hover:bg-black/90 transition-colors"
            >
              CONTACT US
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black text-white py-12 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="font-mono text-4xl font-bold tracking-tight">
              Source.
            </div>
            
            <div className="flex items-center gap-6 font-mono text-xs">
              <a href="/careers" className="text-white/60 hover:text-white transition-colors">
                Careers
              </a>
              <a href="/enterprise" className="text-white/60 hover:text-white transition-colors">
                Enterprise
              </a>
              <a href="mailto:liam@source.shop" className="text-white/60 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="font-mono text-xs text-white/30">
              © 2026 SOURCE. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
