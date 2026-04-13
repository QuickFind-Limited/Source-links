"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { cn } from "@/lib/utils"
import { MetadataBar } from "./ascii-decoration"
import { DitherOverlay } from "./dither-overlay"

const SUGGESTED_PROMPTS = [
  "How do I reduce operational costs?",
  "What's the best go-to-market strategy?",
  "How should I price my SaaS product?",
  "Help me create a business plan outline"
]

export function ChatSection() {
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  const handleSuggestionClick = (prompt: string) => {
    if (isLoading) return
    sendMessage({ text: prompt })
  }

  return (
    <section id="chat" className="relative bg-black text-white py-24 px-6 overflow-hidden min-h-screen">
      <DitherOverlay intensity="medium" className="mix-blend-overlay" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <MetadataBar 
          items={[
            { label: "SECTION", value: "03" },
            { label: "MODE", value: "INTERACTIVE" },
            { label: "STATUS", value: isLoading ? "PROCESSING" : "READY" }
          ]}
          inverted
          className="mb-6"
        />
        
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
          TRY IT NOW
        </h2>
        <p className="text-white/60 font-mono mb-8 max-w-xl">
          Ask our AI consultant anything about your business. 
          This is a live demo—no signup required.
        </p>

        {/* Chat container */}
        <div className="border border-white/20 bg-black/50">
          {/* Chat header */}
          <div className="border-b border-white/10 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500" />
              <span className="font-mono text-xs text-white/60">AI_CONSULTANT_v2.0</span>
            </div>
            <div className="font-mono text-xs text-white/40">
              {messages.length > 0 ? `${messages.length} messages` : "Start a conversation"}
            </div>
          </div>
          
          {/* Messages area */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <pre className="font-mono text-xs text-white/20 mb-6 leading-none" aria-hidden="true">
{`    ┌─────────┐
    │  ■   ■  │
    │    ▼    │
    │  └───┘  │
    └────┬────┘
         │
    ╔════╧════╗
    ║ READY   ║
    ╚═════════╝`}
                </pre>
                <p className="text-white/40 font-mono text-sm mb-6">
                  No messages yet. Try one of these:
                </p>
                <div className="flex flex-wrap gap-2 justify-center max-w-md">
                  {SUGGESTED_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestionClick(prompt)}
                      className="px-3 py-2 border border-white/20 text-white/60 font-mono text-xs hover:border-white/40 hover:text-white transition-colors text-left"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.role === "assistant" && (
                      <div className="flex-shrink-0 w-8 h-8 border border-white/20 flex items-center justify-center font-mono text-xs text-white/60">
                        AI
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] p-4 font-mono text-sm leading-relaxed",
                        message.role === "user"
                          ? "bg-white text-black"
                          : "bg-white/5 border border-white/10 text-white/90"
                      )}
                    >
                      {message.parts.map((part, index) => {
                        if (part.type === "text") {
                          return (
                            <span key={index} className="whitespace-pre-wrap">
                              {part.text}
                            </span>
                          )
                        }
                        return null
                      })}
                    </div>
                    {message.role === "user" && (
                      <div className="flex-shrink-0 w-8 h-8 bg-white text-black flex items-center justify-center font-mono text-xs">
                        YOU
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && messages[messages.length - 1]?.role === "user" && (
                  <div className="flex gap-3 justify-start">
                    <div className="flex-shrink-0 w-8 h-8 border border-white/20 flex items-center justify-center font-mono text-xs text-white/60">
                      AI
                    </div>
                    <div className="bg-white/5 border border-white/10 p-4 font-mono text-sm text-white/60">
                      <span className="animate-pulse">Processing</span>
                      <span className="animate-blink">_</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
          
          {/* Input area */}
          <form onSubmit={handleSubmit} className="border-t border-white/10 p-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-white/40">
                  {">"}
                </span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  disabled={isLoading}
                  className="w-full bg-transparent border border-white/20 px-8 py-3 font-mono text-sm placeholder:text-white/30 focus:outline-none focus:border-white/40 disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-6 py-3 bg-white text-black font-mono text-sm tracking-wider hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                SEND
              </button>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs font-mono text-white/30">
              <span>Press Enter to send</span>
              <span>Powered by AI SDK</span>
            </div>
          </form>
        </div>
        
        {/* Suggested prompts below chat */}
        {messages.length > 0 && (
          <div className="mt-6">
            <div className="font-mono text-xs text-white/40 mb-3">Try asking:</div>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(prompt)}
                  disabled={isLoading}
                  className="px-3 py-1.5 border border-white/10 text-white/40 font-mono text-xs hover:border-white/30 hover:text-white/60 transition-colors disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
