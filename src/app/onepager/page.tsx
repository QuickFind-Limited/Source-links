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
  FileSpreadsheet,
  FileJson,
  HardDrive,
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
  MapPin,
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

const TEAM_PHOTOS = [
  { src: "/team/liam.jpg", name: "Liam Fuller" },
  { src: "/team/yoan.jpg", name: "Yoan Yomba" },
  { src: "/team/shane.jpg", name: "Shane Duffy" },
  { src: "/team/brian.jpg", name: "Brian Fabian Crain" },
  { src: "/team/jiri.jpg", name: "Jiri Kobelka" },
  { src: "/team/bryan.jpg", name: "Bryan Doreian" },
  { src: "/team/sean.jpg", name: "Sean Gillespie" },
  { src: "/team/hugo.jpg", name: "Hugo" },
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
        <div className="mb-8 sm:mb-10">
          <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.16em] text-black/40 font-bold mb-3">
            Partner One-Pager
          </div>
          <h1 className="text-[30px] sm:text-[42px] md:text-[52px] font-bold tracking-[-0.03em] text-black leading-[1.05] mb-5 max-w-[940px]">
            The go-to AI partner for <br className="hidden sm:block" />ERP VARs &amp; Firms.
          </h1>
          <p className="text-[19px] sm:text-[24px] md:text-[28px] italic text-black/70 leading-[1.45] max-w-[940px]">
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
                <p className="text-[20px] sm:text-[24px] md:text-[26px] italic leading-[1.5] text-black/80 mb-7 tracking-[-0.01em]">
                  &ldquo;Source handles the materials, the configuration, the full ERP
                  implementation end-to-end. We focus on the upsell, the client experience, the
                  relationship — and we&apos;re finally able to{" "}
                  <span className="not-italic font-semibold text-black">
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
              <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-0 md:space-y-3.5">
                {SOURCE_ENGINE_STEPS.map(({ label, Icon }) => (
                  <div key={label} className="flex items-center gap-3">
                    <Icon
                      className="w-4 h-4 text-white/65 shrink-0"
                      strokeWidth={1.75}
                    />
                    <span className="text-[14px] sm:text-[15px] font-medium text-white">
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
        <div className="bg-white border border-black/[0.08] p-5 sm:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-5 bg-black shrink-0" />
            <div className="text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.18em] text-black font-bold">
              How It Works — Before &amp; After
            </div>
            <div className="flex-1 h-px bg-black/[0.07]" />
          </div>

          {/* Before */}
          <div className="mb-7">
            <div className="text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.14em] text-black/45 font-bold mb-4">
              Before
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-2 px-4 py-3 border border-black/[0.12] text-[14px] sm:text-[15px] font-medium text-black/75">
                <Users className="w-4 h-4 text-black/50 shrink-0" strokeWidth={1.75} />
                End Client
              </div>
              <span className="text-black/30 text-[18px]">→</span>
              <div className="flex items-center gap-2 px-4 py-3 border border-black/[0.12] text-[14px] sm:text-[15px] font-medium text-black/75">
                <Globe className="w-4 h-4 text-black/50 shrink-0" strokeWidth={1.75} />
                Sales
              </div>
              <span className="text-black/30 text-[18px]">→</span>
              <div className="relative flex items-center gap-2 px-4 py-3 border border-black/[0.08] bg-black/[0.02] text-[14px] sm:text-[15px] font-medium text-black/30 line-through decoration-red-400/60">
                <Users className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                Solutions Architect
                <X className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 text-red-500/70 bg-white" strokeWidth={2.5} />
              </div>
              <span className="text-black/30 text-[18px]">→</span>
              <div className="relative flex items-center gap-2 px-4 py-3 border border-black/[0.08] bg-black/[0.02] text-[14px] sm:text-[15px] font-medium text-black/30 line-through decoration-red-400/60">
                <Database className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                Offshore Dev Team
                <X className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 text-red-500/70 bg-white" strokeWidth={2.5} />
              </div>
              <span className="text-black/30 text-[18px]">→</span>
              <div className="flex items-center gap-2 px-4 py-3 border border-black/[0.12] text-[14px] sm:text-[15px] font-medium text-black/75">
                <Check className="w-4 h-4 text-black/50 shrink-0" strokeWidth={1.75} />
                Done
              </div>
            </div>
          </div>

          {/* After — legacy → consultant → live system */}
          <div>
            <div className="text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.14em] text-black/45 font-bold mb-4">
              After
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_28px_2fr_28px_1fr] items-stretch border border-black/[0.10] overflow-hidden bg-white">
              {/* End Client */}
              <div className="min-w-0 flex flex-col justify-center px-5 sm:px-7 py-6 sm:py-8">
                <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-black/45 font-bold mb-2">
                  End Client
                </div>
                <div className="text-[18px] sm:text-[20px] font-semibold text-black leading-tight">
                  Legacy System
                </div>
              </div>
              <div className="flex items-center justify-center text-black/30 text-[24px] md:text-[20px] py-1 md:py-0 border-t md:border-t-0 md:border-l border-black/[0.08]">
                <span className="md:hidden">↓</span>
                <span className="hidden md:inline">→</span>
              </div>

              {/* Your Consultant — 2×2 grid */}
              <div className="min-w-0 px-5 sm:px-7 py-6 sm:py-8 border-t md:border-t-0 md:border-l border-black/[0.08] flex flex-col justify-center">
                <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-black/45 font-bold mb-4">
                  Your Consultant
                </div>
                <div className="grid grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-3">
                  {CONSULTANT_AFTER_FLOW.map(({ label, Icon }) => (
                    <div key={label} className="flex items-center gap-2.5 min-w-0">
                      <Icon className="w-4 h-4 text-black/55 shrink-0" strokeWidth={1.75} />
                      <span className="text-[13px] sm:text-[15px] text-black/75 leading-tight truncate font-medium">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center text-black/30 text-[24px] md:text-[20px] py-1 md:py-0 border-t md:border-t-0 md:border-l border-black/[0.08]">
                <span className="md:hidden">↓</span>
                <span className="hidden md:inline">→</span>
              </div>

              {/* Live System */}
              <div className="min-w-0 flex flex-col justify-center px-5 sm:px-7 py-6 sm:py-8 border-t md:border-t-0 md:border-l border-black/[0.08]">
                <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-emerald-700 mb-2 font-bold">
                  Live System
                </div>
                <div className="text-[18px] sm:text-[20px] font-semibold text-emerald-700 leading-tight">
                  Target ERP
                </div>
              </div>
            </div>

            <div className="relative bg-[#fafafa] border-x border-b border-black/[0.10] flex flex-col items-center justify-center py-4">
              <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.18em] text-black/55 font-bold">
                Powered by
              </div>
              <ChevronDown className="w-4 h-4 text-black/35 mt-1" strokeWidth={2.25} />
            </div>

            <div className="border border-t-0 border-black/[0.10] bg-black px-6 sm:px-9 py-7 sm:py-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-white/55 mb-1.5 font-bold">
                    Powered by
                  </div>
                  <div className="text-[22px] sm:text-[26px] font-semibold tracking-tight text-white leading-tight">
                    Source AI Engine
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 self-start text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.08em] bg-white text-black px-4 py-2 font-bold">
                  <Clock className="w-4 h-4 text-black/70 shrink-0" strokeWidth={2} />
                  Sub 21 Days · End-to-end
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 sm:gap-y-5">
                {SOURCE_ENGINE_STEPS.map(({ label, Icon }) => (
                  <div key={label} className="flex items-center gap-3 min-w-0">
                    <Icon className="w-5 h-5 text-white/75 shrink-0" strokeWidth={1.75} />
                    <span className="text-[15px] sm:text-[17px] font-semibold text-white truncate">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-7 pt-5 border-t border-white/[0.14]">
                <div className="flex-1 h-px bg-white/[0.15]" />
                <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.14em] text-white/55 whitespace-nowrap text-center font-bold">
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

            <div className="border-2 border-black/[0.08] rounded-sm p-5 sm:p-7 bg-[#fafafa]">
              <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.18em] text-black/55 font-bold mb-5">
                What was delivered
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5">
                {CASE_STUDY_DELIVERED.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check
                      className="w-5 h-5 shrink-0 mt-0.5 text-[#16a34a]"
                      strokeWidth={2.5}
                    />
                    <span className="text-[15px] sm:text-[17px] text-black/85 leading-[1.5] font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Supported Systems ───────────────────────────────────────────── */}
        <div className="bg-white border border-black/[0.08] px-4 sm:px-6 py-5 sm:py-6 mb-6">
          <SectionLabel>Supported Systems</SectionLabel>
          <div className="text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.14em] text-black/45 font-bold mb-4">
            Target ERPs we implement
          </div>
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

          {/* Source ingests anything */}
          <div className="mt-7 pt-6 border-t border-black/[0.08]">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
              <div className="text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.14em] text-black font-bold">
                Source ingests anything
              </div>
              <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.10em] text-black/40">
                Any format · any system · any state
              </div>
            </div>
            <p className="text-[14px] sm:text-[16px] text-black/70 leading-[1.6] mb-5 max-w-[920px]">
              Not just clean API feeds — we handle whatever data lives in the client&apos;s
              current setup. Source AI parses, maps, normalises and migrates it, preserving
              historical integrity along the way.
            </p>

            {/* Input formats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {[
                { label: "Spreadsheets & CSVs", Icon: FileSpreadsheet },
                { label: "Excel · Google Sheets", Icon: FileSpreadsheet },
                { label: "Legacy SQL databases", Icon: Database },
                { label: "PDFs · Scanned forms", Icon: FileText },
                { label: "JSON · XML exports", Icon: FileJson },
                { label: "Custom in-house systems", Icon: HardDrive },
                { label: "REST / SOAP APIs", Icon: Link },
                { label: "Ad-hoc email attachments", Icon: FileText },
              ].map(({ label, Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 border border-black/[0.08] bg-[#fafafa] px-3 py-2.5 rounded-sm"
                >
                  <Icon className="w-4 h-4 text-black/45 shrink-0" strokeWidth={1.75} />
                  <span className="text-[12.5px] sm:text-[13px] font-medium text-black/75 truncate">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* What Source does with it */}
            <div className="mt-5 pt-5 border-t border-black/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  title: "Parse & normalise",
                  body: "Extract fields across messy formats, unify schemas and reconcile duplicates.",
                },
                {
                  title: "Map to target ERP",
                  body: "AI-generated mappings for CoA, entities, tax codes, customers, vendors, SKUs.",
                },
                {
                  title: "Validate & cut over",
                  body: "Trial balance tie-outs, AR/AP reconciliation, then production cutover with rollback.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="border border-black/[0.08] bg-white p-4 rounded-sm">
                  <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.14em] text-black/45 font-bold mb-1.5">
                    {title}
                  </div>
                  <div className="text-[13px] sm:text-[14px] text-black/70 leading-[1.55]">
                    {body}
                  </div>
                </div>
              ))}
            </div>
          </div>
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
            <div className="p-8 sm:p-14 lg:p-16 bg-white min-h-[360px] sm:min-h-[480px] lg:min-h-[560px]">
              <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-start">
                <div>
                  <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.16em] text-black/40 font-bold mb-4">
                    BRD v2 · Locked Quote
                  </div>
                  <div className="text-[30px] sm:text-[42px] font-semibold tracking-tight text-black leading-tight mb-4">
                    QuickBooks → NetSuite
                  </div>
                  <div className="text-[48px] sm:text-[68px] lg:text-[76px] font-bold tracking-[-0.035em] text-black leading-[0.95] mb-4">
                    $7,000 – $11,500
                  </div>
                  <p className="text-[14px] sm:text-[16px] text-black/55 leading-[1.6] max-w-[520px] mb-7">
                    Source AI implementation fee, fixed after sign-off. 93–95% below traditional
                    implementation ($150K–$250K).
                  </p>
                  <div className="inline-flex items-center gap-2 border border-black/[0.12] bg-white px-4 py-3 text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.06em] text-black/65 rounded-sm">
                    <Download className="w-4 h-4" strokeWidth={1.75} />
                    Download SOW + cost breakdown
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  {[
                    ["Edition", "OneWorld"],
                    ["Modules live", "24"],
                    ["Records migrated", "318K"],
                    ["Timeline", "13 days"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="border border-black/[0.08] rounded-sm bg-white px-5 py-5"
                    >
                      <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.14em] text-black/40 font-bold mb-2">
                        {k}
                      </div>
                      <div className="text-[22px] sm:text-[28px] font-bold tracking-tight text-black leading-none">
                        {v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Strong overlay + play */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-black/55 via-black/65 to-black/80 transition-colors group-hover:from-black/65 group-hover:via-black/75 group-hover:to-black/85">
              <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full bg-white flex items-center justify-center shadow-[0_22px_50px_-10px_rgba(0,0,0,0.65)] mb-6 group-hover:scale-105 transition-transform">
                <div className="w-0 h-0 border-l-[24px] sm:border-l-[28px] lg:border-l-[32px] border-l-black border-y-[16px] sm:border-y-[18px] lg:border-y-[20px] border-y-transparent ml-2" />
              </div>
              <div className="text-[13px] sm:text-[14px] font-mono uppercase tracking-[0.24em] text-white/90 mb-5 font-bold">
                Book a call
              </div>
              <div className="text-[30px] sm:text-[40px] lg:text-[46px] font-semibold text-white text-center px-6 leading-[1.1] max-w-[880px] tracking-tight">
                See a live ERP implementation by Source on call
              </div>
              <div className="text-[16px] sm:text-[18px] text-white/80 mt-5 text-center px-6 max-w-[720px]">
                Real QuickBooks → NetSuite · Real data · Real config
              </div>
              <div className="mt-6 inline-flex items-center gap-2 border border-white/30 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.14em] text-white font-bold">
                Book a 30-min slot →
              </div>
            </div>
          </a>
        </div>

        {/* ── Pricing — Send SOW. Get AI Price. Charge Client. ─────────────── */}
        <div className="bg-[#f5f5f3] border-2 border-black p-6 sm:p-10 mb-6 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)]">
          <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.18em] text-black font-bold mb-3">
            Partner Pricing
          </div>
          <div className="text-[30px] sm:text-[44px] font-semibold tracking-[-0.025em] text-black mb-3 leading-[1.05]">
            Send SOW. Get AI Price. Charge Client.
          </div>
          <div className="text-[15px] sm:text-[18px] text-black/65 leading-[1.55] mb-8 max-w-[820px]">
            No quoting calls, no scoping workshops, no T&amp;M surprises. Three steps from SOW
            to invoice — <span className="font-semibold text-black">you mark up to whatever
            your client will pay</span> and keep the margin.
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

          {/* Start scoping CTA */}
          <a
            href="https://cal.com/source-ai/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-stretch bg-black text-white mt-6 overflow-hidden border-2 border-black hover:bg-[#0e0e0e] transition-colors"
          >
            <div className="px-5 sm:px-7 py-5 sm:py-6 border-r border-white/[0.14] flex flex-col items-center justify-center min-w-[130px] shrink-0">
              <div className="text-[28px] sm:text-[36px] font-bold leading-none tracking-tight">FREE</div>
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/55 mt-2 font-bold">Pilot</div>
            </div>
            <div className="flex-1 px-5 sm:px-7 py-5 sm:py-6 flex flex-col justify-center min-w-0">
              <div className="text-[18px] sm:text-[22px] font-semibold mb-1.5">
                Send us a SOW — start scoping with Source.
              </div>
              <div className="text-[13px] sm:text-[14.5px] text-white/65 leading-[1.55]">
                Your first pilot is on us. Source AI scopes it, scans the client&apos;s systems,
                and ships a working pilot. No cost, no commitment.
              </div>
            </div>
            <div className="hidden sm:flex items-center px-6 sm:px-8 border-l border-white/[0.14] text-[12px] font-mono uppercase tracking-[0.12em] font-bold whitespace-nowrap group-hover:text-white text-white/85">
              Start Scoping →
            </div>
          </a>
          <p className="text-center text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.14em] text-black/45 mt-4 px-2 font-bold">
            Fixed price, locked quote upfront — returned within 24 hours of SOW submission.
          </p>
        </div>

        {/* ── Credibility ───────────────────────────────────────────────────── */}
        <div className="bg-white border border-black/[0.08] mb-6 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 px-5 sm:px-8 py-4 border-b border-black/[0.06] bg-[#fafafa]">
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-black/50" strokeWidth={2} />
              <span className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.18em] text-black font-bold">
                Built by the Source team
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.12em] text-black/40 font-semibold">
              {TEAM_PHOTOS.length} operators · engineers · finance leads
            </span>
          </div>

          {/* Team photo strip */}
          <div className="px-5 sm:px-8 py-6 sm:py-7">
            <div className="flex items-center -space-x-3">
              {TEAM_PHOTOS.map(({ src, name }) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={name}
                  src={src}
                  alt={name}
                  title={name}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover ring-[3px] ring-white border border-black/[0.08] shadow-sm grayscale hover:grayscale-0 hover:scale-105 transition-all"
                />
              ))}
            </div>
          </div>

          {/* Stat strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-black/[0.06]">
            {[
              {
                Icon: MapPin,
                label: "Headquarters",
                value: "San Francisco",
                sub: "Built by Source",
              },
              {
                Icon: DollarSign,
                label: "Funding",
                value: "$2M+",
                sub: "Venture-backed",
              },
              {
                Icon: FileText,
                label: "Press",
                value: "Forbes",
                sub: "Featured",
              },
              {
                Icon: Globe,
                label: "Backed by",
                value: "Stripe alumni",
                sub: "& SF investors",
              },
            ].map(({ Icon, label, value, sub }, i) => (
              <div
                key={label}
                className={`px-5 sm:px-7 py-5 sm:py-6 ${
                  i > 0 ? "border-l border-black/[0.06]" : ""
                } ${i >= 2 ? "border-t lg:border-t-0 lg:border-l border-black/[0.06]" : ""}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-3.5 h-3.5 text-black/40" strokeWidth={2} />
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.14em] text-black/45 font-bold">
                    {label}
                  </span>
                </div>
                <div className="text-[18px] sm:text-[22px] font-semibold text-black tracking-[-0.01em] leading-tight mb-0.5">
                  {value}
                </div>
                <div className="text-[12px] sm:text-[13px] text-black/50 leading-snug">
                  {sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <a
          href="https://cal.com/source-ai/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-black text-white text-center px-8 py-8 sm:py-10 mb-6 hover:bg-black/85 transition-colors"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <Calendar
              className="w-6 h-6 text-white/60"
              strokeWidth={1.75}
            />
            <span className="text-[22px] sm:text-[30px] font-semibold tracking-tight">
              Book a call to partner with Source →
            </span>
          </div>
          <div className="text-[14px] sm:text-[16px] text-white/55 tracking-tight">
            See a live demo · Discuss your first migration · Get pilot pricing
          </div>
          <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.12em] text-white/30 mt-4">
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
