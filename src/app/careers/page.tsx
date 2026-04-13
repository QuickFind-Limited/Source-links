"use client"

import { useState } from "react"
import { GrainOverlay } from "@/components/landing/dither-overlay"

export default function CareersPage() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null)

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
            CAREERS
          </div>
          
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight mb-8">
            Join us in our first act
          </h1>
          
          {/* Description */}
          <div className="max-w-3xl text-left space-y-6 mb-16">
            <p className="font-mono text-sm text-black/50 leading-relaxed">
              Source is fundamentally changing how businesses interact with their legacy systems and infrastructure.
            </p>
            <p className="font-mono text-sm text-black/50 leading-relaxed">
              Source builds AI consultants that replace expensive, slow traditional consulting—delivering 
              ERP migrations, integrations, and customizations at a fraction of the cost and time - this is our first act.
            </p>
            <p className="font-mono text-sm text-black/50 leading-relaxed">
              If you're passionate about solving complex problems for organizations that power the real economy 
              on our pathway to superintelligence, we'd love to hear from you.
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-black/10 mb-16" />

          {/* Open Positions */}
          <div className="space-y-12">
            <div>
              <div className="font-mono text-[10px] tracking-widest text-black/40 mb-6">
                OPEN POSITIONS
              </div>
              
              <div className="space-y-6">
                {/* Forward Deployed Researcher Position */}
                <div className="border border-black/10">
                  <div className="p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-medium tracking-tight mb-1">Forward Deployed Researcher, Reinforcement Learning</h3>
                        <p className="font-mono text-xs text-black/40">Full-time · Remote / San Francisco</p>
                        <p className="font-mono text-sm text-black/50 mt-3 max-w-xl">
                          Help Source build production RL systems in complex and dynamic enterprise environments. You'll work at the frontier of research for business use cases, and work on long context horizon RL environments to solve real problems.
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setExpandedJob(expandedJob === 'fdr' ? null : 'fdr')}
                          className="inline-flex items-center gap-2 px-5 py-2.5 border border-black/20 font-mono text-xs tracking-wider hover:bg-black hover:text-white transition-colors whitespace-nowrap"
                        >
                          {expandedJob === 'fdr' ? 'SHOW LESS' : 'READ MORE'}
                        </button>
                        <a
                          href="mailto:liam@source.shop?subject=Application%3A%20Forward%20Deployed%20Researcher"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white font-mono text-xs tracking-wider hover:bg-black/90 transition-colors whitespace-nowrap"
                        >
                          APPLY
                        </a>
                      </div>
                    </div>
                  </div>

                  {expandedJob === 'fdr' && (
                    <div className="border-t border-black/10 p-8 space-y-6 font-mono text-sm text-black/60 leading-relaxed">
                      <div>
                        <h4 className="text-black font-medium mb-3">About the Role</h4>
                        <p>
                          We're looking for a researcher who thrives at the intersection of cutting-edge AI and real-world 
                          business problems. You'll work directly with customers and their systems, developing novel approaches 
                          that ship to production. This is a hands-on role where research has immediate, tangible impact.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-black font-medium mb-3">What You'll Do</h4>
                        <ul className="space-y-2 list-disc list-inside">
                          <li>Design and implement RL systems for complex, multi-step decision making in enterprise environments</li>
                          <li>Build evaluation frameworks to measure system performance across diverse tasks</li>
                          <li>Translate research breakthroughs into production-ready features</li>
                          <li>Work directly with customers to understand their challenges and deploy solutions</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-black font-medium mb-3">Requirements</h4>
                        <ul className="space-y-2 list-disc list-inside">
                          <li>MS or PhD in Computer Science, Machine Learning, or related field</li>
                          <li>Demonstrated research experience: publications at top venues (NeurIPS, ICML, ICLR, etc.) or equivalent industry research</li>
                          <li>Hands-on experience training models (even small models) or provable experience in the RL field, ideally for long context horizon tasks</li>
                          <li>Daily hands-on experience with frontier models and their APIs</li>
                          <li>Strong familiarity with open-source ML tooling (Unsloth, vLLM, TRL, Axolotl, or similar)</li>
                          <li>Strong implementation skills in Python and deep learning frameworks</li>
                          <li>Track record of taking research from prototype to production</li>
                          <li>Excellent communication skills and ability to work directly with customers</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-black font-medium mb-3">Nice to Have</h4>
                        <ul className="space-y-2 list-disc list-inside">
                          <li>Familiarity with enterprise systems (ERP, CRM, databases) or business process automation</li>
                          <li>Experience building and scaling ML infrastructure</li>
                          <li>Contributions to open-source ML projects</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-black font-medium mb-3">What We Offer</h4>
                        <ul className="space-y-2 list-disc list-inside">
                          <li>Competitive salary and meaningful equity in an early-stage company</li>
                          <li>Opportunity to work on genuinely novel problems at the frontier of AI</li>
                          <li>Direct impact on product direction and company strategy</li>
                          <li>Flexible work environment with remote-friendly culture</li>
                          <li>Budget for conferences, research, and professional development</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="pt-8">
              <div className="font-mono text-[10px] tracking-widest text-black/40 mb-4">
                DON'T SEE YOUR ROLE?
              </div>
              <p className="font-mono text-sm text-black/50 mb-6">
                We're always looking for talented people. Send us your resume.
              </p>
              <a
                href="mailto:liam@source.shop?subject=Career%20Inquiry"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-mono text-xs tracking-wider hover:bg-black/90 transition-colors"
              >
                GET IN TOUCH
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black text-white py-16 pb-24 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="font-mono text-4xl font-bold tracking-tight mb-3">
                Source.
              </div>
              <p className="font-mono text-xs text-white/40 max-w-sm">
                The future of business consulting is here.
                AI-powered, available 24/7, at a fraction of the cost.
              </p>
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
        </div>
      </footer>
    </main>
  )
}
