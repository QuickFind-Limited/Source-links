"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Loader2, CheckCircle2 } from "lucide-react"
import { useCases, ReasoningStep } from "./chat-preview"

export function UseCaseTabs() {
  const [activeTab, setActiveTab] = useState("support")
  const [visibleMessages, setVisibleMessages] = useState<number[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const activeCase = useCases.find(uc => uc.id === activeTab)!

  // Animate messages when tab changes
  useEffect(() => {
    setVisibleMessages([])
    setIsAnimating(true)

    const messages = activeCase.messages
    const timeouts: NodeJS.Timeout[] = []

    messages.forEach((_, index) => {
      const msg = messages[index]
      const timeout = setTimeout(() => {
        setVisibleMessages(prev => [...prev, index])
        if (index === messages.length - 1) {
          setIsAnimating(false)
        }
      }, msg.delay)
      timeouts.push(timeout)
    })

    return () => timeouts.forEach(t => clearTimeout(t))
  }, [activeTab, activeCase.messages])

  return (
    <section id="use-cases" className="relative bg-white py-24 px-6 overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='1' height='1' fill='%23000'/%3E%3Crect x='2' y='2' width='1' height='1' fill='%23000'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <div className="font-mono text-[10px] text-black/40 tracking-widest mb-3">
            INTERFACE SHOWCASE
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-3">
            See it in action
          </h2>
          <p className="font-mono text-sm text-black/50 max-w-md mx-auto">
            Real conversations. Real results. No billable hours.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-1 mb-10">
          {useCases.map((useCase) => {
            const Icon = useCase.icon
            return (
              <button
                key={useCase.id}
                onClick={() => setActiveTab(useCase.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 font-mono text-[10px] tracking-wider transition-all border",
                  activeTab === useCase.id
                    ? "bg-black text-white border-black"
                    : "bg-white text-black/50 border-black/10 hover:border-black/30 hover:text-black"
                )}
              >
                <Icon className="w-3 h-3" />
                {useCase.label}
              </button>
            )
          })}
        </div>

        {/* Content grid - description left, chat right */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Description */}
          <div className="space-y-6 lg:pr-8">
            <div>
              <div className="font-mono text-[10px] text-black/40 tracking-widest mb-2">
                USE CASE
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-black mb-3">
                {activeCase.title}
              </h3>
              <p className="text-sm text-black/60 leading-relaxed">
                {activeCase.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {activeCase.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 border border-black/10 font-mono text-[10px] text-black/50"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-2">
              <a
                href="/demo"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white font-mono text-[11px] tracking-wider hover:bg-black/90 transition-colors"
              >
                TRY THIS USE CASE
                <span className="animate-pulse">_</span>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3 pt-4 border-t border-black/5">
              {[
                { value: "<5s", label: "Response" },
                { value: "87%", label: "Savings" },
                { value: "24/7", label: "Available" },
                { value: "100%", label: "Transparent" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-lg font-bold tracking-tight text-black">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[9px] text-black/40 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Chat interface - compact */}
          <div className="border border-black bg-white shadow-lg">
            {/* Chat header */}
            <div className="border-b border-black/10 px-4 py-3 flex items-center justify-between bg-black/[0.02]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 animate-pulse" />
                <span className="font-mono text-xs text-black/60">AI_CONSULTANT</span>
              </div>
              <div className="font-mono text-[10px] text-black/30">DEMO</div>
            </div>

            {/* Messages - with fading effect for older messages */}
            <div className="p-4 space-y-3 h-[340px] overflow-y-auto">
              {activeCase.messages.map((message, i) => {
                const isVisible = visibleMessages.includes(i)
                const messageCount = activeCase.messages.length
                // Calculate opacity: most recent messages are fully visible, older ones fade
                const recency = visibleMessages.length > 0
                  ? (i + 1) / visibleMessages.length
                  : 1
                const fadeOpacity = Math.max(0.3, recency)

                return (
                  <div
                    key={i}
                    className={cn(
                      "transition-all duration-500",
                      isVisible ? "translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
                    )}
                    style={{
                      opacity: isVisible ? (i < visibleMessages.length - 2 ? fadeOpacity : 1) : 0
                    }}
                  >
                    {/* User message */}
                    {message.role === "user" && (
                      <div className="flex justify-end">
                        <div className="bg-black text-white px-3 py-2 text-xs font-mono max-w-[85%]">
                          {message.content}
                        </div>
                      </div>
                    )}

                    {/* Reasoning steps */}
                    {message.role === "reasoning" && (
                      <div className="flex justify-start">
                        <div className="bg-black/[0.03] border border-black/10 px-3 py-2 max-w-[85%]">
                          {message.steps?.map((step, j) => (
                            <ReasoningStep key={j} {...step} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Assistant message */}
                    {message.role === "assistant" && (
                      <div className="flex justify-start">
                        <div className="max-w-[90%]">
                          <div className="bg-black/[0.03] border border-black/10 px-3 py-2">
                            <p className="text-xs text-black/80">{message.content}</p>
                          </div>
                          {message.ui && (
                            <div className={cn(
                              "transition-all duration-500 delay-200",
                              isVisible ? "opacity-100" : "opacity-0"
                            )}>
                              {message.ui}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}

              {/* Typing indicator */}
              {isAnimating && visibleMessages.length < activeCase.messages.length && (
                <div className="flex justify-start">
                  <div className="bg-black/[0.03] border border-black/10 px-3 py-2">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-black/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-black/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-black/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
