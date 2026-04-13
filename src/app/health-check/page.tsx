"use client";

import React from "react";
import {
  Check,
  X,
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
  Lock,
  Workflow,
  CreditCard,
} from "lucide-react";
import type { ElementType } from "react";

// ─── What we check ──────────────────────────────────────────────────────────

const WHATS_CHECKED: { label: string; Icon: ElementType }[] = [
  { label: "System architecture & configuration", Icon: Settings },
  { label: "Data integrity & record quality", Icon: Database },
  { label: "Security, roles & permissions", Icon: Lock },
  { label: "Business process effectiveness", Icon: Workflow },
  { label: "Integration health & automation gaps", Icon: Link },
  { label: "Reporting & dashboard accuracy", Icon: BarChart3 },
  { label: "License & cost efficiency", Icon: CreditCard },
  { label: "Compliance & audit readiness", Icon: Shield },
];

// ─── What's going right / wrong examples ────────────────────────────────────

const GOING_RIGHT = [
  "Properly structured Chart of Accounts",
  "Clean customer/vendor master data",
  "Correct role-based access controls",
  "Efficient approval workflows",
  "Accurate financial reporting",
  "Well-configured tax nexuses",
];

const GOING_WRONG = [
  "Duplicate records across core objects",
  "Over-permissioned admin roles",
  "Manual workarounds bypassing the system",
  "Unused features still enabled",
  "Custom scripts replacing standard functionality",
  "Stale integrations with no error handling",
];

// ─── What we surface ────────────────────────────────────────────────────────

const SURFACES = [
  { title: "Security Audit", items: ["Over-permissioned roles", "Conflicting duties (SOX risk)", "Inactive user accounts still active", "Missing approval workflows", "Admin access patterns flagged"] },
  { title: "Data Quality", items: ["Duplicate records by object", "Orphaned transactions", "Incomplete mandatory fields", "Inconsistent naming/classification", "Historical data anomalies"] },
  { title: "Process Gaps", items: ["Manual steps that should be automated", "Bottlenecks in O2C / P2P / close", "Steps handled outside the ERP", "Redundant or conflicting workflows", "Time and cost quantification"] },
  { title: "Cost & License", items: ["Underutilized modules & licenses", "Over-provisioned user seats", "Custom builds replacing standard features", "Estimated annual savings", "Quick wins under 30 days"] },
];

// ─── Sample report data (realistic example) ────────────────────────────────

