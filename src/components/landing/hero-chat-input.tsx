"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { cn } from "@/lib/utils"
import { ArrowRight, Paperclip, Globe, Lightbulb } from "lucide-react"

const SUGGESTED_PROMPTS = [
  "How do I reduce operational costs by 30%?",
  "What's the best pricing strategy for SaaS?",
  "Create a competitive analysis framework",
]

export function HeroChatInput() {
  const [input, setInput] = useState("")
  const [browserMode, setBrowserMode] = useState(false)
  const [planMode, setPlanMode] = useState(true)
  const [showChat, setShowChat] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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

  useEffect(() => {
    if (messages.length > 0) {
      setShowChat(true)
    }
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
    <div className="w-full max-w-3xl mx-auto">
      {/* Main headline */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-4 text-balance">
          What do you need to solve today?
        </h1>
        <p className="text-black/50 font-mono text-sm md:text-base max-w-xl mx-auto">
          Get instant strategic advice, automate analysis, and deploy solutions with ease.
        </p>
      </div>

      {/* Toggle switches */}
      <div className="flex items-center justify-end gap-4 mb-4">
        <button
          onClick={() => setBrowserMode(!browserMode)}
          className="flex items-center gap-2 group"
        >
          <div
            className={cn(
              "w-10 h-5 border transition-colors flex items-center px-0.5",
              browserMode ? "bg-black border-black" : "bg-white border-black/20"
            )}
          >
            <div
              className={cn(
                "w-4 h-4 transition-all",
                browserMode ? "bg-white translate-x-4" : "bg-black/20 translate-x-0"
              )}
            />
          </div>
          <Globe className={cn("w-4 h-4", browserMode ? "text-black" : "text-black/40")} />
          <span className={cn("font-mono text-xs", browserMode ? "text-black" : "text-black/40")}>
            Research
          </span>
        </button>

        <button
          onClick={() => setPlanMode(!planMode)}
          className="flex items-center gap-2 group"
        >
          <div
            className={cn(
              "w-10 h-5 border transition-colors flex items-center px-0.5",
              planMode ? "bg-black border-black" : "bg-white border-black/20"
            )}
          >
            <div
              className={cn(
                "w-4 h-4 transition-all",
                planMode ? "bg-white translate-x-4" : "bg-black/20 translate-x-0"
              )}
            />
          </div>
          <Lightbulb className={cn("w-4 h-4", planMode ? "text-black" : "text-black/40")} />
          <span className={cn("font-mono text-xs", planMode ? "text-black" : "text-black/40")}>
            Plan Mode
          </span>
        </button>
      </div>

      {/* Main input */}
      <form onSubmit={handleSubmit} className="relative mb-6">
        <div className="relative border border-black/20 bg-white shadow-sm hover:border-black/40 focus-within:border-black transition-colors">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about strategy, operations, pricing, or any business challenge..."
            disabled={isLoading}
            className="w-full bg-transparent text-black px-5 py-4 pr-24 font-mono text-sm placeholder:text-black/30 focus:outline-none disabled:opacity-50"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button
              type="button"
              className="p-2 text-black/30 hover:text-black/60 transition-colors"
              title="Attach file"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={cn(
                "p-2 transition-colors",
                input.trim()
                  ? "bg-black text-white hover:bg-black/80"
                  : "bg-black/10 text-black/30"
              )}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </form>

      {/* Suggested prompts */}
      {!showChat && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {SUGGESTED_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSuggestionClick(prompt)}
              disabled={isLoading}
              className="px-4 py-2.5 border border-black/10 text-black/60 font-mono text-xs hover:border-black/30 hover:text-black hover:bg-black/[0.02] transition-all disabled:opacity-50"
            >
              &quot;{prompt}&quot;
            </button>
          ))}
        </div>
      )}

      {/* Chat messages area */}
      {showChat && (
        <div className="mt-8 border border-black/10 bg-white/50">
          {/* Chat header */}
          <div className="border-b border-black/5 px-4 py-3 flex items-center justify-between bg-black/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500" />
              <span className="font-mono text-xs text-black/50">AI_CONSULTANT_v2.0</span>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className="font-mono text-xs text-black/30 hover:text-black/60 transition-colors"
            >
              MINIMIZE
            </button>
          </div>

          {/* Messages */}
          <div className="max-h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 w-8 h-8 border border-black/20 flex items-center justify-center font-mono text-xs text-black/60">
                    AI
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] p-4 font-mono text-sm leading-relaxed",
                    message.role === "user"
                      ? "bg-black text-white"
                      : "bg-black/5 border border-black/10 text-black/80"
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
                  <div className="flex-shrink-0 w-8 h-8 bg-black text-white flex items-center justify-center font-mono text-xs">
                    YOU
                  </div>
                )}
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0 w-8 h-8 border border-black/20 flex items-center justify-center font-mono text-xs text-black/60">
                  AI
                </div>
                <div className="bg-black/5 border border-black/10 p-4 font-mono text-sm text-black/60">
                  <span className="animate-pulse">Processing</span>
                  <span className="animate-blink">_</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompts after conversation started */}
          <div className="border-t border-black/5 px-4 py-3 bg-black/[0.02]">
            <div className="flex flex-wrap gap-2">
              {["Follow up", "Go deeper", "Give me alternatives"].map((action, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInput(action)
                    inputRef.current?.focus()
                  }}
                  className="px-3 py-1.5 border border-black/10 text-black/40 font-mono text-xs hover:border-black/20 hover:text-black/60 transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
