"use client"

import { AsciiDecoration, MetadataBar } from "./ascii-decoration"
import { DitherOverlay } from "./dither-overlay"
import { ScrollAnimate } from "@/components/ui/scroll-animate"

export function CTASection() {
  return (
    <section className="relative bg-black text-white py-24 px-6 overflow-hidden">
      {/* Industrial background image */}
      <div className="absolute inset-0">
        <img
          src="/images/factory_worker_using_vintage_terminal.png"
          alt="Factory worker at terminal"
          className="w-full h-full object-cover opacity-25 grayscale"
        />
      </div>
      <DitherOverlay intensity="light" inverted />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <ScrollAnimate animation="fade-up" duration={600}>
        <MetadataBar
          items={[
            { label: "SECTION", value: "04" },
            { label: "ACTION", value: "REQUIRED" }
          ]}
          className="justify-center mb-12"
        />

        {/* ASCII frame */}
        <div className="relative inline-block">
          <pre className="absolute -top-8 -left-8 font-mono text-xs text-white/10 leading-none hidden md:block" aria-hidden="true">
{`┌─────────────────────────────────────────┐
│                                         │`}
          </pre>
          <pre className="absolute -bottom-8 -right-8 font-mono text-xs text-white/10 leading-none hidden md:block" aria-hidden="true">
{`│                                         │
└─────────────────────────────────────────┘`}
          </pre>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            READY TO START?
          </h2>
        </div>

        <p className="text-lg text-white/60 font-mono max-w-xl mx-auto mb-12">
          Join thousands of businesses that have already made the switch.
          Start your free trial today—no credit card required.
        </p>
        </ScrollAnimate>

        {/* Email signup */}
        <ScrollAnimate animation="fade-up" duration={600} delay={150}>
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 px-4 py-4 border border-white bg-transparent text-white font-mono text-sm placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-white text-black font-mono text-sm tracking-wider hover:bg-white/90 transition-colors"
          >
            GET ACCESS
          </button>
        </form>
        </ScrollAnimate>

        {/* Trust indicators */}
        <ScrollAnimate animation="fade-up" duration={600} delay={300}>
        <div className="mt-16 pt-16 border-t border-white/10">
          <div className="font-mono text-xs text-white/40 mb-6 uppercase tracking-wider">
            Trusted by teams at
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-white/30 font-mono text-sm">
            {["ACME INC", "GLOBEX", "INITECH", "UMBRELLA", "STARK IND"].map((company) => (
              <span key={company} className="hover:text-white transition-colors">
                {company}
              </span>
            ))}
          </div>
        </div>
        </ScrollAnimate>
        
        {/* ASCII decoration */}
        <div className="mt-16 opacity-20">
          <AsciiDecoration variant="robot" className="mx-auto text-xs" />
        </div>
      </div>
    </section>
  )
}
