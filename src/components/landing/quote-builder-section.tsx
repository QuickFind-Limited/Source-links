"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { ScrollAnimate } from "@/components/ui/scroll-animate"

const industries = [
  { name: "Manufacturing", multiplier: 1.3 },
  { name: "Retail & E-commerce", multiplier: 1.1 },
  { name: "Professional Services", multiplier: 1.0 },
  { name: "Healthcare", multiplier: 1.4 },
  { name: "Distribution", multiplier: 1.2 },
  { name: "Technology", multiplier: 0.9 },
  { name: "Other", multiplier: 1.0 }
]

const revenueRanges = [
  { label: "$1M - $5M", value: 3, multiplier: 0.8 },
  { label: "$5M - $10M", value: 7.5, multiplier: 1 },
  { label: "$10M - $25M", value: 17.5, multiplier: 1.5 },
  { label: "$25M - $50M", value: 37.5, multiplier: 2.2 },
  { label: "$50M - $100M", value: 75, multiplier: 3.5 },
  { label: "$100M+", value: 100, multiplier: 5 }
]

const currentSystems = [
  { name: "QuickBooks", color: "#2CA01C", multiplier: 1 },
  { name: "Xero", color: "#13B5EA", multiplier: 0.9 },
  { name: "Sage 50", color: "#00DC82", multiplier: 1.2 },
  { name: "FreshBooks", color: "#0075DD", multiplier: 0.85 },
  { name: "Wave", color: "#1C64F2", multiplier: 0.8 },
  { name: "Zoho Books", color: "#C8202F", multiplier: 0.9 },
  { name: "MYOB", color: "#6B21A8", multiplier: 1.1 },
  { name: "Spreadsheets", color: "#34A853", multiplier: 0.7 },
  { name: "Other", color: "#666666", multiplier: 1.1 }
]

const targetSystems = [
  { name: "NetSuite", color: "#1A3D6D", multiplier: 1.2 },
  { name: "SAP Business One", color: "#0070F2", multiplier: 2.5 },
  { name: "Microsoft Dynamics", color: "#00A4EF", multiplier: 1.8 },
  { name: "Sage Intacct", color: "#00DC82", multiplier: 1.3 },
  { name: "Acumatica", color: "#E31837", multiplier: 1.4 },
  { name: "Other", color: "#666666", multiplier: 1.1 }
]

const userCounts = [
  { label: "1-10", value: 5, multiplier: 0.8 },
  { label: "11-25", value: 18, multiplier: 1 },
  { label: "26-50", value: 38, multiplier: 1.5 },
  { label: "51-100", value: 75, multiplier: 2.2 },
  { label: "100+", value: 100, multiplier: 3.5 }
]

const features = [
  { id: "data-migration", label: "Data Migration", price: 0, included: true },
  { id: "custom-fields", label: "Custom Fields", price: 500, included: false },
  { id: "workflows", label: "Workflows & Automation", price: 1500, included: false },
  { id: "integrations", label: "3rd Party Integrations", price: 2000, included: false },
  { id: "training", label: "Team Training", price: 800, included: false },
  { id: "support", label: "90-Day Support", price: 1200, included: false },
]

