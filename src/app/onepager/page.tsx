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
  { label: "Material generation", Icon: FileText },
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
  { value: "13", label: "Days to Go-Live", sub: "vs 4–6 months traditional" },
  { value: "$6K", label: "Source Cost", sub: "fixed fee · zero overruns" },
  { value: "50%+", label: "Partner Margin", sub: "you mark up · keep upside" },
  { value: "318K", label: "Records Migrated", sub: "10 yrs of historicals" },
];

const CASE_STUDY_DELIVERED = [
  "Chart of Accounts + 380 GL accounts migrated",
  "4,200+ SKUs & product catalog migrated",
  "10 years of historical financials migrated",
  "Full NetSuite config — subsidiaries, classes, locations",
  "Shopify, Stripe, HubSpot connectors live",
  "White-label, fixed price, zero scope creep",
];

const PRICING_STEPS: Array<{
  n: string;
  title: string;
  body: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  chipsLabel?: string;
  chips?: string[];
}> = [
  {
    n: "01",
    title: "You send requirements",
    body: "Drop in whatever you have. Source AI parses it all.",
    Icon: FileText,
    chipsLabel: "Accepted inputs",
    chips: ["Requirements", "SOW", "Transcript", "Email"],
  },
  {
    n: "02",
    title: "Our AI prices it",
    body: "Source AI runs a read-only scan of the client's live systems — chart of accounts, AP/AR, subsidiaries, integrations, historical volume — then maps the scope, weighs complexity, and returns a locked fixed price within 24 hours. No scoping calls, no T&M guesswork, no surprise overruns.",
    Icon: Scan,
  },
  {
    n: "03",
    title: "You charge the client",
    body: "Mark up to whatever your client will pay. Source is your white-label back office.",
    Icon: DollarSign,
    chipsLabel: "What you keep",
    chips: ["Client", "Brand", "50%+ margin"],
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
  { src: "/onepager/logos/netsuite.svg", alt: "NetSuite", h: "h-9" },
  { src: "/onepager/logos/d365.svg", alt: "Dynamics 365", h: "h-12" },
  { src: "/onepager/logos/sap.svg", alt: "SAP", h: "h-10" },
  { src: "/onepager/logos/acumatica.svg", alt: "Acumatica", h: "h-10" },
  { src: "/logos/sage.svg", alt: "Sage", h: "h-11" },
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
            The go-to AI partner for ERP VARs <br className="hidden sm:block" />and Firms.
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
                  Source AI agents automate{" "}
                  <span className="text-black">85% of ERP implementation delivery</span>{" "}
                  — scanning, material generation, data migration, configuration, testing.
                </p>
              </div>

              {/* What partners are saying */}
              <div className="bg-[#f5f5f3] border border-black/[0.08] px-6 sm:px-8 py-7 sm:py-8 flex-1">
                <p className="text-[24px] sm:text-[28px] md:text-[32px] italic leading-[1.45] text-black/80 mb-7 tracking-[-0.015em]">
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
                Source AI Agents
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
                    Source AI Agents
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-black/[0.08] overflow-hidden mb-6">
              {CASE_STUDY_STATS.map(({ value, label, sub }, i) => (
                <div
                  key={label}
                  className={`px-3 py-4 text-center bg-white ${
                    i > 0 && i % 2 === 1 ? "border-l border-black/[0.08]" : ""
                  } ${
                    i >= 2 ? "border-t md:border-t-0 border-black/[0.08]" : ""
                  } ${
                    i % 4 !== 0 ? "md:border-l md:border-black/[0.08]" : ""
                  }`}
                >
                  <div className="text-[22px] sm:text-[28px] md:text-[30px] font-bold tracking-tight text-black leading-none mb-1.5">
                    {value}
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.10em] text-black/45 font-medium leading-snug">
                    {label}
                  </div>
                  {sub && (
                    <div className="text-[10px] text-black/35 mt-1.5 leading-snug">
                      {sub}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* AI vs consultant work split — compact monochrome strip */}
            <div className="bg-black text-white px-4 sm:px-5 py-4 sm:py-5 mb-6 rounded-sm">
              <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-white/40 font-bold mb-3.5">
                Where the work happened
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[auto_1px_1fr] gap-x-6 gap-y-4 items-stretch">
                {/* 85% headline — sized to fill the left column without overpowering */}
                <div className="flex md:flex-col items-baseline md:items-start gap-x-4 md:gap-x-0 md:min-w-[150px]">
                  <div className="text-[44px] sm:text-[52px] md:text-[60px] font-bold tracking-[-0.025em] leading-none text-white">
                    85%
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.14em] text-white/75 font-bold md:mt-3">
                      AI-Automated
                    </div>
                    <div className="text-[12px] text-white/50 mt-0.5 leading-snug">
                      end-to-end · zero handoffs
                    </div>
                  </div>
                </div>
                <div className="hidden md:block w-px bg-white/[0.14]" />
                <div className="flex flex-col justify-center gap-3">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-white/85 font-bold mb-1">
                      Source AI delivered
                    </div>
                    <div className="text-[12.5px] sm:text-[13.5px] text-white/80 leading-[1.5]">
                      System scan · business logic mapping · material generation · data migration ·
                      ETL · NetSuite configuration · testing & QA · validation
                    </div>
                  </div>
                  <div className="h-px bg-white/[0.10]" />
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-white/55 font-bold mb-1">
                      Consultant · ~12h total
                    </div>
                    <div className="text-[12.5px] sm:text-[13.5px] text-white/60 leading-[1.5]">
                      Client relationship · context handoff · reviewing AI outputs · sign-off
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-2 border-black/[0.08] rounded-sm p-5 sm:p-7 bg-[#fafafa]">
              <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.18em] text-black/55 font-bold mb-5">
                What was delivered <span className="text-black/35">— end-to-end by Source AI</span>
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
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-x-10 gap-y-6 px-1 sm:px-2 py-2">
            {ERP_LOGOS.map(({ src, alt, h }) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={alt}
                src={src}
                alt={alt}
                className={`${h} w-auto max-h-14 object-contain grayscale opacity-[0.72] hover:opacity-100 transition-opacity`}
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

          </div>
        </div>

        {/* ── See the Source platform live — hero card paired with Pricing below ── */}
        <div className="bg-white border-2 border-black p-6 sm:p-10 mb-6 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)]">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.18em] text-black font-bold">
              Platform Demo
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.14em] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              Live · 30 min
            </span>
          </div>
          <div className="text-[30px] sm:text-[44px] font-semibold tracking-[-0.025em] text-black mb-3 leading-[1.05] max-w-[940px]">
            See the actual Source platform run a live ERP implementation.
          </div>
          <p className="text-[15px] sm:text-[18px] text-black/65 leading-[1.55] mb-8 max-w-[880px]">
            The dashboard below is the <span className="font-semibold text-black">real Source product</span> —
            the same console you and your client log into during every implementation.
            Hop on a 30-min call and we&apos;ll walk you through it on a real QuickBooks → NetSuite migration:
            scan the legacy system, generate the materials, migrate the data, configure NetSuite, all under 21 days.
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
                app.source.shop / implementations · QBO → NetSuite
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.12em] text-emerald-700/90 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Source Platform · Live
              </span>
            </div>

            {/* App body — product-style dashboard, no oversized marketing type */}
            <div className="bg-white min-h-[360px] sm:min-h-[440px] lg:min-h-[500px]">
              {/* Product sub-nav / tabs */}
              <div className="flex items-center gap-5 px-5 sm:px-6 pt-4 border-b border-black/[0.06] text-[11px] font-mono uppercase tracking-[0.1em] text-black/45">
                {["Overview", "BRD", "Migration", "Config", "Sign-off"].map((t, i) => (
                  <span
                    key={t}
                    className={`pb-3 border-b-2 ${
                      i === 0
                        ? "border-black text-black font-bold"
                        : "border-transparent"
                    }`}
                  >
                    {t}
                  </span>
                ))}
                <span className="ml-auto hidden sm:inline-flex items-center gap-1.5 pb-3 text-emerald-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Connected
                </span>
              </div>

              {/* Page header */}
              <div className="px-5 sm:px-6 py-4 flex items-start justify-between gap-4 border-b border-black/[0.04]">
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-black/35 font-bold mb-1">
                    Implementation · #IMP-2471
                  </div>
                  <div className="text-[16px] sm:text-[18px] font-semibold text-black tracking-tight truncate">
                    QuickBooks → NetSuite
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.08em] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-sm shrink-0">
                  BRD v2 · Locked
                </span>
              </div>

              {/* KPI strip */}
              <div className="grid grid-cols-4 border-b border-black/[0.04]">
                {[
                  ["Fixed fee", "$7K–$11.5K"],
                  ["Timeline", "13 days"],
                  ["Records", "318K"],
                  ["AI auto", "85%"],
                ].map(([k, v], i) => (
                  <div
                    key={k}
                    className={`px-4 sm:px-5 py-3 ${
                      i > 0 ? "border-l border-black/[0.04]" : ""
                    }`}
                  >
                    <div className="text-[9px] font-mono uppercase tracking-[0.14em] text-black/40 font-bold mb-1">
                      {k}
                    </div>
                    <div className="text-[14px] sm:text-[15px] font-semibold text-black tabular-nums">
                      {v}
                    </div>
                  </div>
                ))}
              </div>

              {/* Body — left detail list + right phase progress */}
              <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr]">
                <div className="p-5 sm:p-6 lg:border-r border-black/[0.06]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-black/40 font-bold">
                      Scope summary
                    </div>
                    <span className="text-[10px] font-mono text-black/35">
                      Updated 2m ago
                    </span>
                  </div>
                  <div className="border border-black/[0.06] rounded-sm divide-y divide-black/[0.05]">
                    {[
                      ["Edition", "NetSuite OneWorld · US East"],
                      ["Subsidiaries", "3 · multi-book"],
                      ["Chart of accounts", "380 GL accounts"],
                      ["Historical data", "10 yrs · 318K records"],
                      ["Integrations", "Shopify · Stripe · HubSpot"],
                      ["Close cadence", "Monthly · day +4"],
                    ].map(([k, v]) => (
                      <div
                        key={k}
                        className="flex items-baseline justify-between gap-3 px-3 py-2 text-[11.5px] sm:text-[12px]"
                      >
                        <span className="font-mono uppercase tracking-[0.08em] text-black/40 shrink-0">
                          {k}
                        </span>
                        <span className="text-black/80 font-medium text-right truncate">
                          {v}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-black/40 font-bold">
                      Phase progress
                    </div>
                    <span className="text-[10px] font-mono text-black/35">
                      Day 13 / 21
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { name: "Discovery", pct: 100, status: "Done" },
                      { name: "Scan & map", pct: 100, status: "Done" },
                      { name: "Configuration", pct: 92, status: "Running" },
                      { name: "Migration", pct: 78, status: "Running" },
                      { name: "Sign-off", pct: 14, status: "Pending" },
                    ].map(({ name, pct, status }) => (
                      <div key={name}>
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="text-black/70 font-medium">{name}</span>
                          <span className="font-mono text-black/45 tabular-nums">
                            {pct}% · {status}
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-black/[0.06] overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              pct === 100
                                ? "bg-emerald-500"
                                : pct > 50
                                ? "bg-black"
                                : "bg-black/40"
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Overlay — heavy shade so the mockup reads only as a dimmed backdrop behind the foreground panel */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-[1px] transition-colors group-hover:bg-black/75">
              <div className="flex flex-col items-center text-center px-5 sm:px-6 py-4 sm:py-5 rounded-md bg-black/70 backdrop-blur-[3px] border border-white/15 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] max-w-[440px] mx-4">
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-[0_10px_24px_-6px_rgba(0,0,0,0.4)] mb-2.5 group-hover:scale-105 transition-transform">
                  <div className="w-0 h-0 border-l-[12px] sm:border-l-[14px] border-l-black border-y-[8px] sm:border-y-[9px] border-y-transparent ml-1" />
                </div>
                <div className="text-[15px] sm:text-[18px] font-semibold text-white leading-[1.25] tracking-tight">
                  See the Source platform run a live migration
                </div>
                <div className="text-[11.5px] sm:text-[12.5px] text-white/70 mt-1 leading-snug">
                  Real product · real QuickBooks → NetSuite · real data · real config
                </div>
                <div className="mt-3 inline-flex items-center gap-1.5 bg-white text-black px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.14em] font-bold group-hover:bg-white/90 transition-colors">
                  Book the platform demo →
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* ── Pricing — Send Requirements. Get AI Price. Charge Client. ────── */}
        <div className="bg-[#f5f5f3] border-2 border-black p-6 sm:p-10 mb-6 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)]">
          <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.18em] text-black font-bold mb-3">
            Partner Pricing
          </div>
          <div className="text-[30px] sm:text-[44px] font-semibold tracking-[-0.025em] text-black mb-3 leading-[1.05]">
            Send Requirements. Get AI Price. Charge Client.
          </div>
          <div className="text-[15px] sm:text-[18px] text-black/65 leading-[1.55] mb-8 max-w-[820px]">
            No quoting calls, no scoping workshops, no T&amp;M surprises. Three steps from
            requirements to invoice — <span className="font-semibold text-black">you mark up
            to whatever your client will pay</span> and keep the margin.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-3 md:gap-0 items-stretch">
            {PRICING_STEPS.map(({ n, title, body, Icon, chipsLabel, chips }, i) => (
              <React.Fragment key={n}>
                <div className="border-[1.5px] border-black/[0.14] bg-white p-6 sm:p-7 flex flex-col rounded-sm shadow-[0_1px_0_0_rgba(0,0,0,0.03)]">
                  <div className="flex items-start justify-between mb-5 sm:mb-6">
                    <div className="w-11 h-11 bg-black flex items-center justify-center rounded-sm">
                      <Icon
                        className="w-5 h-5 text-white"
                        strokeWidth={2}
                      />
                    </div>
                    <div className="text-[11px] sm:text-[12px] font-mono tracking-[0.18em] text-black/40 font-bold">
                      {n}
                    </div>
                  </div>
                  <div className="text-[18px] sm:text-[22px] font-semibold text-black mb-2.5 tracking-[-0.005em] leading-tight">
                    {title}
                  </div>
                  <div className="text-[14px] sm:text-[15px] text-black/60 leading-[1.65]">
                    {body}
                  </div>
                  {chips && chips.length > 0 && chipsLabel && (
                    <div className="mt-auto pt-4">
                      <div className="text-[9.5px] font-mono uppercase tracking-[0.16em] text-black/40 font-bold mb-2">
                        {chipsLabel}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {chips.map((chip) => (
                          <span
                            key={chip}
                            className="inline-flex items-center border border-black/[0.12] bg-[#fafafa] text-black/75 text-[10px] font-medium px-1.5 py-0.5 rounded-sm whitespace-nowrap"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {i < PRICING_STEPS.length - 1 && (
                  <div className="hidden md:flex items-center justify-center px-3 text-black/35 text-[22px] font-semibold">
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
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="flex items-center -space-x-3 shrink-0">
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
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.16em] font-bold text-[#15803d] bg-[#16a34a]/[0.10] border border-[#16a34a]/25 px-2.5 py-1 rounded-full shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" aria-hidden />
                  Live
                </span>
                <p className="text-[14px] sm:text-[16px] text-black/70 font-medium tracking-tight leading-snug">
                  Join the <span className="font-semibold text-black">20+ firms</span> already using Source.
                </p>
              </div>
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
