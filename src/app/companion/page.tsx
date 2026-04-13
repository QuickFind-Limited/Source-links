"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  Search,
  FileText,
  Database,
  Trash2,
  FileCheck,
  Check,
  MessageSquare,
  ArrowLeft,
  Sparkles,
  ShoppingCart,
  CreditCard,
  BarChart3,
  Globe,
  Loader2,
  CheckCircle2,
  HelpCircle,
  Zap,
  ArrowRight,
  ArrowDown,
  Key,
  Shield,
  FileSignature,
} from "lucide-react"
import { ChatPreview } from "@/components/landing/chat-preview"
import { TypewriterText } from "@/components/ui/typewriter-text"

// ============================================
// Chatbot Preview - Step 0.25 with Typing Animation
// ============================================

const DEPARTMENT_OPTIONS = [
  "Operations",
  "Finance",
  "IT",
  "Sales",
  "Marketing",
  "Human Resources",
  "Customer Service",
  "Supply Chain",
  "Executive",
  "Other"
]

const ROLES = [
  "Digital Transformation",
  "ERP Administrator",
  "Business Analyst",
  "IT Manager",
  "CFO / Finance Director",
  "Operations Manager",
  "Project Manager",
  "Consultant",
  "Developer",
  "Other"
]

function ChatbotPreview() {
  const [phase, setPhase] = useState(0)
  // Phases: 0=empty, 1=dept select, 2=role select, 3=typing, 4=message sent, 5=thinking, 6=response
  
  const [typedText, setTypedText] = useState('')
  const [selectedDept, setSelectedDept] = useState<string>('')
  const [selectedRole, setSelectedRole] = useState<string>('')
  const [showDeptDropdown, setShowDeptDropdown] = useState(false)
  const [showRoleDropdown, setShowRoleDropdown] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 50, y: -50 })
  const [isClicking, setIsClicking] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [showMainText, setShowMainText] = useState(false)
  const [showStep1, setShowStep1] = useState(false)
  const [showStep2, setShowStep2] = useState(false)
  const [showStep3, setShowStep3] = useState(false)
  const [showFinalText, setShowFinalText] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [buttonClicked, setButtonClicked] = useState(false)
  const [reasoningStep, setReasoningStep] = useState(0)
  // Reasoning steps: 0=none, 1=understanding, 2=fetching, 3=analyzing, 4=planning, 5=complete
  const sectionRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)
  const submitButtonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const ctaButtonRef = useRef<HTMLButtonElement>(null)
  const deptSelectRef = useRef<HTMLDivElement>(null)
  const roleSelectRef = useRef<HTMLDivElement>(null)
  const deptOptionRef = useRef<HTMLDivElement>(null)
  const roleOptionRef = useRef<HTMLDivElement>(null)
  
  const fullPrompt = "we've just acquired a company and we want to switch them from Quickbooks to Netsuite."
  
  // Start animation when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasStarted])
  
  // Helper to get element position relative to container (optionally account for container scale, e.g. scale-125 in phase 3)
  const getRelativePosition = (ref: React.RefObject<HTMLElement | null>, offsetX = 20, offsetY = 20, scale = 1) => {
    if (!ref.current || !containerRef.current) {
      return { x: 50, y: 50 }
    }
    const containerRect = containerRef.current.getBoundingClientRect()
    const elementRect = ref.current.getBoundingClientRect()
    const x = (elementRect.left - containerRect.left + offsetX) / scale
    const y = (elementRect.top - containerRect.top + offsetY) / scale
    return { x, y }
  }
  
  // Animation sequence
  useEffect(() => {
    if (!hasStarted) return

    const timers: ReturnType<typeof setTimeout>[] = []

    const initDelay = setTimeout(() => {
      const sequence = [
        // Phase 0 -> 1: Move cursor to department select
        {
          delay: 400,
          action: () => {
            const pos = getRelativePosition(deptSelectRef, 20, 20)
            setCursorPos(pos)
            setPhase(1)
          }
        },
        // Click department select to open dropdown
        {
          delay: 800,
          action: () => setIsClicking(true)
        },
        {
          delay: 1000,
          action: () => {
            setIsClicking(false)
            setShowDeptDropdown(true) // Open dropdown
            setPhase(1)
          }
        },
        // Move to Finance option
        {
          delay: 1200,
          action: () => {
            const pos = getRelativePosition(deptOptionRef, 20, 10)
            setCursorPos(pos)
          }
        },
        // Click Finance option
        {
          delay: 1600,
          action: () => setIsClicking(true)
        },
        {
          delay: 1800,
          action: () => {
            setIsClicking(false)
            setSelectedDept(DEPARTMENT_OPTIONS[1]) // Select "Finance"
            setShowDeptDropdown(false) // Close dropdown
          }
        },
        // Phase 1 -> 2: Move to role select
        {
          delay: 2200,
          action: () => {
            const pos = getRelativePosition(roleSelectRef, 20, 20)
            setCursorPos(pos)
            setPhase(2)
          }
        },
        // Click role select to open dropdown
        {
          delay: 2600,
          action: () => setIsClicking(true)
        },
        {
          delay: 2800,
          action: () => {
            setIsClicking(false)
            setShowRoleDropdown(true) // Open dropdown
          }
        },
        // Move to CFO option
        {
          delay: 3000,
          action: () => {
            const pos = getRelativePosition(roleOptionRef, 20, 10)
            setCursorPos(pos)
          }
        },
        // Click CFO option
        {
          delay: 3400,
          action: () => setIsClicking(true)
        },
        {
          delay: 3600,
          action: () => {
            setIsClicking(false)
            setSelectedRole(ROLES[4]) // Select "CFO / Finance Director"
            setShowRoleDropdown(false) // Close dropdown
          }
        },
        // Phase 2 -> 3: Automatically transition to text input (input box appears)
        {
          delay: 4000,
          action: () => {
            setPhase(3) // Move to text input phase
            // Hide cursor briefly
            setCursorPos({ x: 50, y: -50 })
          }
        },
        // Phase 3: Move cursor to input field
        {
          delay: 4600,
          action: () => {
            const pos = getRelativePosition(inputRef, 20, 20)
            setCursorPos(pos)
          }
        },
        // Type the prompt character by character (faster, 50ms per char)
        ...fullPrompt.split('').map((_, i) => ({
          delay: 5000 + i * 50,
          action: () => setTypedText(fullPrompt.slice(0, i + 1))
        })),
        // Move to submit button (container is scale-125 in phase 3; use rect center and scale so cursor lands on button)
        {
          delay: 5000 + fullPrompt.length * 50 + 400,
          action: () => {
            if (submitButtonRef.current && containerRef.current) {
              const cr = containerRef.current.getBoundingClientRect()
              const er = submitButtonRef.current.getBoundingClientRect()
              const scale = 1.25
              setCursorPos({
                x: (er.left - cr.left + er.width / 2) / scale,
                y: (er.top - cr.top + er.height / 2) / scale
              })
            }
          }
        },
        // Click submit button
        {
          delay: 5000 + fullPrompt.length * 50 + 800,
          action: () => setIsClicking(true)
        },
        {
          delay: 5000 + fullPrompt.length * 50 + 1000,
          action: () => {
            setIsClicking(false)
            setPhase(4) // Processing
          }
        },
        // Phase 4 -> 5: Start reasoning process
        {
          delay: 5000 + fullPrompt.length * 50 + 1300,
          action: () => {
            setPhase(5)
            setCursorPos({ x: 50, y: -50 }) // Hide cursor
            setReasoningStep(1) // Understanding request
          }
        },
        // Reasoning steps with faster progression
        {
          delay: 5000 + fullPrompt.length * 50 + 2000,
          action: () => setReasoningStep(2) // Fetching QuickBooks docs
        },
        {
          delay: 5000 + fullPrompt.length * 50 + 3200,
          action: () => setReasoningStep(3) // Analyzing requirements
        },
        {
          delay: 5000 + fullPrompt.length * 50 + 4600,
          action: () => setReasoningStep(4) // Planning migration
        },
        {
          delay: 5000 + fullPrompt.length * 50 + 6000,
          action: () => setReasoningStep(5) // Complete
        },
        // Phase 5 -> 6: Show response and start typewriter animations
        {
          delay: 5000 + fullPrompt.length * 50 + 7000,
          action: () => {
            setPhase(6)
            setShowMainText(true)
          }
        },
        // Wait for all typewriter animations to complete (~6500ms) then move cursor to button
        {
          delay: 5000 + fullPrompt.length * 50 + 7000 + 6500,
          action: () => {
            const pos = getRelativePosition(ctaButtonRef, ctaButtonRef.current ? ctaButtonRef.current.offsetWidth / 2 : 200, 24)
            setCursorPos(pos)
          }
        },
        // Click button
        {
          delay: 5000 + fullPrompt.length * 50 + 7000 + 7000,
          action: () => setIsClicking(true)
        },
        {
          delay: 5000 + fullPrompt.length * 50 + 7000 + 7200,
          action: () => {
            setIsClicking(false)
            setButtonClicked(true)
          }
        },
        // Scroll to next section
        {
          delay: 5000 + fullPrompt.length * 50 + 7000 + 7700,
          action: () => {
            // Find the next section (Connection Setup)
            const nextSection = sectionRef.current?.parentElement?.nextElementSibling
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
            // Hide cursor after scroll
            setCursorPos({ x: 50, y: -50 })
          }
        },
      ]

      sequence.forEach(item => {
        timers.push(setTimeout(item.action, item.delay))
      })
    }, 200)

    timers.push(initDelay)

    return () => timers.forEach(t => clearTimeout(t))
  }, [hasStarted, fullPrompt])

  return (
    <div ref={sectionRef} className="bg-white border border-black/10">
      <div className="p-8 bg-neutral-50/50 flex items-center justify-center relative overflow-hidden h-[740px]">
        <div ref={containerRef} className={`w-full relative transition-all duration-700 h-full flex items-center justify-center overflow-hidden ${phase >= 4 ? 'max-w-3xl' : 'max-w-2xl'} ${phase === 3 ? 'scale-125' : phase >= 4 ? 'scale-110' : 'scale-100'}`}>
            {/* Animated cursor - pointer-events-none so real clicks hit content below */}
            <div
              className="absolute z-50 pointer-events-none transition-all duration-300 ease-out"
              style={{ left: cursorPos.x, top: cursorPos.y }}
              aria-hidden
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className={`transition-transform duration-100 ${isClicking ? 'scale-90' : 'scale-100'}`}
              >
                <path
                  d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.86a.5.5 0 0 0-.85.35Z"
                  fill="#000"
                  stroke="#fff"
                  strokeWidth="1.5"
                />
              </svg>
              {isClicking && (
                <div className="absolute top-0 left-0 w-6 h-6 bg-black/20 rounded-full animate-ping" />
              )}
            </div>

            {/* Main Content Area - explicit pointer-events so clicks register correctly */}
            <div className="w-full flex flex-col gap-12 transition-all duration-700 items-center relative z-10 pointer-events-auto">
                {/* Phase 0-2: Selector View */}
                {phase < 3 && (
                  <>
                    {/* Title */}
                    <h2 className="text-sm font-medium text-black/40 text-center tracking-[0.2em] uppercase">
                      Tell us about yourself
                    </h2>

                    {/* Department and Role Selectors - Inline format */}
                    <div className="w-full flex items-center justify-center gap-4 text-2xl flex-wrap">
                      <span className="text-black">I work in</span>
                      
                      {/* Department Select */}
                      <div className="relative">
                        <div
                          ref={deptSelectRef}
                          role="button"
                          tabIndex={0}
                          onClick={() => { setShowDeptDropdown(prev => !prev); if (!showDeptDropdown) setPhase(p => p < 1 ? 1 : p); }}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setShowDeptDropdown(prev => !prev); if (!showDeptDropdown) setPhase(p => p < 1 ? 1 : p); } }}
                          className={`relative px-6 py-3 bg-[#f5f5f5] border transition-all cursor-pointer flex items-center gap-3 min-w-[200px] ${
                            showDeptDropdown ? 'border-black' : phase >= 1 ? 'border-black/20' : 'border-black/10'
                          }`}
                        >
                          <span className={`flex-1 text-xl ${selectedDept ? 'text-black' : 'text-black/40'}`}>
                            {selectedDept || 'Operations'}
                          </span>
                          <svg className={`w-5 h-5 text-black/40 transition-transform ${showDeptDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                        
                        {/* Department Dropdown */}
                        {showDeptDropdown && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-black/10 shadow-lg z-50 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                            {DEPARTMENT_OPTIONS.map((dept, idx) => (
                              <div
                                key={idx}
                                ref={idx === 1 ? deptOptionRef : undefined}
                                role="option"
                                tabIndex={0}
                                onClick={() => { setSelectedDept(dept); setShowDeptDropdown(false); setPhase(p => p < 2 ? 2 : p); }}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedDept(dept); setShowDeptDropdown(false); setPhase(p => p < 2 ? 2 : p); } }}
                                className={`px-4 py-2.5 text-base cursor-pointer transition-colors ${
                                  idx === 1 ? 'bg-black/5 hover:bg-black/10' : 'hover:bg-black/5'
                                }`}
                              >
                                {dept}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <span className="text-black">as</span>

                      {/* Role Select */}
                      <div className="relative">
                        <div
                          ref={roleSelectRef}
                          role="button"
                          tabIndex={0}
                          onClick={() => { setShowRoleDropdown(prev => !prev); if (!showRoleDropdown) setPhase(p => p < 2 ? 2 : p); }}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setShowRoleDropdown(prev => !prev); if (!showRoleDropdown) setPhase(p => p < 2 ? 2 : p); } }}
                          className={`relative px-6 py-3 bg-[#f5f5f5] border transition-all cursor-pointer flex items-center gap-3 min-w-[280px] ${
                            showRoleDropdown ? 'border-black' : phase >= 2 ? 'border-black/20' : 'border-black/10'
                          }`}
                        >
                          <span className={`flex-1 text-xl ${selectedRole ? 'text-black' : 'text-black/40'}`}>
                            {selectedRole || 'Digital Transformation'}
                          </span>
                          <svg className={`w-5 h-5 text-black/40 transition-transform ${showRoleDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                        
                        {/* Role Dropdown */}
                        {showRoleDropdown && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-black/10 shadow-lg z-50 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                            {ROLES.map((role, idx) => (
                              <div
                                key={idx}
                                ref={idx === 4 ? roleOptionRef : undefined}
                                role="option"
                                tabIndex={0}
                                onClick={() => { setSelectedRole(role); setShowRoleDropdown(false); }}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedRole(role); setShowRoleDropdown(false); } }}
                                className={`px-4 py-2.5 text-base cursor-pointer transition-colors ${
                                  idx === 4 ? 'bg-black/5 hover:bg-black/10' : 'hover:bg-black/5'
                                }`}
                              >
                                {role}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Phase 3: Text Input View (typing) */}
                {phase === 3 && (
                  <>
                    {/* Title */}
                    <h2 className="text-3xl font-medium text-black text-center tracking-tight">
                      What do you need help with?
                    </h2>

                    <div className="w-full flex flex-col gap-3">
                      {/* Input Box */}
                      <div className="w-full relative">
                        <div
                          ref={inputRef}
                          className="w-full min-h-[160px] px-5 py-4 text-base text-black bg-[#fafafa] border border-black transition-colors"
                        >
                          <div className="flex items-start min-h-[20px]">
                            <span className="text-base text-black">{typedText}</span>
                            <span className="animate-pulse ml-0.5 text-black">|</span>
                          </div>
                        </div>

                        {/* Character Counter */}
                        <div className="mt-2 flex items-center justify-end text-xs">
                          <p className="text-black/40">{typedText.length}/{fullPrompt.length}</p>
                        </div>
                      </div>

                      {/* Submit Button - closer to input */}
                      <button
                        ref={submitButtonRef}
                        className="px-16 py-4 text-base font-medium transition-all border border-black text-black hover:bg-black hover:text-white cursor-pointer w-fit"
                      >
                        Continue
                      </button>
                    </div>
                  </>
                )}

                {/* Phase 4-6: Chat Interface View */}
                {phase >= 4 && (
                  <div className="w-full space-y-4 transition-all duration-700">
                    {/* User message */}
                    <div className="flex justify-end animate-in fade-in duration-500">
                      <div className="bg-black text-white px-6 py-4 max-w-[80%] text-base leading-relaxed rounded-lg shadow-sm">
                        {typedText}
                      </div>
                    </div>

                    {/* AI Reasoning Process - Steps appear one by one with minimal spinner */}
                    <div className={`transition-all duration-700 ${phase >= 6 ? 'opacity-0 max-h-0 overflow-hidden' : 'opacity-100 max-h-[520px]'}`}>
                      {phase >= 5 && (
                      <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-3 duration-500">
                        <div className="bg-white border border-black/10 p-6 min-w-0 max-w-2xl">
                          <div className="space-y-4">
                            {[
                              { title: "Understanding your request", desc: "Identified M&A scenario: QuickBooks → NetSuite migration for acquired entity" },
                              { title: "Fetching QuickBooks & NetSuite documentation", desc: "Retrieved data schemas, API specs, field mappings, and migration best practices" },
                              { title: "Analyzing typical integration requirements", desc: "Checking common M&A pitfalls: data reconciliation, fiscal years, multi-subsidiary setup" },
                              { title: "Planning migration strategy", desc: "Structuring phased approach: discovery → mapping → testing → cutover" }
                            ].map((step, idx) => {
                              const stepNum = idx + 1
                              if (reasoningStep < stepNum) return null
                              const isDone = reasoningStep > stepNum
                              const isActive = reasoningStep === stepNum
                              return (
                                <div
                                  key={stepNum}
                                  className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300"
                                >
                                  <div className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 ${
                                    isDone ? 'bg-black' : isActive ? 'bg-transparent border-2 border-black/20' : 'bg-black/5'
                                  }`}>
                                    {isDone ? (
                                      <Check className="w-3 h-3 text-white" />
                                    ) : isActive ? (
                                      <svg className="w-3.5 h-3.5 animate-spin text-black/50" viewBox="0 0 24 24" aria-hidden>
                                        <circle className="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                                        <path className="opacity-100" fill="currentColor" d="M12 2a10 10 0 0 1 10 10h-2a8 8 0 0 0-8-8V2z" />
                                      </svg>
                                    ) : (
                                      <span className="text-xs text-black/30">{stepNum}</span>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-sm text-black/80 font-medium">{step.title}</div>
                                    <div className="text-sm text-black/40 mt-1 leading-relaxed">{step.desc}</div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                      )}
                    </div>

                    {/* AI Response Messages (phase 6) - Replaces reasoning card */}
                    {phase >= 6 && (
                      <>
                        <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
                          <div className="space-y-5 min-w-0 max-w-prose">
                              {/* Opening bubble: context pill + acknowledgment */}
                              <div className="bg-white/90 border border-black/5 rounded-lg px-5 py-4 shadow-sm">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                  <span className="font-mono text-[10px] text-black/45 uppercase tracking-wider">Understanding</span>
                                  <span className="px-2 py-0.5 rounded bg-black/5 border border-black/10 font-mono text-[10px] text-black/60">QuickBooks → NetSuite</span>
                                </div>
                                <p className="text-base text-black/90 leading-relaxed">
                                  {showMainText && (
                                    <TypewriterText
                                      text="Perfect — I understand you need to migrate an acquired company from QuickBooks to NetSuite. This is a common scenario in M&A transactions, and I can help you plan this migration efficiently."
                                      speed={18}
                                      onComplete={() => setShowStep1(true)}
                                    />
                                  )}
                                </p>
                              </div>

                              {/* Analysis steps bubble */}
                              {showStep1 && (
                                <div className="bg-white/90 border border-black/5 rounded-lg px-5 py-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                                  <div className="flex items-center justify-between mb-3">
                                    <span className="font-mono text-xs text-black/50 uppercase tracking-wider">Analyzing your requirements</span>
                                    <span className="font-mono text-[10px] text-black/40">{showStep3 ? "3/3" : showStep2 ? "2/3" : "1/3"}</span>
                                  </div>
                                  <div className="space-y-3">
                                    <div className="flex items-start gap-2.5 text-sm text-black/75 leading-snug">
                                      <span className="text-black/40 mt-0.5 font-medium">→</span>
                                      <span>
                                        <TypewriterText
                                          text="Analyzing QuickBooks data structure, transaction volume, and historical records"
                                          speed={18}
                                          delay={50}
                                          onComplete={() => setShowStep2(true)}
                                        />
                                      </span>
                                    </div>
                                    {showStep2 && (
                                      <div className="flex items-start gap-2.5 text-sm text-black/75 leading-snug animate-in fade-in duration-200">
                                        <span className="text-black/40 mt-0.5 font-medium">→</span>
                                        <span>
                                          <TypewriterText
                                            text="Checking for third-party integrations, custom workflows, and reporting requirements"
                                            speed={18}
                                            delay={50}
                                            onComplete={() => setShowStep3(true)}
                                          />
                                        </span>
                                      </div>
                                    )}
                                    {showStep3 && (
                                      <div className="flex items-start gap-2.5 text-sm text-black/75 leading-snug animate-in fade-in duration-200">
                                        <span className="text-black/40 mt-0.5 font-medium">→</span>
                                        <span>
                                          <TypewriterText
                                            text="Planning phased migration timeline to minimize business disruption"
                                            speed={18}
                                            delay={50}
                                            onComplete={() => setShowFinalText(true)}
                                          />
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Final bubble: clear "next step" ask */}
                              {showFinalText && (
                                <div className="bg-white/90 border border-black/5 rounded-lg px-5 py-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                                  <div className="font-mono text-[10px] text-black/50 uppercase tracking-wider mb-2">Next step</div>
                                  <p className="text-base text-black/85 leading-relaxed">
                                    <TypewriterText
                                      text="To provide you with an accurate scope, timeline, and fixed-price quote, I'll need secure read-only access to your QuickBooks instance. This will allow me to assess data complexity, identify potential issues, and create a detailed migration plan."
                                      speed={18}
                                      delay={200}
                                      onComplete={() => {}}
                                    />
                                  </p>
                                </div>
                              )}

                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// Connection Setup - Step 0.5 with Animated Cursor
// ============================================
const ERP_SYSTEMS = [
  { id: "netsuite", name: "NetSuite", logo: "/images/netsuite-logo.svg" },
  { id: "sap", name: "SAP", logo: "/images/sap-logo.png" },
  { id: "dynamics", name: "Microsoft Dynamics", logo: "/images/dynamics-logo.png" },
  { id: "sage", name: "Sage", logo: "/images/sage-logo.png" },
  { id: "quickbooks", name: "QuickBooks", logo: "/images/quickbooks-logo.svg" },
  { id: "xero", name: "Xero", logo: "/images/xero-logo.svg" },
  { id: "epicor", name: "Epicor", logo: "/images/epicor-logo.svg" },
  { id: "infor", name: "Infor", logo: "/images/infor-logo.svg" },
  { id: "workday", name: "Workday", logo: "/images/workday-logo.svg" },
  { id: "peoplesoft", name: "PeopleSoft", logo: "/images/peoplesoft-logo.svg" },
  { id: "odoo", name: "Odoo", logo: "/images/odoo-logo.svg" },
  { id: "acumatica", name: "Acumatica", logo: "/images/acumatica-logo.png" },
  { id: "zoho", name: "Zoho", logo: "/images/zoho-logo.png" },
  { id: "wave", name: "Wave", logo: "/images/wave-logo.svg" },
] as const

function ConnectionSetup() {
  const [phase, setPhase] = useState(0)
  // Phases: 0=NDA, 1=agreed, 2=systems, 3=selected, 4-6=credentials (account/token/secret), 7=connect click, 8=connecting, 9=approved

  const [typedAccount, setTypedAccount] = useState('')
  const [typedToken, setTypedToken] = useState('')
  const [typedSecret, setTypedSecret] = useState('')
  const [cursorPos, setCursorPos] = useState({ x: 50, y: -30 }) // Start off-screen
  const [isClicking, setIsClicking] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [selectedSystems, setSelectedSystems] = useState<string[]>([])
  const sectionRef = React.useRef<HTMLDivElement>(null)

  // Refs for pixel-perfect cursor positioning
  const accountInputRef = useRef<HTMLDivElement>(null)
  const tokenInputRef = useRef<HTMLDivElement>(null)
  const secretInputRef = useRef<HTMLDivElement>(null)
  const connectButtonRef = useRef<HTMLButtonElement>(null)
  const formContainerRef = useRef<HTMLDivElement>(null)
  const checkboxRef = useRef<HTMLDivElement>(null)
  const quickbooksChipRef = useRef<HTMLDivElement>(null)
  const netsuiteChipRef = useRef<HTMLDivElement>(null)

  // Start animation only when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasStarted])

  const accountId = 'TSTDRV2847365'
  const tokenMask = '••••••••••••'
  const [buttonPressed, setButtonPressed] = useState(false)

  // Helper to get element position relative to form container
  const getRelativePosition = (ref: React.RefObject<HTMLElement | null>, offsetX = 20, offsetY = 20) => {
    if (!ref.current || !formContainerRef.current) {
      return { x: 50, y: 50 }
    }
    const containerRect = formContainerRef.current.getBoundingClientRect()
    const elementRect = ref.current.getBoundingClientRect()
    return {
      x: elementRect.left - containerRect.left + offsetX,
      y: elementRect.top - containerRect.top + offsetY
    }
  }

  // Animation sequence: agreement (0-1) → systems (2-3) → credentials (4-8) → approved (9)
  useEffect(() => {
    if (!hasStarted) return

    const timers: ReturnType<typeof setTimeout>[] = []

    const initDelay = setTimeout(() => {
      const sequence = [
        // Phase 0: NDA visible — move cursor to checkbox
        { delay: 500, action: () => { const pos = getRelativePosition(checkboxRef, 12, 12); setCursorPos(pos) } },
        // Phase 1: Click agree
        { delay: 1200, action: () => setIsClicking(true) },
        { delay: 1500, action: () => { setIsClicking(false); setPhase(1) } },
        // Phase 2: Show systems selector
        { delay: 2200, action: () => { setPhase(2) } },
        // Cursor moves to QuickBooks chip
        { delay: 2700, action: () => { const pos = getRelativePosition(quickbooksChipRef, 40, 14); setCursorPos(pos) } },
        { delay: 3100, action: () => setIsClicking(true) },
        { delay: 3250, action: () => { setIsClicking(false); setSelectedSystems(['quickbooks']) } },
        // Cursor moves to NetSuite chip
        { delay: 3600, action: () => { const pos = getRelativePosition(netsuiteChipRef, 35, 14); setCursorPos(pos) } },
        { delay: 4000, action: () => setIsClicking(true) },
        { delay: 4150, action: () => { setIsClicking(false); setSelectedSystems(['quickbooks', 'netsuite']); setPhase(3) } },
        // Phase 4: credentials
        { delay: 5400, action: () => {
            setPhase(4)
            const t = setTimeout(() => { const pos = getRelativePosition(accountInputRef, 25, 20); setCursorPos(pos) }, 50)
            timers.push(t)
          }
        },
        // Type account ID
        ...accountId.split('').map((_, i) => ({ delay: 5400 + i * 80, action: () => setTypedAccount(accountId.slice(0, i + 1)) })),
        // Phase 5: token
        { delay: 7000, action: () => { const pos = getRelativePosition(tokenInputRef, 25, 20); setCursorPos(pos); setPhase(5) } },
        ...tokenMask.split('').map((_, i) => ({ delay: 7150 + i * 60, action: () => setTypedToken(tokenMask.slice(0, i + 1)) })),
        // Phase 6: secret
        { delay: 8200, action: () => { const pos = getRelativePosition(secretInputRef, 25, 20); setCursorPos(pos); setPhase(6) } },
        ...tokenMask.split('').map((_, i) => ({ delay: 8350 + i * 60, action: () => setTypedSecret(tokenMask.slice(0, i + 1)) })),
        // Phase 7: connect button
        { delay: 9500, action: () => { const pos = getRelativePosition(connectButtonRef, 180, 20); setCursorPos(pos) } },
        { delay: 10200, action: () => setButtonPressed(true) },
        { delay: 10500, action: () => setIsClicking(true) },
        { delay: 10800, action: () => { setIsClicking(false); setPhase(7) } },
        { delay: 11000, action: () => setButtonPressed(false) },
        { delay: 11150, action: () => setPhase(8) }, // connecting
        { delay: 13500, action: () => { setPhase(9); setCursorPos({ x: 50, y: -30 }) } }, // approved
      ]

      sequence.forEach(item => timers.push(setTimeout(item.action, item.delay)))
    }, 200)

    timers.push(initDelay)
    return () => timers.forEach(t => clearTimeout(t))
  }, [hasStarted])

  // Map phase to step completion (3 steps: agreement → systems → credentials; "Connection approved" shows only on the right once done)
  const getStepStatus = (stepIndex: number) => {
    if (stepIndex === 0) return phase >= 2 ? 'done' : phase >= 0 ? 'active' : 'pending'   // Sign data agreement
    if (stepIndex === 1) return phase >= 4 ? 'done' : phase >= 2 ? 'active' : 'pending'   // Select systems
    if (stepIndex === 2) return phase >= 9 ? 'done' : phase >= 4 ? 'active' : 'pending'   // Enter credentials
    return 'pending'
  }

  const steps = [
    { id: 'agreement', icon: FileSignature, title: 'Sign data agreement', description: 'Review and accept terms' },
    { id: 'systems', icon: Database, title: 'Select systems', description: 'Choose ERP and version' },
    { id: 'credentials', icon: Key, title: 'Enter credentials', description: 'Securely connect to your ERP' },
  ]

  return (
    <div ref={sectionRef} className="bg-white border border-black/10">
      <div className="grid lg:grid-cols-2">
        {/* Left: Setup steps */}
        <div className="p-14 border-r border-black/10 flex items-start">
          <div className="space-y-6 w-full">
            {steps.map((step, i) => {
              const Icon = step.icon
              const status = getStepStatus(i)

              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-5 p-5 border transition-all duration-500 ${
                    status === 'done' ? 'border-black/10 bg-black/[0.02]' :
                    status === 'active' ? 'border-black/20 bg-black/[0.02]' :
                    'border-black/5 opacity-50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    status === 'done' ? 'bg-black' :
                    status === 'active' ? 'bg-black/10' :
                    'bg-black/[0.04]'
                  }`}>
                    {status === 'done' ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : status === 'active' ? (
                      <Loader2 className="w-5 h-5 text-black/60 animate-spin" />
                    ) : (
                      <Icon className="w-5 h-5 text-black/20" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium text-base ${status !== 'pending' ? 'text-black' : 'text-black/30'}`}>
                      {step.title}
                    </div>
                    <div className={`text-sm ${status !== 'pending' ? 'text-black/40' : 'text-black/25'}`}>{step.description}</div>
                  </div>
                  {status === 'done' && (
                    <CheckCircle2 className="w-6 h-6 text-black/20" />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: Visual preview with animated cursor */}
        <div className="p-14 bg-neutral-50/50 flex items-center justify-center relative overflow-hidden">
          <div ref={formContainerRef} className="w-full max-w-lg relative min-h-[480px]">
            {/* Animated cursor */}
            <div
              className="absolute z-50 pointer-events-none transition-all duration-200 ease-out"
              style={{ left: cursorPos.x, top: cursorPos.y }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className={`transition-transform duration-100 ${isClicking ? 'scale-90' : 'scale-100'}`}
              >
                <path
                  d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.86a.5.5 0 0 0-.85.35Z"
                  fill="#000"
                  stroke="#fff"
                  strokeWidth="1.5"
                />
              </svg>
              {isClicking && (
                <div className="absolute top-0 left-0 w-6 h-6 bg-black/20 rounded-full animate-ping" />
              )}
            </div>

            {/* Step 1: Data Agreement - shown first */}
            <div className={`transition-all duration-500 ${
              phase < 2 ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
            }`}>
              <div className="bg-white border-2 border-black/10 p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <FileSignature className="w-6 h-6 text-black/60" />
                  <span className="font-mono text-sm text-black/60 uppercase tracking-wider font-medium">Data Agreement</span>
                </div>
                <div className="space-y-4 text-base text-black/60 mb-6 leading-relaxed">
                  <p className="flex items-start gap-2">
                    <span className="text-black/30 mt-0.5">•</span>
                    <span>Read-only access to system data</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-black/30 mt-0.5">•</span>
                    <span>Data encrypted in transit and at rest</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-black/30 mt-0.5">•</span>
                    <span>No data stored beyond analysis</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-black/30 mt-0.5">•</span>
                    <span>SOC 2 Type II compliant</span>
                  </p>
                </div>
                <div className="pt-4 border-t border-black/10">
                  <div className="flex items-center gap-3 cursor-pointer">
                    <div
                      ref={checkboxRef}
                      className={`w-6 h-6 border-2 flex items-center justify-center transition-all ${
                        phase >= 1 ? 'bg-black border-black' : 'border-black/30'
                      }`}
                    >
                      {phase >= 1 && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <span className="text-base text-black/70">I agree to the terms</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Select systems — clickable chip grid */}
            <div className={`transition-all duration-500 ${
              phase >= 2 && phase < 4 ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
            }`}>
              <div className="bg-white border-2 border-black/10 p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Database className="w-6 h-6 text-black/60" />
                  <span className="font-mono text-sm text-black/60 uppercase tracking-wider font-medium">Select Systems</span>
                </div>
                <p className="text-base text-black/50 mb-5">Choose ERP and platforms — Source will scan what you pick</p>
                <div className="flex flex-wrap gap-2">
                  {ERP_SYSTEMS.map((sys) => {
                    const isSelected = selectedSystems.includes(sys.id)
                    return (
                      <div
                        key={sys.id}
                        ref={sys.id === 'quickbooks' ? quickbooksChipRef : sys.id === 'netsuite' ? netsuiteChipRef : undefined}
                        onClick={() => {
                          setSelectedSystems(prev =>
                            prev.includes(sys.id) ? prev.filter(s => s !== sys.id) : [...prev, sys.id]
                          )
                        }}
                        className={`px-4 py-2 text-base font-mono cursor-pointer transition-all border ${
                          isSelected
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-black/60 border-black/10 hover:border-black/30'
                        }`}
                      >
                        {sys.name}
                      </div>
                    )
                  })}
                </div>
                {selectedSystems.length > 0 && (
                  <p className="font-mono text-[10px] text-black/40 mt-4 pt-3 border-t border-black/10">
                    {selectedSystems.length} system{selectedSystems.length !== 1 ? 's' : ''} selected for scan
                  </p>
                )}
              </div>
            </div>

            {/* Step 3: Credentials form */}
            <div className={`transition-all duration-500 ${phase >= 4 && phase < 9 ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
              <div className="space-y-5">
                <div>
                  <label className="block font-mono text-xs text-black/40 uppercase tracking-wider mb-2.5">Account ID</label>
                  <div
                    ref={accountInputRef}
                    className={`w-full h-12 bg-white border px-4 flex items-center transition-colors ${phase === 4 ? 'border-black' : 'border-black/10'}`}
                  >
                    <span className="font-mono text-base text-black/70">{typedAccount}</span>
                    {phase === 4 && <span className="animate-pulse ml-0.5">|</span>}
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-xs text-black/40 uppercase tracking-wider mb-2.5">Token ID</label>
                  <div
                    ref={tokenInputRef}
                    className={`w-full h-12 bg-white border px-4 flex items-center transition-colors ${phase === 5 ? 'border-black' : 'border-black/10'}`}
                  >
                    <span className="font-mono text-base text-black/50">{typedToken}</span>
                    {phase === 5 && <span className="animate-pulse ml-0.5">|</span>}
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-xs text-black/40 uppercase tracking-wider mb-2.5">Token Secret</label>
                  <div
                    ref={secretInputRef}
                    className={`w-full h-12 bg-white border px-4 flex items-center transition-colors ${phase === 6 ? 'border-black' : 'border-black/10'}`}
                  >
                    <span className="font-mono text-base text-black/50">{typedSecret}</span>
                    {phase === 6 && <span className="animate-pulse ml-0.5">|</span>}
                  </div>
                </div>
                <button
                  ref={connectButtonRef}
                  className={`w-full h-12 font-mono text-sm tracking-wider transition-all duration-150 ${
                    buttonPressed ? 'bg-black/70 text-white scale-[0.98] shadow-inner' :
                    phase >= 7 && phase < 9 ? 'bg-black/80 text-white' :
                    'bg-black text-white hover:bg-black/90'
                  }`}
                >
                  {phase >= 7 && phase < 9 ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      CONNECTING...
                    </span>
                  ) : 'CONNECT SECURELY'}
                </button>
              </div>
            </div>

            {/* Step 4: Connection approved */}
            <div className={`transition-all duration-500 ${
              phase >= 9 ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
            }`}>
              <div className="bg-white border-2 border-black/10 p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle2 className="w-6 h-6 text-black/60" />
                  <span className="font-mono text-sm text-black/60 uppercase tracking-wider font-medium">Connection Approved</span>
                </div>
                <div className="space-y-4 text-base text-black/60 leading-relaxed">
                  <p className="flex items-start gap-2">
                    <span className="text-black/30 mt-0.5">•</span>
                    <span>Secure read-only access granted</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-black/30 mt-0.5">•</span>
                    <span>2 systems connected — QuickBooks, NetSuite</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-black/30 mt-0.5">•</span>
                    <span>Credentials verified and encrypted</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-black/30 mt-0.5">•</span>
                    <span>Ready to begin system scan</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// System Architecture Discovery - Chain of Thought Style
// ============================================
function SystemMapDiscovery() {
  const [visibleSteps, setVisibleSteps] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Start animation only when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasStarted])

  // Discovery steps - each one reveals more of the system
  const discoverySteps = [
    {
      id: 'approved',
      type: 'status',
      icon: Shield,
      text: 'Connection approved',
      result: 'Secure connection to NetSuite established',
    },
    {
      id: 'scan-channels',
      type: 'discovery',
      icon: ShoppingCart,
      text: 'Scanning sales channels...',
      result: 'Found 3 channels: Shopify, Amazon, Square POS',
      systems: ['shopify', 'amazon', 'pos'],
    },
    {
      id: 'scan-middleware',
      type: 'discovery',
      icon: Globe,
      text: 'Detecting middleware & integrations...',
      result: 'Found 2 iPaaS: Celigo (unhealthy), Boomi',
      systems: ['celigo', 'boomi'],
      warning: true,
    },
    {
      id: 'scan-backoffice',
      type: 'discovery',
      icon: BarChart3,
      text: 'Mapping back-office systems...',
      result: 'Found 3 systems: QuickBooks, HubSpot, 3PL Warehouse',
      systems: ['quickbooks', 'hubspot', 'warehouse'],
    },
    {
      id: 'scan-external',
      type: 'discovery',
      icon: CreditCard,
      text: 'Checking external services...',
      result: 'Found 3 services: Stripe (errors), Avalara, ShipStation',
      systems: ['stripe', 'avalara', 'shipstation'],
      warning: true,
    },
    {
      id: 'scan-scripts',
      type: 'discovery',
      icon: Zap,
      text: 'Analyzing customizations...',
      result: 'Found 3 scripts: Order Sync, Inventory Calc, Commission (failing)',
      systems: ['script1', 'script2', 'script3'],
      warning: true,
    },
    {
      id: 'map-connections',
      type: 'analysis',
      icon: Search,
      text: 'Tracing data flows...',
      result: '17 connections mapped, 4 with issues detected',
      showConnections: true,
    },
    {
      id: 'issues',
      type: 'finding',
      icon: Sparkles,
      text: 'Analyzing for issues...',
      result: '3 issues require attention',
      showFindings: true,
    },
    {
      id: 'questions',
      type: 'next',
      icon: HelpCircle,
      text: 'Identifying questions to ask...',
      result: 'Ready to capture your business knowledge',
      showScrollPrompt: true,
    },
  ]

  // System positions for the graph
  const systemPositions: Record<string, { x: number; y: number; name: string; type: string; status?: string }> = {
    netsuite: { x: 50, y: 50, name: 'NetSuite', type: 'ERP Core' },
    shopify: { x: 15, y: 15, name: 'Shopify', type: 'E-Commerce', status: 'healthy' },
    amazon: { x: 35, y: 12, name: 'Amazon', type: 'Marketplace', status: 'warning' },
    pos: { x: 55, y: 15, name: 'Square POS', type: 'Retail', status: 'healthy' },
    celigo: { x: 20, y: 35, name: 'Celigo', type: 'iPaaS', status: 'error' },
    boomi: { x: 40, y: 32, name: 'Boomi', type: 'Integration', status: 'healthy' },
    quickbooks: { x: 15, y: 70, name: 'QuickBooks', type: 'Accounting', status: 'healthy' },
    hubspot: { x: 35, y: 75, name: 'HubSpot', type: 'CRM', status: 'warning' },
    warehouse: { x: 55, y: 70, name: '3PL', type: 'Fulfillment', status: 'healthy' },
    stripe: { x: 80, y: 25, name: 'Stripe', type: 'Payments', status: 'error' },
    avalara: { x: 85, y: 50, name: 'Avalara', type: 'Tax', status: 'healthy' },
    shipstation: { x: 80, y: 75, name: 'ShipStation', type: 'Shipping', status: 'healthy' },
    script1: { x: 70, y: 35, name: 'Order Sync', type: 'Script', status: 'warning' },
    script2: { x: 75, y: 50, name: 'Inventory', type: 'Workflow', status: 'healthy' },
    script3: { x: 70, y: 65, name: 'Commission', type: 'Script', status: 'error' },
  }

  const connections = [
    { from: 'shopify', to: 'celigo', status: 'error' },
    { from: 'amazon', to: 'celigo', status: 'warning' },
    { from: 'pos', to: 'boomi', status: 'healthy' },
    { from: 'celigo', to: 'netsuite', status: 'error' },
    { from: 'boomi', to: 'netsuite', status: 'healthy' },
    { from: 'netsuite', to: 'quickbooks', status: 'healthy' },
    { from: 'netsuite', to: 'hubspot', status: 'warning' },
    { from: 'netsuite', to: 'warehouse', status: 'healthy' },
    { from: 'netsuite', to: 'stripe', status: 'error' },
    { from: 'netsuite', to: 'avalara', status: 'healthy' },
    { from: 'netsuite', to: 'shipstation', status: 'healthy' },
    { from: 'netsuite', to: 'script1', status: 'warning' },
    { from: 'netsuite', to: 'script2', status: 'healthy' },
    { from: 'netsuite', to: 'script3', status: 'error' },
  ]

  const findings = [
    { severity: 'critical', icon: Globe, text: 'Celigo middleware down — 47 orders stuck in queue' },
    { severity: 'critical', icon: CreditCard, text: 'Stripe webhook failures — payments not syncing' },
    { severity: 'warning', icon: Zap, text: 'Commission script throwing errors on 15% of orders' },
  ]

  // Get visible systems based on current step
  const getVisibleSystems = () => {
    const visible = new Set<string>(['netsuite'])
    for (let i = 0; i <= visibleSteps; i++) {
      const step = discoverySteps[i]
      if (step?.systems) {
        step.systems.forEach(s => visible.add(s))
      }
    }
    return visible
  }

  const showConnections = discoverySteps.slice(0, visibleSteps + 1).some(s => s.showConnections)
  const showFindings = discoverySteps.slice(0, visibleSteps + 1).some(s => s.showFindings)
  const visibleSystems = getVisibleSystems()

  // Progressive animation - only starts when in view, much slower pace
  useEffect(() => {
    if (!hasStarted) return
    if (visibleSteps >= discoverySteps.length - 1) return
    const timer = setTimeout(() => {
      setVisibleSteps(prev => prev + 1)
    }, 2500)
    return () => clearTimeout(timer)
  }, [visibleSteps, hasStarted])

  return (
    <div ref={sectionRef} className="bg-white border border-black/10">
      <div className="grid lg:grid-cols-2 min-h-[600px]">
        {/* Left: Chain of Thought Log */}
        <div className="p-6 border-r border-black/10">
          {/* Steps */}
          <div className="space-y-1">
            {discoverySteps.map((step, i) => {
              const isVisible = i <= visibleSteps
              const isActive = i === visibleSteps && visibleSteps < discoverySteps.length - 1
              const isLast = i === visibleSteps && visibleSteps === discoverySteps.length - 1

              return (
                <div
                  key={step.id}
                  className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}
                >
                  {/* Step header */}
                  <div className="flex items-start gap-2 py-2">
                    {isActive && (
                      <Loader2 className="w-3 h-3 text-black/40 animate-spin flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-xs text-black/50">{step.text}</div>
                      {!isActive && (
                        <div className={`font-mono text-sm mt-0.5 ${step.warning ? 'text-amber-600' : 'text-black/80'}`}>
                          {step.result}
                        </div>
                      )}
                    </div>
                    {!isActive && !step.showScrollPrompt && (
                      <CheckCircle2 className="w-4 h-4 text-black/20 flex-shrink-0" />
                    )}
                  </div>

                  {/* Scroll prompt for last step */}
                  {step.showScrollPrompt && isLast && (
                    <div className="flex items-center justify-center py-4 animate-in fade-in slide-in-from-top-2 duration-500">
                      <div className="flex flex-col items-center gap-2 text-black/40">
                        <span className="font-mono text-[10px] uppercase tracking-wider">Continue to knowledge capture</span>
                        <ArrowDown className="w-4 h-4 animate-bounce" />
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

        </div>

        {/* Right: Visual Graph */}
        <div className="p-6 bg-neutral-50/50">
          <div className="relative h-full min-h-[500px]">
            {/* System nodes */}
            {Object.entries(systemPositions).map(([id, sys]) => {
              const isVisible = visibleSystems.has(id)
              const isCore = id === 'netsuite'
              const statusBorder = sys.status === 'error' ? 'border-red-300' :
                                   sys.status === 'warning' ? 'border-amber-300' :
                                   'border-black/10'
              const statusBg = sys.status === 'error' ? 'bg-red-50' :
                               sys.status === 'warning' ? 'bg-amber-50' :
                               'bg-white'

              return (
                <div
                  key={id}
                  className={`absolute transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                  style={{
                    left: `${sys.x}%`,
                    top: `${sys.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className={`${
                    isCore
                      ? 'px-4 py-3 bg-black text-white border-2 border-black'
                      : `px-3 py-2 border ${statusBorder} ${statusBg}`
                  } text-center`}>
                    <div className={`font-mono text-[10px] font-medium ${isCore ? 'text-white' : 'text-black/80'}`}>
                      {sys.name}
                    </div>
                    <div className={`font-mono text-[8px] ${isCore ? 'text-white/50' : 'text-black/40'}`}>
                      {sys.type}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// Knowledge Capture - Quiz Card Animation
// ============================================
function KnowledgeCapturePreview() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answerPhase, setAnswerPhase] = useState<'showing' | 'selecting' | 'answered'>('showing')
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  // Chat phase after quiz completion
  const [chatPhase, setChatPhase] = useState(0)
  // 0=showing completion, 1=transition to chat, 2=typing prompt, 3=sent, 4=reasoning, 5=response
  const [chatTypedText, setChatTypedText] = useState('')
  const [chatReasoningStep, setChatReasoningStep] = useState(0)
  const [showChatMainText, setShowChatMainText] = useState(false)
  const [showChatStep1, setShowChatStep1] = useState(false)
  const [showChatStep2, setShowChatStep2] = useState(false)
  const [showChatStep3, setShowChatStep3] = useState(false)
  const [showChatFinal, setShowChatFinal] = useState(false)
  const chatPrompt = "Our inventory counts are off between Shopify and NetSuite. Can you find the discrepancies and fix the sync?"

  const questions = [
    {
      category: "BUSINESS WORKFLOWS",
      icon: "📋",
      question: "How do you currently handle order fulfillment?",
      subtext: "This helps me understand your pick-pack-ship process",
      options: ["Direct from warehouse", "Drop-ship from vendors", "Mix of both", "Third-party 3PL"],
      correctAnswer: 2,
      insight: "Mixed fulfillment detected — I'll configure split routing rules"
    },
    {
      category: "TRIBAL KNOWLEDGE",
      icon: "🧠",
      question: "Who handles customer disputes and credits?",
      subtext: "I want to learn your approval chain",
      options: ["Customer service team", "Sales reps", "Finance team", "Depends on amount"],
      correctAnswer: 3,
      insight: "Amount-based routing — I'll set up approval thresholds"
    },
    {
      category: "INTEGRATIONS",
      icon: "🔗",
      question: "What's your primary sales channel?",
      subtext: "I'll prioritize this integration first",
      options: ["Shopify", "Amazon", "Wholesale/B2B", "Direct sales"],
      correctAnswer: 0,
      insight: "Shopify primary — I'll optimize that sync first"
    },
    {
      category: "PAIN POINTS",
      icon: "🎯",
      question: "What's your biggest frustration right now?",
      subtext: "I'll focus here first",
      options: ["Manual data entry", "Inventory accuracy", "Slow reports", "Integration errors"],
      correctAnswer: 1,
      insight: "Inventory issues flagged — scheduling daily reconciliation"
    },
    {
      category: "PRIORITIES",
      icon: "⚡",
      question: "How quickly do you need orders in NetSuite?",
      subtext: "This determines sync frequency",
      options: ["Real-time", "Every hour", "Twice daily", "Once daily"],
      correctAnswer: 0,
      insight: "Real-time sync enabled — webhooks configured"
    },
    {
      category: "REPORTING",
      icon: "📊",
      question: "Which reports does your team run most often?",
      subtext: "I'll pre-build these dashboards for you",
      options: ["Revenue by channel", "Inventory aging", "Cash flow forecast", "Customer lifetime value"],
      correctAnswer: 0,
      insight: "Revenue by channel prioritized — building dashboard now"
    },
    {
      category: "TEAM STRUCTURE",
      icon: "👥",
      question: "How many people touch your ERP daily?",
      subtext: "This helps me scope permissions and training",
      options: ["1–3 power users", "4–10 regular users", "10–25 across teams", "25+ company-wide"],
      correctAnswer: 1,
      insight: "Mid-size team — I'll set up role-based access views"
    },
    {
      category: "DATA QUALITY",
      icon: "🔍",
      question: "How do you handle duplicate records today?",
      subtext: "Duplicates are the #1 source of ERP errors",
      options: ["Manual cleanup", "Automated rules", "We don't — it's a mess", "Third-party dedup tool"],
      correctAnswer: 2,
      insight: "Dedup needed — I'll scan and flag duplicates automatically"
    },
    {
      category: "COMPLIANCE",
      icon: "🛡️",
      question: "Which compliance requirements apply to you?",
      subtext: "I'll configure audit trails accordingly",
      options: ["SOX compliance", "Multi-state tax (Nexus)", "Industry-specific (FDA, etc.)", "None currently"],
      correctAnswer: 1,
      insight: "Nexus detected — connecting tax engine for auto-calculation"
    },
    {
      category: "GROWTH",
      icon: "🚀",
      question: "What's your biggest scaling challenge this year?",
      subtext: "I'll focus optimization here",
      options: ["Adding new sales channels", "International expansion", "Warehouse automation", "Hiring & onboarding"],
      correctAnswer: 0,
      insight: "New channels incoming — I'll prep multi-channel sync templates"
    },
  ]


  // Animation loop
  useEffect(() => {
    if (currentQuestion >= questions.length) return

    // Phase 1: Show question
    const showTimer = setTimeout(() => {
      setAnswerPhase('selecting')
    }, 1200)

    // Phase 2: Animate selection
    const selectTimer = setTimeout(() => {
      setSelectedOption(questions[currentQuestion].correctAnswer)
    }, 2800)

    // Phase 3: Mark as answered
    const answerTimer = setTimeout(() => {
      setAnswerPhase('answered')
    }, 3600)

    // Phase 4: Move to next question
    const nextTimer = setTimeout(() => {
      setCurrentQuestion(prev => prev + 1)
      setAnswerPhase('showing')
      setSelectedOption(null)
    }, 5500)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(selectTimer)
      clearTimeout(answerTimer)
      clearTimeout(nextTimer)
    }
  }, [currentQuestion])

  // Chat animation after quiz completes
  useEffect(() => {
    if (currentQuestion < questions.length) return
    // Quiz just completed, start chat transition
    const timers: ReturnType<typeof setTimeout>[] = []

    // Show completion for 2.5s then transition to chat
    timers.push(setTimeout(() => setChatPhase(1), 2500))
    // Start typing the prompt
    timers.push(setTimeout(() => setChatPhase(2), 3000))
    // Type each character
    chatPrompt.split('').forEach((_, i) => {
      timers.push(setTimeout(() => setChatTypedText(chatPrompt.slice(0, i + 1)), 3200 + i * 30))
    })
    const typingDone = 3200 + chatPrompt.length * 30
    // Send message
    timers.push(setTimeout(() => setChatPhase(3), typingDone + 400))
    // Start reasoning
    timers.push(setTimeout(() => { setChatPhase(4); setChatReasoningStep(1) }, typingDone + 1000))
    timers.push(setTimeout(() => setChatReasoningStep(2), typingDone + 2200))
    timers.push(setTimeout(() => setChatReasoningStep(3), typingDone + 3400))
    timers.push(setTimeout(() => setChatReasoningStep(4), typingDone + 4600))
    timers.push(setTimeout(() => setChatReasoningStep(5), typingDone + 5800))
    // Show response
    timers.push(setTimeout(() => { setChatPhase(5); setShowChatMainText(true) }, typingDone + 6800))

    return () => timers.forEach(t => clearTimeout(t))
  }, [currentQuestion])

  const currentQ = questions[currentQuestion]
  const isComplete = currentQuestion >= questions.length

  return (
    <div className="bg-white border-2 border-black/10 overflow-hidden">
      <div className="min-h-[600px]">
        {/* Quiz Card */}
        <div className="p-10 flex flex-col min-h-[600px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-mono text-[10px] text-black/50 uppercase tracking-wider">Knowledge Capture</span>
            </div>
            <span className="font-mono text-[10px] text-black/40">
              {Math.min(currentQuestion + 1, questions.length)} of {questions.length}
            </span>
          </div>

          {/* Card container */}
          <div className="flex-1 flex items-center justify-center relative">
            {!isComplete ? (
              <div
                key={currentQuestion}
                className={`w-full max-w-lg transition-all duration-500 ${
                  answerPhase === 'showing' ? 'opacity-0 translate-y-8 scale-95' :
                  answerPhase === 'answered' ? 'opacity-0 -translate-y-8 scale-95' :
                  'opacity-100 translate-y-0 scale-100'
                }`}
              >
                <div className="bg-neutral-50 border-2 border-black/10 p-6 shadow-lg">
                  {/* Category badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">{currentQ?.icon}</span>
                    <span className="font-mono text-[9px] text-black/40 uppercase tracking-wider">{currentQ?.category}</span>
                  </div>

                  {/* Question */}
                  <h4 className="font-bold text-xl mb-2 tracking-tight">{currentQ?.question}</h4>
                  <p className="text-sm text-black/50 mb-6">{currentQ?.subtext}</p>

                  {/* Options */}
                  <div className="grid grid-cols-2 gap-3">
                    {currentQ?.options.map((opt, j) => {
                      const isSelected = selectedOption === j
                      return (
                        <div
                          key={j}
                          className={`px-4 py-3 text-sm border-2 transition-all duration-300 ${
                            isSelected
                              ? 'bg-black text-white border-black scale-[1.02] shadow-md'
                              : 'border-black/10 hover:border-black/20'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {isSelected && <Check className="w-4 h-4" />}
                            <span>{opt}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Insight appears after answer */}
                  {answerPhase === 'answered' && (
                    <div className="mt-4 pt-4 border-t border-black/10 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-2 border border-green-200">
                        <Sparkles className="w-4 h-4" />
                        <span>{currentQ?.insight}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : chatPhase < 1 ? (
              /* Brief completion state */
              <div className="text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h4 className="font-bold text-xl mb-2">Knowledge captured!</h4>
                <p className="text-sm text-black/50">Source now understands how you work</p>
              </div>
            ) : (
              /* Chat interface after completion */
              <div className="w-full max-w-2xl animate-in fade-in duration-500">
                {/* Chat input area */}
                {chatPhase >= 1 && chatPhase < 3 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="text-center mb-6">
                      <h4 className="font-bold text-lg mb-1">Source is ready</h4>
                      <p className="text-sm text-black/40">Ask anything about your ERP systems</p>
                    </div>
                    <div className="w-full min-h-[120px] px-5 py-4 text-base text-black bg-white border border-black/20 rounded-lg">
                      <span className="text-base text-black">{chatTypedText}</span>
                      {chatPhase === 2 && <span className="animate-pulse ml-0.5 text-black">|</span>}
                    </div>
                  </div>
                )}

                {/* Sent message + response */}
                {chatPhase >= 3 && (
                  <div className="space-y-5 animate-in fade-in duration-500">
                    {/* User message */}
                    <div className="flex justify-end">
                      <div className="bg-black text-white px-6 py-4 max-w-[85%] text-base leading-relaxed rounded-lg shadow-sm">
                        {chatPrompt}
                      </div>
                    </div>

                    {/* Reasoning steps */}
                    <div className={`transition-all duration-700 ${chatPhase >= 5 ? 'opacity-0 max-h-0 overflow-hidden' : 'opacity-100 max-h-[400px]'}`}>
                      {chatPhase >= 4 && (
                        <div className="bg-white border border-black/10 p-5 rounded-lg animate-in fade-in slide-in-from-bottom-3 duration-500">
                          <div className="space-y-3">
                            {[
                              { title: "Connecting to Shopify & NetSuite", desc: "Pulling current inventory counts from both systems" },
                              { title: "Cross-referencing SKUs", desc: "Matching 2,847 products across platforms by SKU and variant" },
                              { title: "Identifying discrepancies", desc: "Found 143 items with count mismatches, 12 missing from NetSuite" },
                              { title: "Diagnosing sync failures", desc: "Root cause: webhook timeout on bulk updates after 8pm batch job" },
                            ].map((step, idx) => {
                              const stepNum = idx + 1
                              if (chatReasoningStep < stepNum) return null
                              const isDone = chatReasoningStep > stepNum
                              const isActive = chatReasoningStep === stepNum
                              return (
                                <div key={stepNum} className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                  <div className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 ${
                                    isDone ? 'bg-black' : isActive ? 'bg-transparent border-2 border-black/20' : 'bg-black/5'
                                  }`}>
                                    {isDone ? (
                                      <Check className="w-3 h-3 text-white" />
                                    ) : isActive ? (
                                      <Loader2 className="w-3.5 h-3.5 animate-spin text-black/50" />
                                    ) : (
                                      <span className="text-xs text-black/30">{stepNum}</span>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-sm text-black/80 font-medium">{step.title}</div>
                                    <div className="text-sm text-black/40 mt-0.5">{step.desc}</div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* AI response */}
                    {chatPhase >= 5 && (
                      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-500">
                        {/* Understanding bubble */}
                        <div className="bg-white border border-black/5 rounded-lg px-5 py-4 shadow-sm">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="font-mono text-[10px] text-black/45 uppercase tracking-wider">Diagnosis</span>
                            <span className="px-2 py-0.5 rounded bg-red-50 border border-red-200 font-mono text-[10px] text-red-600">143 discrepancies found</span>
                          </div>
                          <p className="text-base text-black/90 leading-relaxed">
                            {showChatMainText && (
                              <TypewriterText
                                text="I found 143 inventory discrepancies between Shopify and NetSuite. The root cause is a webhook timeout — your 8pm bulk inventory sync is exceeding the 30-second limit, causing partial updates."
                                speed={18}
                                onComplete={() => setShowChatStep1(true)}
                              />
                            )}
                          </p>
                        </div>

                        {/* Fix steps */}
                        {showChatStep1 && (
                          <div className="bg-white border border-black/5 rounded-lg px-5 py-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-mono text-xs text-black/50 uppercase tracking-wider">Recommended fix</span>
                              <span className="font-mono text-[10px] text-black/40">{showChatStep3 ? '3/3' : showChatStep2 ? '2/3' : '1/3'}</span>
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-start gap-2.5 text-sm text-black/75 leading-snug">
                                <span className="text-black/40 mt-0.5 font-medium">→</span>
                                <span>
                                  <TypewriterText text="Increase webhook timeout to 120s and batch inventory updates into groups of 50 SKUs" speed={18} delay={50} onComplete={() => setShowChatStep2(true)} />
                                </span>
                              </div>
                              {showChatStep2 && (
                                <div className="flex items-start gap-2.5 text-sm text-black/75 leading-snug animate-in fade-in duration-200">
                                  <span className="text-black/40 mt-0.5 font-medium">→</span>
                                  <span>
                                    <TypewriterText text="Push corrected counts for all 143 mismatched items to NetSuite now" speed={18} delay={50} onComplete={() => setShowChatStep3(true)} />
                                  </span>
                                </div>
                              )}
                              {showChatStep3 && (
                                <div className="flex items-start gap-2.5 text-sm text-black/75 leading-snug animate-in fade-in duration-200">
                                  <span className="text-black/40 mt-0.5 font-medium">→</span>
                                  <span>
                                    <TypewriterText text="Set up real-time inventory webhooks to replace the nightly batch — no more drift" speed={18} delay={50} onComplete={() => setShowChatFinal(true)} />
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Action prompt */}
                        {showChatFinal && (
                          <div className="bg-white border border-black/5 rounded-lg px-5 py-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="font-mono text-[10px] text-black/50 uppercase tracking-wider mb-2">Ready to execute</div>
                            <p className="text-base text-black/85 leading-relaxed">
                              <TypewriterText
                                text="I can apply all three fixes right now. The corrected inventory counts will sync immediately, and the new real-time webhooks will prevent future discrepancies. Shall I proceed?"
                                speed={18}
                                delay={200}
                                onComplete={() => {}}
                              />
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Progress dots */}
          <div className={`flex items-center justify-center gap-2 mt-8 transition-opacity duration-500 ${chatPhase >= 1 ? 'opacity-0' : 'opacity-100'}`}>
            {questions.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i < currentQuestion ? 'bg-green-500' :
                  i === currentQuestion ? 'bg-black w-6' :
                  'bg-black/20'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}


const capabilities = [
  {
    icon: MessageSquare,
    title: "Support Queries",
    description: "Get instant answers about your ERP cross-referenced with your actual data",
    useCaseId: "support",
    examples: [
      "Why is this customer showing a negative balance?",
      "What's the status of order #12345?",
      "Show me all transactions for Acme Corp this month"
    ]
  },
  {
    icon: Search,
    title: "System Health Check",
    description: "Full audit of your ERP with prioritized issues and recommendations",
    useCaseId: "discovery",
    examples: [
      "Run a health check on my system",
      "Are there any failing integrations?",
      "What scripts are running slowly?"
    ]
  },
  {
    icon: Database,
    title: "Migration Assessment",
    description: "Analyze data volume, complexity, and migration path planning",
    useCaseId: "migration",
    examples: [
      "Plan my QuickBooks to NetSuite migration",
      "How much data do I have?",
      "What's the estimated migration timeline?"
    ]
  },
  {
    icon: Trash2,
    title: "Duplicate Detection",
    description: "Find and merge duplicate customer, vendor, and item records",
    useCaseId: "duplicates",
    examples: [
      "Find duplicate customers",
      "Clean up my vendor records",
      "How many duplicates do I have?"
    ]
  },
  {
    icon: FileCheck,
    title: "RFP Generator",
    description: "System-aware vendor evaluation documents",
    useCaseId: "rfp",
    examples: [
      "Create an RFP for new ERP evaluation",
      "Generate vendor comparison document",
      "What are my system requirements?"
    ]
  },
  {
    icon: FileText,
    title: "Custom Change Request",
    description: "Any field, form, workflow, or configuration change",
    useCaseId: "change",
    examples: [
      "Add a Priority field to Sales Orders",
      "Create a custom approval workflow",
      "Add a new saved search for overdue invoices"
    ]
  },
]

function CapabilityCard({ capability, index }: { capability: typeof capabilities[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = capability.icon

  return (
    <div
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left/Right swap on desktop for alternating layout */}
        <div
          className={[
            "lg:col-span-5",
            index % 2 === 0 ? "lg:order-1" : "lg:order-2",
          ].join(" ")}
        >
          <div className="bg-white border-2 border-black/10 p-6 h-full">
            {/* Icon */}
            <div className="w-12 h-12 border-2 border-black/10 bg-black/[0.02] flex items-center justify-center mb-5">
              <Icon className="w-6 h-6 text-black/50 group-hover:text-black transition-colors" />
            </div>

            {/* Title & Description */}
            <h3 className="font-bold text-black text-2xl tracking-tight mb-2">{capability.title}</h3>
            <p className="text-sm text-black/60 mb-6 leading-relaxed">
              {capability.description}
            </p>

            {/* Example prompts */}
            <div className="mb-6">
              <div className="font-mono text-[9px] text-black/40 uppercase tracking-wider mb-3">Try asking</div>
              <div className="space-y-2">
                {capability.examples.map((example, j) => (
                  <div key={j} className="flex items-start gap-2 text-xs text-black/60">
                    <span className="text-black/30 flex-shrink-0">"</span>
                    <span className="italic">{example}</span>
                    <span className="text-black/30 flex-shrink-0">"</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a
              href="/demo"
              className="flex items-center justify-center gap-2 py-3 bg-black text-white font-mono text-[11px] tracking-wider hover:bg-black/90 transition-colors"
            >
              TRY IT NOW
              <span>→</span>
            </a>
          </div>
        </div>

        <div
          className={[
            "lg:col-span-7",
            index % 2 === 0 ? "lg:order-2" : "lg:order-1",
          ].join(" ")}
        >
          <div className="bg-white border-2 border-black/10 p-4">
            <div className="min-h-[400px]">
              <ChatPreview useCaseId={capability.useCaseId} isHovered={isHovered} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CompanionPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-black/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-black/50 hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-mono text-xs">BACK</span>
          </a>
          <a href="/" className="font-mono text-lg font-bold tracking-tight">Source.</a>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white border-b border-black/10 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
            Your always-on
            <br />
            <span className="relative inline-block">
              AI and ERP assistant
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-black" />
            </span>
          </h1>
          <p className="text-lg text-black/60 font-mono max-w-2xl mx-auto mt-6">
            Ask anything about your ERP system. Get instant answers, run reports,
            fix issues, and automate tasks—all through natural conversation.
          </p>
        </div>
      </section>

      {/* How it works - strip */}
      <section className="bg-neutral-50/50 py-20 px-6 border-b border-black/10">
        <div className="max-w-5xl mx-auto">
          <div className="font-mono text-[10px] text-black/30 tracking-widest text-center mb-14 uppercase">How it works</div>

          <div className="grid md:grid-cols-3 gap-0">
            {[
              {
                step: "01",
                icon: Search,
                title: "Scan your system",
                desc: "Connect your ERP and Source automatically maps your integrations and data.",
                details: ["Auto-detect integrations", "Analyze data patterns", "Flag issues"],
              },
              {
                step: "02",
                icon: FileText,
                title: "Capture knowledge",
                desc: "Answer questions about how your business runs. Source learns your workflows.",
                details: ["Map business processes", "Index tribal knowledge", "Learn your rules"],
              },
              {
                step: "03",
                icon: MessageSquare,
                title: "Start talking",
                desc: "Ask anything in plain English. Get answers grounded in your actual system data.",
                details: ["Natural language queries", "Context-aware answers", "Automated actions"],
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className={`relative px-8 py-10 ${i < 2 ? 'md:border-r border-black/10' : ''}`}>
                  {/* Step number */}
                  <div className="font-mono text-[11px] text-black/25 tracking-wider mb-6">{item.step}</div>

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-full bg-black/[0.04] flex items-center justify-center mb-5">
                    <Icon className="w-4 h-4 text-black/40" />
                  </div>

                  <h4 className="font-semibold text-lg tracking-tight mb-2">{item.title}</h4>
                  <p className="text-sm text-black/45 leading-relaxed">{item.desc}</p>

                  {/* Detail bullets */}
                  <div className="space-y-2 mt-6">
                    {item.details.map((detail, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-black/20 flex-shrink-0" />
                        <span className="text-xs text-black/40">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Homepage logos strip - above How it works */}
      <section className="bg-white py-12 px-6 border-b border-black/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-70">
            <img src="/images/netsuite-logo.svg" alt="NetSuite" className="h-10 w-auto object-contain invert" />
            <img src="/images/sap-logo.png" alt="SAP" className="h-10 w-auto object-contain max-w-[140px]" />
            <img src="/images/dynamics-logo.png" alt="Microsoft Dynamics" className="h-9 w-auto object-contain max-w-[160px]" />
            <img src="/images/sage-logo.png" alt="Sage" className="h-10 w-auto object-contain max-w-[100px]" />
            <img src="/images/quickbooks-logo.svg" alt="QuickBooks" className="h-10 w-auto object-contain" />
          </div>
        </div>
      </section>

      {/* ========== STEP 0.25: DESCRIBE YOUR NEED ========== */}
      <section className="bg-white py-20 px-6 border-b border-black/10">
        <div className="max-w-6xl mx-auto">
          <ChatbotPreview />
        </div>
      </section>

      {/* ========== STEP 0.5: CONNECTION SETUP ========== */}
      <section id="connection-setup" className="bg-white py-24 px-6 border-b border-black/10">
        <div className="max-w-7xl mx-auto">
          <ConnectionSetup />
        </div>
      </section>


      {/* ========== SYSTEM DISCOVERY ========== */}
      <section className="bg-neutral-50 py-20 px-6 border-b border-black/10">
        <div className="max-w-6xl mx-auto">
          <SystemMapDiscovery />
        </div>
      </section>

      {/* ========== KNOWLEDGE CAPTURE ========== */}
      <section className="bg-white py-20 px-6 border-b border-black/10">
        <div className="max-w-6xl mx-auto">
          <KnowledgeCapturePreview />
        </div>
      </section>

      {/* ========== STEP 3: TWO PATHS ========== */}
      <section className="py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative grid lg:grid-cols-[1fr_1px_1fr] items-start">
            {/* Left: Start Asking */}
            <div className="px-0 lg:px-10 py-4">
              <div className="flex items-center gap-2.5 mb-4">
                <MessageSquare className="w-5 h-5 text-black/40" />
                <span className="font-mono text-xs text-black/40 tracking-wider uppercase">Companion</span>
              </div>
              <h4 className="text-3xl font-bold tracking-tight mb-2">Start asking</h4>
              <p className="text-base text-black/40 mb-7">Instant answers from your ERP data in plain English.</p>

              <div className="space-y-3 mb-8">
                {[
                  "Support queries with live data",
                  "System health checks",
                  "Duplicate detection",
                  "Custom change requests",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-base">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-black/60">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mb-2">
                <span className="font-mono text-xs text-green-600 tracking-wide">Free reports available</span>
              </div>
              <div className="flex items-baseline gap-1.5 mb-6">
                <span className="text-4xl font-bold">$299</span>
                <span className="text-base text-black/40">/month</span>
              </div>

              <a href="#capabilities" className="inline-flex items-center gap-2 px-7 py-3.5 bg-black text-white font-mono text-xs tracking-wider hover:bg-black/90 transition-colors">
                SEE CAPABILITIES ↓
              </a>
            </div>

            {/* Center divider */}
            <div className="hidden lg:flex flex-col items-center self-stretch">
              <div className="flex-1 w-px bg-black/10" />
              <div className="w-11 h-11 bg-white border border-black/10 rounded-full flex items-center justify-center flex-shrink-0 my-2">
                <span className="text-black/30 text-sm font-mono">or</span>
              </div>
              <div className="flex-1 w-px bg-black/10" />
            </div>

            {/* Right: Migrate */}
            <div className="px-0 lg:px-10 py-4 pt-10 lg:pt-4 border-t lg:border-t-0 border-black/10">
              <div className="flex items-center gap-2.5 mb-4">
                <Database className="w-5 h-5 text-black/40" />
                <span className="font-mono text-xs text-black/40 tracking-wider uppercase">Migration</span>
              </div>
              <h4 className="text-3xl font-bold tracking-tight mb-2">Migrate your ERP</h4>
              <p className="text-base text-black/40 mb-7">What consultants charge $500k+ for, done by AI.</p>

              <div className="space-y-3 mb-8">
                {[
                  "AI-powered data mapping",
                  "Full chart of accounts migration",
                  "Historical data preservation",
                  "Integration reconfiguration",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-base">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-black/60">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-baseline gap-2.5 mb-6">
                <span className="text-xl font-bold text-black/30 line-through">$500k+</span>
                <span className="text-4xl font-bold">From $5,250</span>
              </div>

              <a href="/" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-black text-black font-mono text-xs tracking-wider hover:bg-black hover:text-white transition-colors">
                LEARN MORE →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="pt-0 pb-16 scroll-mt-8">
        <div className="border-t border-black/10">
          <div className="max-w-6xl mx-auto px-6 py-16 text-center">
            <div className="font-mono text-[10px] text-black/40 tracking-widest mb-3">
              CAPABILITIES
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">
              What can your AI companion do?
            </h2>
          </div>
        </div>

        <div className="space-y-0">
          {capabilities.map((capability, i) => (
            <div
              key={i}
              className={[
                "py-12 w-full",
                i % 2 === 0 ? "bg-white border-y border-black/5" : "bg-neutral-50",
              ].join(" ")}
            >
              <div className="max-w-6xl mx-auto px-6">
                <CapabilityCard capability={capability} index={i} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Ready to meet your AI companion?
          </h2>
          <p className="text-white/60 font-mono mb-8">
            Connect your ERP and start asking questions in minutes.
          </p>
          <a
            href="/demo"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-mono text-sm tracking-wider hover:bg-white/90 transition-colors"
          >
            GET STARTED FREE
            <span>→</span>
          </a>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-white border-t border-black/10 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="font-mono text-sm font-bold">Source.</a>
          <div className="font-mono text-xs text-black/40">
            © 2024 Source. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