export function QuoteBuilderSection() {
  const [industry, setIndustry] = useState<number | null>(null)
  const [revenueIndex, setRevenueIndex] = useState<number | null>(null)
  const [currentSystemsSelected, setCurrentSystemsSelected] = useState<number[]>([])
  const [targetSystemsSelected, setTargetSystemsSelected] = useState<number[]>([])
  const [userCountIndex, setUserCountIndex] = useState<number | null>(null)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["data-migration"])
  const [isDarkMode, setIsDarkMode] = useState(false)

  const estimateDateLabel = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  const toggleSelectedIndex = (
    selected: number[],
    idx: number,
    setSelected: (next: number[]) => void
  ) => {
    const has = selected.includes(idx)
    if (has) {
      setSelected(selected.filter((i) => i !== idx))
      return
    }
    setSelected([...selected, idx])
  }

  const formatSelectedNames = (names: string[], selected: number[]) => {
    const first = names[selected[0]] ?? ""
    const extra = selected.length - 1
    return extra > 0 ? `${first} +${extra}` : first
  }

  // Toggle feature selection
  const toggleFeature = (featureId: string) => {
    if (featureId === "data-migration") return // Always included
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(f => f !== featureId)
        : [...prev, featureId]
    )
  }

  // Check if user has started filling the form
  const hasAnySelection = 
    industry !== null || 
    revenueIndex !== null || 
    currentSystemsSelected.length > 0 || 
    targetSystemsSelected.length > 0 || 
    userCountIndex !== null

  // Check if all required fields are filled
  const hasAllSelections = 
    industry !== null && 
    revenueIndex !== null && 
    currentSystemsSelected.length > 0 && 
    targetSystemsSelected.length > 0 && 
    userCountIndex !== null

  // Calculate feature add-ons price
  const featureAddOns = features
    .filter(f => selectedFeatures.includes(f.id))
    .reduce((sum, f) => sum + f.price, 0)

  // Calculate estimated price based on selections (dynamically updates)
  const basePrice = 8500
  const currentMultiplier = currentSystemsSelected.length > 0 
    ? Math.max(...currentSystemsSelected.map((i) => currentSystems[i]?.multiplier ?? 1))
    : 1
  const targetMultiplier = targetSystemsSelected.length > 0
    ? Math.max(...targetSystemsSelected.map((i) => targetSystems[i]?.multiplier ?? 1))
    : 1
  
  // Calculate price dynamically based on available data
  const calculatedPrice = hasAnySelection ? Math.round(
    (basePrice + featureAddOns) * 
    (revenueIndex !== null ? revenueRanges[revenueIndex].multiplier : 1) * 
    (userCountIndex !== null ? userCounts[userCountIndex].multiplier : 1) *
    currentMultiplier
  ) : 0

  // Calculate timeline
  const baseWeeks = 3
  const calculatedWeeks = hasAnySelection ? Math.round(
    baseWeeks * 
    ((revenueIndex !== null ? revenueRanges[revenueIndex].multiplier : 1) + 
     (userCountIndex !== null ? userCounts[userCountIndex].multiplier : 1)) / 2
  ) : 0

  // Calculate traditional price (scales with selections)
  const baseTraditionalPrice = 50000
  const traditionalPrice = hasAnySelection ? Math.round(
    baseTraditionalPrice * 
    (industry !== null ? industries[industry].multiplier : 1) *
    (revenueIndex !== null ? revenueRanges[revenueIndex].multiplier : 1) * 
    (userCountIndex !== null ? userCounts[userCountIndex].multiplier : 1) *
    currentMultiplier *
    targetMultiplier
  ) : 0

  // Calculate AI and Human hours based on selections
  // Only show hours when revenue, users, and target system are selected
  const hasHoursRequiredFields = 
    revenueIndex !== null && 
    userCountIndex !== null && 
    targetSystemsSelected.length > 0
  
  // AI does the heavy lifting - human review is minimal
  const baseAIHours = 45
  const baseHumanReviewHours = 2
  const aiHours = hasHoursRequiredFields ? Math.round(
    baseAIHours * 
    revenueRanges[revenueIndex!].multiplier * 
    userCounts[userCountIndex!].multiplier *
    currentMultiplier *
    0.9 // AI scales efficiently
  ) : 0
  const humanReviewHours = hasHoursRequiredFields ? Math.round(
    baseHumanReviewHours * 
    revenueRanges[revenueIndex!].multiplier * 
    userCounts[userCountIndex!].multiplier *
    0.5 // Human review scales minimally - just spot checks
  ) : 0

  // Check if we should show TBD (for large companies, SAP, or 50+ users)
  const showTBD = hasAllSelections && (revenueIndex! >= 3 || targetSystemsSelected.includes(1) || userCountIndex! >= 3)

  return (
    <section id="quote-builder" className={`relative pt-16 pb-10 px-6 overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black border-y border-black/10'}`}>
      {/* Background pattern */}
      <div className={`absolute inset-0 ${isDarkMode ? 'opacity-5' : 'opacity-[0.02]'}`}>
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='1' height='1' fill='${isDarkMode ? '%23fff' : '%23000'}'/%3E%3Crect x='2' y='2' width='1' height='1' fill='${isDarkMode ? '%23fff' : '%23000'}'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <ScrollAnimate animation="fade-up" duration={600}>
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              Select Your Systems
            </h2>
            <p className={`font-mono text-sm max-w-xl mx-auto ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
              Tell us about your setup. Scan your system for an accurate quote.
            </p>
          </div>
        </ScrollAnimate>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Left - Configuration */}
          <ScrollAnimate animation="fade-right" duration={700} delay={100}>
          <div className="space-y-6">
            {/* Industry selector */}
            <div>
              <div className="mb-2">
                <span className={`font-mono text-xs uppercase tracking-wider ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Industry</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {industries.map((ind, i) => (
                  <button
                    key={i}
                    onClick={() => setIndustry(i)}
                    className={`px-4 py-2 font-mono text-xs tracking-wider border transition-all ${
                      industry === i && industry !== null
                        ? isDarkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black'
                        : isDarkMode ? 'border-white/20 text-white/70 hover:border-white/40' : 'border-black/20 text-black/70 hover:border-black/40'
                    }`}
                  >
                    {ind.name.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Current system */}
            <div>
              <div className="mb-2">
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs uppercase tracking-wider ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Current Systems & Tools</span>
                  <span className={`font-mono text-[10px] tracking-wider ${isDarkMode ? 'text-white/30' : 'text-black/30'}`}>Select one or more</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentSystems.map((sys, i) => (
                  (() => {
                    const isSelected = currentSystemsSelected.includes(i)
                    return (
                  <button
                    key={i}
                    onClick={() => toggleSelectedIndex(currentSystemsSelected, i, setCurrentSystemsSelected)}
                    className={`px-4 py-2 font-mono text-xs tracking-wider border transition-all ${
                      isSelected
                        ? isDarkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black'
                        : isDarkMode ? 'border-white/20 text-white/70 hover:border-white/40' : 'border-black/20 text-black/70 hover:border-black/40'
                    }`}
                  >
                    {sys.name.toUpperCase()}
                  </button>
                    )
                  })()
                ))}
              </div>
            </div>

            {/* Revenue range slider */}
            <div>
              <div className="mb-2">
                <span className={`font-mono text-xs uppercase tracking-wider ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Annual Revenue</span>
              </div>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max={revenueRanges.length - 1}
                  value={revenueIndex ?? Math.floor(revenueRanges.length / 2)}
                  onChange={(e) => setRevenueIndex(parseInt(e.target.value))}
                  className={`w-full h-1 rounded-full appearance-none cursor-pointer ${isDarkMode ? 'bg-white/20' : 'bg-black/20'} [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer ${isDarkMode ? '[&::-webkit-slider-thumb]:bg-white' : '[&::-webkit-slider-thumb]:bg-black'}`}
                />
                <div className={`flex justify-between text-[11px] font-mono leading-none ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                  {revenueRanges.map((r, i) => (
                    <span key={i} className={i === revenueIndex && revenueIndex !== null ? (isDarkMode ? 'text-white font-bold' : 'text-black font-bold') : ''}>
                      {r.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* User count slider */}
            <div>
              <div className="mb-2">
                <span className={`font-mono text-xs uppercase tracking-wider ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Number of Users</span>
              </div>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max={userCounts.length - 1}
                  value={userCountIndex ?? Math.floor(userCounts.length / 2)}
                  onChange={(e) => setUserCountIndex(parseInt(e.target.value))}
                  className={`w-full h-1 rounded-full appearance-none cursor-pointer ${isDarkMode ? 'bg-white/20' : 'bg-black/20'} [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer ${isDarkMode ? '[&::-webkit-slider-thumb]:bg-white' : '[&::-webkit-slider-thumb]:bg-black'}`}
                />
                <div className={`flex justify-between text-[11px] font-mono leading-none ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                  {userCounts.map((u, i) => (
                    <span key={i} className={i === userCountIndex && userCountIndex !== null ? (isDarkMode ? 'text-white font-bold' : 'text-black font-bold') : ''}>
                      {u.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Target system */}
            <div>
              <div className="mb-2">
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs uppercase tracking-wider ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Target System</span>
                  <span className={`font-mono text-[10px] tracking-wider ${isDarkMode ? 'text-white/30' : 'text-black/30'}`}>Select one or more</span>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {targetSystems.map((sys, i) => (
                  (() => {
                    const isSelected = targetSystemsSelected.includes(i)
                    // NetSuite logo asset is white; invert it only when the button bg is light.
                    // Light bg cases:
                    // - light mode + unselected (white page background)
                    // - dark mode + selected (selected uses bg-white)
                    const shouldInvertNetSuiteLogo = isDarkMode ? isSelected : !isSelected
                    return (
                  <button
                    key={i}
                    onClick={() => toggleSelectedIndex(targetSystemsSelected, i, setTargetSystemsSelected)}
                    className={`px-4 py-4 min-h-[60px] border transition-all flex items-center justify-center ${
                      isSelected
                        ? isDarkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black'
                        : isDarkMode ? 'border-white/20 text-white/70 hover:border-white/40' : 'border-black/20 text-black/70 hover:border-black/40'
                    }`}
                  >
                    {sys.name === "NetSuite" ? (
                      <>
                        <span className="sr-only">{sys.name}</span>
                        <img
                          src="/images/netsuite-logo.svg"
                          alt=""
                          className={[
                            "h-8 sm:h-10 w-auto object-contain",
                            // When bg is light, use brightness-0 to make white logo black
                            shouldInvertNetSuiteLogo ? "brightness-0" : "",
                          ].join(" ")}
                        />
                      </>
                    ) : sys.name === "SAP Business One" ? (
                      <>
                        <span className="sr-only">{sys.name}</span>
                        <img
                          src="/images/sap-logo.png"
                          alt=""
                          className="h-8 sm:h-10 w-auto object-contain"
                        />
                      </>
                    ) : sys.name === "Microsoft Dynamics" ? (
                      <>
                        <span className="sr-only">{sys.name}</span>
                        <img
                          src="/images/dynamics-logo.png"
                          alt=""
                          className="h-7 sm:h-9 w-auto object-contain"
                        />
                      </>
                    ) : sys.name === "Sage Intacct" ? (
                      <>
                        <span className="sr-only">{sys.name}</span>
                        <img
                          src="/images/sage-logo.png"
                          alt=""
                          className="h-8 sm:h-10 w-auto object-contain"
                        />
                      </>
                    ) : sys.name === "Acumatica" ? (
                      <>
                        <span className="sr-only">{sys.name}</span>
                        <img
                          src="/images/acumatica-logo.png"
                          alt=""
                          className="h-7 sm:h-9 w-auto object-contain"
                        />
                      </>
                    ) : (
                      <span className="font-mono text-xs tracking-wider">
                        {sys.name.toUpperCase()}
                      </span>
                    )}
                  </button>
                    )
                  })()
                ))}
              </div>
            </div>
          </div>
          </ScrollAnimate>

          {/* Right - Quote result */}
          <ScrollAnimate animation="fade-left" duration={700} delay={200}>
          <div className="flex flex-col">
            <div className={`relative border-[3px] p-5 flex flex-col h-full ${isDarkMode ? 'border-white/30 bg-white/5' : 'border-black bg-white'}`}>
              {!hasAnySelection ? (
                // Placeholder state with $0
                <>
                  {/* Summary header */}
                  <div className={`flex items-center justify-between mb-4 pb-3 border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                    <span className="font-mono text-lg font-bold">Source.</span>
                    <span className={`font-mono text-[10px] tracking-wider font-normal ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                      {estimateDateLabel}
                    </span>
                  </div>

                  {/* Configuration summary - placeholder */}
                  <div className={`space-y-1.5 mb-3 pb-3 border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                    <div className="flex justify-between text-sm">
                      <span className={isDarkMode ? 'text-white/50' : 'text-black/50'}>Industry</span>
                      <span className={`font-mono text-sm ${isDarkMode ? 'text-white/30' : 'text-black/30'}`}>—</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={isDarkMode ? 'text-white/50' : 'text-black/50'}>Revenue</span>
                      <span className="font-mono text-sm font-bold">{revenueIndex !== null ? revenueRanges[revenueIndex].label : '—'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={isDarkMode ? 'text-white/50' : 'text-black/50'}>From</span>
                      <span className={`font-mono text-sm ${isDarkMode ? 'text-white/30' : 'text-black/30'}`}>—</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={isDarkMode ? 'text-white/50' : 'text-black/50'}>To</span>
                      <span className={`font-mono text-sm ${isDarkMode ? 'text-white/30' : 'text-black/30'}`}>—</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={isDarkMode ? 'text-white/50' : 'text-black/50'}>Users</span>
                      <span className="font-mono text-sm font-bold">{userCountIndex !== null ? userCounts[userCountIndex].label : '—'}</span>
                    </div>
                    <div className={`flex justify-between items-start text-sm pt-2 mt-2 border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                      <div>
                        <span className={isDarkMode ? 'text-white/50' : 'text-black/50'}>AI Work</span>
                        <span className={`block font-mono text-[10px] tracking-wide mt-0.5 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                          *work done autonomously by Source
                        </span>
                      </div>
                      <span className={`font-mono text-sm ${isDarkMode ? 'text-white/30' : 'text-black/30'} flex-shrink-0 self-start`}>—</span>
                    </div>
                    <div className={`flex justify-between items-start text-sm pt-2 mt-2 border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                      <span className={isDarkMode ? 'text-white/50' : 'text-black/50'}>Human Review</span>
                      <span className={`font-mono text-sm ${isDarkMode ? 'text-white/30' : 'text-black/30'} flex-shrink-0`}>—</span>
                    </div>
                  </div>

                  {/* What's included */}
                  <div className={`mb-3 pb-3 border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                    <div className={`font-mono text-[10px] uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                      What's included
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-0.5">
                      {[
                        "Data mapping",
                        "Validation",
                        "Go-live support",
                        "Training",
                        "Historical data",
                        "Custom fields",
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-1.5 min-w-0">
                          <svg className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'} truncate`}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price - placeholder with $0 */}
                  <div className="flex flex-wrap items-end justify-between gap-4 mb-4 mt-auto min-h-[80px]">
                    <div className="min-w-0 flex-1">
                      <div className={`font-mono text-[10px] uppercase tracking-wider mb-1 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                        Estimated Migration Cost
                      </div>
                      <div className="font-bold tabular-nums h-8 flex items-baseline gap-1.5 flex-wrap">
                        <span className="text-lg">From</span>
                        <span className={`text-2xl ${isDarkMode ? 'text-white/30' : 'text-black/30'}`}>$0</span>
                      </div>
                      <div className={`text-xl line-through ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                        $0+ traditional
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 min-w-[100px]">
                      <div className={`font-mono text-[10px] uppercase tracking-wider mb-1 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                        Timeline
                      </div>
                      <div className={`text-2xl font-bold whitespace-nowrap ${isDarkMode ? 'text-white/30' : 'text-black/30'}`}>
                        0 weeks
                      </div>
                    </div>
                  </div>

                  {/* CTA - disabled state */}
                  <div>
                    <button
                      disabled
                      className={`flex items-center justify-center gap-2 w-full py-4 font-mono text-sm tracking-wider transition-colors cursor-not-allowed ${
                        isDarkMode 
                          ? 'bg-white/20 text-white/40' 
                          : 'bg-black/20 text-black/40'
                      }`}
                    >
                      COMPLETE FORM TO SCAN
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <div className={`mt-3 text-center font-mono text-[11px] ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                      Fill out all fields to get your quote.
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Summary header */}
                  <div className={`flex items-center justify-between mb-4 pb-3 border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                    <span className="font-mono text-lg font-bold">Source</span>
                    <span className={`font-mono text-[10px] tracking-wider font-normal ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                      {estimateDateLabel}
                    </span>
                  </div>

                  {/* Configuration summary */}
                  <div className={`space-y-1.5 mb-3 pb-3 border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                    <div className="flex justify-between text-sm">
                      <span className={isDarkMode ? 'text-white/50' : 'text-black/50'}>Industry</span>
                      <span className={`font-mono text-sm ${industry !== null ? 'font-bold' : (isDarkMode ? 'text-white/30' : 'text-black/30')}`}>
                        {industry !== null ? industries[industry].name : '—'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={isDarkMode ? 'text-white/50' : 'text-black/50'}>Revenue</span>
                      <span className={`font-mono text-sm ${revenueIndex !== null ? 'font-bold' : (isDarkMode ? 'text-white/30' : 'text-black/30')}`}>
                        {revenueIndex !== null ? revenueRanges[revenueIndex].label : '—'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={isDarkMode ? 'text-white/50' : 'text-black/50'}>From</span>
                      <span className={`font-mono text-sm ${currentSystemsSelected.length > 0 ? 'font-bold' : (isDarkMode ? 'text-white/30' : 'text-black/30')}`}>
                        {currentSystemsSelected.length > 0 ? formatSelectedNames(currentSystems.map((s) => s.name), currentSystemsSelected) : '—'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={isDarkMode ? 'text-white/50' : 'text-black/50'}>To</span>
                      <span className={`font-mono text-sm ${targetSystemsSelected.length > 0 ? 'font-bold' : (isDarkMode ? 'text-white/30' : 'text-black/30')}`}>
                        {targetSystemsSelected.length > 0 ? formatSelectedNames(targetSystems.map((s) => s.name), targetSystemsSelected) : '—'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={isDarkMode ? 'text-white/50' : 'text-black/50'}>Users</span>
                      <span className={`font-mono text-sm ${userCountIndex !== null ? 'font-bold' : (isDarkMode ? 'text-white/30' : 'text-black/30')}`}>
                        {userCountIndex !== null ? userCounts[userCountIndex].label : '—'}
                      </span>
                    </div>
                    <div className={`flex justify-between items-start text-sm pt-2 mt-2 border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                      <div>
                        <span className={`font-bold ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>AI Work</span>
                        <span className={`block font-mono text-[10px] tracking-wide mt-0.5 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                          *work done autonomously by Source
                        </span>
                      </div>
                      <span className={`font-mono text-sm ${hasHoursRequiredFields ? 'font-bold' : ''} ${hasHoursRequiredFields ? (isDarkMode ? 'text-white' : 'text-black') : (isDarkMode ? 'text-white/30' : 'text-black/30')} flex-shrink-0 self-start`}>
                        {hasHoursRequiredFields ? `${aiHours} hrs.` : '—'}
                      </span>
                    </div>
                    <div className={`flex justify-between items-start text-sm pt-2 mt-2 border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                      <span className={`font-bold ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Human Review</span>
                      <span className={`font-mono text-sm ${hasHoursRequiredFields ? 'font-bold' : ''} ${hasHoursRequiredFields ? (isDarkMode ? 'text-white' : 'text-black') : (isDarkMode ? 'text-white/30' : 'text-black/30')} flex-shrink-0`}>
                        {hasHoursRequiredFields ? `${humanReviewHours} hrs.` : '—'}
                      </span>
                    </div>
                  </div>

                  {/* What's included */}
                  <div className={`mb-3 pb-3 border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                    <div className={`font-mono text-[10px] uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                      What's included
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-0.5">
                      {[
                        "Data mapping",
                        "Validation",
                        "Go-live support",
                        "Training",
                        "Historical data",
                        "Custom fields",
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-1.5 min-w-0">
                          <svg className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'} truncate`}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price - fixed height container to prevent layout shift */}
                  <div className="flex flex-wrap items-end justify-between gap-4 mb-4 mt-auto min-h-[80px]">
                    <div className="min-w-0 flex-1">
                      <div className={`font-mono text-[10px] uppercase tracking-wider mb-1 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                        Estimated Migration Cost
                      </div>
                      <div className="font-bold tabular-nums h-8 flex items-baseline gap-1.5 flex-wrap">
                        {!showTBD && <span className="text-lg">From</span>}
                        <span className="text-2xl">{showTBD ? "TBD" : `$${calculatedPrice.toLocaleString()}`}</span>
                      </div>
                      <div className={`text-xl line-through ${isDarkMode ? 'text-white/50' : 'text-black/50'} break-words`}>
                        ${traditionalPrice.toLocaleString()}+ traditional
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 min-w-[100px]">
                      <div className={`font-mono text-[10px] uppercase tracking-wider mb-1 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                        Timeline
                      </div>
                      <div className="text-2xl font-bold whitespace-nowrap">
                        {showTBD ? "Contact" : `${calculatedWeeks} weeks`}
                      </div>
                    </div>
                  </div>

                  {/* CTA - consistent structure for both states */}
                  <div>
                    {hasAllSelections ? (
                      <a
                        href={showTBD ? "/contact" : "/demo"}
                        className={`flex items-center justify-center gap-2 w-full py-4 font-mono text-sm tracking-wider transition-colors ${
                          isDarkMode 
                            ? 'bg-white text-black hover:bg-white/90' 
                            : 'bg-black text-white hover:bg-black/90'
                        }`}
                      >
                        {showTBD ? 'SCAN SYSTEM / BOOK A CALL' : 'SCAN YOUR SYSTEM'}
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    ) : (
                      <button
                        disabled
                        className={`flex items-center justify-center gap-2 w-full py-4 font-mono text-sm tracking-wider transition-colors cursor-not-allowed ${
                          isDarkMode 
                            ? 'bg-white/20 text-white/40' 
                            : 'bg-black/20 text-black/40'
                        }`}
                      >
                        COMPLETE ALL FIELDS
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                    <div className={`mt-3 text-center font-mono text-[11px] ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                      {hasAllSelections 
                        ? (showTBD 
                          ? 'For enterprise accounts, we recommend a call first.' 
                          : 'Scan your system for an accurate quote.')
                        : 'Fill out all fields to proceed.'}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          </ScrollAnimate>
        </div>

      </div>
    </section>
  )
}
