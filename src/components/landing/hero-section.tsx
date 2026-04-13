"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { AsciiDecoration } from "./ascii-decoration"
import { DitherOverlay } from "./dither-overlay"
import { Link2, Cpu, MessageSquare, Package, CheckCircle2, ArrowRight, Loader2, X, Send } from "lucide-react"

// Target ERP logo components (enterprise systems to migrate TO)
const TargetERPLogos = {
  sap: () => (
    <img 
      src="/images/sap-logo.png" 
      alt="SAP" 
      className="h-9 max-w-[160px] object-contain"
    />
  ),
  dynamics: () => (
    <img 
      src="/images/dynamics-logo.png" 
      alt="Microsoft Dynamics 365" 
      className="h-7 max-w-[200px] object-contain"
    />
  ),
  sage: () => (
    <img 
      src="/images/sage-logo.png" 
      alt="Sage" 
      className="h-9 max-w-[100px] object-contain"
    />
  ),
  epicor: () => (
    <img 
      src="/images/epicor-logo.svg" 
      alt="Epicor" 
      className="h-10 max-w-[120px] object-contain"
    />
  ),
  infor: () => (
    <img 
      src="/images/infor-logo.svg" 
      alt="Infor" 
      className="h-10 max-w-[100px] object-contain"
    />
  ),
  workday: () => (
    <img 
      src="/images/workday-logo.svg" 
      alt="Workday" 
      className="h-10 max-w-[140px] object-contain"
    />
  ),
  peoplesoft: () => (
    <img 
      src="/images/peoplesoft-logo.svg" 
      alt="PeopleSoft" 
      className="h-10 max-w-[140px] object-contain"
    />
  ),
}

// Source ERP systems (lightweight systems companies migrate FROM)
const SourceERPLogos = {
  sage: () => (
    <img 
      src="/images/sage-logo.png" 
      alt="Sage" 
      className="h-9 max-w-[100px] object-contain"
    />
  ),
  xero: () => (
    <img 
      src="/images/xero-logo.svg" 
      alt="Xero" 
      className="h-10 max-w-[120px] object-contain"
    />
  ),
  freshbooks: () => (
    <div className="flex items-center gap-1.5">
      <div className="w-8 h-8 bg-[#0075DD] rounded flex items-center justify-center">
        <span className="text-white font-bold text-sm">F</span>
      </div>
      <span className="font-semibold text-[#0075DD] text-lg">FreshBooks</span>
    </div>
  ),
  wave: () => (
    <img 
      src="/images/wave-logo.svg" 
      alt="Wave" 
      className="h-10 max-w-[100px] object-contain"
    />
  ),
  zoho: () => (
    <img 
      src="/images/zoho-logo.png" 
      alt="Zoho Books" 
      className="h-10 max-w-[120px] object-contain"
    />
  ),
  odoo: () => (
    <img 
      src="/images/odoo-logo.svg" 
      alt="Odoo" 
      className="h-10 max-w-[100px] object-contain"
    />
  ),
  acumatica: () => (
    <img 
      src="/images/acumatica-logo.png" 
      alt="Acumatica" 
      className="h-8 max-w-[140px] object-contain"
    />
  ),
  peachtree: () => (
    <div className="flex items-center gap-1">
      <div className="w-6 h-6 bg-[#FF6B00] rounded-full" />
      <span className="font-semibold text-[#FF6B00] text-lg">Peachtree</span>
    </div>
  ),
}

// Order of source logos to spin through (lands on QuickBooks) - extended for longer animation
const sourceSpinSequence = ['sage', 'xero', 'freshbooks', 'odoo', 'wave', 'acumatica', 'zoho', 'peachtree', 'sage', 'xero', 'freshbooks', 'wave', 'zoho', 'odoo', 'acumatica', 'sage', 'xero', 'peachtree'] as const

// Order of target logos to spin through (lands on NetSuite) - extended for longer animation
const targetSpinSequence = ['dynamics', 'sage', 'epicor', 'sap', 'infor', 'workday', 'peoplesoft', 'dynamics', 'sage', 'sap', 'epicor', 'infor', 'dynamics', 'workday', 'sage', 'sap', 'epicor', 'dynamics'] as const

