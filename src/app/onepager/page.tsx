"use client";

import React from "react";
import {
  Check,
  X,
  Calendar,
  Search,
  Settings,
  Database,
  FileText,
  Link,
  Workflow,
  Shield,
  BarChart3,
  Users,
  Globe,
  Layers,
  Zap,
  Clock,
  Scan,
  DollarSign,
  ChevronDown,
  Download,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const STATS = [
  {
    value: "50%+",
    label: "Contribution Margin",
    sub: "vs ~20% traditional",
    Icon: BarChart3,
  },
  {
    value: "21 Days",
    label: "Days to Go-Live",
    sub: "vs 4–6 months traditional",
    Icon: Clock,
  },
  {
    value: "85%",
    label: "AI-Automated",
    sub: "~12 hrs consultant time",
    Icon: Zap,
  },
];

const SOURCE_ENGINE_STEPS = [
  { label: "AI Scan", Icon: Search },
  { label: "Business logic", Icon: Layers },
  { label: "Mapping", Icon: Workflow },
  { label: "BRD generation", Icon: FileText },
  { label: "Config & ETL", Icon: Settings },
  { label: "Testing & QA", Icon: Shield },
  { label: "Validation", Icon: Check },
  { label: "Go-Live", Icon: Zap },
];

const CONSULTANT_HANDLES = [
  { label: "Client relationship", Icon: Users },
  { label: "Sales & scoping", Icon: Globe },
  { label: "Provides context", Icon: Database },
  { label: "Reviews outputs", Icon: FileText },
];

/** Order in “After” flow diagram (matches reference) */
const CONSULTANT_AFTER_FLOW = [
  { label: "Client relationship", Icon: Users },
  { label: "Provides context", Icon: Database },
  { label: "Sales & scoping", Icon: Globe },
  { label: "Reviews outputs", Icon: FileText },
];

const CASE_STUDY_STATS = [
  { value: "13", label: "Days to Go-Live" },
  { value: "$6K", label: "Source Cost" },
  { value: "50%+", label: "Partner Margin" },
  { value: "~12h", label: "Consultant Time" },
];

const CASE_STUDY_DELIVERED = [
  "Chart of Accounts + 380 GL accounts migrated",
  "4,200+ SKUs & product catalog migrated",
  "10 years of historical financials migrated",
  "Full NetSuite config — subsidiaries, classes, locations",
  "Shopify, Stripe, HubSpot connectors live",
  "White-label, fixed price, zero scope creep",
];

const PRICING_STEPS = [
  {
    n: "01",
    title: "You send the SOW",
    body: "Drop in the client's scope, requirements, or existing SOW — however detailed or rough.",
    Icon: FileText,
  },
  {
    n: "02",
    title: "Our AI scans & quotes",
    body: "Source AI reads the SOW, runs a read-only scan of the client's live systems, and returns a fixed price within 24 hours — no scoping calls, no T&M guesswork.",
    Icon: Scan,
  },
  {
    n: "03",
    title: "You charge the client",
    body: "You mark up, invoice your client directly, and keep the margin. Source is your back-office engine.",
    Icon: DollarSign,
  },
];

const PRICING_WHATS_INCLUDED = [
  "Chart of Accounts migration",
  "Historical transactions (3 yrs)",
  "Product catalog & inventory (4,200 SKUs)",
  "NetSuite configuration & sandbox",
  "Shopify + Stripe + HubSpot connectors",
  "UAT, cutover & go-live support",
];

const WHITE_LABEL_POINTS = [
  "Delivered 100% under your consultancy's brand",
  "No Source branding visible to your end client",
  "Your methodology, your client relationship",
  "Source operates as a silent delivery engine",
  "You present the outputs as your own work product",
];

const ERP_LOGOS = [
  { src: "/onepager/logos/netsuite.svg", alt: "NetSuite", h: "h-6" },
  { src: "/onepager/logos/d365.svg", alt: "Dynamics 365", h: "h-9" },
  { src: "/onepager/logos/sap.svg", alt: "SAP", h: "h-7" },
  { src: "/onepager/logos/quickbooks.svg", alt: "QuickBooks", h: "h-10" },
  { src: "/onepager/logos/xero.svg", alt: "Xero", h: "h-8" },
  { src: "/logos/sage.svg", alt: "Sage", h: "h-8" },
  { src: "/onepager/logos/acumatica.svg", alt: "Acumatica", h: "h-7" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-0.5 h-3 bg-black shrink-0" />
      <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-black/35 font-semibold">
        {children}
      </div>
      <div className="flex-1 h-px bg-black/[0.07]" />
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function OnePagerPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-black">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-6 sm:py-10">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-5 border-b border-black/[0.06] gap-2">
          <span className="text-[32px] sm:text-[38px] font-display tracking-normal leading-tight text-black">
            Source
          </span>
          <div className="text-[13px] sm:text-[18px] font-mono uppercase tracking-[0.06em] text-black/60 font-bold">
            AI ERP Implementations
          </div>
        </div>

        {/* ── Subtitle ────────────────────────────────────────────────────── */}
        <div className="mb-7">
          <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.12em] text-black/35 mb-2">
            Partner One-Pager
          </div>
          <p className="text-[22px] sm:text-[30px] font-semibold tracking-[-0.02em] text-black leading-[1.15] mb-3 max-w-[780px]">
            The go-to AI partner for ERP VARs &amp; Firms.
          </p>
          <p className="text-[17px] sm:text-[21px] italic text-black/55 leading-[1.5] max-w-[780px]">
            We automate ERP implementations with AI. You keep the client, the
            brand, and you make{" "}
            <span className="not-italic font-semibold text-black">50%+ margins.</span>
          </p>
        </div>

        {/* ── Stat cards ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
          {STATS.map(({ value, label, sub, Icon }) => (
            <div
              key={label}
              className="bg-white border border-black/[0.06] px-5 sm:px-6 py-5 sm:py-6 text-center"
            >
              <Icon
                className="w-5 h-5 mx-auto text-black/20 mb-2.5"
                strokeWidth={1.75}
              />
              <div className="text-[30px] sm:text-[34px] font-semibold tracking-tight text-black leading-none select-none">
                {value}
              </div>
              <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.12em] text-black/50 font-bold mt-2">
                {label}
              </div>
              <div className="text-[11px] text-black/30 mt-1 tracking-tight">
                {sub}
              </div>
            </div>
          ))}
        </div>

        {/* ── Main two-panel ──────────────────────────────────────────────── */}
        <div className="bg-white border border-black/[0.08] mb-6">
          <div className="flex flex-col md:flex-row">
            {/* Left panel */}
            <div className="md:flex-1 p-4 sm:p-6 md:border-r border-b md:border-b-0 border-black/[0.06] flex flex-col">
              {/* Bold value prop box */}
              <div className="border-2 border-black/[0.09] px-6 sm:px-8 py-5 sm:py-6 mb-5">
                <p className="text-[18px] sm:text-[22px] md:text-[25px] font-semibold text-black/90 leading-[1.35]">
                  Source is an AI engine that automates{" "}
                  <span className="text-black">85% of ERP implementation delivery</span>{" "}
                  — scanning, BRD generation, data migration, configuration, testing.
                </p>
              </div>

              {/* What partners are saying */}
              <div className="bg-[#f5f5f3] border border-black/[0.08] px-6 sm:px-8 py-7 sm:py-8 flex-1">
                <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-black/35 mb-5">
                  What Partners Are Saying
                </div>
                <p className="text-[17px] sm:text-[19px] md:text-[20px] leading-[1.55] text-black/75 mb-7 tracking-[-0.005em]">
                  &ldquo;Source handles the materials, the configuration, the full ERP
                  implementation end-to-end. We focus on the upsell, the client experience, the
                  relationship — and we&apos;re finally able to{" "}
                  <span className="font-semibold text-black">
                    scale our services firm with Source
                  </span>{" "}
                  without scaling headcount.&rdquo;
                </p>
                <div className="h-px bg-black/[0.08] mb-4" />
                <div className="text-[14px] sm:text-[15px] font-semibold text-black">
                  COO, California Services Firm
                </div>
                <div className="text-[12px] sm:text-[13px] text-black/45 mt-1 leading-[1.55]">
                  Source partner since 2025 · 50%+ contribution margin on every engagement
                </div>
              </div>
            </div>

            {/* Black right sidebar */}
            <div className="md:w-[320px] shrink-0 bg-black p-5 sm:p-6 md:rounded-r-sm">
              <div className="text-[13px] sm:text-[14px] font-mono uppercase tracking-[0.10em] text-white font-bold mb-1.5">
                Source AI Engine
              </div>
              <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-white/50 mb-4">
                Sub 21 Days
              </div>
              <div className="h-px bg-white/[0.22] mb-4" />
              <div className="grid grid-cols-2 md:grid-cols-1 gap-2.5 md:gap-0 md:space-y-3">
                {SOURCE_ENGINE_STEPS.map(({ label, Icon }, i) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <span className="text-[10px] font-mono tracking-[0.08em] text-white/35 w-[18px] shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon
                      className="w-3.5 h-3.5 text-white/55 shrink-0"
                      strokeWidth={1.75}
                    />
                    <span className="text-[13px] sm:text-[14px] font-medium text-white/90">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-white/[0.18] mt-6 mb-4" />
              <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-white/60 font-bold mb-3">
                Your Consultant Handles
              </div>
              <div className="space-y-2.5">
                {CONSULTANT_HANDLES.map(({ label, Icon }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <Icon
                      className="w-3.5 h-3.5 text-white/50 shrink-0"
                      strokeWidth={1.75}
                    />
                    <span className="text-[13px] sm:text-[14px] font-medium text-white/75">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Before / After flow ─────────────────────────────────────────── */}
        <div className="bg-white border border-black/[0.08] p-4 sm:p-6 mb-6">
          <SectionLabel>How It Works — Before & After</SectionLabel>

          {/* Before */}
          <div className="mb-5">
            <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-black/30 font-semibold mb-3">
              Before
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {/* End Client */}
              <div className="flex items-center gap-1.5 px-3.5 py-2.5 border border-black/[0.10] text-[13px] font-medium text-black/65">
                <Users className="w-3.5 h-3.5 text-black/40 shrink-0" strokeWidth={1.75} />
                End Client
              </div>
              <span className="text-black/20 text-[14px]">→</span>
              {/* Sales */}
              <div className="flex items-center gap-1.5 px-3.5 py-2.5 border border-black/[0.10] text-[13px] font-medium text-black/65">
                <Globe className="w-3.5 h-3.5 text-black/40 shrink-0" strokeWidth={1.75} />
                Sales
              </div>
              <span className="text-black/20 text-[14px]">→</span>
              {/* Solutions Architect — crossed */}
              <div className="relative flex items-center gap-1.5 px-3.5 py-2.5 border border-black/[0.07] bg-black/[0.02] text-[13px] font-medium text-black/20 line-through decoration-red-400/50">
                <Users className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
                Solutions Architect
                <X className="absolute -top-1.5 -right-1.5 w-3 h-3 text-red-500/50 bg-white" strokeWidth={2.5} />
              </div>
              <span className="text-black/20 text-[14px]">→</span>
              {/* Offshore Dev — crossed */}
              <div className="relative flex items-center gap-1.5 px-3.5 py-2.5 border border-black/[0.07] bg-black/[0.02] text-[13px] font-medium text-black/20 line-through decoration-red-400/50">
                <Database className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
                Offshore Dev Team
                <X className="absolute -top-1.5 -right-1.5 w-3 h-3 text-red-500/50 bg-white" strokeWidth={2.5} />
              </div>
              <span className="text-black/20 text-[14px]">→</span>
              {/* Done */}
              <div className="flex items-center gap-1.5 px-3.5 py-2.5 border border-black/[0.10] text-[13px] font-medium text-black/65">
                <Check className="w-3.5 h-3.5 text-black/40 shrink-0" strokeWidth={1.75} />
                Done
              </div>
            </div>
          </div>

          {/* After — legacy → consultant → live system */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-black/30 font-semibold mb-3">
              After
            </div>
            <div className="grid grid-cols-[1fr_24px_2fr_24px_1fr] items-stretch border border-black/[0.08] overflow-hidden bg-white">
              {/* End Client */}
              <div className="min-w-0 flex flex-col justify-center px-4 sm:px-6 py-5">
                <div className="text-[9px] font-mono uppercase tracking-[0.10em] text-black/30 mb-1">
                  End Client
                </div>
                <div className="text-[14px] sm:text-[15px] font-semibold text-black leading-tight">
                  Legacy System
                </div>
              </div>
              <div className="flex items-center justify-center text-black/25 text-[15px] border-l border-black/[0.08]">
                →
              </div>

              {/* Your Consultant — 2×2 grid */}
              <div className="min-w-0 px-4 sm:px-6 py-5 border-l border-black/[0.08] flex flex-col justify-center">
                <div className="text-[9px] font-mono uppercase tracking-[0.10em] text-black/30 mb-3">
                  Your Consultant
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                  {CONSULTANT_AFTER_FLOW.map(({ label, Icon }) => (
                    <div key={label} className="flex items-center gap-2 min-w-0">
                      <Icon className="w-3.5 h-3.5 text-black/35 shrink-0" strokeWidth={1.75} />
                      <span className="text-[12px] sm:text-[12.5px] text-black/55 leading-tight truncate">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center text-black/25 text-[15px] border-l border-black/[0.08]">
                →
              </div>

              {/* Live System */}
              <div className="min-w-0 flex flex-col justify-center px-4 sm:px-6 py-5 border-l border-black/[0.08]">
                <div className="text-[9px] font-mono uppercase tracking-[0.10em] text-emerald-700/90 mb-1 font-semibold">
                  Live System
                </div>
                <div className="text-[14px] sm:text-[15px] font-semibold text-emerald-700 leading-tight">
                  Target ERP
                </div>
              </div>
            </div>

            <div className="relative bg-[#fafafa] border-x border-b border-black/[0.08] flex flex-col items-center justify-center py-2.5">
              <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-black/35 font-semibold">
                Powered by
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-black/25 mt-0.5" strokeWidth={2.25} />
            </div>

            <div className="border border-t-0 border-black/[0.08] bg-black px-5 sm:px-7 py-5 sm:py-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div>
                  <div className="text-[9px] font-mono uppercase tracking-[0.12em] text-white/45 mb-1">
                    Powered by
                  </div>
                  <div className="text-[15px] sm:text-[17px] font-mono uppercase tracking-[0.08em] text-white font-bold">
                    Source AI Engine
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 self-start text-[9px] font-mono uppercase tracking-[0.06em] bg-white text-black px-3 py-1.5 font-bold">
                  <Clock className="w-3.5 h-3.5 text-black/70 shrink-0" strokeWidth={2} />
                  Sub 21 Days · End-to-end
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2.5 sm:gap-y-3">
                {SOURCE_ENGINE_STEPS.map(({ label, Icon }, i) => (
                  <div key={label} className="flex items-center gap-2 min-w-0">
                    <span className="text-[9px] font-mono text-white/35 w-[18px] shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon className="w-3.5 h-3.5 text-white/45 shrink-0" strokeWidth={1.75} />
                    <span className="text-[11px] sm:text-[12px] font-medium text-white/90 truncate">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-5 pt-4 border-t border-white/[0.12]">
                <div className="flex-1 h-px bg-white/[0.15]" />
                <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.12em] text-white/40 whitespace-nowrap text-center">
                  85% AI-automated · ~12 hrs consultant review
                </div>
                <div className="flex-1 h-px bg-white/[0.15]" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Case Study ──────────────────────────────────────────────────── */}
        <div className="border-2 border-black/[0.10] mb-6 overflow-hidden bg-white">
          <div className="bg-black text-white px-5 sm:px-7 py-6 sm:py-7">
            <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-white/40 mb-3">
              Case Study — Real Migration
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h2 className="text-[22px] sm:text-[28px] font-semibold tracking-tight text-white leading-tight">
                  QuickBooks → NetSuite in 13 Days
                </h2>
                <p className="text-[13px] sm:text-[14px] text-white/50 mt-2 leading-relaxed max-w-[640px]">
                  Mid-market retailer · ~120 employees · $33M annual transactions
                </p>
              </div>
              <span className="inline-flex items-center gap-2 shrink-0 self-start text-[10px] font-mono uppercase tracking-[0.10em] font-bold text-[#34d399] border border-[#34d399]/40 bg-[#10B981]/10 px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] shrink-0" />
                Completed
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-7">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border border-black/[0.08] overflow-hidden mb-6">
              {CASE_STUDY_STATS.map(({ value, label }, i) => (
                <div
                  key={label}
                  className={`px-3 py-4 text-center bg-white ${
                    i > 0 ? "border-l border-black/[0.08]" : ""
                  }`}
                >
                  <div className="text-[24px] sm:text-[30px] font-bold tracking-tight text-black leading-none mb-1.5">
                    {value}
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.10em] text-black/40 font-medium">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            <div className="border border-black/[0.08] rounded-sm p-4 sm:p-6 bg-white">
              <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-black/35 mb-4">
                What was delivered
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {CASE_STUDY_DELIVERED.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <Check
                      className="w-4 h-4 shrink-0 mt-0.5 text-[#16a34a]/80"
                      strokeWidth={2.5}
                    />
                    <span className="text-[14px] sm:text-[15px] text-black/75 leading-[1.55]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Supported Systems ───────────────────────────────────────────── */}
        <div className="bg-white border border-black/[0.08] px-4 sm:px-6 py-4 sm:py-5 mb-6">
          <SectionLabel>Supported Systems</SectionLabel>
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-x-8 gap-y-5 px-1 sm:px-2">
            {ERP_LOGOS.map(({ src, alt, h }) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={alt}
                src={src}
                alt={alt}
                className={`${h} w-auto max-h-10 object-contain grayscale opacity-[0.72] hover:opacity-100 transition-opacity`}
              />
            ))}
          </div>
          <p className="text-[12px] sm:text-[13px] text-black/45 mt-5 leading-relaxed max-w-[820px]">
            We routinely ingest messy sources — spreadsheets, CSV exports, legacy databases,
            and ad-hoc files — not just clean API feeds.
          </p>
        </div>

        {/* ── See it in action ────────────────────────────────────────────── */}
        <div className="bg-white border border-black/[0.08] p-4 sm:p-6 mb-6">
          <SectionLabel>See it in action</SectionLabel>
          <p className="text-[14px] sm:text-[15px] text-black/55 leading-[1.65] mb-5 max-w-[880px]">
            Don&apos;t believe us? Hop on a call and watch a live QuickBooks → NetSuite migration. See how Source scans
            the legacy system, generates the BRD, migrates data, and configures NetSuite — all in under 21 days.
          </p>
          <a
            href="https://cal.com/source-ai/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block rounded-md border border-black/[0.10] bg-white overflow-hidden shadow-[0_24px_60px_-20px_rgba(0,0,0,0.25),0_8px_20px_-8px_rgba(0,0,0,0.12)] hover:shadow-[0_32px_80px_-24px_rgba(0,0,0,0.32),0_10px_24px_-8px_rgba(0,0,0,0.16)] transition-shadow"
          >
            {/* Browser-style chrome */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-black/[0.08] bg-[#fafafa]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 mx-3 px-3 py-1 rounded-sm bg-white border border-black/[0.06] text-[10px] sm:text-[11px] font-mono text-black/40 truncate">
                source.shop / live-implementation · QBO → NetSuite
              </div>
              <span className="hidden sm:inline text-[10px] font-mono uppercase tracking-[0.12em] text-emerald-700/80 font-bold">
                Live
              </span>
            </div>

            {/* App body */}
            <div className="p-6 sm:p-10 lg:p-12 bg-white">
              <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-start">
                <div>
                  <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.14em] text-black/40 mb-3">
                    BRD v2 · Locked Quote
                  </div>
                  <div className="text-[26px] sm:text-[34px] font-semibold tracking-tight text-black leading-tight mb-3">
                    QuickBooks → NetSuite
                  </div>
                  <div className="text-[40px] sm:text-[56px] font-bold tracking-[-0.03em] text-black leading-none mb-3">
                    $7,000 – $11,500
                  </div>
                  <p className="text-[13px] sm:text-[14px] text-black/55 leading-[1.6] max-w-[480px] mb-6">
                    Source AI implementation fee, fixed after sign-off. 93–95% below traditional
                    implementation ($150K–$250K).
                  </p>
                  <div className="inline-flex items-center gap-2 border border-black/[0.12] bg-white px-3.5 py-2.5 text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.06em] text-black/65 rounded-sm">
                    <Download className="w-3.5 h-3.5" strokeWidth={1.75} />
                    Download SOW + cost breakdown
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["Edition", "OneWorld"],
                    ["Modules live", "24"],
                    ["Records migrated", "318K"],
                    ["Timeline", "13 days"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="border border-black/[0.08] rounded-sm bg-white px-4 py-3.5"
                    >
                      <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.12em] text-black/35 mb-1.5">
                        {k}
                      </div>
                      <div className="text-[18px] sm:text-[22px] font-semibold tracking-tight text-black leading-none">
                        {v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Soft overlay + play */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-black/0 via-black/[0.18] to-black/45 transition-colors group-hover:via-black/[0.22] group-hover:to-black/55">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 flex items-center justify-center shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] mb-4 group-hover:scale-105 transition-transform">
                <div className="w-0 h-0 border-l-[16px] sm:border-l-[18px] border-l-black border-y-[11px] sm:border-y-[12px] border-y-transparent ml-1.5" />
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] text-white/85 mb-2">
                Book a call
              </div>
              <div className="text-[18px] sm:text-[22px] font-semibold text-white text-center px-6 leading-tight max-w-[640px]">
                See a live ERP implementation by Source on call
              </div>
              <div className="text-[12px] sm:text-[13px] text-white/70 mt-2">
                Real QuickBooks → NetSuite · Real data · Real config
              </div>
            </div>
          </a>
        </div>

        {/* ── Pricing — Send SOW. Get AI Price. Charge Client. ─────────────── */}
        <div className="bg-white border border-black/[0.08] p-4 sm:p-6 mb-6">
          <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-black/30 mb-2">
            Pricing
          </div>
          <div className="text-[22px] sm:text-[30px] font-semibold tracking-[-0.02em] text-black mb-2 leading-[1.1]">
            Send SOW. Get AI Price. Charge Client.
          </div>
          <div className="text-[13px] sm:text-[15px] text-black/45 leading-[1.65] mb-6 max-w-[720px]">
            No quoting calls, no scoping workshops, no T&amp;M surprises. Three
            steps from SOW to invoice.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-3 md:gap-0 items-stretch">
            {PRICING_STEPS.map(({ n, title, body, Icon }, i) => (
              <React.Fragment key={n}>
                <div className="border border-black/[0.08] bg-white p-5 sm:p-6 flex flex-col">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-9 h-9 bg-black flex items-center justify-center">
                      <Icon
                        className="w-4 h-4 text-white"
                        strokeWidth={1.75}
                      />
                    </div>
                    <div className="text-[10px] font-mono tracking-[0.12em] text-black/30">
                      {n}
                    </div>
                  </div>
                  <div className="text-[15px] sm:text-[17px] font-semibold text-black mb-2">
                    {title}
                  </div>
                  <div className="text-[13px] sm:text-[14px] text-black/50 leading-[1.6]">
                    {body}
                  </div>
                </div>
                {i < PRICING_STEPS.length - 1 && (
                  <div className="hidden md:flex items-center justify-center px-3 text-black/25 text-[18px]">
                    →
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Example quote */}
          <div className="border border-black/[0.08] mt-5 overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-5 py-3.5 bg-[#fafafa] border-b border-black/[0.08]">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-black/40 font-semibold">
                  Example Quote
                </span>
                <span className="inline-flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.08em] font-bold text-[#15803d] bg-[#16a34a]/[0.08] border border-[#16a34a]/[0.25] px-2 py-1 rounded-full">
                  <span className="w-1 h-1 rounded-full bg-[#16a34a]" />
                  Returned in 24h
                </span>
              </div>
              <div className="text-[10px] font-mono text-black/35 tracking-tight">
                Quote #Q-2026-0412 · QBO → NetSuite
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-black/[0.08]">
              <div className="px-4 sm:px-6 py-5">
                <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-black/40 mb-2">
                  Source AI fee
                </div>
                <div className="text-[28px] sm:text-[32px] font-semibold tracking-tight text-black">
                  $9,500
                </div>
                <div className="text-[12px] text-black/45 mt-1">
                  Fixed price · discovery → go-live
                </div>
              </div>
              <div className="px-4 sm:px-6 py-5">
                <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-black/40 mb-2">
                  Your markup
                </div>
                <div className="text-[28px] sm:text-[32px] font-semibold tracking-tight text-black">
                  $9,500
                </div>
                <div className="text-[12px] font-semibold text-[#16a34a] mt-1">
                  50% margin retained
                </div>
              </div>
              <div className="px-4 sm:px-6 py-5 bg-black text-white flex flex-col justify-center">
                <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-white/50 mb-2">
                  Client pays
                </div>
                <div className="text-[28px] sm:text-[32px] font-semibold tracking-tight">
                  $19,000
                </div>
                <div className="text-[11px] sm:text-[12px] text-white/55 mt-1 leading-snug">
                  93–95% below traditional ($150K–$250K)
                </div>
              </div>
            </div>
            <div className="px-4 sm:px-5 py-4 bg-[#fafafa] border-t border-black/[0.06]">
              <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-black/35 mb-3">
                What&apos;s included
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {PRICING_WHATS_INCLUDED.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <Check
                      className="w-4 h-4 shrink-0 mt-0.5 text-[#16a34a]/70"
                      strokeWidth={2.5}
                    />
                    <span className="text-[13px] sm:text-[14px] text-black/70 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-stretch bg-black text-white mt-5 rounded-sm overflow-hidden border border-black">
            <div className="px-5 sm:px-7 py-5 border-r border-white/[0.12] flex flex-col items-center justify-center min-w-[120px] shrink-0">
              <div className="text-[26px] sm:text-[32px] font-bold leading-none tracking-tight">FREE</div>
              <div className="text-[9px] font-mono uppercase tracking-[0.18em] text-white/45 mt-2">Pilot</div>
            </div>
            <div className="flex-1 px-5 sm:px-7 py-5 flex flex-col justify-center min-w-0">
              <div className="text-[15px] sm:text-[17px] font-semibold mb-1">
                Your first pilot is on us.
              </div>
              <div className="text-[12px] sm:text-[13px] text-white/55 leading-[1.55]">
                Send us your first SOW — Source AI will scope it, scan the client&apos;s systems, and ship a working
                pilot. No cost, no commitment.
              </div>
            </div>
          </div>
          <p className="text-center text-[10px] font-mono uppercase tracking-[0.1em] text-black/35 mt-4 px-2">
            Fixed price, locked quote upfront — returned within 24 hours of SOW submission.
          </p>
        </div>

        {/* ── Credibility ───────────────────────────────────────────────────── */}
        <div className="bg-white border border-black/[0.08] px-4 sm:px-6 py-5 sm:py-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex items-center gap-2 shrink-0">
              {["LF", "SK", "AM", "JR", "TC", "MN", "EV"].map((ini) => (
                <div
                  key={ini}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-black/15 to-black/5 border border-black/[0.08] flex items-center justify-center text-[10px] font-mono font-bold text-black/45"
                >
                  {ini}
                </div>
              ))}
            </div>
            <div className="h-px lg:h-auto lg:w-px lg:min-h-[44px] bg-black/[0.08] lg:shrink-0" />
            <div className="flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-2 text-[12px] sm:text-[13px] text-black/50">
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-black/30 shrink-0" strokeWidth={1.75} />
                <span>
                  Built by <span className="font-semibold text-black/75">Source</span> — San Francisco
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-black/30 shrink-0" strokeWidth={1.75} />
                <span>Featured in Forbes</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-3.5 h-3.5 text-black/30 shrink-0" strokeWidth={1.75} />
                <span>$2M+ in venture funding</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-black/30 shrink-0" strokeWidth={1.75} />
                <span>SF investors &amp; Stripe alumni</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── White-Label ──────────────────────────────────────────────────── */}
        <div className="bg-white border border-black/[0.08] p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
            <div className="sm:flex-1">
              <div className="text-[19px] sm:text-[22px] font-medium tracking-tight text-black mb-1.5">
                Fully White-Label
              </div>
              <div className="text-[13px] sm:text-[14px] text-black/45 leading-[1.65] mb-4">
                Your brand on every deliverable. Your client never knows Source exists.
              </div>
              <div className="space-y-2.5">
                {WHITE_LABEL_POINTS.map((point) => (
                  <div key={point} className="flex items-start gap-2.5">
                    <Check
                      className="w-4 h-4 shrink-0 mt-0.5 text-[#16a34a]/70"
                      strokeWidth={2.5}
                    />
                    <span className="text-[13px] sm:text-[14px] text-black/65 leading-snug">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="sm:w-[260px] shrink-0 bg-[#f5f5f3] border border-black/[0.07] p-5 flex flex-col justify-center">
              <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-black/30 mb-3">
                What your client sees
              </div>
              <div className="space-y-2">
                {[
                  "Your company name on all reports",
                  "Your logo on deliverables",
                  "Your email domain throughout",
                  "Your project management style",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="mt-[7px] w-1 h-1 bg-black/30 rounded-full shrink-0" />
                    <span className="text-[12px] sm:text-[13px] text-black/55 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <a
          href="https://cal.com/source-ai/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-black text-white text-center px-8 py-8 sm:py-10 mb-6 hover:bg-black/85 transition-colors"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Calendar
              className="w-5 h-5 text-white/50"
              strokeWidth={1.75}
            />
            <span className="text-[18px] sm:text-[22px] font-semibold tracking-tight">
              Book a Partnership Call →
            </span>
          </div>
          <div className="text-[12px] sm:text-[13px] text-white/40 tracking-tight">
            See a live demo · Discuss your first migration · Get pilot pricing
          </div>
          <div className="text-[11px] font-mono uppercase tracking-[0.10em] text-white/25 mt-3">
            cal.com/source-ai/30min
          </div>
        </a>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <div className="border-t-2 border-black pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="text-[32px] sm:text-[36px] font-display tracking-normal leading-none text-black">
              Source
            </span>
            <div className="text-[11px] font-mono uppercase tracking-[0.10em] text-black/30 mt-1">
              AI · San Francisco · source.shop
            </div>
          </div>
          <div className="text-[10px] font-mono uppercase tracking-[0.08em] text-black/25 text-right leading-[1.8]">
            <div>QuickFind AI Limited · Confidential · 2026</div>
            <a
              href="https://source.shop/partner-solution"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/35 hover:text-black/60 transition-colors"
            >
              View Full Partnership Deck →
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
