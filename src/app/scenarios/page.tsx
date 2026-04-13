"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import {
  ArrowLeft,
  Check,
  Loader2,
  Database,
  Search,
  Globe,
  FileText,
  Code,
  Trash2,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  Download,
  ExternalLink,
  GitBranch,
  Shield,
  Zap,
  Clock,
  FileCheck,
  Send,
  ArrowRight,
  Users,
  Activity,
  TrendingUp,
  TrendingDown,
  Calendar,
  Lock,
  Eye,
} from "lucide-react"
import { TypewriterText } from "@/components/ui/typewriter-text"

// ============================================
// Types
// ============================================

type ReasoningStepData = { title: string; desc: string }

// Each bubble is fully custom — text, artifact, or both
type ResponseBubble = {
  label: string
  pill?: { text: string; variant?: "default" | "success" | "warning" | "error" }
  text?: string
  artifact?: React.ReactNode
}

type ScenarioData = {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  prompt: string
  department: string
  role: string
  reasoningSteps: ReasoningStepData[]
  responseBubbles: ResponseBubble[]
}

// ============================================
// Scenario Definitions — each with unique artifacts
// ============================================

const scenarios: ScenarioData[] = [
  // ── 1. ERP Migration ────────────────────────────────────
  {
    id: "migration",
    label: "ERP Migration",
    icon: Database,
    department: "Finance",
    role: "CFO / Finance Director",
    prompt: "we've just acquired a company and we want to switch them from Quickbooks to Netsuite.",
    reasoningSteps: [
      { title: "Understanding your request", desc: "Identified M&A scenario: QuickBooks → NetSuite migration for acquired entity" },
      { title: "Fetching QuickBooks & NetSuite documentation", desc: "Retrieved data schemas, API specs, field mappings, and migration best practices" },
      { title: "Analyzing typical integration requirements", desc: "Checking common M&A pitfalls: data reconciliation, fiscal years, multi-subsidiary setup" },
      { title: "Planning migration strategy", desc: "Structuring phased approach: discovery → mapping → testing → cutover" },
    ],
    responseBubbles: [
      {
        label: "Understanding",
        pill: { text: "QuickBooks → NetSuite" },
        text: "Perfect — I understand you need to migrate an acquired company from QuickBooks to NetSuite. I've scanned the QuickBooks instance and here's what I found.",
      },
      // Data volume table artifact
      {
        label: "Data scan results",
        artifact: (
          <div className="border border-black/10 overflow-hidden">
            <div className="bg-black/[0.03] border-b border-black/10 px-4 py-2 font-mono text-[10px] text-black/50 uppercase tracking-wider">QuickBooks Data Inventory</div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/10 bg-black/[0.02]">
                  <th className="text-left px-4 py-2 font-mono text-[10px] text-black/40 uppercase tracking-wider">Entity</th>
                  <th className="text-right px-4 py-2 font-mono text-[10px] text-black/40 uppercase tracking-wider">Records</th>
                  <th className="text-right px-4 py-2 font-mono text-[10px] text-black/40 uppercase tracking-wider">Custom Fields</th>
                  <th className="text-right px-4 py-2 font-mono text-[10px] text-black/40 uppercase tracking-wider">Complexity</th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs">
                {[
                  { entity: "Customers", records: "3,412", fields: "8", complexity: "Low" },
                  { entity: "Vendors", records: "847", fields: "5", complexity: "Low" },
                  { entity: "Items / SKUs", records: "12,340", fields: "23", complexity: "High" },
                  { entity: "Transactions", records: "148,200", fields: "12", complexity: "Medium" },
                  { entity: "Chart of Accounts", records: "342", fields: "4", complexity: "Medium" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-black/5">
                    <td className="px-4 py-2 text-black/80">{row.entity}</td>
                    <td className="px-4 py-2 text-right text-black/70">{row.records}</td>
                    <td className="px-4 py-2 text-right text-black/50">{row.fields}</td>
                    <td className="px-4 py-2 text-right">
                      <span className={`px-2 py-0.5 text-[9px] uppercase tracking-wider ${
                        row.complexity === "High" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                        row.complexity === "Medium" ? "bg-blue-50 text-blue-700 border border-blue-200" :
                        "bg-green-50 text-green-700 border border-green-200"
                      }`}>{row.complexity}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
      },
      // Migration timeline artifact
      {
        label: "Migration timeline",
        text: "Based on data complexity, here's the phased migration plan I recommend.",
        artifact: (
          <div className="mt-4 border border-black/10 overflow-hidden">
            <div className="bg-black/[0.03] border-b border-black/10 px-4 py-2 font-mono text-[10px] text-black/50 uppercase tracking-wider">Phased Migration Plan</div>
            <div className="p-4 space-y-0">
              {[
                { phase: "Discovery & Mapping", weeks: "Week 1", width: "25%", color: "bg-blue-500", items: ["Field mapping", "Gap analysis"] },
                { phase: "Data Cleansing", weeks: "Week 1–2", width: "35%", color: "bg-indigo-500", items: ["Dedup records", "Standardize formats"] },
                { phase: "Test Migration", weeks: "Week 2", width: "25%", color: "bg-purple-500", items: ["Sandbox import", "Validate totals"] },
                { phase: "Go-Live Cutover", weeks: "Week 3", width: "15%", color: "bg-green-500", items: ["Final sync", "Verify reports"] },
              ].map((phase, i) => (
                <div key={i} className="flex items-center gap-4 py-3 border-b border-black/5 last:border-0">
                  <div className="w-28 flex-shrink-0">
                    <div className="font-mono text-[10px] text-black/40 uppercase tracking-wider">{phase.weeks}</div>
                    <div className="text-sm font-medium text-black/80 mt-0.5">{phase.phase}</div>
                  </div>
                  <div className="flex-1">
                    <div className={`h-6 ${phase.color} rounded-sm opacity-80 flex items-center px-2`} style={{ width: phase.width }}>
                      <span className="text-white text-[9px] font-mono truncate">{phase.width}</span>
                    </div>
                    <div className="flex gap-3 mt-1.5">
                      {phase.items.map((item, j) => (
                        <span key={j} className="text-[10px] text-black/40 font-mono">{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Quote */}
            <div className="bg-black text-white p-5 flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">$8,500</div>
                <div className="font-mono text-[10px] text-white/60 tracking-wider mt-1">FIXED PRICE &middot; 3 WEEKS</div>
              </div>
              <div className="font-mono text-[10px] text-white/60 text-right leading-relaxed">
                100% Money-Back<br/>Guarantee
              </div>
            </div>
          </div>
        ),
      },
    ],
  },

  // ── 2. Integration Fix ────────────────────────────────────
  {
    id: "integration-fix",
    label: "Integration Fix",
    icon: Globe,
    department: "IT",
    role: "ERP Administrator",
    prompt: "our Shopify orders stopped syncing to NetSuite three days ago and we have a backlog of orders.",
    reasoningSteps: [
      { title: "Connecting to your systems", desc: "Accessing Shopify and NetSuite integration logs via Celigo middleware" },
      { title: "Analyzing error patterns", desc: "Found 312 failed webhook deliveries starting Jan 24 at 2:14 AM UTC" },
      { title: "Identifying root cause", desc: "API token expired — Shopify rotated credentials during scheduled maintenance" },
      { title: "Preparing remediation plan", desc: "Token refresh + backlog replay strategy for 312 stuck orders" },
    ],
    responseBubbles: [
      {
        label: "Diagnosis",
        pill: { text: "312 orders stuck", variant: "error" },
        text: "I found the issue. Your Shopify-to-NetSuite sync failed because the API token expired on January 24th. Here's the current system status.",
      },
      // System status dashboard artifact
      {
        label: "Integration status",
        artifact: (
          <div className="border border-black/10 overflow-hidden">
            <div className="bg-black/[0.03] border-b border-black/10 px-4 py-2 font-mono text-[10px] text-black/50 uppercase tracking-wider">Live Integration Status</div>
            <div className="p-4 space-y-3">
              {[
                { name: "Shopify → Celigo", status: "error", detail: "AUTH_EXPIRED since Jan 24", icon: Globe },
                { name: "Celigo → NetSuite", status: "warning", detail: "312 items queued", icon: Database },
                { name: "NetSuite → Stripe", status: "ok", detail: "Last sync: 2 min ago", icon: Activity },
                { name: "NetSuite → ShipStation", status: "ok", detail: "Last sync: 5 min ago", icon: Send },
                { name: "NetSuite → Avalara", status: "ok", detail: "Last sync: 1 min ago", icon: Shield },
              ].map((integration, i) => {
                const Icon = integration.icon
                return (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-black/5 last:border-0">
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                      integration.status === "error" ? "bg-red-500 animate-pulse" :
                      integration.status === "warning" ? "bg-amber-500" :
                      "bg-green-500"
                    }`} />
                    <Icon className="w-4 h-4 text-black/30 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-black/80 font-medium">{integration.name}</div>
                    </div>
                    <div className={`font-mono text-[10px] ${
                      integration.status === "error" ? "text-red-600" :
                      integration.status === "warning" ? "text-amber-600" :
                      "text-green-600"
                    }`}>{integration.detail}</div>
                  </div>
                )
              })}
            </div>
          </div>
        ),
      },
      // Error timeline artifact
      {
        label: "Error timeline",
        text: "Here's exactly when things broke down and what happened at each step.",
        artifact: (
          <div className="mt-4 border border-black/10 overflow-hidden">
            <div className="bg-red-50 border-b border-red-200 px-4 py-2 font-mono text-[10px] text-red-700 uppercase tracking-wider">Failure Timeline</div>
            <div className="p-4">
              <div className="relative pl-6 space-y-4">
                {/* vertical timeline line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-black/10" />
                {[
                  { time: "Jan 24, 02:00", event: "Shopify scheduled maintenance begins", type: "info" },
                  { time: "Jan 24, 02:14", event: "API token rotated by Shopify", type: "warning" },
                  { time: "Jan 24, 02:14", event: "First webhook delivery fails — AUTH_EXPIRED", type: "error" },
                  { time: "Jan 24, 02:15 – now", event: "312 subsequent orders fail to sync", type: "error" },
                  { time: "Now", event: "Token refresh + replay will clear backlog in ~15 min", type: "fix" },
                ].map((entry, i) => (
                  <div key={i} className="relative flex items-start gap-3">
                    <div className={`w-3.5 h-3.5 rounded-full flex-shrink-0 border-2 bg-white z-10 ${
                      entry.type === "error" ? "border-red-500" :
                      entry.type === "warning" ? "border-amber-500" :
                      entry.type === "fix" ? "border-green-500" :
                      "border-black/20"
                    }`} />
                    <div className="flex-1 min-w-0 -mt-0.5">
                      <div className="font-mono text-[10px] text-black/40">{entry.time}</div>
                      <div className={`text-sm mt-0.5 ${
                        entry.type === "error" ? "text-red-700 font-medium" :
                        entry.type === "fix" ? "text-green-700 font-medium" :
                        "text-black/70"
                      }`}>{entry.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ),
      },
    ],
  },

  // ── 3. Data Cleanup ────────────────────────────────────
  {
    id: "data-cleanup",
    label: "Data Cleanup",
    icon: Trash2,
    department: "Operations",
    role: "Business Analyst",
    prompt: "we think we have a lot of duplicate customer records. Can you find and clean them up?",
    reasoningSteps: [
      { title: "Scanning customer records", desc: "Analyzing 4,230 customer records across all subsidiaries" },
      { title: "Running fuzzy matching", desc: "Comparing names, emails, phone numbers, and addresses with 95% confidence threshold" },
      { title: "Categorizing duplicates", desc: "Grouping into exact matches, likely matches, and records needing manual review" },
      { title: "Generating cleanup report", desc: "Building prioritized deduplication plan with merge recommendations" },
    ],
    responseBubbles: [
      {
        label: "Analysis complete",
        pill: { text: "340 duplicates found", variant: "warning" },
        text: "I've scanned all 4,230 customer records and found 340 duplicates — that's 12% of your customer base. Here are some sample matches I found.",
      },
      // Sample duplicate pairs artifact
      {
        label: "Sample duplicate pairs",
        artifact: (
          <div className="border border-black/10 overflow-hidden">
            <div className="bg-black/[0.03] border-b border-black/10 px-4 py-2 font-mono text-[10px] text-black/50 uppercase tracking-wider flex justify-between">
              <span>Duplicate Preview — 5 of 340</span>
              <span>95% confidence threshold</span>
            </div>
            <div className="divide-y divide-black/5">
              {[
                { a: { name: "Acme Corp", email: "billing@acme.com", id: "CUST-1204" }, b: { name: "ACME Corporation", email: "billing@acme.com", id: "CUST-3891" }, confidence: 99, match: "Email + Name" },
                { a: { name: "Johnson & Sons LLC", email: "ap@johnson-sons.com", id: "CUST-0847" }, b: { name: "Johnson and Sons", email: "ap@johnsonsons.com", id: "CUST-2156" }, confidence: 96, match: "Name + Address" },
                { a: { name: "TechFlow Inc", email: "orders@techflow.io", id: "CUST-1502" }, b: { name: "Tech Flow Inc.", email: "orders@tech-flow.io", id: "CUST-4201" }, confidence: 95, match: "Name + Phone" },
              ].map((pair, i) => (
                <div key={i} className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-1.5 py-0.5 text-[9px] font-mono tracking-wider ${
                      pair.confidence >= 98 ? "bg-green-50 text-green-700 border border-green-200" : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}>{pair.confidence}%</span>
                    <span className="font-mono text-[9px] text-black/40">{pair.match}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-black/[0.02] border border-black/5 px-3 py-2">
                      <div className="font-mono text-[9px] text-black/30 mb-1">{pair.a.id}</div>
                      <div className="text-sm text-black/80 font-medium">{pair.a.name}</div>
                      <div className="text-xs text-black/40 mt-0.5">{pair.a.email}</div>
                    </div>
                    <div className="bg-black/[0.02] border border-black/5 px-3 py-2">
                      <div className="font-mono text-[9px] text-black/30 mb-1">{pair.b.id}</div>
                      <div className="text-sm text-black/80 font-medium">{pair.b.name}</div>
                      <div className="text-xs text-black/40 mt-0.5">{pair.b.email}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ),
      },
      // Confidence distribution + action
      {
        label: "Confidence breakdown",
        text: "Here's how the 340 duplicates break down by match confidence. I recommend auto-merging the high-confidence matches first.",
        artifact: (
          <div className="mt-4 border border-black/10 overflow-hidden">
            <div className="bg-black/[0.03] border-b border-black/10 px-4 py-2 font-mono text-[10px] text-black/50 uppercase tracking-wider">Match Confidence Distribution</div>
            <div className="p-4 space-y-3">
              {[
                { range: "98–100%", count: 180, label: "Auto-merge", pct: 53, color: "bg-green-500" },
                { range: "95–97%", count: 120, label: "Quick review", pct: 35, color: "bg-amber-500" },
                { range: "90–94%", count: 40, label: "Manual review", pct: 12, color: "bg-red-400" },
              ].map((bucket, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-black/70 font-medium">{bucket.range}</span>
                      <span className="text-black/40">{bucket.label}</span>
                    </div>
                    <span className="font-mono text-black/60">{bucket.count} records</span>
                  </div>
                  <div className="w-full h-5 bg-black/[0.04] overflow-hidden">
                    <div className={`h-full ${bucket.color} opacity-80 flex items-center px-2`} style={{ width: `${bucket.pct}%` }}>
                      <span className="text-white text-[9px] font-mono">{bucket.pct}%</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-3 border-t border-black/10 flex items-center justify-between">
                <span className="font-mono text-xs text-black/40">Total duplicates: 340 of 4,230 records (12%)</span>
                <span className="font-mono text-xs text-green-600">Auto-merge 180 &middot; $200 flat fee</span>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },

  // ── 4. Custom Report ────────────────────────────────────
  {
    id: "custom-report",
    label: "Custom Report",
    icon: BarChart3,
    department: "Finance",
    role: "CFO / Finance Director",
    prompt: "I need a revenue breakdown by sales channel for the last 12 months with month-over-month trends.",
    reasoningSteps: [
      { title: "Querying transaction data", desc: "Pulling revenue records from all sales channels for Jan 2025 – Jan 2026" },
      { title: "Aggregating by channel", desc: "Grouping data by Shopify, Amazon, Wholesale, and Direct Sales channels" },
      { title: "Calculating trends", desc: "Computing month-over-month growth rates and seasonal patterns" },
      { title: "Building saved search", desc: "Creating reusable NetSuite saved search with scheduling options" },
    ],
    responseBubbles: [
      {
        label: "Report ready",
        pill: { text: "12-month analysis", variant: "success" },
        text: "I've built your revenue-by-channel report covering the last 12 months. Total revenue: $4.2M across 4 channels.",
      },
      // Bar chart visualization artifact
      {
        label: "Revenue by channel",
        artifact: (
          <div className="border border-black/10 overflow-hidden">
            <div className="bg-green-50 border-b border-green-200 px-4 py-2 font-mono text-[10px] text-green-700 uppercase tracking-wider flex justify-between">
              <span>Revenue by Channel — 12 Months</span>
              <span>Total: $4.2M</span>
            </div>
            <div className="p-4">
              {/* Mini bar chart */}
              <div className="flex items-end gap-3 h-32 mb-4 border-b border-black/10 pb-4">
                {[
                  { month: "F", values: [28, 18, 14, 6] },
                  { month: "M", values: [30, 20, 13, 7] },
                  { month: "A", values: [32, 19, 15, 8] },
                  { month: "M", values: [35, 22, 14, 7] },
                  { month: "J", values: [38, 24, 13, 9] },
                  { month: "J", values: [42, 23, 12, 8] },
                  { month: "A", values: [40, 25, 14, 9] },
                  { month: "S", values: [44, 26, 13, 10] },
                  { month: "O", values: [48, 28, 15, 11] },
                  { month: "N", values: [52, 30, 14, 12] },
                  { month: "D", values: [58, 32, 13, 11] },
                  { month: "J", values: [55, 28, 15, 12] },
                ].map((m, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                    <div className="w-full flex flex-col gap-[1px]">
                      <div className="w-full bg-blue-500 rounded-t-sm" style={{ height: `${m.values[0]}px` }} />
                      <div className="w-full bg-indigo-400" style={{ height: `${m.values[1]}px` }} />
                      <div className="w-full bg-purple-400" style={{ height: `${m.values[2]}px` }} />
                      <div className="w-full bg-violet-300 rounded-b-sm" style={{ height: `${m.values[3]}px` }} />
                    </div>
                    <span className="text-[8px] font-mono text-black/30 mt-1">{m.month}</span>
                  </div>
                ))}
              </div>
              {/* Legend + data */}
              <div className="space-y-2">
                {[
                  { channel: "Shopify", revenue: "$1.8M", growth: "+23%", trend: "up", color: "bg-blue-500" },
                  { channel: "Amazon", revenue: "$1.2M", growth: "+8%", trend: "up", color: "bg-indigo-400" },
                  { channel: "Wholesale", revenue: "$820K", growth: "-3%", trend: "down", color: "bg-purple-400" },
                  { channel: "Direct Sales", revenue: "$380K", growth: "+12%", trend: "up", color: "bg-violet-300" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center gap-3 py-1">
                    <div className={`w-3 h-3 ${row.color} rounded-sm flex-shrink-0`} />
                    <span className="text-sm text-black/70 flex-1">{row.channel}</span>
                    <span className="font-mono text-sm font-bold text-black">{row.revenue}</span>
                    <span className={`font-mono text-xs min-w-[45px] text-right flex items-center gap-1 justify-end ${
                      row.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}>
                      {row.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {row.growth}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ),
      },
      // Schedule + export actions
      {
        label: "Saved & ready",
        text: "This report is saved as a NetSuite saved search. You can schedule delivery or export it now.",
        artifact: (
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { icon: ExternalLink, label: "Open in NetSuite", desc: "View full report" },
              { icon: Calendar, label: "Schedule weekly", desc: "Email every Monday" },
              { icon: Download, label: "Export CSV", desc: "Download raw data" },
            ].map((action, i) => {
              const Icon = action.icon
              return (
                <div key={i} className="border border-black/10 p-3 text-center hover:bg-black/[0.02] transition-colors cursor-pointer">
                  <Icon className="w-5 h-5 text-black/40 mx-auto mb-2" />
                  <div className="text-xs font-medium text-black/80">{action.label}</div>
                  <div className="text-[10px] text-black/40 font-mono mt-0.5">{action.desc}</div>
                </div>
              )
            })}
          </div>
        ),
      },
    ],
  },

  // ── 5. Script Development ────────────────────────────────────
  {
    id: "script-dev",
    label: "Script Development",
    icon: Code,
    department: "IT",
    role: "Developer",
    prompt: "we need to automatically block sales orders when a customer exceeds their credit limit.",
    reasoningSteps: [
      { title: "Analyzing business requirement", desc: "Credit hold enforcement on Sales Order submission in NetSuite" },
      { title: "Checking existing scripts", desc: "No existing credit hold scripts found — building from scratch" },
      { title: "Generating SuiteScript 2.1", desc: "Creating User Event script with beforeSubmit trigger on Sales Order" },
      { title: "Validating and testing", desc: "Script passes sandbox validation — ready for deployment" },
    ],
    responseBubbles: [
      {
        label: "Script ready",
        pill: { text: "SuiteScript 2.1", variant: "success" },
        text: "I've generated a User Event script that will block Sales Order submission when the customer's outstanding balance plus the new order exceeds their credit limit.",
      },
      // Code editor artifact
      {
        label: "Generated script",
        artifact: (
          <div className="bg-[#1a1a1a] overflow-hidden border border-black/20">
            <div className="px-3 py-2 bg-[#252525] text-[10px] font-mono text-white/50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </span>
                <span>credit_hold_ue.js</span>
              </div>
              <span className="text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                Validated
              </span>
            </div>
            <pre className="p-4 text-[11px] font-mono text-[#d4d4d4] overflow-x-auto leading-relaxed"><span className="text-[#6A9955]">{"/**\n * @NApiVersion 2.1\n * @NScriptType UserEventScript\n */"}</span>{`
`}<span className="text-[#C586C0]">define</span>{`(['N/record', 'N/error'], (record, error) => {
  `}<span className="text-[#C586C0]">const</span>{` beforeSubmit = (ctx) => {
    `}<span className="text-[#C586C0]">const</span>{` order = ctx.newRecord;
    `}<span className="text-[#C586C0]">const</span>{` customer = record.`}<span className="text-[#DCDCAA]">load</span>{`({
      type: 'customer',
      id: order.`}<span className="text-[#DCDCAA]">getValue</span>{`('entity')
    });

    `}<span className="text-[#C586C0]">const</span>{` balance = customer.`}<span className="text-[#DCDCAA]">getValue</span>{`('balance');
    `}<span className="text-[#C586C0]">const</span>{` limit = customer.`}<span className="text-[#DCDCAA]">getValue</span>{`('creditlimit');
    `}<span className="text-[#C586C0]">const</span>{` total = order.`}<span className="text-[#DCDCAA]">getValue</span>{`('total');

    `}<span className="text-[#C586C0]">if</span>{` (balance + total > limit) {
      `}<span className="text-[#C586C0]">throw</span>{` error.`}<span className="text-[#DCDCAA]">create</span>{`({
        name: `}<span className="text-[#CE9178]">{"'CREDIT_HOLD'"}</span>{`,
        message: \`Blocked: \${balance} + \${total} > \${limit}\`
      });
    }
  };

  `}<span className="text-[#C586C0]">return</span>{` { beforeSubmit };
});`}</pre>
          </div>
        ),
      },
      // Test results artifact
      {
        label: "Test results",
        text: "All 6 automated tests pass. The script is ready for sandbox deployment.",
        artifact: (
          <div className="mt-4 border border-black/10 overflow-hidden">
            <div className="bg-green-50 border-b border-green-200 px-4 py-2 font-mono text-[10px] text-green-700 uppercase tracking-wider flex items-center justify-between">
              <span>Automated Test Suite</span>
              <span>6/6 PASSED</span>
            </div>
            <div className="p-3 space-y-1 font-mono text-xs">
              {[
                { test: "Order under credit limit → allows submission", status: "pass", time: "12ms" },
                { test: "Order exceeding limit → blocks with CREDIT_HOLD", status: "pass", time: "8ms" },
                { test: "Order exactly at limit → allows submission", status: "pass", time: "6ms" },
                { test: "Customer with no limit set → allows submission", status: "pass", time: "9ms" },
                { test: "Customer with zero balance → allows submission", status: "pass", time: "5ms" },
                { test: "Error message includes correct amounts", status: "pass", time: "11ms" },
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-2 py-1.5 border-b border-black/5 last:border-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                  <span className="text-black/70 flex-1">{t.test}</span>
                  <span className="text-black/30">{t.time}</span>
                </div>
              ))}
            </div>
          </div>
        ),
      },
    ],
  },

  // ── 6. Compliance Audit ────────────────────────────────────
  {
    id: "compliance",
    label: "Compliance Audit",
    icon: Shield,
    department: "Finance",
    role: "CFO / Finance Director",
    prompt: "we need to prepare for our SOX compliance audit next month. Can you assess our readiness?",
    reasoningSteps: [
      { title: "Scanning access controls", desc: "Reviewing user roles, permissions, and segregation of duties across NetSuite" },
      { title: "Auditing change logs", desc: "Checking system notes, audit trail completeness, and approval workflows" },
      { title: "Reviewing financial controls", desc: "Validating journal entry approvals, bank reconciliation processes, and closing procedures" },
      { title: "Generating readiness report", desc: "Compiling findings into SOX-ready audit documentation" },
    ],
    responseBubbles: [
      {
        label: "Audit assessment",
        pill: { text: "3 gaps found", variant: "warning" },
        text: "I've completed a SOX readiness assessment of your NetSuite environment. Here's your compliance scorecard.",
      },
      // Compliance scorecard artifact
      {
        label: "SOX compliance scorecard",
        artifact: (
          <div className="border border-black/10 overflow-hidden">
            <div className="bg-black/[0.03] border-b border-black/10 px-4 py-2 font-mono text-[10px] text-black/50 uppercase tracking-wider">Compliance Scorecard</div>
            <div className="p-4">
              {/* Score ring */}
              <div className="flex items-center gap-6 mb-5 pb-5 border-b border-black/10">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e5e5" strokeWidth="3" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="85, 100" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-black">85%</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-black/80 mb-2">Overall SOX Readiness</div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Controls", score: "9/12", color: "text-amber-600" },
                      { label: "Access", score: "4/5", color: "text-green-600" },
                      { label: "Audit Trail", score: "7/7", color: "text-green-600" },
                    ].map((s, i) => (
                      <div key={i} className="text-center bg-black/[0.03] px-2 py-1.5">
                        <div className={`font-mono text-sm font-bold ${s.color}`}>{s.score}</div>
                        <div className="font-mono text-[8px] text-black/40 uppercase tracking-wider">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Findings */}
              <div className="space-y-2.5">
                {[
                  { status: "fail", icon: Users, text: "2 users have conflicting roles (AP + payment approval)", risk: "HIGH" },
                  { status: "fail", icon: FileText, text: "Journal entries over $10K missing secondary approval", risk: "HIGH" },
                  { status: "fail", icon: Database, text: "No automated bank reconciliation process", risk: "MEDIUM" },
                  { status: "pass", icon: Eye, text: "Audit trail enabled for all financial transactions", risk: "" },
                  { status: "pass", icon: Lock, text: "Password policy meets SOX requirements", risk: "" },
                  { status: "pass", icon: Calendar, text: "Monthly close procedures documented and tracked", risk: "" },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div key={i} className={`flex items-start gap-2.5 py-2 px-3 ${
                      item.status === "fail" ? "bg-red-50/50 border border-red-100" : "bg-black/[0.02] border border-black/5"
                    }`}>
                      {item.status === "pass" ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      )}
                      <Icon className="w-4 h-4 text-black/30 flex-shrink-0 mt-0.5" />
                      <span className={`text-sm flex-1 ${item.status === "pass" ? "text-black/60" : "text-black/80 font-medium"}`}>{item.text}</span>
                      {item.risk && (
                        <span className={`font-mono text-[9px] px-1.5 py-0.5 flex-shrink-0 ${
                          item.risk === "HIGH" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                        }`}>{item.risk}</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ),
      },
      // Remediation plan artifact
      {
        label: "Remediation plan",
        text: "I can fix all 3 gaps before your audit. Here's the remediation timeline.",
        artifact: (
          <div className="mt-4 border border-black/10 overflow-hidden">
            <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 font-mono text-[10px] text-amber-700 uppercase tracking-wider flex items-center justify-between">
              <span>Remediation Timeline</span>
              <span>Est. 4 hours total</span>
            </div>
            <div className="p-4 space-y-0">
              {[
                { task: "Separate AP and payment approval roles", time: "1 hour", assignee: "Source AI", status: "ready", desc: "Create new role, reassign 2 users, add audit note" },
                { task: "Add $10K+ journal entry approval workflow", time: "1.5 hours", assignee: "Source AI", status: "ready", desc: "Deploy approval workflow with email notification" },
                { task: "Configure automated bank reconciliation", time: "1.5 hours", assignee: "Source AI", status: "ready", desc: "Connect bank feed, set matching rules, schedule daily" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 py-3 border-b border-black/5 last:border-0">
                  <div className="w-6 h-6 bg-amber-100 text-amber-700 flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 rounded-sm">{i + 1}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-black/80">{item.task}</div>
                    <div className="text-xs text-black/40 mt-0.5">{item.desc}</div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="font-mono text-[10px] text-black/40 flex items-center gap-1"><Clock className="w-3 h-3" /> {item.time}</span>
                      <span className="font-mono text-[10px] text-black/40 flex items-center gap-1"><Zap className="w-3 h-3" /> {item.assignee}</span>
                      <span className="font-mono text-[10px] text-green-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {item.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ),
      },
    ],
  },
]

// ============================================
// Conversation Preview Component
// Animated cursor types into input, clicks send, then chat flow
// ============================================
function ConversationPreview({ scenario }: { scenario: ScenarioData }) {
  const [phase, setPhase] = useState<"typing" | "sent" | "reasoning" | "response">("typing")
  const [typedText, setTypedText] = useState("")
  const [reasoningStep, setReasoningStep] = useState(0)
  const [showBubble, setShowBubble] = useState<number[]>([])
  const [textComplete, setTextComplete] = useState<Set<number>>(new Set())
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)
  const submitBtnRef = useRef<HTMLButtonElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [hasStarted, setHasStarted] = useState(false)

  // Animated cursor state
  const [cursorPos, setCursorPos] = useState({ x: 50, y: -50 })
  const [isClicking, setIsClicking] = useState(false)

  const fullPrompt = scenario.prompt

  // Helper to get element position relative to container, accounting for CSS scale
  const getRelativePosition = (ref: React.RefObject<HTMLElement | null>, offsetX = 20, offsetY = 20, scale = 1) => {
    if (!ref.current || !containerRef.current) return { x: 50, y: 50 }
    const containerRect = containerRef.current.getBoundingClientRect()
    const elementRect = ref.current.getBoundingClientRect()
    return {
      x: (elementRect.left - containerRect.left + offsetX) / scale,
      y: (elementRect.top - containerRect.top + offsetY) / scale,
    }
  }

  // Reset when scenario changes
  useEffect(() => {
    setPhase("typing")
    setTypedText("")
    setReasoningStep(0)
    setShowBubble([])
    setTextComplete(new Set())
    setCursorPos({ x: 50, y: -50 })
    setIsClicking(false)
    setHasStarted(false)
  }, [scenario.id])

  // Start animation when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [hasStarted, scenario.id])

  // Main animation sequence: cursor moves to input → types → moves to button → clicks → send
  useEffect(() => {
    if (!hasStarted || phase !== "typing") return
    const timers: ReturnType<typeof setTimeout>[] = []

    const SCALE = 1.1 // matches CSS scale-110

    // 1. Move cursor to input field
    timers.push(setTimeout(() => {
      const pos = getRelativePosition(inputRef, 30, 30, SCALE)
      setCursorPos(pos)
    }, 400))

    // 2. Click into input
    timers.push(setTimeout(() => setIsClicking(true), 800))
    timers.push(setTimeout(() => setIsClicking(false), 950))

    // 3. Type the prompt character by character
    fullPrompt.split("").forEach((_, i) => {
      timers.push(setTimeout(() => {
        setTypedText(fullPrompt.slice(0, i + 1))
      }, 1200 + i * 45))
    })

    // 4. After typing done, move cursor to submit button
    const typingDone = 1200 + fullPrompt.length * 45
    timers.push(setTimeout(() => {
      if (submitBtnRef.current && containerRef.current) {
        const cr = containerRef.current.getBoundingClientRect()
        const er = submitBtnRef.current.getBoundingClientRect()
        setCursorPos({
          x: (er.left - cr.left + er.width / 2) / SCALE,
          y: (er.top - cr.top + er.height / 2) / SCALE,
        })
      }
    }, typingDone + 400))

    // 5. Click submit
    timers.push(setTimeout(() => setIsClicking(true), typingDone + 800))
    timers.push(setTimeout(() => {
      setIsClicking(false)
      setPhase("sent")
      setCursorPos({ x: 50, y: -50 }) // Hide cursor
    }, typingDone + 1000))

    return () => timers.forEach(t => clearTimeout(t))
  }, [hasStarted, phase, fullPrompt])

  // Phase 2: After sent, start reasoning
  useEffect(() => {
    if (phase !== "sent") return
    const timer = setTimeout(() => {
      setPhase("reasoning")
      setReasoningStep(1)
    }, 500)
    return () => clearTimeout(timer)
  }, [phase])

  // Phase 3: Progress through reasoning steps
  useEffect(() => {
    if (phase !== "reasoning") return
    const timers: ReturnType<typeof setTimeout>[] = []

    scenario.reasoningSteps.forEach((_, i) => {
      if (i > 0) {
        timers.push(setTimeout(() => setReasoningStep(i + 1), i * 1200))
      }
    })

    const reasoningDone = scenario.reasoningSteps.length * 1200
    timers.push(setTimeout(() => setReasoningStep(scenario.reasoningSteps.length + 1), reasoningDone))
    timers.push(setTimeout(() => setPhase("response"), reasoningDone + 800))

    return () => timers.forEach(t => clearTimeout(t))
  }, [phase, scenario])

  // Bubble progression
  const handleBubbleComplete = useCallback((index: number) => {
    setTimeout(() => {
      setShowBubble(prev => {
        if (prev.includes(index + 1)) return prev
        return [...prev, index + 1]
      })
    }, 400)
  }, [])

  const markTextComplete = useCallback((index: number) => {
    setTextComplete(prev => {
      const next = new Set(prev)
      next.add(index)
      return next
    })
  }, [])

  // Show first bubble on response
  useEffect(() => {
    if (phase === "response" && showBubble.length === 0) {
      setShowBubble([0])
    }
  }, [phase, showBubble.length])

  // Auto-scroll to bottom as content grows
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
    }
  }, [phase, reasoningStep, showBubble, textComplete])

  return (
    <div ref={sectionRef} className="w-full">
      {/* Fixed-height outer frame — prevents layout jump between phases */}
      <div className="bg-neutral-50/50 border border-black/10 overflow-hidden h-[700px] relative flex items-center justify-center">
        {/* Scalable inner container — zooms in during typing for focus */}
        <div
          ref={containerRef}
          className={`w-full h-full relative transition-all duration-700 ease-out flex items-center justify-center ${
            phase === "typing" ? "scale-110" : "scale-100"
          }`}
        >
          {/* ── Animated cursor ── */}
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
              className={`transition-transform duration-100 ${isClicking ? "scale-90" : "scale-100"}`}
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

          {/* ── Typing phase: input view ── */}
          {phase === "typing" && (
            <div className="p-8 md:p-12 flex flex-col items-center justify-center w-full max-w-2xl mx-auto animate-in fade-in duration-500">
              <h3 className="text-3xl font-medium text-black text-center tracking-tight mb-8">
                What do you need help with?
              </h3>

              <div className="w-full flex flex-col gap-3">
                {/* Input Box */}
                <div className="w-full relative">
                  <div
                    ref={inputRef}
                    className={`w-full min-h-[160px] px-5 py-4 text-base text-black bg-[#fafafa] border transition-colors ${
                      typedText.length > 0 ? "border-black" : "border-black/15"
                    }`}
                  >
                    <div className="flex items-start min-h-[20px]">
                      <span className="text-base text-black leading-relaxed">{typedText}</span>
                      <span className="animate-pulse ml-0.5 text-black">|</span>
                    </div>
                  </div>

                  {/* Meta row */}
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-black/[0.04] border border-black/10 font-mono text-[10px] text-black/40 rounded-sm">{scenario.department}</span>
                      <span className="px-2 py-0.5 bg-black/[0.04] border border-black/10 font-mono text-[10px] text-black/40 rounded-sm">{scenario.role}</span>
                    </div>
                    <p className="text-black/40 font-mono text-[10px]">{typedText.length}/{fullPrompt.length}</p>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  ref={submitBtnRef}
                  className={`px-16 py-4 text-base font-medium transition-all border w-fit ${
                    typedText.length === fullPrompt.length
                      ? "border-black text-black hover:bg-black hover:text-white"
                      : "border-black/15 text-black/30"
                  }`}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* ── Chat view: sent + reasoning + response ── */}
          {phase !== "typing" && (
            <div
              ref={scrollRef}
              className="overflow-y-auto w-full h-full p-6 space-y-4"
            >
              {/* User message bubble */}
              <div className="flex justify-end animate-in fade-in slide-in-from-bottom-3 duration-500">
                <div className="bg-black text-white px-6 py-4 max-w-[80%] text-base leading-relaxed rounded-lg shadow-sm">
                  {fullPrompt}
                </div>
              </div>

              {/* Reasoning steps */}
              <div className={`transition-all duration-700 ${phase === "response" ? "opacity-0 max-h-0 overflow-hidden" : "opacity-100 max-h-[520px]"}`}>
                {phase === "reasoning" && reasoningStep > 0 && (
                  <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
                    <div className="bg-white border border-black/10 p-6 max-w-2xl">
                      <div className="space-y-4">
                        {scenario.reasoningSteps.map((step, idx) => {
                          const stepNum = idx + 1
                          if (reasoningStep < stepNum) return null
                          const isDone = reasoningStep > stepNum
                          const isActive = reasoningStep === stepNum
                          return (
                            <div
                              key={stepNum}
                              className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300"
                            >
                              <div className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                                isDone ? "bg-black" : isActive ? "bg-transparent border-2 border-black/20" : "bg-black/5"
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

              {/* Response bubbles */}
              {phase === "response" && (
                <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
                  <div className="space-y-5 min-w-0 max-w-prose">
                    {scenario.responseBubbles.map((bubble, idx) => {
                      if (!showBubble.includes(idx)) return null

                      const hasText = !!bubble.text
                      const hasArtifact = !!bubble.artifact
                      const isTextDone = textComplete.has(idx)

                      return (
                        <div key={idx} className="bg-white/90 border border-black/5 rounded-lg px-5 py-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                          {/* Label + pill */}
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="font-mono text-[10px] text-black/45 uppercase tracking-wider">{bubble.label}</span>
                            {bubble.pill && (
                              <span className={`px-2 py-0.5 rounded font-mono text-[10px] border ${
                                bubble.pill.variant === "error" ? "bg-red-50 border-red-200 text-red-600" :
                                bubble.pill.variant === "warning" ? "bg-amber-50 border-amber-200 text-amber-600" :
                                bubble.pill.variant === "success" ? "bg-green-50 border-green-200 text-green-600" :
                                "bg-black/5 border-black/10 text-black/60"
                              }`}>
                                {bubble.pill.text}
                              </span>
                            )}
                          </div>

                          {/* Typewriter text */}
                          {hasText && (
                            <p className="text-base text-black/90 leading-relaxed">
                              <TypewriterText
                                text={bubble.text!}
                                speed={18}
                                onComplete={() => {
                                  markTextComplete(idx)
                                  if (!hasArtifact) handleBubbleComplete(idx)
                                }}
                              />
                            </p>
                          )}

                          {/* Artifact */}
                          {hasArtifact && (!hasText || isTextDone) && (
                            <ArtifactReveal onRevealed={() => handleBubbleComplete(idx)}>
                              {bubble.artifact}
                            </ArtifactReveal>
                          )}

                          {!hasText && !hasArtifact && (
                            <AutoAdvance onMount={() => handleBubbleComplete(idx)} />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Artifact fade-in with delay, then signals parent to advance
function ArtifactReveal({ onRevealed, children }: { onRevealed: () => void; children: React.ReactNode }) {
  const hasCalledRef = useRef(false)
  useEffect(() => {
    if (!hasCalledRef.current) {
      hasCalledRef.current = true
      const timer = setTimeout(() => onRevealed(), 1800)
      return () => clearTimeout(timer)
    }
  }, [onRevealed])
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 mt-3">
      {children}
    </div>
  )
}

// Immediately advances to next bubble
function AutoAdvance({ onMount }: { onMount: () => void }) {
  const calledRef = useRef(false)
  useEffect(() => {
    if (!calledRef.current) {
      calledRef.current = true
      onMount()
    }
  }, [onMount])
  return null
}

// ============================================
// Page Component
// ============================================
export default function ScenariosPage() {
  const [activeScenario, setActiveScenario] = useState(scenarios[0].id)
  const scenario = scenarios.find(s => s.id === activeScenario)!

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-black/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/companion" className="flex items-center gap-2 text-black/50 hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-mono text-xs">COMPANION</span>
          </a>
          <a href="/" className="font-mono text-lg font-bold tracking-tight">Source.</a>
          <div className="w-20" />
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white border-b border-black/10 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="font-mono text-[10px] text-black/40 tracking-widest mb-4">USE CASES</div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            See what Source can do
          </h1>
          <p className="text-lg text-black/60 font-mono max-w-2xl mx-auto">
            Real conversations, real artifacts, real results.
            Pick a scenario and watch the AI work.
          </p>
        </div>
      </section>

      {/* Scenario Selector */}
      <section className="bg-white border-b border-black/10 py-6 px-6 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {scenarios.map((s) => {
              const Icon = s.icon
              const isActive = activeScenario === s.id
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveScenario(s.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 font-mono text-[11px] tracking-wider transition-all border ${
                    isActive
                      ? "bg-black text-white border-black"
                      : "bg-white text-black/50 border-black/10 hover:border-black/30 hover:text-black"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {s.label.toUpperCase()}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Conversation */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <ConversationPreview key={scenario.id} scenario={scenario} />
        </div>
      </section>

      {/* More Use Cases CTA */}
      <section className="bg-black text-white py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Ready to try it yourself?
          </h2>
          <p className="text-white/60 font-mono mb-8">
            Connect your ERP and start asking questions in minutes.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="/companion"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-mono text-sm tracking-wider hover:bg-white/90 transition-colors"
            >
              LEARN MORE
            </a>
            <a
              href="/demo"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-mono text-sm tracking-wider hover:bg-white/10 transition-colors"
            >
              GET STARTED FREE
              <span>&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-black/10 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="font-mono text-sm font-bold">Source.</a>
          <div className="font-mono text-xs text-black/40">
            &copy; 2024 Source. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