// Source system slot machine (QuickBooks destination) - with configurable start delay
function SourceSlotMachine({ onComplete, startDelay = 0 }: { onComplete: () => void; startDelay?: number }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hasLanded, setHasLanded] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const totalSpins = sourceSpinSequence.length

  // Initial delay before spinning starts
  useEffect(() => {
    const timer = setTimeout(() => setHasStarted(true), startDelay)
    return () => clearTimeout(timer)
  }, [startDelay])

  useEffect(() => {
    if (!hasStarted || hasLanded) return

    // Spinning timings that slow down progressively
    const timings = [40, 45, 50, 55, 60, 70, 80, 90, 100, 110, 125, 140, 160, 180, 200, 220, 250, 280]
    const delay = timings[currentIndex] || 500

    const timer = setTimeout(() => {
      if (currentIndex >= totalSpins - 1) {
        setHasLanded(true)
        setTimeout(onComplete, 150)
      } else {
        setCurrentIndex(prev => prev + 1)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [currentIndex, hasLanded, hasStarted, onComplete, totalSpins])

  const currentLogoKey = sourceSpinSequence[currentIndex]
  const CurrentLogo = SourceERPLogos[currentLogoKey]

  return (
    <div className="relative h-12 flex items-center justify-center overflow-hidden">
      {!hasLanded ? (
        <div key={currentIndex} className="slot-spin">
          <CurrentLogo />
        </div>
      ) : (
        <div className="slot-land">
          <img 
            src="/images/quickbooks-logo.svg" 
            alt="Intuit QuickBooks" 
            className="h-12 w-auto object-contain"
          />
        </div>
      )}
    </div>
  )
}

// Target system slot machine (NetSuite destination) - with configurable start delay
function TargetSlotMachine({ onComplete, startDelay = 0 }: { onComplete: () => void; startDelay?: number }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hasLanded, setHasLanded] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const totalSpins = targetSpinSequence.length

  // Initial delay before spinning starts
  useEffect(() => {
    const timer = setTimeout(() => setHasStarted(true), startDelay)
    return () => clearTimeout(timer)
  }, [startDelay])

  useEffect(() => {
    if (!hasStarted || hasLanded) return

    // Slightly offset timing for target - lands just after source
    const timings = [45, 50, 55, 60, 65, 75, 85, 95, 110, 125, 140, 155, 175, 200, 230, 260, 290, 320]
    const delay = timings[currentIndex] || 550

    const timer = setTimeout(() => {
      if (currentIndex >= totalSpins - 1) {
        setHasLanded(true)
        setTimeout(onComplete, 150)
      } else {
        setCurrentIndex(prev => prev + 1)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [currentIndex, hasLanded, hasStarted, onComplete, totalSpins])

  const currentLogoKey = targetSpinSequence[currentIndex]
  const CurrentLogo = TargetERPLogos[currentLogoKey]

  return (
    <div className="relative h-12 flex items-center justify-center overflow-hidden">
      {!hasLanded ? (
        <div key={currentIndex} className="slot-spin">
          <CurrentLogo />
        </div>
      ) : (
        <div className="slot-land">
          <img 
            src="/images/netsuite-logo.svg" 
            alt="Oracle NetSuite" 
            className="h-12 w-auto object-contain invert"
          />
        </div>
      )}
    </div>
  )
}

// Animated counter hook with trigger support
function useCountAnimation(target: number, duration: number = 2000, startDelay: number = 0, shouldStart: boolean = true) {
  const [count, setCount] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!shouldStart) {
      setCount(0)
      setIsComplete(false)
      return
    }

    let startTime: number | null = null
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime

      if (elapsed < startDelay) {
        animationFrame = requestAnimationFrame(animate)
        return
      }

      const progress = Math.min((elapsed - startDelay) / duration, 1)
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOut * target))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setIsComplete(true)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [target, duration, startDelay, shouldStart])

  return { count, isComplete }
}

// Typewriter text component for AI-style text reveal
function TypewriterText({ children, delay = 0, speed = 15, onComplete }: { children: React.ReactNode; delay?: number; speed?: number; onComplete?: () => void }) {
  const [displayedChars, setDisplayedChars] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const hasCalledComplete = useRef(false)

  // Extract plain text from children for character counting
  const getText = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node
    if (typeof node === 'number') return String(node)
    if (Array.isArray(node)) return node.map(getText).join('')
    if (node && typeof node === 'object' && 'props' in node) {
      const element = node as { props: { children?: React.ReactNode } }
      return getText(element.props.children)
    }
    return ''
  }

  const fullText = useMemo(() => getText(children), [children])
  const totalChars = fullText.length

  useEffect(() => {
    const startTimer = setTimeout(() => setHasStarted(true), delay)
    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!hasStarted) return
    if (displayedChars >= totalChars) {
      if (onComplete && !hasCalledComplete.current) {
        hasCalledComplete.current = true
        onComplete()
      }
      return
    }

    const timer = setTimeout(() => {
      setDisplayedChars(prev => Math.min(prev + 1, totalChars))
    }, speed)

    return () => clearTimeout(timer)
  }, [displayedChars, totalChars, hasStarted, speed, onComplete])

  // Render with character-by-character visibility
  const renderWithVisibility = (node: React.ReactNode, charIndex: { current: number }): React.ReactNode => {
    if (typeof node === 'string') {
      return node.split('').map((char, i) => {
        const thisCharIndex = charIndex.current
        charIndex.current++
        return (
          <span
            key={`${thisCharIndex}-${i}`}
            className={thisCharIndex < displayedChars ? 'opacity-100' : 'opacity-0'}
            style={{ transition: 'opacity 30ms ease-out' }}
          >
            {char}
          </span>
        )
      })
    }
    if (typeof node === 'number') {
      return renderWithVisibility(String(node), charIndex)
    }
    if (Array.isArray(node)) {
      return node.map((child, i) => (
        <span key={i}>{renderWithVisibility(child, charIndex)}</span>
      ))
    }
    if (node && typeof node === 'object' && 'props' in node) {
      const element = node as { props: { children?: React.ReactNode; className?: string } } & { type: unknown; key: unknown }
      const newChildren = renderWithVisibility(element.props.children, charIndex)
      // Clone the element with new children
      return (
        <span key={element.key as string} className={element.props.className}>
          {newChildren}
        </span>
      )
    }
    return node
  }

  return <>{renderWithVisibility(children, { current: 0 })}</>
}

