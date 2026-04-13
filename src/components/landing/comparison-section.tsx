"use client"

import { AsciiDecoration } from "./ascii-decoration"
import { ScrollAnimate } from "@/components/ui/scroll-animate"

const traditionalCons = [
  "Ring consultant, wait for callback",
  "Pay $500/hr for discovery meetings",
  "Weeks to get a scoping document",
  "BRDs that sit in drawers",
  "Subjective advice varies by consultant",
  "No visibility into your own system",
]

const aiPros = [
  "Ask anything, get answers in seconds",
  "Fixed price for every task",
  "AI analyzes your actual system live",
  "Real-time discovery and planning",
  "Consistent, data-driven recommendations",
  "Full transparency into your ERP",
]

// Use cases from the transcript
const useCases = [
  { 
    title: "SUPPORT QUERIES", 
    desc: "Ask any question about your ERP and get answers cross-referenced with your actual environment",
    example: "\"Why is this field behaving this way?\""
  },
  { 
    title: "CHANGE REQUESTS", 
    desc: "Need a new field, a custom workflow, or a small tweak? Describe it and get it scoped instantly",
    example: "\"Add a color field to item master\""
  },
  { 
    title: "CUSTOMIZATIONS", 
    desc: "From saved searches to scripts, get AI-assisted development with human verification",
    example: "\"Create a report showing all overdue invoices\""
  },
  { 
    title: "MIGRATION PLANNING", 
    desc: "AI analyzes your current system and suggests the optimal migration path with clear options",
    example: "\"Plan QuickBooks to NetSuite migration\""
  },
]

export function ComparisonSection() {
  return (
    <section className="relative bg-black text-white py-24 px-6 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <ScrollAnimate animation="fade-up" duration={600}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            THE COMPARISON
          </h2>
          <div className="font-mono text-xs text-white/40 tracking-wider">
            TRADITIONAL VS AI-POWERED CONSULTING
          </div>
        </div>
        </ScrollAnimate>
        
        {/* Comparison cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Traditional Consultant Card */}
          <ScrollAnimate animation="fade-right" duration={600} delay={100}>
          <div className="relative bg-white/5 border border-white/10 p-8">
            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-white/30" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-white/30" />
            
            <div className="font-mono text-xs text-white/40 tracking-wider mb-6">
              TRADITIONAL CONSULTANT
            </div>
            
            <ul className="space-y-4">
              {traditionalCons.map((con, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="font-mono text-white/40 flex-shrink-0">[-]</span>
                  <span className="font-mono text-sm text-white/70">{con}</span>
                </li>
              ))}
            </ul>
            
            {/* Strikethrough effect */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-px bg-white/20 rotate-[-5deg]" />
            </div>
          </div>
          </ScrollAnimate>

          {/* AI Consultant Card */}
          <ScrollAnimate animation="fade-left" duration={600} delay={200}>
          <div className="relative bg-white/5 border border-white p-8">
            {/* Corner accent - highlighted */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-white" />
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-white" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-white" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-white" />
            
            <div className="font-mono text-xs text-white tracking-wider mb-6">
              AI CONSULTANT
            </div>
            
            <ul className="space-y-4">
              {aiPros.map((pro, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="font-mono text-white flex-shrink-0">[+]</span>
                  <span className="font-mono text-sm text-white">{pro}</span>
                </li>
              ))}
            </ul>
          </div>
          </ScrollAnimate>
        </div>

        {/* Use Cases Section */}
        <ScrollAnimate animation="fade-up" duration={600}>
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tighter mb-2">
              WHAT CAN YOU DO?
            </h3>
            <div className="font-mono text-xs text-white/40 tracking-wider">
              FROM SIMPLE QUESTIONS TO COMPLEX PROJECTS
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((useCase, i) => (
              <div key={i} className="relative border border-white/10 p-6 hover:border-white/30 transition-colors">
                <div className="font-mono text-xs text-white/30 mb-2">0{i + 1}</div>
                <div className="font-bold tracking-tight mb-2">{useCase.title}</div>
                <div className="font-mono text-xs text-white/50 leading-relaxed mb-4">
                  {useCase.desc}
                </div>
                <div className="font-mono text-xs text-white/70 bg-white/5 px-3 py-2 inline-block">
                  {useCase.example}
                </div>
              </div>
            ))}
          </div>
        </div>
        </ScrollAnimate>

        {/* ASCII decoration */}
        <div className="mt-16 font-mono text-xs text-white/10 text-center overflow-hidden whitespace-nowrap">
          {'█▓▒░'.repeat(50)}
        </div>
      </div>
    </section>
  )
}
