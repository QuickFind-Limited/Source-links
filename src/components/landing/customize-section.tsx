"use client"

import { useState } from "react"
import { CheckCircle2, ArrowRight, Code, Settings, Zap, X, Send } from "lucide-react"
import { ScrollAnimate } from "@/components/ui/scroll-animate"

// Chat UI Component for Customize Section
function CustomizeChatInterface({ onClose }: { onClose: () => void }) {
  const [inputValue, setInputValue] = useState("")
  
  return (
    <div className="relative border border-white/20 bg-white/5 overflow-hidden flex flex-col h-full min-h-[500px]">
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-white/30" />
      <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-white/30" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-white/30" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-white/30" />

      {/* Header */}
      <div className="bg-white/5 border-b border-white/10 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="font-mono text-[10px] text-white/70 tracking-wider">AI_CONSULTANT</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-white/40 tracking-wider">DEMO</span>
          <button 
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat content */}
      <div className="flex-1 p-5 overflow-y-auto">
        {/* User message */}
        <div className="flex justify-end mb-4">
          <div className="bg-white/10 border border-white/10 rounded-lg px-4 py-3 max-w-[80%]">
            <p className="text-sm text-white">Add a custom field for tracking warranty expiration dates</p>
          </div>
        </div>

        {/* AI response */}
        <div className="space-y-3">
          {/* Status indicators */}
          <div className="flex items-center gap-2 text-xs text-white/60">
            <CheckCircle2 className="w-3 h-3 text-green-500" />
            <span>Analyzing item record structure...</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/60">
            <CheckCircle2 className="w-3 h-3 text-green-500" />
            <span>Checking existing custom fields...</span>
          </div>

          {/* Result */}
          <div className="mt-4 p-4 border border-white/10 bg-white/5">
            <p className="text-sm text-white mb-4">I can add a "Warranty Expiration" date field to your Item record. Here's the scope:</p>
            
            {/* Scope details */}
            <div className="border border-white/10 mb-4">
              <div className="bg-white/5 px-3 py-2 border-b border-white/10">
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-wider">Customization Scope</span>
              </div>
              <div className="divide-y divide-white/10">
                {[
                  { item: "Custom date field", detail: "warranty_expiration" },
                  { item: "Form placement", detail: "Item > Custom tab" },
                  { item: "Saved search", detail: "Expiring warranties report" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between px-3 py-2 text-sm">
                    <span className="text-white/70">{row.item}</span>
                    <span className="font-mono text-white/50 text-xs">{row.detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-white text-black font-mono text-[11px] tracking-wider hover:bg-white/90 transition-colors">
                <CheckCircle2 className="w-3 h-3" />
                APPROVE & BUILD
              </button>
              <button className="px-4 py-2 border border-white/20 text-white font-mono text-[11px] tracking-wider hover:bg-white/5 transition-colors">
                MODIFY
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Describe your customization..."
            className="flex-1 bg-transparent font-mono text-sm text-white placeholder:text-white/30 focus:outline-none"
          />
          <button className="text-white/40 hover:text-white transition-colors">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export function CustomizeSection() {
  const [showChat, setShowChat] = useState(false)

  return (
    <section className="relative flex flex-col justify-center px-6 py-20 overflow-hidden bg-black text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='1' height='1' fill='%23fff'/%3E%3Crect x='2' y='2' width='1' height='1' fill='%23fff'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Two column layout - Card on LEFT, Content on RIGHT */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left column - Customization Card */}
          <ScrollAnimate animation="fade-right" duration={700}>
          <div className="lg:pt-8">
            {showChat ? (
              <CustomizeChatInterface onClose={() => setShowChat(false)} />
            ) : (
            <div className="relative border border-white/20 bg-white/5 overflow-hidden">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-white/30" />
              <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-white/30" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-white/30" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-white/30" />

              {/* Header */}
              <div className="bg-white/5 border-b border-white/10 px-5 py-3">
                <div className="font-mono text-[10px] text-white/40 tracking-wider">
                  CUSTOMIZATION REQUEST
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Request type options */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { icon: Code, label: "Script", desc: "Custom logic" },
                    { icon: Settings, label: "Field", desc: "New data" },
                    { icon: Zap, label: "Workflow", desc: "Automation" },
                  ].map((item, i) => (
                    <div key={i} className={`text-center p-4 border ${i === 1 ? 'border-white/40 bg-white/10' : 'border-white/10'} cursor-pointer hover:border-white/30 transition-colors`}>
                      <item.icon className="w-5 h-5 mx-auto mb-2 text-white/70" />
                      <div className="font-bold text-sm">{item.label}</div>
                      <div className="font-mono text-[9px] text-white/40">{item.desc}</div>
                    </div>
                  ))}
                </div>

                {/* Example request */}
                <div className="border border-white/10 p-4 mb-6">
                  <div className="font-mono text-[9px] text-white/40 uppercase tracking-wider mb-3">Example Request</div>
                  <div className="font-mono text-sm text-white/80 leading-relaxed">
                    "Add a custom field to track warranty expiration dates on inventory items"
                  </div>
                </div>

                {/* What you get */}
                <div className="border border-white/10 p-4 mb-6">
                  <div className="font-mono text-[9px] text-white/40 uppercase tracking-wider mb-3">Includes</div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {[
                      "AI-generated scope",
                      "Fixed price quote",
                      "Human verification",
                      "Testing & QA",
                      "Documentation",
                      "Deployment support"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-white/70">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Banner */}
                <div className="bg-white text-black p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-lg font-bold tracking-tight">Source.</span>
                    <span className="font-mono text-[10px] text-black/40 tracking-wider">CUSTOMIZE</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-mono text-[10px] text-black/50 uppercase tracking-wider mb-1">
                        Starting at
                      </div>
                      <div className="text-3xl font-bold tabular-nums">
                        $250
                      </div>
                      <div className="text-sm text-black/40">
                        per customization
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-[10px] text-black/50 uppercase tracking-wider mb-1">Turnaround</div>
                      <div className="text-xl font-bold">24-48 hrs</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-black/10 flex items-center justify-between">
                    <div className="font-mono text-[11px] text-black/60">
                      Scope before you pay
                    </div>
                    <button
                      onClick={() => setShowChat(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-black text-white font-mono text-[11px] tracking-wider hover:bg-black/90 transition-colors"
                    >
                      START REQUEST
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            )}
          </div>
          </ScrollAnimate>

          {/* Right column - Main content */}
          <ScrollAnimate animation="fade-left" duration={700} delay={150}>
          <div>
            {/* Main headline */}
            <div className="space-y-6">
              <div className="font-mono text-xs text-white/50 tracking-wider mb-4">
                AI-POWERED CUSTOMIZATIONS
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-none">
                CUSTOMIZE
                <br />
                <span className="relative inline-block">
                  YOUR ERP
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-white" />
                </span>
              </h2>
            </div>

            {/* Subheadline */}
            <div className="mt-8 max-w-xl">
              <p className="text-xl md:text-2xl text-white/70 font-mono leading-relaxed">
                Describe what you need in plain English.
                <br />
                <span className="text-white">Get a <span className="font-bold">fixed-price quote</span></span> in minutes, not weeks.
              </p>
            </div>

            {/* Stats row */}
            <div className="mt-12 grid grid-cols-2 gap-6">
              {[
                { value: "250+", label: "Customizations Delivered" },
                { value: "24hrs", label: "Avg. Turnaround" },
                { value: "$0", label: "Scoping Cost" },
                { value: "100%", label: "Satisfaction Rate" }
              ].map((stat, i) => (
                <div key={i} className="border-l border-white/20 pl-4">
                  <div className="text-2xl md:text-3xl font-bold tracking-tight">{stat.value}</div>
                  <div className="text-xs font-mono text-white/50 mt-1 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowChat(true)}
                className="inline-flex items-center justify-center px-6 py-4 bg-white text-black font-mono text-sm tracking-wider hover:bg-white/90 transition-colors"
              >
                DESCRIBE YOUR CUSTOMIZATION
              </button>
              <a
                href="#packages"
                className="inline-flex items-center justify-center px-6 py-4 border-2 border-white text-white font-mono text-sm tracking-wider hover:bg-white hover:text-black transition-colors"
              >
                VIEW PACKAGES
              </a>
            </div>
          </div>
          </ScrollAnimate>
        </div>
      </div>
    </section>
  )
}
