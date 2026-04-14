"use client";

import React, { useState } from "react";
import {
  Check,
  Calendar,
  Download,
  Clock,
  Users,
  Shield,
  Database,
  Settings,
  Link,
  BarChart3,
  AlertTriangle,
  Workflow,
  CreditCard,
  ChevronDown,
  Globe,
  Zap,
  FileText,
} from "lucide-react";
import type { ElementType } from "react";

// ─── Sidebar — 6 Dimensions ─────────────────────────────────────────────────

const DIMENSIONS_SIDEBAR: { label: string; Icon: ElementType }[] = [
  { label: "Environment & Architecture", Icon: Settings },
  { label: "Data Integrity & Quality", Icon: Database },
  { label: "Business Process Effectiveness", Icon: Workflow },
  { label: "Security & Governance", Icon: Shield },
  { label: "Integrations & Automation", Icon: Link },
  { label: "Reporting & Customisation", Icon: BarChart3 },
];

const REPORT_INCLUDES = [
  "Business context summary",
  "As-is system state (scored)",
  "Green flags (what's working)",
  "Red flags (prioritised, $-quantified)",
  "Cost impact summary",
  "Prioritised roadmap → SOW",
];

// ─── Three Assessment Layers ─────────────────────────────────────────────────

const ASSESSMENT_LAYERS = [
  {
    title: "Business Context",
    subtitle: "Understanding the business",
    items: [
      "Company profile & org structure",
      "Chart of Accounts philosophy",
      "Full tech stack inventory",
      "Business goals & pain register",
      "Stakeholder map",
    ],
  },
  {
    title: "As-Is System State",
    subtitle: "Scanning the system",
    items: [
      "Architecture & environment review",
      "Data quality across all objects",
      "Process effectiveness scoring",
      "Security & governance posture",
      "Integration & automation health",
      "Reporting & customisation sprawl",
    ],
  },
  {
    title: "Prioritised Findings",
    subtitle: "Prioritising findings",
    items: [
      "Every issue scored High / Medium / Low",
      "Dollar impact quantified per finding",
      "Recommended fix for each issue",
      "SOW-ready scope on every line",
    ],
  },
];

// ─── Evidence Classification ─────────────────────────────────────────────────

const EVIDENCE_TYPES = [
  {
    label: "Confirmed",
    desc: "Directly evidenced by system query output",
    color: "text-emerald-600",
    bg: "bg-emerald-500/[0.06] border-emerald-500/20",
    dot: "bg-emerald-500",
  },
  {
    label: "Inferred",
    desc: "Reasoned from patterns, with rationale shown",
    color: "text-amber-700",
    bg: "bg-amber-500/[0.06] border-amber-500/20",
    dot: "bg-amber-500",
  },
  {
    label: "Unknown",
    desc: "Evidence missing or inaccessible — flagged clearly",
    color: "text-black/50",
    bg: "bg-black/[0.04] border-black/10",
    dot: "bg-black/25",
  },
];

// ─── 6 Dimensions — detail ───────────────────────────────────────────────────

const DIMENSIONS_DETAIL: {
  title: string;
  question: string;
  Icon: ElementType;
  examples: string[];
}[] = [
  {
    title: "Environment & Architecture",
    question: "How complex is this environment?",
    Icon: Settings,
    examples: [
      "43 custom fields on Sales Order — 18 have no data in last 12 months",
      "18 months of open accounting periods — none are locked",
      "Advanced Revenue Management enabled, zero transactions processed",
      "3 subsidiaries in OneWorld — 1 has never been used",
    ],
  },
  {
    title: "Data Integrity & Quality",
    question: "Is the data clean enough for migration?",
    Icon: Database,
    examples: [
      "147 duplicate vendors — $34K/yr duplicate payment risk",
      "GL out of balance by $12,847 across 2 subsidiaries",
      "4,200 inactive items (47% of total catalogue)",
      "312 customer records with missing ABN / tax ID fields",
    ],
  },
  {
    title: "Business Process Effectiveness",
    question: "Where are the bottlenecks?",
    Icon: Workflow,
    examples: [
      "Manual journal entries are 34% of all GL postings",
      "Month-end close averaging 14 days — industry benchmark is 5",
      "Void rate of 12% on AP invoices in last 90 days",
      "6 process steps confirmed to happen outside the ERP in spreadsheets",
    ],
  },
  {
    title: "Security & Governance",
    question: "Who has access to what?",
    Icon: Shield,
    examples: [
      "8 users with full Administrator access — 4 are non-IT staff",
      "No segregation of duties between payment approval and execution",
      "23 users inactive 90+ days — accounts still active",
      "AP role has view access to payroll records",
    ],
  },
  {
    title: "Integrations & Automation",
    question: "Are integrations healthy?",
    Icon: Link,
    examples: [
      "Shopify integration — 312 failed syncs in last 90 days, no alerts set",
      "31 script deployments with DEBUG logging active in production",
      "3 RESTlets deployed — zero API calls in 6 months",
      "No retry logic on payment gateway connector",
    ],
  },
  {
    title: "Reporting & Customisation",
    question: "How much customisation sprawl?",
    Icon: BarChart3,
    examples: [
      "1,247 saved searches — 40% with zero views in 12 months",
      "Sales Order has 83 custom fields — 31 are mandatory",
      "No executive dashboard configured for CFO role",
      "14 custom reports duplicating standard NetSuite functionality",
    ],
  },
];

