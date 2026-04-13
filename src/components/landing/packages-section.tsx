"use client"

import { useState } from "react"
import {
  Search,
  FileText,
  Database,
  Trash2,
  FileCheck,
  Check,
  MessageSquare
} from "lucide-react"
import { ChatPreview } from "./chat-preview"
import { ScrollAnimate } from "@/components/ui/scroll-animate"

const packages = [
  {
    icon: MessageSquare,
    title: "Support Queries",
    description: "Get instant answers about your ERP cross-referenced with your actual data",
    price: "Free",
    time: "Instant",
    popular: true,
    reportId: "RPT-010",
    useCaseId: "support",
    includes: [
      "Natural language queries",
      "Cross-referenced answers",
      "Transaction lookup",
      "Real-time analysis",
      "Action suggestions"
    ]
  },
  {
    icon: Search,
    title: "System Health Check",
    description: "Full audit of your ERP with prioritized issues and recommendations",
    price: "Free",
    time: "5 min",
    reportId: "RPT-001",
    useCaseId: "discovery",
    includes: [
      "Data integrity scan",
      "Integration status check",
      "Script performance audit",
      "Security review",
      "Prioritized issue list"
    ]
  },
  {
    icon: Database,
    title: "Migration Assessment",
    description: "Analyze data volume, complexity, and migration path planning",
    price: "$500",
    time: "24 hrs",
    reportId: "RPT-002",
    useCaseId: "migration",
    includes: [
      "Data volume analysis",
      "Field mapping matrix",
      "Complexity scoring",
      "Timeline estimate",
      "Risk assessment"
    ]
  },
  {
    icon: Trash2,
    title: "Duplicate Detection",
    description: "Find and merge duplicate customer, vendor, and item records",
    price: "$200",
    time: "1 hr",
    reportId: "RPT-003",
    useCaseId: "duplicates",
    includes: [
      "Exact match detection",
      "Fuzzy match scoring",
      "Merge preview",
      "Audit trail export",
      "Rollback capability"
    ]
  },
  {
    icon: FileCheck,
    title: "RFP Generator",
    description: "System-aware vendor evaluation documents",
    price: "$800",
    time: "24 hrs",
    reportId: "RPT-008",
    useCaseId: "rfp",
    includes: [
      "Requirements matrix",
      "Integration inventory",
      "Custom field list",
      "Scoring template",
      "Vendor comparison"
    ]
  },
  {
    icon: FileText,
    title: "Custom Change Request",
    description: "Any field, form, workflow, or configuration change",
    price: "From $150",
    time: "Varies",
    reportId: "RPT-009",
    useCaseId: "change",
    includes: [
      "Requirement analysis",
      "Impact assessment",
      "Implementation plan",
      "Testing protocol",
      "Documentation"
    ]
  },
]

// Individual package card component to manage hover state
function PackageCard({ pkg, index }: { pkg: typeof packages[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = pkg.icon
  
  return (
    <div
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        {/* Left/Right swap on desktop for alternating layout */}
        <div
          className={[
            "lg:col-span-5",
            index % 2 === 0 ? "lg:order-1" : "lg:order-2",
          ].join(" ")}
        >
          <div className="bg-white/80 backdrop-blur-sm border border-black/10 shadow-sm p-7">
            {/* Icon */}
            <div className="w-10 h-10 border border-black/10 bg-black/[0.02] flex items-center justify-center mb-5">
              <Icon className="w-5 h-5 text-black/50 group-hover:text-black transition-colors" />
            </div>

            {/* Title & Description */}
            <h3 className="font-bold text-black text-2xl tracking-tight mb-2">{pkg.title}</h3>
            <p className="text-sm text-black/60 mb-6 leading-relaxed max-w-[56ch]">
              {pkg.description}
            </p>

            {/* Includes list */}
            <div className="mb-6 py-4 border-y border-dashed border-black/10">
              <div className="font-mono text-[9px] text-black/40 uppercase tracking-wider mb-3">Includes</div>
              <div className="space-y-2">
                {pkg.includes.map((item, j) => (
                  <div key={j} className="flex items-center gap-2 text-xs text-black/60">
                    <Check className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a
              href="/demo"
              className="flex items-center justify-center gap-2 py-3 bg-black text-white font-mono text-[11px] tracking-wider hover:bg-black/90 transition-colors"
            >
              RUN REPORT — {pkg.price}
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
          <div className="bg-white border border-black/10 shadow-sm p-5">
            <div className="min-h-[420px]">
              <ChatPreview useCaseId={pkg.useCaseId} isHovered={isHovered} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PackagesSection() {
  return (
    <section id="packages" className="relative bg-white pt-10 pb-10 overflow-hidden border-t border-black/5 scroll-mt-24">
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section header */}
          <ScrollAnimate animation="fade-up" duration={700}>
            <div className="text-center mb-12">
              <div className="font-mono text-[10px] text-black/40 tracking-widest mb-3">
                PACKAGED REPORTS
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-3">
                Not ready to migrate?
                <br />
                <span className="font-normal">Look at our ready to run solutions.</span>
              </h2>
              <div className="mt-5 flex justify-center">
                <a
                  href="/use-cases"
                  className="inline-flex items-center gap-2 font-mono text-[11px] tracking-wider text-black/50 hover:text-black transition-colors"
                >
                  VIEW ALL <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </ScrollAnimate>
        </div>

        {/* Alternating full-width bands for easier scanning */}
        <div className="space-y-0">
          {packages.map((pkg, i) => (
            <div
              key={i}
              id={
                pkg.useCaseId === "migration"
                  ? "migration-assessment"
                  : pkg.useCaseId === "change"
                  ? "custom-change-request"
                  : undefined
              }
              className={[
                "py-14 w-full",
                // Start with grey so 6/6 ends on white while still alternating.
                i % 2 === 0 ? "bg-neutral-50 border-y border-black/5" : "bg-white",
                pkg.useCaseId === "migration" || pkg.useCaseId === "change" ? "scroll-mt-24" : "",
              ].join(" ")}
            >
              <ScrollAnimate animation="fade-up" duration={600} threshold={0.15}>
                <div className="max-w-6xl mx-auto px-6">
                  <PackageCard pkg={pkg} index={i} />
                </div>
              </ScrollAnimate>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