// The flow steps with icons
const flowSteps = [
  { step: "01", label: "CONNECT", desc: "Link any ERP system", icon: Link2, status: "complete" },
  { step: "02", label: "DISCOVER", desc: "AI analyzes your setup", icon: Cpu, status: "complete" },
  { step: "03", label: "SCOPE", desc: "Answer a few questions", icon: MessageSquare, status: "active" },
  { step: "04", label: "DELIVER", desc: "Get fixed-price outputs", icon: Package, status: "pending" },
]


// Chat UI Component
function ChatInterface({ onClose }: { onClose: () => void }) {
  const [inputValue, setInputValue] = useState("")
  
  return (
    <div className="relative border border-black bg-white overflow-hidden flex flex-col h-full min-h-[500px]">
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-black" />
      <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-black" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-black" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-black" />

      {/* Header */}
      <div className="bg-black/[0.02] border-b border-black/10 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="font-mono text-[10px] text-black/70 tracking-wider">AI_CONSULTANT</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-black/40 tracking-wider">DEMO</span>
          <button 
            onClick={onClose}
            className="text-black/40 hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat content */}
      <div className="flex-1 p-5 overflow-y-auto">
        {/* User message */}
        <div className="flex justify-end mb-4">
          <div className="bg-black/5 border border-black/10 rounded-lg px-4 py-3 max-w-[80%]">
            <p className="text-sm">Why is Acme Corp showing a negative balance?</p>
          </div>
        </div>

        {/* AI response */}
        <div className="space-y-3">
          {/* Status indicators */}
          <div className="flex items-center gap-2 text-xs text-black/60">
            <CheckCircle2 className="w-3 h-3 text-green-600" />
            <span>Searching customer records...</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-black/60">
            <CheckCircle2 className="w-3 h-3 text-green-600" />
            <span>Analyzing transactions...</span>
          </div>

          {/* Result */}
          <div className="mt-4 p-4 border border-black/10 bg-black/[0.02]">
            <p className="text-sm mb-4">Found 3 unapplied payments totaling $2,450.</p>
            
            {/* Payments table */}
            <div className="border border-black/10 mb-4">
              <div className="bg-black/[0.02] px-3 py-2 border-b border-black/10">
                <span className="font-mono text-[9px] text-black/40 uppercase tracking-wider">Unapplied Payments</span>
              </div>
              <div className="divide-y divide-black/10">
                {[
                  { id: "PMT-4521", amount: "$1,200" },
                  { id: "PMT-4533", amount: "$850" },
                  { id: "PMT-4540", amount: "$400" },
                ].map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between px-3 py-2 text-sm">
                    <span className="font-mono text-black/70">{payment.id}</span>
                    <span className="font-medium">{payment.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-black text-white font-mono text-[11px] tracking-wider hover:bg-black/90 transition-colors">
                <CheckCircle2 className="w-3 h-3" />
                AUTO-APPLY
              </button>
              <button className="px-4 py-2 border border-black/20 text-black font-mono text-[11px] tracking-wider hover:bg-black/5 transition-colors">
                REVIEW
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-black/10 p-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1 bg-transparent font-mono text-sm placeholder:text-black/30 focus:outline-none"
          />
          <button className="text-black/40 hover:text-black transition-colors">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export function HeroSection() {
  // Toggle between Migration Quote and Chat view
  const [showChat, setShowChat] = useState(false)

  // Track when typewriter text is complete (triggers card appearance)
  const [typewriterComplete, setTypewriterComplete] = useState(false)

  // Track source slot machine (QuickBooks) completion
  const [sourceComplete, setSourceComplete] = useState(false)

  // Track target slot machine (NetSuite) completion
  const [targetComplete, setTargetComplete] = useState(false)
  
  // Sequential counter animations - each row animates after the previous completes
  // Row 1: Customer records
  const customers = useCountAnimation(48500, 800, 200, targetComplete)
  // Row 2: Inventory items (starts after customers complete)
  const items = useCountAnimation(125000, 900, 0, customers.isComplete)
  // Row 3: Transaction history (starts after items complete)
  const years = useCountAnimation(12, 600, 0, items.isComplete)
  // Row 4: Custom fields (starts after years complete)
  const customFields = useCountAnimation(778321, 900, 0, years.isComplete)
  // Row 5: Integrations (starts after custom fields complete)
  const integrations = useCountAnimation(23, 500, 0, customFields.isComplete)

  const migrationIncludes = [
    "Data mapping",
    "Testing",
    "Go-live support",
    "Human review",
    "Maintenance",
    "Integration setup",
  ] as const

  // Reveal "Migration includes" ticks one-by-one once scanning completes.
  const [includesCheckedCount, setIncludesCheckedCount] = useState(0)
  const [allCheckboxesComplete, setAllCheckboxesComplete] = useState(false)
  const [firstCheckboxComplete, setFirstCheckboxComplete] = useState(false)

  useEffect(() => {
    if (!integrations.isComplete) {
      setIncludesCheckedCount(0)
      setAllCheckboxesComplete(false)
      setFirstCheckboxComplete(false)
      return
    }

    setIncludesCheckedCount(0)
    setAllCheckboxesComplete(false)
    setFirstCheckboxComplete(false)
    // Add 300ms initial delay, then 180ms between each checkbox
    const timeouts = migrationIncludes.map((_, i) =>
      setTimeout(() => setIncludesCheckedCount(i + 1), 300 + 180 * i)
    )

    // Mark first checkbox complete after it animates (300ms delay + small buffer)
    const firstCheckboxTimeout = setTimeout(() => {
      setFirstCheckboxComplete(true)
    }, 350)

    // Mark all checkboxes complete after the last one finishes
    // Total time: 300ms initial + (6 checkboxes * 180ms) = 1380ms
    const completeTimeout = setTimeout(() => {
      setAllCheckboxesComplete(true)
    }, 300 + 180 * migrationIncludes.length)

    return () => {
      timeouts.forEach(clearTimeout)
      clearTimeout(firstCheckboxTimeout)
      clearTimeout(completeTimeout)
    }
  }, [integrations.isComplete])
  
  // Price animates ONLY after all checkboxes are complete (with a pause)
  const price = useCountAnimation(5250, 1200, 400, allCheckboxesComplete)

  return (
    <section className="relative flex flex-col justify-center px-6 pt-24 pb-12 overflow-hidden bg-white text-black">
      <DitherOverlay intensity="light" />

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 opacity-30">
        <AsciiDecoration variant="corner" />
      </div>
      <div className="absolute top-6 right-6 opacity-30 rotate-90">
        <AsciiDecoration variant="corner" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Two column layout - Headline + Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left column - Main content */}
          <div className="lg:pt-16">
            {/* Main headline */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-backwards">
                WORLD'S FIRST
                <br />
                <span className="relative inline-block">
                  AI CONSULTANCY
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-black" />
                </span>
              </h1>
            </div>

            {/* Subheadline - typewriter animation */}
            <div className="mt-8 max-w-xl">
              <p className="text-lg md:text-xl text-black/70 font-mono leading-relaxed">
                <TypewriterText delay={400} speed={12} onComplete={() => setTypewriterComplete(true)}>
                  <span className="font-semibold text-black/85">Migrate</span> and implement your existing systems in days with our <span className="font-bold text-black">AI-enabled consultants</span>.
                </TypewriterText>
              </p>
            </div>

            {/* Stats row - animates after first checkbox completes */}
            <div className="mt-12 grid grid-cols-2 gap-6">
              {[
                { value: "87%", label: "Cost Reduction" },
                { value: "24/7", label: "Availability" },
                { value: "Zero", label: "Scope Creep" },
                { value: "100%", label: "Money Back Guarantee" }
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`border-l border-black/20 pl-4 transition-all duration-700 ease-out ${
                    firstCheckboxComplete
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: firstCheckboxComplete ? `${i * 250}ms` : '0ms' }}
                >
                  <div className="text-2xl md:text-3xl font-bold tracking-tight">{stat.value}</div>
                  <div className="text-xs font-mono text-black/50 mt-1 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons - Under Stats */}
            <div
              className={`mt-14 flex flex-col sm:flex-row gap-4 transition-all duration-700 ease-out ${
                firstCheckboxComplete
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: firstCheckboxComplete ? '1100ms' : '0ms' }}
            >
              <a
                href="/demo"
                className="inline-flex items-center justify-center px-10 py-6 bg-black text-white border-2 border-black font-mono text-base font-bold tracking-wider hover:bg-white hover:text-black transition-colors"
              >
                MIGRATE MY QUICKBOOKS WITH AI
              </a>

            </div>

            {/* Not ready to migrate link */}
            <a
              href="#packages"
              className={`mt-8 inline-block text-sm text-black font-medium underline underline-offset-4 hover:text-black/70 transition-all duration-700 ease-out ${
                firstCheckboxComplete
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: firstCheckboxComplete ? '1350ms' : '0ms' }}
            >
              Not ready to migrate yet?
            </a>

          </div>
          
          {/* Right column - Migration Flow or Chat */}
          <div className="lg:pt-8">
            {showChat ? (
              <ChatInterface onClose={() => setShowChat(false)} />
            ) : typewriterComplete ? (
              <div 
                className="relative border-2 border-black bg-white overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-400 fill-mode-backwards min-h-[660px]"
              >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-black" />
              <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-black" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-black" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-black" />

              {/* Card content wrapper */}
              <div className="p-5">
                {/* From → To header */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  {/* Source system - Slot machine animation */}
                  <div className="flex-1 p-4 flex items-center justify-center">
                    <SourceSlotMachine onComplete={() => setSourceComplete(true)} startDelay={200} />
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-black/20 flex-shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>

                  {/* Target system - Slot machine animation */}
                  <div className="flex-1 p-4 flex items-center justify-center">
                    <TargetSlotMachine onComplete={() => setTargetComplete(true)} startDelay={250} />
                  </div>
                </div>

                {/* Scan status */}
                <div className="min-h-[16px] font-mono text-xs text-black/50 mb-4">
                  {targetComplete ? (
                    <span className="animate-in fade-in duration-200 fill-mode-backwards">
                      System scanned successfully
                    </span>
                  ) : (
                    <span className="animate-in fade-in duration-200 fill-mode-backwards">
                      Scanning<span className="animate-pulse">...</span>
                    </span>
                  )}
                </div>

                {/* Discovered data */}
                <div className="space-y-0 mb-3">
                  {[
                    { label: "Customer records", value: customers.count.toLocaleString() },
                    { label: "Inventory items", value: items.count.toLocaleString() },
                    { label: "Transaction history", value: `${years.count} years` },
                    { label: "Custom fields", value: customFields.count.toLocaleString() },
                    { label: "Integrations", value: integrations.count.toString() },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-black/5 last:border-0">
                      <span className="text-sm text-black/60">{row.label}</span>
                      <span className="font-mono font-bold tabular-nums">{row.value}</span>
                    </div>
                  ))}
                </div>
                
                {/* Migration includes - checkboxes fill after integrations animate */}
                <div>
                  {/* Divider */}
                  <div className="border-t border-black/10 mb-4" />

                  <div className="mb-4">
                    <div className="font-mono text-[10px] text-black/40 uppercase tracking-wider mb-3">Migration Includes</div>
                    <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                      {migrationIncludes.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className={`w-3.5 h-3.5 border border-black flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${i < includesCheckedCount ? 'bg-black' : ''}`}>
                            {i < includesCheckedCount && (
                              <span className="text-[10px] font-bold text-white animate-in fade-in zoom-in-50 duration-150 fill-mode-backwards">✓</span>
                            )}
                          </span>
                          <span className="text-xs text-black/70">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-black/10 mb-4" />
                </div>

                {/* Price section - Black box */}
                <div className="bg-black text-white p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg">From </span>
                        <span className="text-2xl">${price.count.toLocaleString()}</span>
                      </div>
                      <div className="min-h-[28px]">
                        <div
                          className={[
                            "text-xl text-white/50 line-through transition-opacity",
                            allCheckboxesComplete ? "opacity-100 animate-in fade-in slide-in-from-bottom-2 duration-250 fill-mode-backwards" : "opacity-0",
                          ].join(" ")}
                        >
                          $95,000+ traditional
                        </div>
                      </div>
                    </div>
                    <div className="min-w-[110px] min-h-[52px] text-right">
                      <div
                        className={[
                          "transition-opacity",
                          price.isComplete ? "opacity-100 animate-in fade-in slide-in-from-left-4 duration-350 fill-mode-backwards" : "opacity-0",
                        ].join(" ")}
                      >
                        <div className="font-mono text-[10px] text-white/50 uppercase tracking-wider mb-1">Timeline</div>
                        <div className="text-2xl">14 days</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between">
                    <div className="font-mono text-xs text-white/50">100% money-back guarantee</div>
                    <a
                      href="/demo"
                      className="flex items-center gap-2 px-5 py-3 bg-white text-black font-mono text-xs font-bold tracking-wider hover:bg-white/90 transition-colors"
                    >
                      MIGRATE WITH AI
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            ) : (
              // Placeholder while stats are animating
              <div className="min-h-[600px]" />
            )}
          </div>
        </div>
        
      </div>
    </section>
  )
}