// ─── Sample report data ──────────────────────────────────────────────────────

const SAMPLE_REPORT = {
  company: "Westfield Manufacturing",
  system: "NetSuite OneWorld",
  scanned: "March 2026",
  overallScore: 62,
  categories: [
    { name: "Environment & Architecture", score: 78, status: "healthy" as const },
    { name: "Data Integrity", score: 41, status: "critical" as const },
    { name: "Business Processes", score: 68, status: "healthy" as const },
    { name: "Security", score: 55, status: "warning" as const },
    { name: "Integrations", score: 52, status: "warning" as const },
    { name: "Reporting", score: 71, status: "healthy" as const },
    { name: "License Efficiency", score: 64, status: "warning" as const },
    { name: "Compliance", score: 59, status: "warning" as const },
  ],
  greenFlags: [
    {
      area: "Chart of Accounts",
      detail:
        "Well-structured 4-level hierarchy. 312 active accounts, no orphaned segments. Supports multi-subsidiary consolidation.",
    },
    {
      area: "Approval Workflows",
      detail:
        "PO approvals properly tiered ($0–$5K auto, $5K–$25K manager, $25K+ VP). 98.7% compliance rate over 12 months.",
    },
    {
      area: "Tax Configuration",
      detail:
        "17 tax nexuses correctly configured. Avalara integration active and syncing. No manual tax overrides detected.",
    },
    {
      area: "Bank Reconciliation",
      detail:
        "Auto-matching enabled. 94% match rate. Average reconciliation lag: 1.2 days. No unreconciled items >30 days.",
    },
  ],
  redFlags: [
    {
      severity: "critical" as const,
      area: "Duplicate Vendor Records",
      detail:
        "147 potential duplicate vendors identified across 3 subsidiaries. 23 share identical bank details with different vendor IDs. Risk: duplicate payments estimated at $34K/yr.",
      impact: "$34,200/yr in duplicate payment risk",
      fix: "Data Cleanup & Deduplication",
    },
    {
      severity: "critical" as const,
      area: "Over-Permissioned Roles",
      detail:
        "8 users have full Administrator access. 4 of these are non-IT staff (2 in AP, 1 in AR, 1 in Warehouse). No segregation of duties between payment approval and payment execution.",
      impact: "SOX compliance exposure — audit finding risk",
      fix: "Security Hardening & Role Redesign",
    },
    {
      severity: "warning" as const,
      area: "Manual Revenue Recognition",
      detail:
        "Rev rec handled in Excel for 3 of 5 revenue streams. Monthly journal entries posted manually. Average of 4.2 hours/month. 2 mispostings found in last 6 months.",
      impact: "4.2 hrs/month labor + misstatement risk",
      fix: "Revenue Recognition Automation",
    },
    {
      severity: "warning" as const,
      area: "Stale Shopify Integration",
      detail:
        "Custom SuiteScript connector last modified 18 months ago. No retry logic. 312 failed sync records in last 90 days. Fallback: manual CSV import weekly by ops team.",
      impact: "~6 hrs/week manual workaround",
      fix: "Integration Rebuild (Shopify to NetSuite)",
    },
    {
      severity: "warning" as const,
      area: "Underutilised Modules",
      detail:
        "Advanced Project Management licensed but only 12% adopted. Fixed Asset Management enabled, 0 transactions in 8 months. Demand Planning licensed, never configured.",
      impact: "$18,400/yr in unused license costs",
      fix: "License Optimization & Module Audit",
    },
  ],
  costSummary: {
    duplicatePayments: "$34,200",
    unusedLicenses: "$18,400",
    manualWorkarounds: "$28,600",
    total: "$81,200",
  },
};

// ─── SOW mapping ─────────────────────────────────────────────────────────────