const SAMPLE_REPORT = {
  company: "Westfield Manufacturing Co.",
  system: "NetSuite — OneWorld",
  scanned: "March 2026",
  overallScore: 62,
  categories: [
    { name: "System Architecture", score: 78, status: "healthy" as const },
    { name: "Data Integrity", score: 41, status: "critical" as const },
    { name: "Security & Access", score: 55, status: "warning" as const },
    { name: "Business Processes", score: 68, status: "healthy" as const },
    { name: "Integrations", score: 52, status: "warning" as const },
    { name: "Reporting", score: 71, status: "healthy" as const },
    { name: "License Efficiency", score: 64, status: "warning" as const },
    { name: "Compliance Readiness", score: 59, status: "warning" as const },
  ],
  greenFlags: [
    { area: "Chart of Accounts", detail: "Well-structured 4-level hierarchy. 312 active accounts, no orphaned segments. Supports multi-subsidiary consolidation." },
    { area: "Approval Workflows", detail: "PO approvals properly tiered ($0–$5K auto, $5K–$25K manager, $25K+ VP). 98.7% compliance rate over 12 months." },
    { area: "Tax Configuration", detail: "17 tax nexuses correctly configured. Avalara integration active and syncing. No manual tax overrides detected." },
    { area: "Bank Reconciliation", detail: "Auto-matching enabled. 94% match rate. Average reconciliation lag: 1.2 days. No unreconciled items >30 days." },
  ],
  redFlags: [
    {
      severity: "critical" as const,
      area: "Duplicate Vendor Records",
      detail: "147 potential duplicate vendors identified across 3 subsidiaries. 23 share identical bank details with different vendor IDs. Risk: duplicate payments estimated at $34K/yr.",
      impact: "$34,200/yr in duplicate payment risk",
      fix: "Data Cleanup & Deduplication",
    },
    {
      severity: "critical" as const,
      area: "Over-Permissioned Roles",
      detail: "8 users have full Administrator access. 4 of these are non-IT staff (2 in AP, 1 in AR, 1 in Warehouse). No segregation of duties between payment approval and payment execution.",
      impact: "SOX compliance exposure — audit finding risk",
      fix: "Security Hardening & Role Redesign",
    },
    {
      severity: "warning" as const,
      area: "Manual Revenue Recognition",
      detail: "Rev rec handled in Excel for 3 of 5 revenue streams. Monthly journal entries posted manually. Average of 4.2 hours/month. 2 mispostings found in last 6 months.",
      impact: "4.2 hrs/month labor + misstatement risk",
      fix: "Revenue Recognition Automation",
    },
    {
      severity: "warning" as const,
      area: "Stale Integration — Shopify Connector",
      detail: "Custom SuiteScript integration last modified 18 months ago. No retry logic. 312 failed sync records in last 90 days. Fallback: manual CSV import weekly by ops team.",
      impact: "~6 hrs/week manual workaround",
      fix: "Integration Rebuild (Shopify ↔ NetSuite)",
    },
    {
      severity: "warning" as const,
      area: "Underutilized Modules",
      detail: "Advanced Project Management module licensed but only 12% adopted. Fixed Asset Management enabled, 0 transactions in 8 months. Demand Planning licensed, never configured.",
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

// ─── SOW mapping ────────────────────────────────────────────────────────────

const SOW_EXAMPLES = [
  { finding: "47 duplicate vendor records, 12 orphaned transactions", sow: "Data Cleanup & Migration", est: "$5K–$15K" },
  { finding: "3 admin roles with full access, no approval workflows on AP", sow: "Security Hardening & Governance", est: "$8K–$20K" },
  { finding: "Manual month-end close taking 12 days, 6 steps outside ERP", sow: "Process Automation & Close Optimization", est: "$10K–$25K" },
  { finding: "4 unused modules, 8 over-provisioned seats", sow: "License Optimization", est: "$3K–$8K" },
  { finding: "Brittle integration with no retry logic, 2 redundant connectors", sow: "Integration Rebuild & Consolidation", est: "$10K–$30K" },
  { finding: "Reporting gaps: no cash flow visibility, stale dashboards", sow: "Reporting & Dashboard Overhaul", est: "$7K–$15K" },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HealthCheckPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-black">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-5 border-b border-black/[0.06] gap-2">
          <div className="flex items-center gap-3">
            <img src="/logos/salora.png" alt="Salora" className="h-[38px] sm:h-[44px] w-auto rounded-sm" />
            <div>
              <span className="text-[28px] sm:text-[34px] font-display tracking-normal leading-tight text-black">Salora AI</span>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="text-[14px] sm:text-[22px] font-mono uppercase tracking-[0.06em] text-black/70 font-bold">
              HealthCheck
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-white border border-black/[0.06] px-5 sm:px-6 py-5 sm:py-6 text-center">
            <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.12em] text-black/55 font-bold mb-1">Turnaround</div>
            <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.12em] text-black/50 font-bold mb-2">AI-Powered</div>
            <div className="text-[32px] sm:text-[36px] font-medium tracking-tight text-black select-none">5 Hours</div>
          </div>
          <div className="bg-white border border-black/[0.06] px-5 sm:px-6 py-5 sm:py-6 text-center">
            <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.12em] text-black/55 font-bold mb-1">Cost to Partner</div>
            <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.12em] text-black/50 font-bold mb-2">Offer Free or Paid</div>
            <div className="text-[32px] sm:text-[36px] font-medium tracking-tight text-black select-none">Free</div>
          </div>
          <div className="bg-white border border-black/[0.06] px-5 sm:px-6 py-5 sm:py-6 text-center">
            <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.12em] text-black/55 font-bold mb-1">Delivery</div>
            <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.12em] text-black/50 font-bold mb-2">Your Brand</div>
            <div className="text-[32px] sm:text-[36px] font-medium tracking-tight text-black select-none">White-Label</div>
          </div>
          <div className="bg-white border border-black/[0.06] px-5 sm:px-6 py-5 sm:py-6 text-center">
            <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.12em] text-black/55 font-bold mb-1">Outcome</div>
            <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.12em] text-black/50 font-bold mb-2">Every Finding = Work</div>
            <div className="text-[32px] sm:text-[36px] font-medium tracking-tight text-black select-none">→ SOW</div>
          </div>
        </div>

        {/* Main content + sidebar */}
        <div className="bg-white border border-black/[0.08] mb-6">
          <div className="flex flex-col md:flex-row">
            <div className="md:flex-1 p-4 sm:p-6 md:border-r border-b md:border-b-0 border-black/[0.06]">
              {/* Value prop */}
              <div className="border-2 border-black/[0.08] rounded-sm px-5 sm:px-6 py-4 mb-4">
                <p className="text-[18px] sm:text-[20px] md:text-[24px] font-semibold text-black/90 leading-[1.35]">
                  A quick AI-powered health check that shows exactly what&apos;s going right, what&apos;s going wrong, and what to fix — in 5 hours
                </p>
                <p className="text-[14px] sm:text-[15px] text-black/50 mt-2.5 leading-[1.65]">
                  Salora AI scans your ERP environment in 5 hours and delivers a clear assessment covering system health, data quality, security audit, process gaps, and cost efficiency. Every finding maps to a scoped piece of work.
                </p>
              </div>

              {/* What this is */}
              <div className="bg-[#f7f7f5] border border-black/[0.08] rounded-sm px-4 sm:px-5 py-4 sm:py-5 mb-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-black/35">
                    The Pitch
                  </div>
                </div>
                <p className="text-[16px] sm:text-[20px] italic leading-[1.6] text-black/75 mb-4">
                  &ldquo;Let us run a free health check on your system. In <span className="not-italic font-semibold text-black">5 hours</span> we&apos;ll show you exactly what&apos;s working, what&apos;s broken, where you&apos;re exposed on security, and what it&apos;s costing you. No commitment — just a clear picture of where you stand.&rdquo;
                </p>
                <div className="pt-3 border-t border-black/[0.08]">
                  <div className="text-[14px] font-medium text-black/70">Free to the client. Every finding leads to a scoped SOW.</div>
                  <div className="text-[12px] sm:text-[13px] text-black/40 mt-0.5">
                    Health check → findings presentation → signed engagement. Repeatable pipeline.
                  </div>
                </div>
              </div>
              <div className="-mt-2 ml-4 sm:ml-6 inline-flex items-center flex-wrap sm:flex-nowrap gap-x-5 gap-y-0 sm:gap-x-6 bg-white px-4 sm:px-5 py-3 rounded-sm">
                {[
                  { src: "/logos/netsuite.svg", alt: "NetSuite", h: "h-[74px] sm:h-[82px] md:h-[90px]" },
                  { src: "/logos/dynamics365.svg", alt: "Dynamics 365", h: "h-[56px] sm:h-[64px] md:h-[72px]" },
                  { src: "/logos/sap.svg", alt: "SAP", h: "h-[52px] sm:h-[60px] md:h-[68px]" },
                  { src: "/logos/sage.svg", alt: "Sage", h: "h-[50px] sm:h-[58px] md:h-[66px]" },
                ].map((logo) => (
                  <img key={logo.alt} src={logo.src} alt={logo.alt} className={`${logo.h} w-auto shrink-0 block object-contain`} />
                ))}
              </div>
              <div className="mt-3 flex justify-center sm:justify-start">
                <a href="#findings" className="inline-flex items-center gap-2 text-[13px] sm:text-[14px] font-mono uppercase tracking-[0.08em] text-black/75 border border-black/[0.22] bg-white px-5 sm:px-6 py-3 hover:text-black hover:border-black/35 transition-colors">
                  See What We Surface ↓
                </a>
              </div>
            </div>

            {/* Black sidebar — what we check */}
            <div className="md:w-[320px] shrink-0 bg-black p-4 sm:p-5">
              <div className="text-[13px] sm:text-[14px] font-mono uppercase tracking-[0.08em] text-white font-bold mb-3">
                What Salora Checks
              </div>
              <div className="h-px bg-white/20 mb-4" />
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-2.5 sm:gap-0 sm:space-y-3">
                {WHATS_CHECKED.map(({ label, Icon }) => (
                  <div key={label} className="flex items-center gap-2 sm:gap-2.5">
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/35 shrink-0" strokeWidth={1.75} />
                    <span className="text-[13px] sm:text-[15px] font-medium text-white/85">{label}</span>
                  </div>
                ))}
              </div>
              <div className="h-px bg-white/10 mt-4 mb-3" />
              <div className="text-[10px] font-mono uppercase tracking-[0.10em] text-white/30 mb-2.5">
                The Report Includes
              </div>
              <div className="space-y-2.5">
                {[
                  "What's working well (green flags)",
                  "What needs attention (red flags)",
                  "Security & compliance audit",
                  "Cost savings identified",
                  "Prioritized fix list → SOW-ready",
                ].map((label) => (
                  <div key={label} className="flex items-center gap-2 sm:gap-2.5">
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#16a34a]/60 shrink-0" strokeWidth={2} />
                    <span className="text-[13px] sm:text-[15px] font-medium text-white/70">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── What's Going Right / What's Going Wrong ────────────────────── */}
        <div id="findings" className="bg-white border border-black/[0.08] p-4 sm:p-6 mb-6 scroll-mt-4">
          <div className="mb-1">
            <div className="text-[16px] sm:text-[22px] font-medium tracking-tight text-black">
              What the Health Check Surfaces
            </div>
          </div>
          <div className="bg-[#f8f8f6] border border-black/[0.06] rounded-sm px-4 sm:px-5 py-3.5 mb-5">
            <div className="text-[14px] sm:text-[15px] text-black/60 leading-[1.7]">
              The report gives your client a clear picture — <span className="text-black/85 font-medium">what&apos;s healthy, what&apos;s broken, and what to do about it</span>. Every red flag maps directly to a scoped piece of work.
            </div>
          </div>

          {/* Going right / wrong — same grid as fixed-price industries */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5">
            {GOING_RIGHT.map((item) => (
              <div key={item} className="flex items-start gap-2.5 sm:gap-3">
                <Check className="w-4 h-4 shrink-0 mt-0.5 text-[#16a34a]" strokeWidth={2} />
                <div>
                  <div className="text-[15px] sm:text-[16px] font-medium text-black/80">{item}</div>
                  <div className="text-[13px] sm:text-[14px] text-black/45 leading-snug mt-0.5">Confirmed working</div>
                </div>
              </div>
            ))}
            {GOING_WRONG.map((item) => (
              <div key={item} className="flex items-start gap-2.5 sm:gap-3">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-red-500/70" strokeWidth={2} />
                <div>
                  <div className="text-[15px] sm:text-[16px] font-medium text-black/80">{item}</div>
                  <div className="text-[13px] sm:text-[14px] text-red-500/50 leading-snug mt-0.5">Flagged → SOW</div>
                </div>
              </div>
            ))}
          </div>

          {/* Deep dive — all 4 audit areas */}
          <div className="bg-[#f5f5f5] border border-black/[0.06] rounded-sm p-3 sm:p-5">
            <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.08em] text-black/40 font-bold mb-4">
              What We Audit
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              {SURFACES.map(({ title, items }) => (
                <div key={title}>
                  <div className="text-[14px] sm:text-[15px] font-semibold text-black/75 mb-2">{title}</div>
                  <div className="space-y-1.5">
                    {items.map((item) => (
                      <div key={item} className="flex items-center gap-2.5">
                        <Check className="w-3.5 h-3.5 shrink-0 text-black/35" strokeWidth={2.5} />
                        <span className="text-[13px] sm:text-[14px] text-black/65 font-[450] leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SAMPLE REPORT PREVIEW ─────────────────────────────────────── */}
        <div className="flex items-center gap-3 mt-8 mb-4">
          <div className="h-px flex-1 bg-black/[0.08]" />
          <span className="text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.08em] text-black/40 font-bold border-2 border-black/[0.10] px-3 py-1">
            Sample Report
          </span>
          <div className="h-px flex-1 bg-black/[0.08]" />
        </div>

        <div className="border-2 border-black/[0.12] bg-white mb-6">
          {/* Report document header */}
          <div className="bg-black px-5 sm:px-8 py-5 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/30 mb-1">
                  ERP Health Check Report
                </div>
                <div className="text-[22px] sm:text-[28px] font-semibold text-white tracking-tight leading-tight">
                  {SAMPLE_REPORT.company}
                </div>
                <div className="text-[13px] sm:text-[14px] text-white/40 mt-1">
                  {SAMPLE_REPORT.system} &middot; Scanned {SAMPLE_REPORT.scanned}
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="text-right">
                  <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-white/30 mb-0.5">Overall Score</div>
                  <div className="text-[36px] sm:text-[44px] font-bold text-white leading-none tracking-tight">
                    {SAMPLE_REPORT.overallScore}
                    <span className="text-[16px] sm:text-[18px] text-white/30 font-medium">/100</span>
                  </div>
                </div>
                <div className="w-px h-12 bg-white/10 hidden sm:block" />
                <div className="hidden sm:block">
                  <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-amber-400/80 font-bold">
                    Needs Attention
                  </div>
                  <div className="text-[12px] text-white/40 mt-0.5">
                    5 critical findings
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
                  <div className="w-[130px] sm:w-[160px] text-[13px] sm:text-[14px] text-black/60 font-medium shrink-0 truncate">
                    {name}
                  </div>
                  <div className="flex-1 h-2 bg-black/[0.06] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        status === "critical"
                          ? "bg-red-500"
                          : status === "warning"
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                      }`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <div className={`text-[14px] sm:text-[15px] font-bold tabular-nums w-8 text-right ${
                    status === "critical"
                      ? "text-red-500"
                      : status === "warning"
                      ? "text-amber-600"
                      : "text-emerald-600"
                  }`}>
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
                <div key={area} className="bg-emerald-500/[0.04] border border-emerald-500/[0.12] rounded-sm px-4 py-3">
                  <div className="text-[14px] sm:text-[15px] font-semibold text-black/80 mb-1">{area}</div>
                  <div className="text-[12px] sm:text-[13px] text-black/50 leading-[1.6]">{detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Red flags / Findings */}
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
              {SAMPLE_REPORT.redFlags.map(({ severity, area, detail, impact, fix }) => (
                <div
                  key={area}
                  className={`border rounded-sm px-4 sm:px-5 py-3.5 sm:py-4 ${
                    severity === "critical"
                      ? "border-red-500/20 bg-red-500/[0.03] border-l-[3px] border-l-red-500"
                      : "border-amber-500/20 bg-amber-500/[0.02] border-l-[3px] border-l-amber-500"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-mono uppercase tracking-[0.10em] font-bold px-1.5 py-0.5 rounded-sm ${
                        severity === "critical"
                          ? "bg-red-500/10 text-red-600"
                          : "bg-amber-500/10 text-amber-700"
                      }`}>
                        {severity}
                      </span>
                      <span className="text-[15px] sm:text-[16px] font-semibold text-black/85">{area}</span>
                    </div>
                    <div className="text-[11px] font-mono uppercase tracking-[0.06em] text-black/30 shrink-0">
                      Fix → {fix}
                    </div>
                  </div>
                  <div className="text-[13px] sm:text-[14px] text-black/55 leading-[1.65] mb-2">
                    {detail}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.08em] text-black/30">Impact:</span>
                    <span className={`text-[12px] sm:text-[13px] font-semibold ${
                      severity === "critical" ? "text-red-600/70" : "text-amber-700/70"
                    }`}>
                      {impact}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cost summary */}
          <div className="px-5 sm:px-8 py-5 sm:py-6">
            <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.12em] text-black/35 font-bold mb-4">
              Estimated Annual Cost of Inaction
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {[
                { label: "Duplicate Payments", value: SAMPLE_REPORT.costSummary.duplicatePayments },
                { label: "Unused Licenses", value: SAMPLE_REPORT.costSummary.unusedLicenses },
                { label: "Manual Workarounds", value: SAMPLE_REPORT.costSummary.manualWorkarounds },
                { label: "Total Annual Cost", value: SAMPLE_REPORT.costSummary.total, highlight: true },
              ].map(({ label, value, highlight }) => (
                <div
                  key={label}
                  className={`px-4 py-3 rounded-sm text-center ${
                    highlight
                      ? "bg-black text-white"
                      : "bg-[#f5f5f5] border border-black/[0.06]"
                  }`}
                >
                  <div className={`text-[10px] font-mono uppercase tracking-[0.10em] mb-1 ${
                    highlight ? "text-white/40" : "text-black/35"
                  }`}>
                    {label}
                  </div>
                  <div className={`text-[20px] sm:text-[24px] font-bold tracking-tight ${
                    highlight ? "text-white" : "text-black/80"
                  }`}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#f8f8f6] border border-black/[0.06] rounded-sm px-4 py-3 text-center">
              <div className="text-[13px] sm:text-[14px] text-black/50">
                This is a sample report for illustration purposes. Your client&apos;s report will contain <span className="text-black/75 font-medium">their actual findings</span>, scored and prioritized, with each issue mapped to a specific remediation SOW.
              </div>
            </div>
          </div>
        </div>

        {/* ── Divider: Health Check → SOW ─────────────────────────────────── */}
        <div className="flex items-center gap-3 mt-8 mb-4">
          <div className="h-px flex-1 bg-black/[0.08]" />
          <span className="text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.08em] text-black/40 font-bold border-2 border-black/[0.10] px-3 py-1">
            Finding → SOW
          </span>
          <div className="h-px flex-1 bg-black/[0.08]" />
        </div>

        {/* ── From Finding to SOW ─────────────────────────────────────────── */}
        <div className="bg-white border border-black/[0.08] p-4 sm:p-6 mb-6">
          <div className="mb-1">
            <div className="text-[16px] sm:text-[22px] font-medium tracking-tight text-black">
              Every Finding Maps to a Paid Engagement
            </div>
          </div>
          <div className="bg-[#f8f8f6] border border-black/[0.06] rounded-sm px-4 sm:px-5 py-3.5 mb-5">
            <div className="text-[14px] sm:text-[15px] text-black/60 leading-[1.7]">
              The health check isn&apos;t just a report — it&apos;s a <span className="text-black/85 font-medium">pipeline builder</span>. Each finding is specific, quantified, and maps directly to a scoped SOW that you sell under your brand.
            </div>
          </div>

          {/* SOW mapping table — matches financials pricing table */}
          <div className="border border-black/[0.08] rounded-sm overflow-hidden">
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
                className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-white" : "bg-[#fafafa]"} ${
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
          <div className="text-[16px] sm:text-[22px] font-medium tracking-tight text-black mb-4">How It Works</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: "1",
                title: "You Request",
                desc: "Submit a health check for your client. We need read-only access to their ERP — that's it.",
              },
              {
                step: "2",
                title: "AI Scans",
                desc: "Salora scans the full environment in ~5 hours — architecture, data, security, processes, integrations, costs.",
              },
              {
                step: "3",
                title: "Report Ready",
                desc: "White-labeled report under your brand. Green flags, red flags, and a prioritized fix list.",
              },
              {
                step: "4",
                title: "You Sell the Fix",
                desc: "Present findings to the client. Walk through what's broken. Close the SOW on the spot.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step}>
                <div className="flex h-10 w-10 items-center justify-center bg-black text-white text-[14px] font-mono font-bold mb-3">
                  {step}
                </div>
                <div className="text-[15px] sm:text-[16px] font-semibold text-black/80 mb-1">{title}</div>
                <div className="text-[13px] sm:text-[14px] text-black/50 leading-[1.6]">{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Source vs Partner ────────────────────────────────────────────── */}
        <div className="bg-[#f5f5f5] border border-black/[0.06] rounded-sm p-3 sm:p-5 mb-6">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.08em] text-black/40 font-bold">
              Salora Handles
            </div>
            <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.08em] text-red-500/70 font-bold">
              Client-Led
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4">
            <div className="space-y-2">
              {[
                "ERP system scan",
                "Data quality analysis",
                "Security & role audit",
                "Process gap identification",
              ].map((label) => (
                <div key={label} className="flex items-center gap-2.5">
                  <Check className="w-3.5 h-3.5 shrink-0 text-black/35" strokeWidth={2.5} />
                  <span className="text-[13px] sm:text-[15px] text-black/70 font-[450]">{label}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {[
                "Integration health check",
                "Cost & license review",
                "Report generation",
                "White-label formatting",
              ].map((label) => (
                <div key={label} className="flex items-center gap-2.5">
                  <Check className="w-3.5 h-3.5 shrink-0 text-black/35" strokeWidth={2.5} />
                  <span className="text-[13px] sm:text-[15px] text-black/70 font-[450]">{label}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-black/[0.08] pt-3 md:border-t-0 md:border-l md:pl-4 md:pt-0 md:-mt-1 self-start border-black/[0.08]">
              <div className="space-y-2">
                {[
                  "Client relationship",
                  "Securing system access",
                  "Presenting findings",
                  "Scoping & selling the SOW",
                  "Delivering the fix",
                ].map((label) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <X className="w-4 h-4 shrink-0 text-red-500/50" strokeWidth={2.5} />
                    <span className="text-[13px] sm:text-[15px] text-black/60 font-[450]">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── White-Label Block ───────────────────────────────────────────── */}
        <div className="bg-black p-4 sm:p-6 rounded-sm mb-6">
          <div className="text-[12px] sm:text-[14px] font-mono uppercase tracking-[0.08em] text-white font-bold mb-2">
            Get Started
          </div>
          <div className="w-full h-px bg-white/15 mb-3 sm:mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            {[
              { title: "Free for Clients", desc: "Offer it at no cost to open doors. The value is in what comes after." },
              { title: "5-Hour Turnaround", desc: "Request today, deliver findings tomorrow. Fast enough for any sales cycle." },
              { title: "SOW-Ready Output", desc: "Every finding maps to a specific, scoped piece of work you can quote immediately." },
            ].map(({ title, desc }) => (
              <div key={title} className="border border-white/10 bg-white/[0.03] rounded-sm p-3 sm:p-3.5">
                <div className="text-[15px] sm:text-[16px] font-semibold text-white/90">{title}</div>
                <div className="text-[13px] sm:text-[14px] text-white/50 leading-snug mt-0.5">{desc}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://cal.com/source-ai/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-[11px] font-mono uppercase tracking-[0.08em] bg-white text-black px-5 py-2.5 hover:bg-white/90 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" strokeWidth={1.75} />
              Schedule a Call
            </a>
            <a
              href="/api/export/health-check"
              className="inline-flex items-center justify-center gap-2 text-[11px] font-mono uppercase tracking-[0.08em] text-white/70 border border-white/20 px-5 py-2.5 hover:text-white hover:border-white/40 transition-colors"
            >
              <Download className="w-3.5 h-3.5" strokeWidth={2} />
              Download PDF
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-black/20">
            Salora AI ERP Health Check. Powered by Source. Confidential.
          </p>
        </div>
      </div>
    </div>
  );
}
