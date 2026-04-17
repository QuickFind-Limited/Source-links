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

const CASE_STUDY_STATS = [
  { value: "13", label: "Days to Go-Live" },
  { value: "$11K", label: "Source Cost" },
  { value: "50%+", label: "Partner Margin" },
  { value: "~12h", label: "Consultant Time" },
];

const CASE_STUDY_HIGHLIGHTS = [
  "380+ accounts migrated",
  "4,200+ SKUs migrated",
  "Shopify + Stripe + HubSpot integrations",
  "Fixed-price engagement",
  "White-label — client never saw Source",
  "No scope creep, no overruns",
];

const PRICING_STEPS = [
  {
    n: "01",
    title: "You send the SOW",
    body: "Drop in the client's scope, transcripts, requirements, or existing SOW — however detailed or rough.",
    Icon: FileText,
  },
  {
    n: "02",
    title: "We scope & price",
    body: "Source AI reads the scope, runs a system scan, and sends back a fixed price within 24 hours.",
    Icon: Scan,
  },
  {
    n: "03",
    title: "You charge the client",
    body: "You mark up, invoice your client directly, and keep the margin. Source is your back-office engine.",
    Icon: DollarSign,
  },
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
  { src: "/onepager/logos/quickbooks.svg", alt: "QuickBooks", h: "h-10" },
  { src: "/onepager/logos/xero.svg", alt: "Xero", h: "h-8" },
  { src: "/onepager/logos/sage.png", alt: "Sage", h: "h-8" },
  { src: "/onepager/logos/acumatica.svg", alt: "Acumatica", h: "h-7" },
  { src: "/onepager/logos/myob.svg", alt: "MYOB", h: "h-7" },
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

        {/* ── Supported Systems (moved up — trust-signal row) ────────────── */}
        <div className="bg-white border border-black/[0.08] px-4 sm:px-6 py-3 sm:py-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-black/30 whitespace-nowrap shrink-0">
              Supported Systems
            </div>
            <div className="flex flex-wrap items-center justify-evenly flex-1 gap-x-6 gap-y-3 sm:gap-x-8">
              {ERP_LOGOS.map(({ src, alt, h }) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={alt}
                  src={src}
                  alt={alt}
                  className={`${h} w-auto object-contain grayscale opacity-80`}
                />
              ))}
            </div>
          </div>
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

              {/* Partner pitch — quote + differentiation */}
              <div className="flex-1 min-h-0 bg-[#f5f5f3] border border-black/[0.08] px-6 sm:px-8 py-7 sm:py-8">
                <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-black/30 mb-5">
                  The Partner Pitch
                </div>
                <p className="text-[18px] sm:text-[22px] italic leading-[1.55] text-black/65 mb-6">
                  &ldquo;We handle the full ERP implementation end-to-end. You stay in
                  control of the client, the deliverables carry your brand, and the
                  economics work — you make{" "}
                  <span className="not-italic font-semibold text-black">50%+ margin</span>{" "}
                  on every engagement.&rdquo;
                </p>
                <div className="pt-5 border-t border-black/[0.07]">
                  <div className="text-[15px] sm:text-[17px] font-semibold text-black/75 mb-1">
                    No other provider offers this.
                  </div>
                  <div className="text-[13px] sm:text-[14px] text-black/40 leading-[1.6]">
                    Traditional ERP implementations take 4–6 months and deliver ~20%
                    margins. Source is a different category.
                  </div>
                </div>
              </div>

            </div>

            {/* Black right sidebar */}
            <div className="md:w-[320px] shrink-0 bg-black p-5 sm:p-6">
              <div className="text-[13px] sm:text-[14px] font-mono uppercase tracking-[0.10em] text-white font-bold mb-1.5">
                Source AI Engine
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="text-[10px] font-mono uppercase tracking-[0.10em] text-white/60">
                  {SOURCE_ENGINE_STEPS.length} Automated Steps
                </div>
                <span className="w-1 h-1 rounded-full bg-white/25 shrink-0" />
                <div className="text-[10px] font-mono uppercase tracking-[0.10em] text-white/60">
                  Sub 21 Days
                </div>
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

          {/* After */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-black/30 font-semibold mb-3">
              After
            </div>
            <div className="flex items-stretch border border-black/[0.08] overflow-hidden">
              {/* End Client */}
              <div className="flex flex-col justify-center px-4 py-4 border-r border-black/[0.08] shrink-0 min-w-[90px]">
                <div className="text-[9px] font-mono uppercase tracking-[0.10em] text-black/30 mb-1">
                  End Client
                </div>
                <div className="text-[13px] font-semibold text-black leading-tight">
                  Legacy<br />System
                </div>
              </div>
              <div className="flex items-center justify-center px-2 text-black/20 text-[15px] shrink-0">
                →
              </div>
              {/* Your Consultant */}
              <div className="flex flex-col justify-center px-4 py-4 border-r border-black/[0.08] shrink-0 w-[150px]">
                <div className="text-[9px] font-mono uppercase tracking-[0.10em] text-black/30 mb-2">
                  Your Consultant
                </div>
                {CONSULTANT_HANDLES.map(({ label, Icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 mb-1.5 last:mb-0"
                  >
                    <Icon
                      className="w-3 h-3 text-black/30 shrink-0"
                      strokeWidth={1.75}
                    />
                    <span className="text-[11px] text-black/50 leading-tight">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center px-2 text-black/20 text-[15px] shrink-0">
                →
              </div>
              {/* Source AI Engine */}
              <div className="flex-1 bg-black px-5 py-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[10px] font-mono uppercase tracking-[0.10em] text-white/80 font-bold">
                    Source AI Engine
                  </div>
                  <div className="text-[9px] font-mono uppercase tracking-[0.06em] bg-white text-black px-2.5 py-1 font-bold">
                    Sub 21 Days
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-5 gap-y-2">
                  {SOURCE_ENGINE_STEPS.map(({ label, Icon }) => (
                    <div key={label} className="flex items-center gap-2">
                      <Icon
                        className="w-3 h-3 text-white/40 shrink-0"
                        strokeWidth={1.75}
                      />
                      <span className="text-[11px] sm:text-[12px] font-medium text-white/85">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center px-2 text-black/20 text-[15px] shrink-0">
                →
              </div>
              {/* Live System */}
              <div className="flex flex-col justify-center px-4 py-4 border-l border-black/[0.08] shrink-0 min-w-[90px]">
                <div className="text-[9px] font-mono uppercase tracking-[0.10em] text-black/30 mb-1">
                  Live System
                </div>
                <div className="text-[13px] font-semibold text-black leading-tight">
                  Target<br />ERP
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Case Study ──────────────────────────────────────────────────── */}
        <div className="bg-white border-2 border-black/[0.10] p-5 sm:p-7 mb-6">
          <SectionLabel>Case Study — Real Migration</SectionLabel>

          {/* Title + badge */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
            <h2 className="text-[22px] sm:text-[26px] font-semibold tracking-tight text-black leading-tight">
              QuickBooks → NetSuite in 13 Days
            </h2>
            <span className="inline-flex items-center gap-2 shrink-0 text-[10px] font-mono uppercase tracking-[0.10em] font-bold text-[#10B981] bg-[#10B981]/[0.07] border border-[#10B981]/[0.20] px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0" />
              Completed
            </span>
          </div>

          {/* Description */}
          <p className="text-[14px] sm:text-[15px] text-black/50 leading-[1.7] mb-5">
            Mid-market retailer with ~120 employees and $33M in annual transactions.
            Full migration including 380+ accounts, 4,200+ SKUs, and integrations with
            Shopify, Stripe, and HubSpot. Fixed price. No scope creep. No surprises.
          </p>

          {/* How it played out — narrative pull-quote */}
          <div className="bg-[#fafafa] border-l-2 border-black/[0.20] px-5 sm:px-6 py-4 sm:py-5 mb-5">
            <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-black/30 mb-2 font-semibold">
              How it played out
            </div>
            <p className="text-[15px] sm:text-[17px] italic text-black/65 leading-[1.6]">
              The partner walked in with a QuickBooks instance and walked out 13
              days later with a fully configured NetSuite — 4,200 SKUs mapped,
              Shopify, Stripe and HubSpot integrations live, client trained.
              Source handled the scan, the BRD, the data migration, and the
              config. The partner owned the relationship and the sign-offs.
              Fixed price, zero overruns.
            </p>
          </div>

          {/* Stat boxes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {CASE_STUDY_STATS.map(({ value, label }) => (
              <div
                key={label}
                className="border border-black/[0.07] bg-[#fafafa] px-3 py-4 text-center"
              >
                <div className="text-[24px] sm:text-[28px] font-bold tracking-tight text-black leading-none mb-1.5">
                  {value}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-[0.10em] text-black/40 font-medium">
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Highlights checklist */}
          <div className="border-t border-black/[0.06] pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CASE_STUDY_HIGHLIGHTS.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <Check
                    className="w-4 h-4 shrink-0 mt-0.5 text-[#16a34a]/70"
                    strokeWidth={2.5}
                  />
                  <span className="text-[13px] sm:text-[14px] text-black/65 leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Partner Economics — Send SOW. Get Price. Charge Client. ───────── */}
        <div className="bg-white border border-black/[0.08] p-4 sm:p-6 mb-6">
          <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-black/30 mb-2">
            Partner Economics
          </div>
          <div className="text-[22px] sm:text-[30px] font-semibold tracking-[-0.02em] text-black mb-2 leading-[1.1]">
            Send SOW. Get Price. Charge Client.
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
                  <div className="text-[13px] text-black/50 leading-[1.6]">
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

          {/* FREE first migration callout */}
          <div className="flex items-stretch bg-black text-white mt-5">
            <div className="px-6 py-5 border-r border-white/[0.10] flex flex-col items-center justify-center min-w-[140px]">
              <div className="text-[28px] sm:text-[34px] font-semibold leading-none tracking-[-0.02em]">
                FREE
              </div>
              <div className="text-[9px] font-mono uppercase tracking-[0.15em] text-white/40 mt-2">
                First Migration
              </div>
            </div>
            <div className="flex-1 px-5 sm:px-6 py-5 flex flex-col justify-center">
              <div className="text-[15px] sm:text-[17px] font-semibold mb-1">
                Your first migration is free.
              </div>
              <div className="text-[13px] text-white/55 leading-[1.55]">
                Send us your first SOW — we&apos;ll scope, price, and deliver it
                on us. No cost, no commitment.
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