const SOW_EXAMPLES = [
  {
    finding: "147 duplicate vendors, $34K annual duplicate payment exposure",
    sow: "Data Cleanup & Deduplication",
    est: "$5K–$15K",
  },
  {
    finding: "8 admin users, no SoD on payment approval",
    sow: "Security Hardening & Role Redesign",
    est: "$8K–$20K",
  },
  {
    finding: "Manual month-end close averaging 14 days, 6 steps outside ERP",
    sow: "Process Automation & Close Optimisation",
    est: "$10K–$25K",
  },
  {
    finding: "4 unused modules, $18K/yr in wasted license spend",
    sow: "License Optimisation & Module Audit",
    est: "$3K–$8K",
  },
  {
    finding: "312 failed Shopify syncs, no retry logic, weekly manual import",
    sow: "Integration Rebuild (Shopify to NetSuite)",
    est: "$10K–$30K",
  },
  {
    finding: "No CFO dashboard, 1,247 saved searches with 40% unused",
    sow: "Reporting & Dashboard Overhaul",
    est: "$7K–$15K",
  },
];

// ─── How It Works steps ───────────────────────────────────────────────────────

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "You Request",
    desc: "Submit for your client. We need read-only access to their ERP — that's it.",
    Icon: Users,
  },
  {
    step: "2",
    title: "AI Scans",
    desc: "Source scans the full environment in ~5 hours across 6 dimensions, 60+ signals, any ERP system.",
    Icon: Zap,
  },
  {
    step: "3",
    title: "Report Ready",
    desc: "White-labeled report under your brand. Green flags, red flags, and a prioritised roadmap.",
    Icon: FileText,
  },
  {
    step: "4",
    title: "You Sell the Fix",
    desc: "Present findings to the client. Walk through what's broken. Close the SOW on the spot.",
    Icon: CreditCard,
  },
];

// ─── Dimension accordion section ─────────────────────────────────────────────

function DimensionSection({
  title,
  question,
  Icon,
  examples,
  defaultOpen = false,
}: {
  title: string;
  question: string;
  Icon: ElementType;
  examples: string[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-black/[0.06] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 text-left hover:bg-[#fafafa] transition-colors"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <Icon
            className="w-4 h-4 shrink-0 text-black/35"
            strokeWidth={1.75}
          />
          <span className="text-[15px] sm:text-[16px] font-medium text-black/80">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-[12px] text-black/35 italic font-normal">
            {question}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-black/30 transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
            strokeWidth={2}
          />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 sm:px-6 pb-5">
          <div className="text-[12px] sm:hidden font-medium text-black/35 italic mb-3">
            {question}
          </div>
          <div className="space-y-2.5">
            {examples.map((ex) => (
              <div key={ex} className="flex items-start gap-3">
                <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-black/20 shrink-0" />
                <span className="text-[13px] sm:text-[14px] text-black/60 leading-snug font-[450]">
                  {ex}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HealthCheckPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-black">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-6 sm:py-8">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-5 border-b border-black/[0.06] gap-2">
          <span className="text-[32px] sm:text-[38px] font-display tracking-normal leading-tight text-black">
            Source
          </span>
          <div className="text-[14px] sm:text-[22px] font-mono uppercase tracking-[0.06em] text-black/70 font-bold">
            AI Healthcheck
          </div>
        </div>

        {/* ── Subtitle ───────────────────────────────────────────────────── */}
        <div className="mb-6">
          <div className="text-[13px] sm:text-[14px] font-mono uppercase tracking-[0.08em] text-black/40 mb-1">
            Rapid, Evidence-Backed ERP Assessment &mdash; Free for Every Prospect
          </div>
          <p className="text-[17px] sm:text-[20px] italic text-black/55 leading-[1.5]">
            Give prospects a fast, evidence-backed view of how their ERP is
            really operating &mdash; before a statement of work.
          </p>
        </div>

        {/* ── Stat cards ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
          <div className="bg-white border border-black/[0.06] px-5 sm:px-6 py-5 sm:py-6 text-center">
            <Clock
              className="w-5 h-5 mx-auto text-black/25 mb-2"
              strokeWidth={1.75}
            />
            <div className="text-[32px] sm:text-[36px] font-medium tracking-tight text-black select-none">
              ~5 Hours
            </div>
            <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.12em] text-black/50 font-bold mt-1">
              End-to-End Assessment
            </div>
          </div>
          <div className="bg-white border border-black/[0.06] px-5 sm:px-6 py-5 sm:py-6 text-center">
            <Zap
              className="w-5 h-5 mx-auto text-black/25 mb-2"
              strokeWidth={1.75}
            />
            <div className="text-[32px] sm:text-[36px] font-medium tracking-tight text-black select-none">
              Free
            </div>
            <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.12em] text-black/50 font-bold mt-1">
              For Every Prospect, Any System
            </div>
          </div>
          <div className="bg-white border border-black/[0.06] px-5 sm:px-6 py-5 sm:py-6 text-center">
            <CreditCard
              className="w-5 h-5 mx-auto text-black/25 mb-2"
              strokeWidth={1.75}
            />
            <div className="text-[32px] sm:text-[36px] font-medium tracking-tight text-black select-none">
              $36K–$98K
            </div>
            <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.12em] text-black/50 font-bold mt-1">
              Addressable SOW Per Healthcheck
            </div>
          </div>
        </div>

        {/* ── Main two-panel section ──────────────────────────────────────── */}
        <div className="bg-white border border-black/[0.08] mb-6">
          <div className="flex flex-col md:flex-row">
            {/* Left panel */}
            <div className="md:flex-1 p-4 sm:p-6 md:border-r border-b md:border-b-0 border-black/[0.06] flex flex-col">
              {/* Value prop bold box */}
              <div className="border-2 border-black/[0.08] px-6 sm:px-8 py-5 sm:py-6 mb-5">
                <p className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold text-black/90 leading-[1.35]">
                  Live system evidence in hours, not weeks. Any ERP system.
                  Free.
                </p>
                <p className="text-[14px] sm:text-[15px] text-black/50 mt-3 leading-[1.65]">
                  Discovery today is slow, opinion-based, and expensive. Source
                  Healthcheck replaces weeks of workshops with an AI-powered
                  scan across 6 dimensions &mdash; architecture, data quality,
                  processes, security, integrations, and reporting.
                </p>
              </div>

              {/* Partner pitch — grey recessed box */}
              <div className="bg-[#f7f7f5] border border-black/[0.08] px-5 sm:px-9 py-6 sm:py-8 mb-5">
                <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-black/30 mb-4">
                  The Partner Pitch
                </div>
                <p className="text-[17px] sm:text-[21px] italic leading-[1.6] text-black/70 mb-5">
                  &ldquo;We include a free healthcheck with every prospect.
                  Source runs it in{" "}
                  <span className="not-italic font-semibold text-black">
                    5 hours
                  </span>
                  , you present the findings under your brand, and the client
                  can see exactly what&apos;s broken and what it&apos;s costing
                  them. Each finding maps to a scoped SOW. Typical pipeline from
                  a single healthcheck:{" "}
                  <span className="not-italic font-semibold text-black">
                    $36K&ndash;$98K
                  </span>{" "}
                  in addressable work.&rdquo;
                </p>
                <div className="pt-4 border-t border-black/[0.08] space-y-1.5">
                  <div className="text-[14px] sm:text-[15px] font-medium text-black/75">
                    The output separates confirmed facts from inferred insights
                    from unknowns.
                  </div>
                  <div className="text-[13px] sm:text-[14px] text-black/45 leading-[1.6]">
                    Specific enough to shape a SOW, honest enough to build
                    trust, executive-ready enough for a CFO conversation.
                  </div>
                </div>
              </div>

              {/* ERP logos */}
              <div className="mt-auto">
                <div className="w-full flex items-center justify-between px-2 sm:px-4 py-4 border-t border-black/[0.06]">
                  {[
                    {
                      src: "/logos/netsuite.svg",
                      alt: "NetSuite",
                      h: "h-[60px] sm:h-[76px] md:h-[92px]",
                    },
                    {
                      src: "/logos/dynamics365.svg",
                      alt: "Dynamics 365",
                      h: "h-[46px] sm:h-[60px] md:h-[74px]",
                    },
                    {
                      src: "/logos/sap.svg",
                      alt: "SAP",
                      h: "h-[42px] sm:h-[56px] md:h-[68px]",
                    },
                    {
                      src: "/logos/sage.svg",
                      alt: "Sage",
                      h: "h-[40px] sm:h-[52px] md:h-[64px]",
                    },
                  ].map((logo) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={logo.alt}
                      src={logo.src}
                      alt={logo.alt}
                      className={`${logo.h} w-auto object-contain`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Black sidebar */}
            <div className="md:w-[320px] shrink-0 bg-black p-4 sm:p-5">
              <div className="text-[13px] sm:text-[14px] font-mono uppercase tracking-[0.08em] text-white font-bold mb-3">
                6 Dimensions Scanned
              </div>
              <div className="h-px bg-white/20 mb-4" />
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-2.5 sm:gap-0 sm:space-y-3">
                {DIMENSIONS_SIDEBAR.map(({ label, Icon }) => (
                  <div key={label} className="flex items-center gap-2 sm:gap-2.5">
                    <Icon
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/35 shrink-0"
                      strokeWidth={1.75}
                    />
                    <span className="text-[13px] sm:text-[15px] font-medium text-white/85">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-white/10 mt-5 mb-4" />

              <div className="text-[10px] font-mono uppercase tracking-[0.10em] text-white/30 font-bold mb-3">
                The Report Includes
              </div>
              <div className="space-y-2.5">
                {REPORT_INCLUDES.map((label) => (
                  <div key={label} className="flex items-center gap-2 sm:gap-2.5">
                    <Check
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#16a34a]/60 shrink-0"
                      strokeWidth={2}
                    />
                    <span className="text-[13px] sm:text-[15px] font-medium text-white/70">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Three Assessment Layers ─────────────────────────────────────── */}
        <div className="bg-white border border-black/[0.08] p-4 sm:p-6 mb-6">
          <div className="mb-1">
            <div className="text-[16px] sm:text-[22px] font-medium tracking-tight text-black">
              What the Healthcheck Covers
            </div>
          </div>
          <div className="bg-[#f8f8f6] border border-black/[0.06] px-4 sm:px-5 py-3.5 mb-5">
            <div className="text-[14px] sm:text-[15px] text-black/60 leading-[1.7]">
              The assessment covers three layers &mdash;{" "}
              <span className="text-black/85 font-medium">
                understanding the business, scanning the system, and
                prioritising findings.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ASSESSMENT_LAYERS.map(({ title, subtitle, items }, i) => (
              <div key={title} className="border border-black/[0.08]">
                <div className="px-5 py-4 border-b border-black/[0.06]">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex h-6 w-6 items-center justify-center bg-black text-white text-[12px] font-mono font-bold shrink-0">
                      {i + 1}
                    </div>
                    <div className="text-[15px] sm:text-[16px] font-semibold text-black/85">
                      {title}
                    </div>
                  </div>
                  <div className="text-[11px] font-mono uppercase tracking-[0.10em] text-black/30 ml-8">
                    {subtitle}
                  </div>
                </div>
                <div className="px-5 py-4 space-y-2.5">
                  {items.map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <Check
                        className="w-3.5 h-3.5 shrink-0 mt-0.5 text-black/30"
                        strokeWidth={2.5}
                      />
                      <span className="text-[13px] sm:text-[14px] text-black/60 font-[450] leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Evidence Classification ─────────────────────────────────────── */}
        <div className="bg-white border border-black/[0.08] p-4 sm:p-6 mb-6">
          <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.12em] text-black/35 font-bold mb-4">
            Evidence Classification
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {EVIDENCE_TYPES.map(({ label, desc, color, bg, dot }) => (
              <div key={label} className={`border px-5 py-4 ${bg}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />
                  <span className={`text-[13px] sm:text-[14px] font-semibold ${color}`}>
                    {label}
                  </span>
                </div>
                <p className="text-[12px] sm:text-[13px] text-black/50 leading-[1.6]">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 6 Dimensions Detail (Accordion) ────────────────────────────── */}
        <div className="flex items-center gap-3 mt-8 mb-4">
          <div className="h-px flex-1 bg-black/[0.08]" />
          <span className="text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.08em] text-black/40 font-bold border-2 border-black/[0.10] px-3 py-1">
            The 6 Dimensions
          </span>
          <div className="h-px flex-1 bg-black/[0.08]" />
        </div>

        <div className="bg-white border border-black/[0.08] mb-6">
          <div className="px-4 sm:px-5 py-4 border-b border-black/[0.06]">
            <div className="text-[15px] sm:text-[18px] font-medium tracking-tight text-black mb-1">
              What We&apos;re Answering in Each Dimension
            </div>
            <div className="text-[13px] sm:text-[14px] text-black/45 leading-snug">
              Real example findings from a NetSuite OneWorld environment. Every
              finding is evidence-backed &mdash; not a checklist.
            </div>
          </div>
          {DIMENSIONS_DETAIL.map((dim, i) => (
            <DimensionSection
              key={dim.title}
              title={dim.title}
              question={dim.question}
              Icon={dim.Icon}
              examples={dim.examples}
              defaultOpen={i < 2}
            />
          ))}
        </div>

        {/* ── Sample Report ───────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 mt-8 mb-4">
          <div className="h-px flex-1 bg-black/[0.08]" />
          <span className="text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.08em] text-black/40 font-bold border-2 border-black/[0.10] px-3 py-1">
            Sample Report
          </span>
          <div className="h-px flex-1 bg-black/[0.08]" />
        </div>

        <div className="border-2 border-black/[0.12] bg-white mb-6">
          {/* Report header bar */}
          <div className="bg-black px-5 sm:px-8 py-5 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/30 mb-1">
                  Source Healthcheck Report
                </div>
                <div className="text-[22px] sm:text-[28px] font-semibold text-white tracking-tight leading-tight">
                  {SAMPLE_REPORT.company}
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5">
                  <div className="text-[12px] sm:text-[13px] text-white/40">
                    System: {SAMPLE_REPORT.system}
                  </div>
                  <div className="text-[12px] sm:text-[13px] text-white/25">&middot;</div>
                  <div className="text-[12px] sm:text-[13px] text-white/40">
                    Scanned {SAMPLE_REPORT.scanned}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="text-right">
                  <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-white/30 mb-0.5">
                    Overall Score
                  </div>
                  <div className="text-[40px] sm:text-[48px] font-bold text-white leading-none tracking-tight">
                    {SAMPLE_REPORT.overallScore}
                    <span className="text-[16px] sm:text-[18px] text-white/30 font-medium">
                      /100
                    </span>
                  </div>
                </div>
                <div className="w-px h-12 bg-white/10 hidden sm:block" />
                <div className="hidden sm:block">
                  <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-amber-400/80 font-bold">
                    Needs Attention
                  </div>
                  <div className="text-[12px] text-white/40 mt-0.5">
                    5 findings identified
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Category scores */}
          <div className="px-5 sm:px-8 py-5 sm:py-6 border-b border-black/[0.06]">
            <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.12em] text-black/35 font-bold mb-4">
              Category Scores
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {SAMPLE_REPORT.categories.map(({ name, score, status }) => (
                <div key={name} className="flex items-center gap-3">
                  <div className="w-[155px] sm:w-[180px] text-[13px] sm:text-[14px] text-black/60 font-medium shrink-0 truncate">
                    {name}
                  </div>
                  <div className="flex-1 h-2 bg-black/[0.06] overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        status === "critical"
                          ? "bg-red-500"
                          : status === "warning"
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                      }`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <div
                    className={`text-[14px] sm:text-[15px] font-bold tabular-nums w-8 text-right ${
                      status === "critical"
                        ? "text-red-500"
                        : status === "warning"
                        ? "text-amber-600"
                        : "text-emerald-600"
                    }`}
                  >
                    {score}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Green flags */}
          <div className="px-5 sm:px-8 py-5 sm:py-6 border-b border-black/[0.06]">
            <div className="flex items-center gap-2 mb-4">
              <Check className="w-4 h-4 text-emerald-500" strokeWidth={2.5} />
              <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.12em] text-emerald-600/70 font-bold">
                What&apos;s Working Well
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono text-black/25 ml-1">
                {SAMPLE_REPORT.greenFlags.length} areas confirmed healthy
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SAMPLE_REPORT.greenFlags.map(({ area, detail }) => (
                <div
                  key={area}
                  className="bg-emerald-500/[0.04] border border-emerald-500/[0.12] px-4 py-3"
                >
                  <div className="text-[14px] sm:text-[15px] font-semibold text-black/80 mb-1">
                    {area}
                  </div>
                  <div className="text-[12px] sm:text-[13px] text-black/50 leading-[1.6]">
                    {detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Red flags */}
          <div className="px-5 sm:px-8 py-5 sm:py-6 border-b border-black/[0.06]">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-red-500" strokeWidth={2} />
              <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.12em] text-red-500/70 font-bold">
                Findings That Need Attention
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono text-black/25 ml-1">
                {SAMPLE_REPORT.redFlags.length} issues identified
              </div>
            </div>
            <div className="space-y-3">
              {SAMPLE_REPORT.redFlags.map(
                ({ severity, area, detail, impact, fix }) => (
                  <div
                    key={area}
                    className={`border px-4 sm:px-5 py-3.5 sm:py-4 ${
                      severity === "critical"
                        ? "border-red-500/20 bg-red-500/[0.03] border-l-[3px] border-l-red-500"
                        : "border-amber-500/20 bg-amber-500/[0.02] border-l-[3px] border-l-amber-500"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[9px] font-mono uppercase tracking-[0.10em] font-bold px-1.5 py-0.5 ${
                            severity === "critical"
                              ? "bg-red-500/10 text-red-600"
                              : "bg-amber-500/10 text-amber-700"
                          }`}
                        >
                          {severity}
                        </span>
                        <span className="text-[15px] sm:text-[16px] font-semibold text-black/85">
                          {area}
                        </span>
                      </div>
                      <div className="text-[11px] font-mono uppercase tracking-[0.06em] text-black/30 shrink-0">
                        Fix: {fix}
                      </div>
                    </div>
                    <div className="text-[13px] sm:text-[14px] text-black/55 leading-[1.65] mb-2">
                      {detail}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.08em] text-black/30">
                        Impact:
                      </span>
                      <span
                        className={`text-[12px] sm:text-[13px] font-semibold ${
                          severity === "critical"
                            ? "text-red-600/70"
                            : "text-amber-700/70"
                        }`}
                      >
                        {impact}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Cost impact summary */}
          <div className="px-5 sm:px-8 py-5 sm:py-6">
            <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.12em] text-black/35 font-bold mb-4">
              Estimated Annual Cost of Inaction
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {[
                {
                  label: "Duplicate Payments",
                  value: SAMPLE_REPORT.costSummary.duplicatePayments,
                  highlight: false,
                },
                {
                  label: "Unused Licenses",
                  value: SAMPLE_REPORT.costSummary.unusedLicenses,
                  highlight: false,
                },
                {
                  label: "Manual Workarounds",
                  value: SAMPLE_REPORT.costSummary.manualWorkarounds,
                  highlight: false,
                },
                {
                  label: "Total Annual Cost",
                  value: SAMPLE_REPORT.costSummary.total,
                  highlight: true,
                },
              ].map(({ label, value, highlight }) => (
                <div
                  key={label}
                  className={`px-4 py-3 text-center ${
                    highlight
                      ? "bg-black text-white"
                      : "bg-[#f5f5f5] border border-black/[0.06]"
                  }`}
                >
                  <div
                    className={`text-[10px] font-mono uppercase tracking-[0.10em] mb-1 ${
                      highlight ? "text-white/40" : "text-black/35"
                    }`}
                  >
                    {label}
                  </div>
                  <div
                    className={`text-[20px] sm:text-[24px] font-bold tracking-tight ${
                      highlight ? "text-white" : "text-black/80"
                    }`}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#f8f8f6] border border-black/[0.06] px-4 py-3 text-center">
              <div className="text-[13px] sm:text-[14px] text-black/50">
                This is a sample report for illustration. Your client&apos;s
                report will contain{" "}
                <span className="text-black/75 font-medium">
                  their actual findings
                </span>
                , scored and prioritised, with each issue mapped to a specific
                remediation SOW.
              </div>
            </div>
          </div>
        </div>

        {/* ── Finding → SOW ───────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 mt-8 mb-4">
          <div className="h-px flex-1 bg-black/[0.08]" />
          <span className="text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.08em] text-black/40 font-bold border-2 border-black/[0.10] px-3 py-1">
            Finding to SOW
          </span>
          <div className="h-px flex-1 bg-black/[0.08]" />
        </div>

        <div className="bg-white border border-black/[0.08] p-4 sm:p-6 mb-6">
          <div className="mb-1">
            <div className="text-[16px] sm:text-[22px] font-medium tracking-tight text-black">
              Every Finding Maps to a Paid Engagement
            </div>
          </div>
          <div className="bg-[#f8f8f6] border border-black/[0.06] px-4 sm:px-5 py-3.5 mb-5">
            <div className="text-[14px] sm:text-[15px] text-black/60 leading-[1.7]">
              The healthcheck isn&apos;t just a report &mdash; it&apos;s a{" "}
              <span className="text-black/85 font-medium">pipeline builder</span>
              . Each finding is specific, quantified, and maps directly to a
              scoped SOW that you sell under your brand.
            </div>
          </div>

          <div className="border border-black/[0.08] overflow-hidden">
            <div className="grid grid-cols-3 bg-black text-white">
              <div className="px-4 sm:px-5 py-3 text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.10em] font-bold">
                Health Check Finding
              </div>
              <div className="px-4 sm:px-5 py-3 text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.10em] font-bold border-l border-white/10">
                SOW It Generates
              </div>
              <div className="px-4 sm:px-5 py-3 text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.10em] font-bold border-l border-white/10">
                Est. Value
              </div>
            </div>
            {SOW_EXAMPLES.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 ${
                  i % 2 === 0 ? "bg-white" : "bg-[#fafafa]"
                } ${
                  i < SOW_EXAMPLES.length - 1 ? "border-b border-black/[0.06]" : ""
                }`}
              >
                <div className="px-4 sm:px-5 py-3 text-[13px] sm:text-[14px] text-black/60 leading-snug">
                  {row.finding}
                </div>
                <div className="px-4 sm:px-5 py-3 text-[13px] sm:text-[14px] text-black/80 font-medium border-l border-black/[0.06]">
                  {row.sow}
                </div>
                <div className="px-4 sm:px-5 py-3 text-[14px] sm:text-[15px] text-black font-semibold border-l border-black/[0.06]">
                  {row.est}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── How It Works ────────────────────────────────────────────────── */}
        <div className="bg-white border border-black/[0.08] p-4 sm:p-6 mb-6">
          <div className="text-[16px] sm:text-[22px] font-medium tracking-tight text-black mb-5">
            How It Works
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {HOW_IT_WORKS.map(({ step, title, desc, Icon: StepIcon }) => (
              <div key={step}>
                <div className="flex h-10 w-10 items-center justify-center bg-black text-white text-[14px] font-mono font-bold mb-3">
                  {step}
                </div>
                <div className="text-[15px] sm:text-[16px] font-semibold text-black/80 mb-1.5">
                  {title}
                </div>
                <div className="text-[13px] sm:text-[14px] text-black/50 leading-[1.6]">
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Any System ──────────────────────────────────────────────────── */}
        <div className="bg-[#f8f8f6] border border-black/[0.06] p-4 sm:p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-5 h-5 text-black/25 shrink-0" strokeWidth={1.75} />
            <div className="text-[16px] sm:text-[22px] font-medium tracking-tight text-black">
              Any System. Free.
            </div>
          </div>
          <p className="text-[14px] sm:text-[15px] text-black/55 leading-[1.65] mb-5">
            It doesn&apos;t matter what the client is running. Source Healthcheck
            works with any system &mdash; we scan via API where available, or
            work from data exports, reports, and documentation.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-black/30 font-bold mb-2">
                ERP Platforms
              </div>
              <p className="text-[12px] sm:text-[13px] text-black/50 leading-[1.7]">
                NetSuite, SAP, Dynamics 365, Sage, Acumatica, Epicor, Infor,
                Odoo, Oracle Fusion, SYSPRO, Workday, Certinia
              </p>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-black/30 font-bold mb-2">
                Accounting
              </div>
              <p className="text-[12px] sm:text-[13px] text-black/50 leading-[1.7]">
                QuickBooks (all versions), Xero, MYOB, FreshBooks, Wave, Zoho
                Books
              </p>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-black/30 font-bold mb-2">
                Legacy &amp; Other
              </div>
              <p className="text-[12px] sm:text-[13px] text-black/50 leading-[1.7]">
                Dynamics GP, NAV, SAP R/3, Oracle EBS, spreadsheets, CSV
                exports, custom systems
              </p>
            </div>
          </div>
        </div>

        {/* ── Black CTA block ─────────────────────────────────────────────── */}
        <div className="bg-black p-4 sm:p-6 mb-6">
          <div className="text-[12px] sm:text-[14px] font-mono uppercase tracking-[0.08em] text-white font-bold mb-2">
            Get Started
          </div>
          <div className="w-full h-px bg-white/15 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            {[
              {
                title: "Free for Clients",
                desc: "Offer it at no cost to open doors. The value is in what comes after.",
              },
              {
                title: "5-Hour Turnaround",
                desc: "Request today, deliver findings tomorrow. Fast enough for any sales cycle.",
              },
              {
                title: "SOW-Ready Output",
                desc: "Every finding maps to a specific, scoped piece of work you can quote immediately.",
              },
            ].map(({ title, desc }) => (
              <div key={title} className="border border-white/10 bg-white/[0.03] p-4">
                <div className="text-[15px] sm:text-[16px] font-semibold text-white/90 mb-1">
                  {title}
                </div>
                <div className="text-[13px] sm:text-[14px] text-white/50 leading-[1.6]">
                  {desc}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://cal.com/source-ai/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-[11px] font-mono uppercase tracking-[0.08em] bg-white text-black px-5 py-3 hover:bg-white/90 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" strokeWidth={1.75} />
              Schedule a Call
            </a>
            <a
              href="/api/export/health-check"
              className="inline-flex items-center justify-center gap-2 text-[11px] font-mono uppercase tracking-[0.08em] text-white/70 border border-white/20 px-5 py-3 hover:text-white hover:border-white/40 transition-colors"
            >
              <Download className="w-3.5 h-3.5" strokeWidth={1.75} />
              Download PDF
            </a>
          </div>
        </div>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <div className="mt-8 text-center">
          <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-black/20">
            Source Healthcheck. Free for all partners and prospects.
            Confidential.
          </p>
        </div>

      </div>
    </div>
  );
}
