"use client";

import { useState, useEffect, useCallback, useRef, MouseEvent as ReactMouseEvent } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Lead {
  id: number;
  firm_name: string;
  notes: string;
  contacted: string;
  corridor: string;
  hq_location: string;
  hq_country: string;
  market_region: string;
  size: string;
  partner_status: string;
  target_market: string;
  key_differentiator: string;
  website: string;
  evidence: string;
  source_status: string;
  partnership_fit: string;
  highlighted: number;
  employee_count: number | null;
  annual_revenue: string;
  decision_maker: string;
  created_at: string;
  updated_at: string;
}

const DEFAULT_COLUMNS = [
  { key: "id", label: "#", width: 44, editable: false },
  { key: "firm_name", label: "Firm Name", width: 180, editable: true },
  { key: "website", label: "Website", width: 150, editable: true },
  { key: "notes", label: "Notes / Contacts", width: 320, editable: true },
  { key: "contacted", label: "Status", width: 130, editable: true },
  { key: "corridor", label: "Migration Corridor", width: 160, editable: true },
  { key: "hq_location", label: "HQ Location", width: 140, editable: true },
  { key: "employee_count", label: "Employees", width: 100, editable: true },
  { key: "annual_revenue", label: "Revenue", width: 120, editable: true },
  { key: "partner_status", label: "Partner Status", width: 160, editable: true, type: "select", options: ["Alliance Partner", "Solution Provider", "Alliance + Solution Provider", "Microsoft Partner", "Other ERP Partner", "Independent", ""] },
  { key: "target_market", label: "Target Market", width: 150, editable: true },
  { key: "key_differentiator", label: "Key Differentiator", width: 190, editable: true },
  { key: "decision_maker", label: "Decision Makers", width: 240, editable: true },
  { key: "evidence", label: "Evidence", width: 190, editable: true },
] as const;

type ColumnKey = (typeof DEFAULT_COLUMNS)[number]["key"];

const COUNTRY_OPTIONS = [
  "",
  "United States",
  "Australia",
  "New Zealand",
  "Canada",
  "United Kingdom",
  "Ireland",
  "Netherlands",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Sweden",
  "Finland",
  "Norway",
  "Switzerland",
  "Singapore",
  "India",
  "Malaysia",
  "Thailand",
  "Mexico",
  "United Arab Emirates",
  "Saudi Arabia",
  "Israel",
  "South Africa",
] as const;

const STATUS_CONFIG: Record<string, { color: string; bg: string; border: string }> = {
  CONFIRMED:        { color: "#10B981", bg: "rgba(16,185,129,0.10)", border: "rgba(16,185,129,0.25)" },
  yes:              { color: "#10B981", bg: "rgba(16,185,129,0.10)", border: "rgba(16,185,129,0.25)" },
  "BOOKING MEETING":{ color: "#3b82f6", bg: "rgba(59,130,246,0.10)", border: "rgba(59,130,246,0.25)" },
  replied:          { color: "#a855f7", bg: "rgba(168,85,247,0.10)", border: "rgba(168,85,247,0.25)" },
  pending:          { color: "#F59E0B", bg: "rgba(245,158,11,0.10)",  border: "rgba(245,158,11,0.25)" },
  no:               { color: "rgba(0,0,0,0.35)", bg: "rgba(0,0,0,0.04)", border: "rgba(0,0,0,0.10)" },
  "":               { color: "rgba(0,0,0,0.20)", bg: "transparent", border: "rgba(0,0,0,0.06)" },
};

function StatusBadge({ value }: { value: string }) {
  const cfg = STATUS_CONFIG[value] || STATUS_CONFIG["no"];
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: 100,
        fontSize: 9,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.10em",
        color: cfg.color,
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        whiteSpace: "nowrap",
      }}
    >
      {value}
    </span>
  );
}

function buildPdfHtml(): string {
  const date = new Date().toISOString().slice(0, 10);
  const rows = [
    {r:1,d:"Anchor Group",g:"56.3",a:"93.3",c:"82.9",t:"CRITICAL"},
    {r:2,d:"Reddit",g:"100.0",a:"44.0",c:"81.3",t:"Platform"},
    {r:3,d:"ZoneAndCo",g:"58.7",a:"23.0",c:"59.8",t:"HIGH"},
    {r:4,d:"OrdwayLabs",g:"34.7",a:"30.4",c:"57.4",t:"HIGH"},
    {r:5,d:"Fourlane",g:"48.4",a:"32.1",c:"49.9",t:"HIGH"},
    {r:6,d:"NetSuite (Oracle)",g:"95.4",a:"43.3",c:"48.6",t:"Vendor"},
    {r:7,d:"GetGSI",g:"56.3",a:"30.0",c:"48.4",t:"HIGH"},
    {r:8,d:"YouTube",g:"61.7",a:"0",c:"36.8",t:"Platform"},
    {r:9,d:"Embark",g:"51.9",a:"0",c:"34.3",t:"MEDIUM"},
    {r:10,d:"Paystand",g:"14.1",a:"25.7",c:"31.3",t:"MEDIUM"},
    {r:11,d:"MMC Convert",g:"14.4",a:"26.2",c:"29.4",t:"LOW"},
    {r:12,d:"WithOrb",g:"0",a:"25.7",c:"25.7",t:"LOW"},
    {r:13,d:"ScaleNorth",g:"21.9",a:"0",c:"21.9",t:"LOW"},
    {r:14,d:"Celigo",g:"11.8",a:"20.4",c:"20.4",t:"LOW"},
    {r:15,d:"BrokenRubik",g:"19.3",a:"0",c:"19.3",t:"LOW"},
  ];
  const aeoFirms = [
    {f:"Protelo",m:25},{f:"Trajectory Inc",m:21},{f:"Anchor Group",m:20},{f:"Techfino",m:19},
    {f:"Sikich",m:16},{f:"Myers-Holum",m:16},{f:"BDO",m:12},{f:"RSM",m:11},{f:"Deloitte",m:10},{f:"EY",m:9}
  ];
  const serpRows = [
    {r:1,d:"reddit.com",i:21,c:13,t:18,l:20,w:"91.5"},{r:2,d:"netsuite.com",i:6,c:24,t:20,l:7,w:"87.3"},
    {r:3,d:"youtube.com",i:11,c:9,t:13,l:8,w:"56.5"},{r:4,d:"anchorgroup.tech",i:13,c:11,t:10,l:9,w:"56.3"},
    {r:5,d:"zoneandco.com",i:19,c:7,t:5,l:19,w:"53.8"},{r:6,d:"getgsi.com",i:11,c:10,t:9,l:10,w:"51.5"},
    {r:7,d:"embarkwithus.com",i:16,c:6,t:6,l:14,w:"47.5"},{r:8,d:"fourlane.com",i:11,c:8,t:8,l:7,w:"44.3"},
    {r:9,d:"ordwaylabs.com",i:19,c:0,t:0,l:17,w:"31.8"},{r:10,d:"g2.com",i:0,c:5,t:7,l:0,w:"21.5"},
  ];
  const css = `<style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;color:#000;font-size:11px;line-height:1.5;-webkit-print-color-adjust:exact;print-color-adjust:exact}@page{size:A4;margin:48px 40px}.cover{page-break-after:always;display:flex;flex-direction:column;justify-content:center;min-height:90vh;padding:80px 60px}.cover h1{font-size:44px;font-weight:600;letter-spacing:-0.03em;line-height:1.1;margin-bottom:16px}.cover .sub{font-size:16px;color:rgba(0,0,0,0.45);margin-bottom:40px}.cover .meta{font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:rgba(0,0,0,0.30)}.cover .meta span{display:block;margin-bottom:6px}.section{page-break-inside:avoid;margin-bottom:28px}.section-label{font-size:9px;font-weight:500;text-transform:uppercase;letter-spacing:0.15em;color:rgba(0,0,0,0.30);margin-bottom:4px}.section-title{font-size:16px;font-weight:600;letter-spacing:-0.01em;margin-bottom:12px}table{width:100%;border-collapse:collapse;font-size:10px;margin-bottom:16px}th{text-align:left;padding:8px 10px;font-size:8px;font-weight:500;text-transform:uppercase;letter-spacing:0.12em;color:rgba(0,0,0,0.35);border-bottom:1px solid rgba(0,0,0,0.10)}td{padding:6px 10px;border-bottom:1px solid rgba(0,0,0,0.05)}.stat-row{display:flex;gap:24px;margin-bottom:20px;flex-wrap:wrap}.stat-box{padding:12px 16px;border:1px solid rgba(0,0,0,0.08);flex:1;min-width:100px}.stat-box .val{font-size:22px;font-weight:700;letter-spacing:-0.03em;color:#DC2626}.stat-box .lbl{font-size:8px;font-weight:500;text-transform:uppercase;letter-spacing:0.12em;color:rgba(0,0,0,0.35);margin-top:4px}.two-col{display:grid;grid-template-columns:1fr 1fr;gap:24px}h3{font-size:12px;font-weight:600;margin-bottom:8px}.bar{height:4px;background:#000;display:inline-block;vertical-align:middle;margin-right:6px}.footer{text-align:center;font-size:8px;color:rgba(0,0,0,0.25);margin-top:40px;padding-top:12px;border-top:1px solid rgba(0,0,0,0.06)}.page-break{page-break-before:always}.callout{padding:12px 16px;background:rgba(220,38,38,0.04);border:1px solid rgba(220,38,38,0.12);margin-top:12px}.callout strong{color:#DC2626;font-size:10px;display:block;margin-bottom:2px}</style>`;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>QB to NetSuite Market Intelligence - Source</title>${css}</head><body>
<div class="cover"><div class="meta"><span>Source Market Intelligence</span><span>Generated ${date}</span></div><h1>QuickBooks to NetSuite<br>Corridor Intelligence</h1><div class="sub">Competitive landscape, search rankings, AI visibility, pricing intelligence, and strategic opportunities</div><div class="meta"><span>125+ Google searches - 25 AEO prompt tests - 401 citation domains - 20+ page scrapes</span><span>Methodology: Firecrawl + AirOps + Codex + Claude analysis</span></div></div>
<div class="section"><div class="section-label">Executive Summary</div><div class="section-title">Key Findings</div><div class="stat-row"><div class="stat-box"><div class="val">0%</div><div class="lbl">Source Visibility</div></div><div class="stat-box"><div class="val">82.9</div><div class="lbl">Top Competitor</div></div><div class="stat-box"><div class="val">401</div><div class="lbl">Citation Domains</div></div><div class="stat-box"><div class="val">150+</div><div class="lbl">Queries</div></div></div><p style="font-size:11px;color:rgba(0,0,0,0.55);line-height:1.7;max-width:700px">The QB to NetSuite corridor is dominated by Anchor Group (82.9/100). Source has zero visibility across both channels. No competitor mentions AI in migration - wide open differentiator.</p></div>
<div class="section page-break"><div class="section-label">Section 1</div><div class="section-title">Combined Power Rankings</div><table><tr><th>#</th><th>Domain</th><th>Google</th><th>AEO</th><th>Combined</th><th>Threat</th></tr>${rows.map(r => `<tr><td>${r.r}</td><td style="font-weight:600">${r.d}</td><td>${r.g}</td><td>${r.a}</td><td style="font-weight:700">${r.c}</td><td>${r.t}</td></tr>`).join("")}</table></div>
<div class="section page-break"><div class="section-label">Section 2</div><div class="section-title">AEO Rankings</div><div class="two-col"><div><h3>AI Model Recommendations</h3><table><tr><th>#</th><th>Firm</th><th>Mentions</th></tr>${aeoFirms.map((r,i) => `<tr><td>${i+1}</td><td>${r.f}</td><td><span class="bar" style="width:${Math.round(r.m/25*60)}px"></span>${r.m}/25</td></tr>`).join("")}<tr style="border-top:2px solid rgba(0,0,0,0.10)"><td>-</td><td style="color:#DC2626;font-weight:600">Source</td><td style="color:#DC2626;font-weight:700">0/25</td></tr></table></div><div><h3>AirOps Citation Domains</h3><table><tr><th>#</th><th>Domain</th><th>Citations</th><th>Share</th></tr><tr><td>1</td><td>Anchor Group</td><td>191</td><td>6.22%</td></tr><tr><td>2</td><td>Reddit</td><td>126</td><td>4.10%</td></tr><tr><td>3</td><td>NetSuite</td><td>124</td><td>4.04%</td></tr><tr><td>4</td><td>Fourlane</td><td>92</td><td>2.99%</td></tr><tr><td>5</td><td>GetGSI</td><td>86</td><td>2.80%</td></tr><tr><td>6</td><td>ScaleNorth</td><td>76</td><td>2.47%</td></tr><tr><td>7</td><td>BrokenRubik</td><td>67</td><td>2.18%</td></tr><tr><td>8</td><td>HouseBlend</td><td>67</td><td>2.18%</td></tr><tr><td>9</td><td>GurusSolutions</td><td>66</td><td>2.15%</td></tr><tr><td>10</td><td>ZoneAndCo</td><td>66</td><td>2.15%</td></tr></table></div></div></div>
<div class="section page-break"><div class="section-label">Section 3</div><div class="section-title">Google SERP Dominance</div><table><tr><th>#</th><th>Domain</th><th>Info</th><th>Comm</th><th>Trans</th><th>Long-tail</th><th>Weighted</th></tr>${serpRows.map(r => `<tr><td>${r.r}</td><td style="font-weight:600">${r.d}</td><td>${r.i}</td><td>${r.c}</td><td>${r.t}</td><td>${r.l}</td><td style="font-weight:700">${r.w}</td></tr>`).join("")}</table></div>
<div class="section page-break"><div class="section-label">Section 4</div><div class="section-title">Pricing and Timeline Intelligence</div><div class="two-col"><div><h3>Implementation Costs</h3><table><tr><th>Tier</th><th>Range</th></tr><tr><td>Small</td><td style="font-weight:600">$25K-$50K</td></tr><tr><td>Mid-size</td><td style="font-weight:600">$50K-$150K</td></tr><tr><td>Large</td><td style="font-weight:600">$150K-$250K+</td></tr><tr><td>Consulting (onshore)</td><td style="font-weight:600">$150-$350/hr</td></tr></table><div class="callout"><strong>Key Stat</strong><span style="font-size:9px;color:rgba(0,0,0,0.55)">Quoted cost is only 60-75% of true Year-1 cost</span></div></div><div><h3>Timelines</h3><table><tr><th>Scenario</th><th>Traditional</th><th>AI-Accelerated</th></tr><tr><td>SuiteSuccess</td><td>90-120 days</td><td>70-100 days</td></tr><tr><td>Standard</td><td>4-6 months</td><td>3-4.5 months</td></tr><tr><td>Complex</td><td>6-12+ months</td><td>4.5-9 months</td></tr></table><h3 style="margin-top:16px">ROI (SMB)</h3><table><tr><th></th><th>Traditional</th><th>Source AI</th></tr><tr><td>Investment</td><td>$155K</td><td style="font-weight:600">$118K</td></tr><tr><td>Payback</td><td>16.9 mo</td><td style="font-weight:600">12.9 mo</td></tr><tr><td>3yr ROI</td><td>113%</td><td style="font-weight:600">~180%</td></tr></table></div></div></div>
<div class="section page-break"><div class="section-label">Section 5</div><div class="section-title">Strategic Opportunities</div><table><tr><th>Priority</th><th>Action</th><th>Rationale</th></tr><tr><td>P0</td><td style="font-weight:600">Publish AI migration playbook</td><td>Zero competitors mention AI</td></tr><tr><td>P0</td><td style="font-weight:600">Create pricing transparency page</td><td>Only OrdwayLabs provides numbers</td></tr><tr><td>P0</td><td style="font-weight:600">Replace 404d competitor pages</td><td>Fourlane, GSI, Celigo all returned 404</td></tr><tr><td>P1</td><td style="font-weight:600">Build vertical playbooks</td><td>No one owns SaaS, PE, manufacturing</td></tr><tr><td>P1</td><td style="font-weight:600">Reverse-engineer ScaleNorth/BrokenRubik</td><td>They cracked AI citation with zero Google</td></tr><tr><td>P2</td><td style="font-weight:600">Seed Reddit presence</td><td>Reddit #1-2 across all intent types</td></tr></table></div>
<div class="footer">Source Market Intelligence - Confidential - Generated ${date} - source.shop</div></body></html>`;
}

function StatBox({ label, value, color }: { label: string; value: number; color?: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 2,
        padding: "0 20px",
        borderLeft: "1px solid rgba(255,255,255,0.10)",
      }}
    >
      <span
        style={{
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "-0.03em",
          color: color || "#fff",
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontSize: 10,
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "rgba(255,255,255,0.35)",
          lineHeight: 1,
        }}
      >
        {label}
      </span>
    </div>
  );
}

export function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortCol, setSortCol] = useState<string>("employee_count");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [filterHqCountry, setFilterHqCountry] = useState("United States");
  const [filterContacted, setFilterContacted] = useState("");
  const [filterHighlighted, setFilterHighlighted] = useState("nobig");
  const [editCell, setEditCell] = useState<{ id: number; key: ColumnKey } | null>(null);
  const [editValue, setEditValue] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [expandedNotes, setExpandedNotes] = useState<Set<number>>(new Set());
  const [view, setView] = useState<"leads" | "report" | "ranking">("leads");
  const [rankingCategory, setRankingCategory] = useState<string>("qb-netsuite");
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [mdContent, setMdContent] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [expandedRanking, setExpandedRanking] = useState<Set<number>>(new Set());
  const [colOrder, setColOrder] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("leads_col_order");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length === DEFAULT_COLUMNS.length) return parsed;
        }
      } catch {}
    }
    return DEFAULT_COLUMNS.map((_, i) => i);
  });
  const dragColRef = useRef<{ from: number; to: number } | null>(null);
  const [dragOverCol, setDragOverCol] = useState<number | null>(null);

  const orderedColumns = colOrder.map((i) => ({ ...DEFAULT_COLUMNS[i], origIdx: i }));

  const [colWidths, setColWidths] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("leads_col_widths");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length === DEFAULT_COLUMNS.length) return parsed;
        }
      } catch {}
    }
    return DEFAULT_COLUMNS.map((c) => c.width);
  });
  const searchTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const resizeRef = useRef<{ colIdx: number; startX: number; startW: number } | null>(null);

  // Column resize handler
  function onResizeStart(e: ReactMouseEvent, colIdx: number) {
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startW = colWidths[colIdx];
    resizeRef.current = { colIdx, startX, startW };

    const onMouseMove = (ev: globalThis.MouseEvent) => {
      if (!resizeRef.current) return;
      const delta = ev.clientX - resizeRef.current.startX;
      const newW = Math.max(40, resizeRef.current.startW + delta);
      setColWidths((prev) => {
        const next = [...prev];
        next[resizeRef.current!.colIdx] = newW;
        return next;
      });
    };

    const onMouseUp = () => {
      resizeRef.current = null;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      // Persist widths
      setColWidths((cur) => {
        try { localStorage.setItem("leads_col_widths", JSON.stringify(cur)); } catch {}
        return cur;
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }

  const REPORTS: Array<{ id: string; title: string; date: string; summary: string; desc: string; url: string; pages?: number; format: "pdf" | "md"; tier?: string }> = [
    {
      id: "competitive-intelligence",
      title: "QB-to-NetSuite Competitive Intelligence",
      date: "March 8, 2026",
      summary: "Comprehensive competitive landscape analysis of the QuickBooks-to-NetSuite migration market. Covers 75+ competitor websites, pricing intelligence, SEO and content strategy breakdowns, CPA firm referral networks, and AI Engine Optimization (AEO) visibility rankings across all major players.",
      desc: "200+ search queries, 10 autonomous research agents, 75+ competitor websites.",
      url: "/reports/competitive-intelligence.pdf",
      pages: 165,
      format: "pdf",
      tier: "Tier 1",
    },
    {
      id: "ai-operations-midmarket",
      title: "AI Operations in the Midmarket",
      date: "November 2025",
      summary: "Strategic analysis of AI adoption patterns among mid-market companies undergoing ERP migrations. Explores how consulting firms can position AI-enhanced services, automation readiness benchmarks, and the shifting economics of implementation delivery.",
      desc: "AI adoption patterns, automation readiness, and consulting positioning.",
      url: "/reports/ai-operations-midmarket.pdf",
      pages: 28,
      format: "pdf",
    },
    // ── Tier 1 Corridor Reports ──
    { id: "market-ranking-qb-netsuite", title: "QB → NetSuite: Market Intelligence Report", date: "March 11, 2026", summary: "Comprehensive competitive intelligence for the QuickBooks to NetSuite migration corridor. Covers Google SERP dominance, AEO authority, combined power rankings, content analysis, pricing intelligence, and strategic opportunities.", desc: "125+ Google searches, 25 AEO prompts, 401 citation domains.", url: "/reports/market-ranking-qb-netsuite.md", format: "md", tier: "Tier 1" },
    { id: "market-ranking-qb-d365bc", title: "QB → D365 Business Central: SERP Intelligence", date: "March 16, 2026", summary: "Full corridor intelligence: 105 SERP searches, 40+ page scrapes, 7 autonomous agents. Domain frequency analysis, competitor profiles, pricing intelligence, content gaps, and Combined Power Rankings.", desc: "105 queries, 40+ scrapes, 7 agents.", url: "/reports/market-ranking-qb-d365bc.md", format: "md", tier: "Tier 1" },
    { id: "corridor-gp-d365-bc", title: "Dynamics GP → D365 Business Central: Corridor Intelligence", date: "March 16, 2026", summary: "Comprehensive SERP analysis, domain rankings, competitor content analysis, pricing intelligence, and Microsoft EOL timeline for the GP to Business Central migration corridor.", desc: "55 queries, 15+ scrapes, GP EOL 2028.", url: "/reports/corridor-gp-d365-bc.md", format: "md", tier: "Tier 1" },
    { id: "sage-netsuite-market-intelligence-2026-03", title: "Sage → NetSuite: Market Intelligence Report", date: "March 16, 2026", summary: "SERP analysis across 55 queries, 15 competitor page scrapes, and 5 autonomous research agents for the Sage 50/100 to NetSuite migration corridor. Most attackable corridor identified.", desc: "55 queries, most attackable corridor.", url: "/reports/sage-netsuite-market-intelligence-2026-03.md", format: "md", tier: "Tier 1" },
    { id: "corridor-xero-netsuite", title: "Xero → NetSuite: Corridor Intelligence Report", date: "March 16, 2026", summary: "Full competitive intelligence for the Xero→NetSuite ERP migration corridor. 55 SERP queries, 550 results, 10 competitor page scrapes. Strong AU/NZ market focus.", desc: "110 queries, AU/NZ focused.", url: "/reports/corridor-xero-netsuite.md", format: "md", tier: "Tier 1" },
    { id: "market-ranking-qb-intacct", title: "QB → Sage Intacct: Market Ranking", date: "March 16, 2026", summary: "Full SERP + AEO competitive intelligence for the QuickBooks to Sage Intacct migration corridor. Domain power rankings with weighted scoring.", desc: "55 queries, 8.5/10 opportunity.", url: "/reports/market-ranking-qb-intacct.md", format: "md", tier: "Tier 1" },
    // ── Tier 2 Corridor Reports ──
    { id: "market-ranking-nav-d365bc", title: "NAV → D365 Business Central: Market Intelligence", date: "March 16, 2026", summary: "Comprehensive SERP + competitive intelligence for the Dynamics NAV to D365 BC migration corridor. Most crowded D365 corridor with BTC3 30% license promo.", desc: "55 queries, 12 scrapes, NAV EOL timeline.", url: "/reports/market-ranking-nav-d365bc.md", format: "md", tier: "Tier 2" },
    { id: "market-ranking-sapb1-netsuite", title: "SAP Business One → NetSuite: Corridor Intelligence", date: "March 16, 2026", summary: "Tier 2 corridor research: 55 SERP queries, 5 competitor page scrapes, domain frequency analysis, pricing intelligence for the SAP B1 to NetSuite corridor.", desc: "55 queries, eOne Solutions dominant.", url: "/reports/market-ranking-sapb1-netsuite.md", format: "md", tier: "Tier 2" },
    { id: "market-ranking-qb-acumatica", title: "QB → Acumatica: Market Ranking", date: "March 16, 2026", summary: "QuickBooks to Acumatica migration market intelligence. Vendor-dominated corridor with unique consumption-based pricing model. 100% channel model with 20+ active VARs.", desc: "55 queries, vendor-dominated corridor.", url: "/reports/market-ranking-qb-acumatica.md", format: "md", tier: "Tier 2" },
    { id: "market-ranking-gp-netsuite", title: "GP → NetSuite: Corridor Intelligence", date: "March 16, 2026", summary: "Dynamics GP to NetSuite migration corridor. eOne Solutions is #1 as migration tooling vendor. 40K+ forced migrations by 2028-2029.", desc: "56 queries, 8.5/10 opportunity.", url: "/reports/market-ranking-gp-netsuite.md", format: "md", tier: "Tier 2" },
    { id: "market-ranking-intacct-netsuite", title: "Sage Intacct → NetSuite: SERP Intelligence", date: "March 16, 2026", summary: "Full SERP research across 55 queries with 18 competitor scrapes. Unique bidirectional flow corridor — some firms migrate NetSuite→Intacct.", desc: "55 queries, 8.0/10 opportunity.", url: "/reports/market-ranking-intacct-netsuite.md", format: "md", tier: "Tier 2" },
    { id: "market-ranking-sage200-netsuite", title: "Sage 200/300 → NetSuite: Market Intelligence", date: "March 16, 2026", summary: "UK/EU-heavy mid-market corridor. Sage 200 Manufacturing EOL Dec 2025 creates forced migration demand. UK boutique consultancies dominate.", desc: "55 queries, UK-focused, Sage 200 Mfg EOL.", url: "/reports/market-ranking-sage200-netsuite.md", format: "md", tier: "Tier 2" },
    // ── Phase 4 Horizontal Clusters ──
    { id: "market-ranking-best-erp-industry", title: "Best ERP for Industry Verticals: Horizontal SERP Intelligence", date: "March 16, 2026", summary: "Cross-industry ERP SERP analysis across 50 queries covering Manufacturing, Distribution, Professional Services, Construction, Nonprofit, Healthcare. Highest-leverage content territory.", desc: "50 queries, 13 verticals, 9.0/10 opportunity.", url: "/reports/market-ranking-best-erp-industry.md", format: "md", tier: "Phase 4" },
    { id: "market-ranking-erp-guide-rescue", title: "ERP Migration Guide + Rescue: SERP Intelligence", date: "March 16, 2026", summary: "ERP migration guides/checklists and failed ERP rescue niche. NO competitor offers fixed-price rescue — all charge $150-350/hr T&M.", desc: "50 queries, 9.5/10 opportunity.", url: "/reports/market-ranking-erp-guide-rescue.md", format: "md", tier: "Phase 4" },
    { id: "market-ranking-erp-comparison", title: "ERP Comparison: NetSuite vs D365 vs Intacct vs Acumatica", date: "March 16, 2026", summary: "Head-to-head comparison queries across all 4 major mid-market ERP systems. No neutral comparison authority exists — every page is vendor-biased.", desc: "50 queries, 9.0/10 opportunity.", url: "/reports/market-ranking-erp-comparison.md", format: "md", tier: "Phase 4" },
    { id: "market-ranking-erp-cost-ai", title: "ERP Implementation Cost + AI Migration: SERP Research", date: "March 16, 2026", summary: "ERP implementation costs and AI-assisted migration queries. DualEntry ($90M Series A) identified as closest competitor. AI migration cluster has ZERO competition.", desc: "50 queries, 9.0/10 — most strategic cluster.", url: "/reports/market-ranking-erp-cost-ai.md", format: "md", tier: "Phase 4" },
    // ── Phase 5 Tier 3 Corridors ──
    { id: "market-ranking-legacy-erp-netsuite", title: "Legacy ERP + Epicor + Infor → NetSuite", date: "March 16, 2026", summary: "Three Tier 3 corridors: Legacy ERP, Epicor, and Infor to NetSuite. Epicor on-prem sunset 2028-2029 affects 21K+ customers.", desc: "40 queries, Epicor sunset catalyst.", url: "/reports/market-ranking-legacy-erp-netsuite.md", format: "md", tier: "Phase 5" },
    { id: "market-ranking-misc-tier3-corridors", title: "Dynamics SL + MYOB + FreshBooks → NetSuite/D365", date: "March 16, 2026", summary: "Three Tier 3 corridors combined. Dynamics SL (Acumatica owns), MYOB (AU/NZ, Exo EOL), FreshBooks (highest opportunity — zero competition).", desc: "40 queries, 3 niche corridors.", url: "/reports/market-ranking-misc-tier3-corridors.md", format: "md", tier: "Phase 5" },
    // ── Cross-Corridor Synthesis ──
    { id: "cross-corridor-intelligence-synthesis-first-3-corridors", title: "Cross-Corridor Intelligence Synthesis", date: "March 16, 2026", summary: "Cross-corridor competitive intelligence synthesis across QB→D365 BC, GP→D365 BC, and Sage→NetSuite. Competitor overlap, universal content gaps, pricing comparison, and strategic recommendations.", desc: "Strategic playbook across first 3 corridors.", url: "/reports/cross-corridor-intelligence-synthesis-first-3-corridors.md", format: "md", tier: "Synthesis" },
  ];

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (sortCol) params.set("sort", sortCol);
    if (sortDir) params.set("dir", sortDir);
    if (filterHqCountry) params.set("hq_country", filterHqCountry);
    if (filterContacted) params.set("contacted", filterContacted);
    if (filterHighlighted) params.set("highlighted", filterHighlighted);
    params.set("limit", "500");

    const res = await fetch(`/api/leads?${params}`);
    const data = await res.json();
    setLeads(data.leads || []);
    setTotal(data.total || 0);
    setLoading(false);
  }, [search, sortCol, sortDir, filterHqCountry, filterContacted, filterHighlighted]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  function showToast(msg: string, type: "ok" | "err" = "ok") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function handleSort(col: string) {
    if (sortCol === col) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortCol(col);
      setSortDir("asc");
    }
  }

  function handleSearchChange(val: string) {
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => setSearch(val), 300);
  }

  function startEdit(id: number, key: ColumnKey, currentValue: string | number) {
    setEditCell({ id, key });
    // For notes, convert pipe delimiters to newlines for editing
    const val = String(currentValue ?? "");
    setEditValue(key === "notes" ? val.replace(/\s*\|\s*/g, "\n") : val);
  }

  async function saveEdit() {
    if (!editCell) return;
    setSaving(true);

    let value: string | number = editValue;
    if (editCell.key === "employee_count") {
      value = editValue.trim() === "" ? 0 : Number(editValue);
      if (Number.isNaN(value)) value = 0;
    }

    // Optimistic update
    setLeads((prev) =>
      prev.map((l) => (l.id === editCell.id ? { ...l, [editCell.key]: value } : l))
    );

    const res = await fetch(`/api/leads/${editCell.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [editCell.key]: value }),
    });

    if (!res.ok) {
      showToast("Failed to save", "err");
      fetchLeads(); // revert
    }

    setEditCell(null);
    setSaving(false);
  }

  async function handleAdd(data: Partial<Lead>) {
    const normalized = {
      ...data,
      employee_count:
        typeof data.employee_count === "string"
          ? Number(data.employee_count || 0)
          : data.employee_count,
    };
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(normalized),
    });
    if (res.ok) {
      showToast("Firm added");
      setShowAddModal(false);
      fetchLeads();
    } else {
      showToast("Failed to add firm", "err");
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this firm?")) return;
    const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
    if (res.ok) {
      showToast("Firm deleted");
      fetchLeads();
    }
  }

  async function sendChat() {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = chatInput.trim();
    setChatInput("");
    const newMessages = [...chatMessages, { role: "user" as const, content: userMsg }];
    setChatMessages(newMessages);
    setChatLoading(true);
    try {
      const res = await fetch("/api/leads/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          context: view,
        }),
      });
      const data = await res.json();
      if (data.content?.[0]?.text) {
        setChatMessages([...newMessages, { role: "assistant", content: data.content[0].text }]);
      } else if (data.error) {
        setChatMessages([...newMessages, { role: "assistant", content: `Error: ${data.error}` }]);
      }
    } catch {
      setChatMessages([...newMessages, { role: "assistant", content: "Failed to reach chat API." }]);
    } finally {
      setChatLoading(false);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }

  function handleLogout() {
    document.cookie = "leads_session=; max-age=0; path=/";
    window.location.href = "/leads/login";
  }

  // Derived stats
  const statCounts = {
    contacted: leads.filter((l) => l.contacted === "yes" || l.contacted === "CONFIRMED").length,
    replied: leads.filter((l) => l.contacted === "replied").length,
    booking: leads.filter((l) => l.contacted === "BOOKING MEETING").length,
    active: leads.filter((l) => l.highlighted === 1).length,
  };

  // Client-side filters
  const filteredLeads = leads.filter((l) => {
    if (filterHighlighted === "nobig" && (l.employee_count ?? 0) >= 1000) return false;
    if (search.startsWith("ps:") && (l.partner_status || "") !== search.slice(3)) return false;
    return true;
  });

  const hasResults = !loading && filteredLeads.length > 0;
  const isEmpty = !loading && filteredLeads.length === 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fafafa",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* ── Banner ── */}
      <div
        style={{
          background: "#000",
          padding: "36px 40px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        {/* Left: view toggle */}
        <div style={{ display: "flex", gap: 0, border: "1px solid rgba(255,255,255,0.15)" }}>
          {(["leads", "report", "ranking"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: "8px 20px",
                background: view === v ? "rgba(255,255,255,0.12)" : "transparent",
                color: view === v ? "#fff" : "rgba(255,255,255,0.40)",
                border: "none",
                fontSize: 10,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.10em",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "background 0.15s, color 0.15s",
              }}
            >
              {v === "leads" ? "Lead Database" : v === "report" ? "Market Report" : "Market Ranking"}
            </button>
          ))}
        </div>

        {/* Right: stats + logout */}
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          <StatBox label="Contacted" value={statCounts.contacted} color="#10B981" />
          <StatBox label="Replied" value={statCounts.replied} color="#a855f7" />
          <StatBox label="Booking" value={statCounts.booking} color="#3b82f6" />
          <StatBox label="Active" value={statCounts.active} color="#fff" />
          <div style={{ width: 1, background: "rgba(255,255,255,0.10)", height: 36, margin: "0 20px 0 24px" }} />
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              background: "transparent",
              color: "rgba(255,255,255,0.40)",
              border: "1px solid rgba(255,255,255,0.15)",
              fontSize: 10,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.10em",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "color 0.15s, border-color 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.40)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.40)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)";
            }}
          >
            Log out
          </button>
        </div>
      </div>

      {/* ── Report View ── */}
      {view === "report" && !selectedReport && (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 40px 80px" }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "rgba(0,0,0,0.30)",
              marginBottom: 24,
            }}
          >
            Market Research Library
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {REPORTS.map((r) => (
              <button
                key={r.id}
                id={`report-${r.id}`}
                onClick={async () => {
                  setSelectedReport(r.url);
                  if (r.format === "md") {
                    try {
                      const res = await fetch(r.url);
                      const text = await res.text();
                      setMdContent(text);
                    } catch { setMdContent("Failed to load report."); }
                  } else {
                    setMdContent(null);
                  }
                }}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: 0,
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.08)",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "inherit",
                  transition: "border-color 0.2s",
                  overflow: "hidden",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,0,0,0.20)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,0,0,0.08)";
                }}
              >
                {/* Cover side */}
                <div
                  style={{
                    width: 280,
                    minHeight: 200,
                    flexShrink: 0,
                    background: "#000",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                    padding: 32,
                  }}
                >
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.10em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>
                      {r.format === "md" ? "Research Report" : "PDF Report"}
                    </div>
                    {r.tier && (
                      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "2px 6px", color: r.tier === "Tier 1" ? "#10B981" : r.tier === "Tier 2" ? "#3b82f6" : r.tier === "Phase 4" ? "#a855f7" : r.tier === "Phase 5" ? "#f97316" : "#fff", background: r.tier === "Tier 1" ? "rgba(16,185,129,0.15)" : r.tier === "Tier 2" ? "rgba(59,130,246,0.15)" : r.tier === "Phase 4" ? "rgba(168,85,247,0.15)" : r.tier === "Phase 5" ? "rgba(249,115,22,0.15)" : "rgba(255,255,255,0.10)", border: `1px solid ${r.tier === "Tier 1" ? "rgba(16,185,129,0.25)" : r.tier === "Tier 2" ? "rgba(59,130,246,0.25)" : r.tier === "Phase 4" ? "rgba(168,85,247,0.25)" : r.tier === "Phase 5" ? "rgba(249,115,22,0.25)" : "rgba(255,255,255,0.15)"}` }}>{r.tier}</span>
                    )}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#fff", textAlign: "center", letterSpacing: "-0.01em", lineHeight: 1.35 }}>
                    {r.title}
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.30)", letterSpacing: "0.05em" }}>
                    {r.pages ? `${r.pages} pages · ` : ""}{r.date}
                  </div>
                </div>
                {/* Summary */}
                <div style={{ padding: "32px 36px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 14, flex: 1 }}>
                  <div style={{ fontSize: 17, fontWeight: 600, color: "#000", letterSpacing: "-0.01em", lineHeight: 1.3 }}>
                    {r.title}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: "rgba(0,0,0,0.50)",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.7,
                    }}
                  >
                    {r.summary}
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.10em", color: "rgba(0,0,0,0.25)", marginTop: 4 }}>
                    Published {r.date}{r.pages ? ` · ${r.pages} pages` : ""}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Report Viewer (PDF + Markdown) ── */}
      {view === "report" && selectedReport && (
        <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 120px)" }}>
          <div
            style={{
              padding: "10px 40px",
              background: "#fff",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <button
              onClick={() => { setSelectedReport(null); setMdContent(null); }}
              style={{
                padding: "6px 14px",
                background: "transparent",
                border: "1px solid rgba(0,0,0,0.12)",
                fontSize: 10,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                cursor: "pointer",
                fontFamily: "inherit",
                color: "rgba(0,0,0,0.50)",
                transition: "border-color 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,0,0,0.30)";
                (e.currentTarget as HTMLButtonElement).style.color = "#000";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,0,0,0.12)";
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(0,0,0,0.50)";
              }}
            >
              &larr; Back to Reports
            </button>
            <span style={{ fontSize: 13, color: "rgba(0,0,0,0.50)", letterSpacing: "-0.01em" }}>
              {REPORTS.find((r) => r.url === selectedReport)?.title}
            </span>
          </div>
          {mdContent !== null ? (
            <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
              <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 56px 120px" }} className="md-report">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em", color: "#000", marginTop: 48, marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid rgba(0,0,0,0.08)" }}>{children}</h1>,
                    h2: ({ children }) => <h2 style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em", color: "#000", marginTop: 40, marginBottom: 16, paddingBottom: 8, borderBottom: "1px solid rgba(0,0,0,0.06)" }}>{children}</h2>,
                    h3: ({ children }) => <h3 style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em", color: "#000", marginTop: 32, marginBottom: 12 }}>{children}</h3>,
                    h4: ({ children }) => <h4 style={{ fontSize: 14, fontWeight: 600, color: "rgba(0,0,0,0.70)", marginTop: 24, marginBottom: 8 }}>{children}</h4>,
                    p: ({ children }) => <p style={{ fontSize: 14, color: "rgba(0,0,0,0.55)", lineHeight: 1.75, marginBottom: 16, letterSpacing: "-0.01em" }}>{children}</p>,
                    ul: ({ children }) => <ul style={{ paddingLeft: 20, marginBottom: 16 }}>{children}</ul>,
                    ol: ({ children }) => <ol style={{ paddingLeft: 20, marginBottom: 16 }}>{children}</ol>,
                    li: ({ children }) => <li style={{ fontSize: 14, color: "rgba(0,0,0,0.55)", lineHeight: 1.75, marginBottom: 4 }}>{children}</li>,
                    strong: ({ children }) => <strong style={{ color: "#000", fontWeight: 600 }}>{children}</strong>,
                    em: ({ children }) => <em style={{ color: "rgba(0,0,0,0.65)" }}>{children}</em>,
                    blockquote: ({ children }) => <blockquote style={{ borderLeft: "3px solid rgba(0,0,0,0.10)", paddingLeft: 20, margin: "16px 0", color: "rgba(0,0,0,0.45)" }}>{children}</blockquote>,
                    hr: () => <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.08)", margin: "32px 0" }} />,
                    table: ({ children }) => <div style={{ overflowX: "auto", marginBottom: 16 }}><table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>{children}</table></div>,
                    thead: ({ children }) => <thead style={{ borderBottom: "1px solid rgba(0,0,0,0.10)" }}>{children}</thead>,
                    th: ({ children }) => <th style={{ padding: "10px 14px", textAlign: "left", fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(0,0,0,0.35)" }}>{children}</th>,
                    td: ({ children }) => <td style={{ padding: "10px 14px", color: "rgba(0,0,0,0.55)", borderBottom: "1px solid rgba(0,0,0,0.04)" }}>{children}</td>,
                    pre: ({ children }) => <pre style={{ background: "#f5f5f5", padding: 20, fontSize: 12, lineHeight: 1.6, overflow: "auto", marginBottom: 16 }}>{children}</pre>,
                    code: ({ children, className }) => className ? <code>{children}</code> : <code style={{ background: "rgba(0,0,0,0.04)", padding: "2px 6px", fontSize: 13 }}>{children}</code>,
                    a: ({ children, href }) => <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: "#3b82f6", textDecoration: "none" }}>{children}</a>,
                  }}
                >{mdContent}</ReactMarkdown>
              </div>
            </div>
          ) : (
            <iframe
              src={selectedReport}
              style={{ flex: 1, border: "none", width: "100%" }}
              title="Report PDF"
            />
          )}
        </div>
      )}

      {/* ── Market Ranking View ── */}
      {view === "ranking" && (() => {
        const MIGRATION_TYPES = [
          { value: "qb-netsuite", label: "QuickBooks → NetSuite" },
          { value: "qb-d365", label: "QuickBooks → Dynamics 365" },
          { value: "qb-sage-intacct", label: "QuickBooks → Sage Intacct" },
          { value: "sage-netsuite", label: "Sage → NetSuite" },
          { value: "sage-d365", label: "Sage → Dynamics 365" },
          { value: "gp-netsuite", label: "Dynamics GP → NetSuite" },
          { value: "gp-d365", label: "Dynamics GP → D365 Business Central" },
          { value: "legacy-netsuite", label: "Legacy ERP → NetSuite" },
          { value: "legacy-d365", label: "Legacy ERP → Dynamics 365" },
          { value: "netsuite-implementation", label: "NetSuite Implementation" },
          { value: "d365-implementation", label: "Dynamics 365 Implementation" },
          { value: "acumatica", label: "Any → Acumatica" },
        ];

        const selectedLabel = MIGRATION_TYPES.find((m) => m.value === rankingCategory)?.label;

        const generatePdfReport = () => {
          const pdfContent = buildPdfHtml();
          const blob = new Blob([pdfContent], { type: "text/html;charset=utf-8" });
          const url = URL.createObjectURL(blob);
          const w = window.open(url, "_blank");
          if (w) setTimeout(() => { w.print(); URL.revokeObjectURL(url); }, 800);
        };

        return (
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 40px 80px" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(0,0,0,0.30)", marginBottom: 6 }}>
                  Corridor Intelligence
                </div>
                <div style={{ fontSize: 22, fontWeight: 600, color: "#000", letterSpacing: "-0.02em" }}>
                  {selectedLabel || "Select a Migration Corridor"}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {rankingCategory === "qb-netsuite" && (
                  <button
                    onClick={generatePdfReport}
                    style={{
                      padding: "10px 20px",
                      fontSize: 11,
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      background: "#000",
                      color: "#fff",
                      border: "2px solid #000",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "background 0.15s, color 0.15s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#000"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#000"; e.currentTarget.style.color = "#fff"; }}
                  >
                    Download Full Report
                  </button>
                )}
              <select
                value={rankingCategory}
                onChange={(e) => setRankingCategory(e.target.value)}
                style={{
                  padding: "10px 16px",
                  fontSize: 11,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  border: "1.5px solid rgba(0,0,0,0.10)",
                  background: rankingCategory !== "all" ? "#000" : "#fafafa",
                  color: rankingCategory !== "all" ? "#fff" : "rgba(0,0,0,0.55)",
                  fontFamily: "inherit",
                  cursor: "pointer",
                  outline: "none",
                  transition: "background 0.15s, color 0.15s",
                  minWidth: 280,
                }}
              >
                <option value="all">Select Corridor</option>
                {MIGRATION_TYPES.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
              </div>
            </div>

            {/* Corridor-specific competitive intelligence */}
            {rankingCategory === "qb-netsuite" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {/* Summary Banner */}
                <div style={{ background: "#000", padding: "36px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)", marginBottom: 6 }}>Research Summary</div>
                    <div style={{ fontSize: 16, fontWeight: 500, color: "#fff", letterSpacing: "-0.01em" }}>125+ Google searches &middot; 25 AEO prompts &middot; 401 citation domains &middot; 20+ page scrapes</div>
                  </div>
                  <div style={{ display: "flex", gap: 24 }}>
                    {[
                      { label: "Source SERP", value: "0", color: "#DC2626" },
                      { label: "Source AEO", value: "0%", color: "#DC2626" },
                      { label: "Domains Tracked", value: "401", color: "#fff" },
                      { label: "Queries Run", value: "125+", color: "#fff" },
                    ].map((s) => (
                      <div key={s.label} style={{ textAlign: "right", borderLeft: "1px solid rgba(255,255,255,0.10)", paddingLeft: 20 }}>
                        <div style={{ fontSize: 20, fontWeight: 700, color: s.color, letterSpacing: "-0.03em", lineHeight: 1 }}>{s.value}</div>
                        <div style={{ fontSize: 9, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.35)", marginTop: 4 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Combined Power Rankings */}
                <div style={{ border: "1px solid rgba(0,0,0,0.08)", background: "#fff" }}>
                  <div style={{ padding: "20px 28px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                    <div style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(0,0,0,0.30)", marginBottom: 4 }}>Section 1</div>
                    <div style={{ fontSize: 17, fontWeight: 600, color: "#000", letterSpacing: "-0.01em" }}>Combined Power Rankings</div>
                  </div>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                          {["#", "Domain", "Google Score", "AEO Score", "Combined", "Threat"].map((h) => (
                            <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(0,0,0,0.35)" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { rank: 1, domain: "Anchor Group", google: 56.3, aeo: 93.3, combined: 82.9, threat: "CRITICAL", color: "#DC2626", insights: "Strongest dual-channel presence. Dominates AirOps citations (191, 6.22% share) AND ranks #4 in Google SERPs. Their tech-focused domain (anchorgroup.tech) and consistent content across QB→NS, NetSuite implementation, and AI prompts make them the #1 competitive threat. They appear in 20/25 AI recommendation prompts." },
                          { rank: 2, domain: "Reddit", google: 100.0, aeo: 44.0, combined: 81.3, threat: "Platform", color: "rgba(0,0,0,0.30)", insights: "Platform advantage, not a direct competitor. User-generated content dominates both Google (72 appearances across all intent types) and AEO (126 citations). Key insight: Reddit threads are the most-cited source for AI recommendations. Source should seed presence in r/netsuite, r/accounting, and r/erp subreddits." },
                          { rank: 3, domain: "ZoneAndCo", google: 58.7, aeo: 23.0, combined: 59.8, threat: "HIGH", color: "#F59E0B", insights: "Strong informational content drives Google presence (19 appearances in info queries, 19 in long-tail). Their migration guide is the #2 most-cited URL across all searches. Weaker in commercial/transactional intent. AEO citations are moderate (66, 2.15%). Content strategy: comprehensive guides over product pitches." },
                          { rank: 4, domain: "OrdwayLabs", google: 34.7, aeo: 30.4, combined: 57.4, threat: "HIGH", color: "#F59E0B", insights: "Only competitor providing transparent pricing intelligence. Their blog post on QB→NS migration appears in 19/25 informational queries — the #1 URL by breadth. Zero commercial/transactional presence. Purely educational content play. They cracked the pricing transparency gap that no one else addresses." },
                          { rank: 5, domain: "Fourlane", google: 48.4, aeo: 32.1, combined: 49.9, threat: "HIGH", color: "#F59E0B", insights: "Balanced dual-channel presence. Strong AirOps citations (92, 2.99%) and decent Google coverage (34 appearances). Known as a QuickBooks-to-NetSuite specialist. Their conversion guide ranks in 9/25 informational queries. Mid-tier threat — solid but not dominant in either channel." },
                          { rank: 6, domain: "NetSuite (Oracle)", google: 95.4, aeo: 43.3, combined: 48.6, threat: "Vendor", color: "rgba(0,0,0,0.30)", insights: "Vendor content dominates commercial (24) and transactional (20) queries as expected. Weaker in informational and long-tail. Represents the official channel — not a competitor but a partner opportunity. Getting featured on netsuite.com would be a major AEO boost." },
                          { rank: 7, domain: "GetGSI", google: 56.3, aeo: 30.0, combined: 48.4, threat: "HIGH", color: "#F59E0B", insights: "Consistent mid-tier presence across all channels. 40 Google appearances spread evenly across intent types. 86 AEO citations (2.80%). Their migration blog appears in 7/25 info queries. No standout differentiator — they compete on breadth rather than depth." },
                          { rank: 8, domain: "YouTube", google: 61.7, aeo: 0, combined: 36.8, threat: "Platform", color: "rgba(0,0,0,0.30)", insights: "Video platform with 41 Google appearances. No AEO citations. Opportunity: migration walkthrough videos could capture this channel. Most QB→NS video content is from individual consultants, not branded firms." },
                          { rank: 9, domain: "Embark", google: 51.9, aeo: 0, combined: 34.3, threat: "MEDIUM", color: "#3b82f6", insights: "Strong Google-only presence (42 appearances) but zero AEO citations. Their blog on QB→NS migration ranks in 15/25 informational queries. Purely SEO-driven — they haven't cracked AI visibility at all. Vulnerable to AEO disruption." },
                          { rank: 10, domain: "Paystand", google: 14.1, aeo: 25.7, combined: 31.3, threat: "MEDIUM", color: "#3b82f6", insights: "Payment-focused company with surprisingly strong AEO presence (49 citations, 1.59%). Minimal Google footprint (8 appearances). They appear primarily in AI citations related to AR/AP and payment automation within NetSuite migrations." },
                          { rank: 11, domain: "MMC Convert", google: 14.4, aeo: 26.2, combined: 29.4, threat: "LOW", color: "rgba(0,0,0,0.25)", insights: "Data migration specialist with strong AEO citations (50, 1.63%) but limited Google presence (14 appearances). Their single blog post appears in 7/25 informational queries. Narrow specialization in the data conversion niche." },
                          { rank: 12, domain: "WithOrb", google: 0, aeo: 25.7, combined: 25.7, threat: "LOW", color: "rgba(0,0,0,0.25)", insights: "Pure AEO play with zero Google presence. 36 citations (1.17%). Their blog on QB→NS migration is well-structured for AI consumption. Demonstrates that AEO and Google SEO are fundamentally different systems." },
                          { rank: 13, domain: "ScaleNorth", google: 21.9, aeo: 0, combined: 21.9, threat: "LOW", color: "rgba(0,0,0,0.25)", insights: "Interesting outlier: 76 AEO citations but zero Google appearances in our searches. They've cracked AI citation without any traditional SEO. Worth studying their content structure — whatever they're doing works for AI models but not Google." },
                          { rank: 14, domain: "Celigo", google: 11.8, aeo: 20.4, combined: 20.4, threat: "LOW", color: "rgba(0,0,0,0.25)", insights: "Integration platform (iPaaS) with moderate AEO presence (41 citations, 1.33%). Minimal Google footprint (4 appearances). They appear in AI citations related to integration middleware for NetSuite migrations." },
                          { rank: 15, domain: "BrokenRubik", google: 19.3, aeo: 0, combined: 19.3, threat: "LOW", color: "rgba(0,0,0,0.25)", insights: "Similar to ScaleNorth: strong AEO presence (67 citations, 2.18%) with zero Google visibility. Another example of AEO-only strategy. Their content about NetSuite appears heavily in AI training data but not in search results." },
                        ].flatMap((row) => {
                          const isExpanded = expandedRanking.has(row.rank);
                          const threatBg = row.color === "#DC2626" ? "rgba(220,38,38,0.08)" : row.color === "#F59E0B" ? "rgba(245,158,11,0.08)" : row.color === "#3b82f6" ? "rgba(59,130,246,0.08)" : "rgba(0,0,0,0.04)";
                          const threatBorder = row.color === "#DC2626" ? "rgba(220,38,38,0.20)" : row.color === "#F59E0B" ? "rgba(245,158,11,0.20)" : row.color === "#3b82f6" ? "rgba(59,130,246,0.20)" : "rgba(0,0,0,0.08)";
                          return [
                            <tr
                              key={row.rank}
                              onClick={() => {
                                setExpandedRanking((prev) => {
                                  const next = new Set(prev);
                                  if (next.has(row.rank)) { next.delete(row.rank); } else { next.add(row.rank); }
                                  return next;
                                });
                              }}
                              style={{ borderBottom: isExpanded ? "none" : "1px solid rgba(0,0,0,0.04)", cursor: "pointer", background: isExpanded ? "rgba(0,0,0,0.015)" : "transparent" }}
                            >
                              <td style={{ padding: "10px 16px", color: "rgba(0,0,0,0.30)", fontWeight: 500 }}>{row.rank}</td>
                              <td style={{ padding: "10px 16px", fontWeight: 600, color: "#000" }}>
                                <span style={{ marginRight: 6, fontSize: 10, color: "rgba(0,0,0,0.25)" }}>{isExpanded ? "▾" : "▸"}</span>
                                {row.domain}
                              </td>
                              <td style={{ padding: "10px 16px", color: "rgba(0,0,0,0.55)" }}>{row.google.toFixed(1)}</td>
                              <td style={{ padding: "10px 16px", color: "rgba(0,0,0,0.55)" }}>{row.aeo.toFixed(1)}</td>
                              <td style={{ padding: "10px 16px", fontWeight: 700, color: "#000" }}>{row.combined.toFixed(1)}</td>
                              <td style={{ padding: "10px 16px" }}>
                                <span style={{ display: "inline-block", padding: "2px 8px", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.10em", color: row.color, background: threatBg, border: `1px solid ${threatBorder}` }}>{row.threat}</span>
                              </td>
                            </tr>,
                            isExpanded ? (
                              <tr key={`${row.rank}-insight`} style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                                <td colSpan={6} style={{ padding: 0 }}>
                                  <div style={{ background: "rgba(0,0,0,0.02)", borderLeft: "4px solid rgba(0,0,0,0.08)", padding: "14px 20px 14px 24px", display: "flex", flexDirection: "column", gap: 6 }}>
                                    <div style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(0,0,0,0.30)" }}>Competitor Insight</div>
                                    <div style={{ fontSize: 13, color: "rgba(0,0,0,0.55)", lineHeight: 1.65 }}>{row.insights}</div>
                                  </div>
                                </td>
                              </tr>
                            ) : null,
                          ];
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* AEO Rankings */}
                <div style={{ border: "1px solid rgba(0,0,0,0.08)", background: "#fff" }}>
                  <div style={{ padding: "20px 28px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                    <div style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(0,0,0,0.30)", marginBottom: 4 }}>Section 2</div>
                    <div style={{ fontSize: 17, fontWeight: 600, color: "#000", letterSpacing: "-0.01em" }}>AI Engine Optimization (AEO)</div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                    {/* AI Recommendations */}
                    <div style={{ padding: "20px 28px", borderRight: "1px solid rgba(0,0,0,0.06)" }}>
                      <div style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(0,0,0,0.35)", marginBottom: 12 }}>AI Model Recommendations (25 prompts, initial run)</div>
                      {[
                        { firm: "Protelo", mentions: 25, note: "~16 avg across reruns" },
                        { firm: "Trajectory Inc", mentions: 21, note: null },
                        { firm: "Anchor Group", mentions: 20, note: null },
                        { firm: "Techfino", mentions: 19, note: null },
                        { firm: "Sikich", mentions: 16, note: "~18 avg across reruns" },
                        { firm: "Myers-Holum", mentions: 16, note: null },
                        { firm: "BDO", mentions: 12, note: null },
                        { firm: "RSM", mentions: 11, note: null },
                        { firm: "Deloitte", mentions: 10, note: null },
                        { firm: "EY", mentions: 9, note: null },
                      ].map((row, i) => (
                        <div key={row.firm} style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 0", borderBottom: i < 9 ? "1px solid rgba(0,0,0,0.04)" : "none" }}>
                          <span style={{ fontSize: 10, fontWeight: 500, color: "rgba(0,0,0,0.25)", width: 16 }}>{i + 1}</span>
                          <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: "rgba(0,0,0,0.70)" }}>
                            {row.firm}
                            {row.note && <span style={{ marginLeft: 6, fontSize: 10, fontWeight: 400, color: "rgba(0,0,0,0.35)", fontStyle: "italic" }}>{row.note}</span>}
                          </span>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <div style={{ width: Math.round((row.mentions / 25) * 80), height: 4, background: "#000", opacity: 0.15 + (row.mentions / 25) * 0.55 }} />
                            <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(0,0,0,0.55)", width: 28, textAlign: "right" }}>{row.mentions}</span>
                          </div>
                        </div>
                      ))}
                      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", marginTop: 4, borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                        <span style={{ fontSize: 10, fontWeight: 500, color: "rgba(0,0,0,0.25)", width: 16 }}>—</span>
                        <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: "#DC2626" }}>Source</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#DC2626" }}>0</span>
                      </div>
                      {/* Rerun testing callout */}
                      <div style={{ marginTop: 16, padding: "12px 16px", background: "rgba(245,158,11,0.05)", borderLeft: "3px solid rgba(245,158,11,0.40)", display: "flex", flexDirection: "column", gap: 5 }}>
                        <div style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(245,158,11,0.80)" }}>Rerun Testing (60 additional prompts across 3 batches)</div>
                        <div style={{ fontSize: 12, color: "rgba(0,0,0,0.55)", lineHeight: 1.65 }}>
                          {"Protelo's initial 25/25 dominance was NOT consistent. Across 60 rerun prompts: Anchor Group led adversarial testing (18/20), Myers-Holum led standard reruns (8/15), Protelo dropped to 6-8 mentions per batch. Protelo consistency score: 2/10. It was never selected as the single best in any prompt. Anchor Group won both \"who is the single best\" prompts."}
                        </div>
                      </div>
                      {/* Rerun data table */}
                      <div style={{ marginTop: 12, padding: "12px 16px", background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)" }}>
                        <div style={{ fontSize: 9, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(0,0,0,0.30)", marginBottom: 8 }}>Cross-Run Comparison (60 prompts)</div>
                        {[
                          { firm: "Anchor Group", initial: 20, rerun: 22, trend: "up" },
                          { firm: "Myers-Holum", initial: 16, rerun: 8, trend: "stable" },
                          { firm: "Protelo", initial: 25, rerun: 14, trend: "down" },
                          { firm: "Sikich", initial: 16, rerun: 13, trend: "stable" },
                          { firm: "Appficiency", initial: 0, rerun: 7, trend: "up" },
                          { firm: "GURUS Solutions", initial: 0, rerun: 4, trend: "up" },
                          { firm: "Blu Banyan", initial: 0, rerun: 10, trend: "up" },
                        ].map((row, i) => (
                          <div key={row.firm} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", borderBottom: i < 6 ? "1px solid rgba(0,0,0,0.03)" : "none" }}>
                            <span style={{ fontSize: 11, fontWeight: 500, color: "rgba(0,0,0,0.60)", flex: 1 }}>{row.firm}</span>
                            <span style={{ fontSize: 10, color: "rgba(0,0,0,0.35)", width: 60, textAlign: "right" }}>initial: {row.initial}</span>
                            <span style={{ fontSize: 10, fontWeight: 600, color: "rgba(0,0,0,0.55)", width: 60, textAlign: "right" }}>rerun: {row.rerun}</span>
                            <span style={{ fontSize: 9, width: 16, textAlign: "center", color: row.trend === "up" ? "#10B981" : row.trend === "down" ? "#DC2626" : "rgba(0,0,0,0.25)" }}>{row.trend === "up" ? "↑" : row.trend === "down" ? "↓" : "→"}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* AirOps Citations */}
                    <div style={{ padding: "20px 28px" }}>
                      <div style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(0,0,0,0.35)", marginBottom: 12 }}>AirOps Citation Domains (401 tracked)</div>
                      {[
                        { domain: "Anchor Group", citations: 191, share: "6.22%" },
                        { domain: "Reddit", citations: 126, share: "4.10%" },
                        { domain: "NetSuite", citations: 124, share: "4.04%" },
                        { domain: "Fourlane", citations: 92, share: "2.99%" },
                        { domain: "GetGSI", citations: 86, share: "2.80%" },
                        { domain: "ScaleNorth", citations: 76, share: "2.47%" },
                        { domain: "BrokenRubik", citations: 67, share: "2.18%" },
                        { domain: "HouseBlend", citations: 67, share: "2.18%" },
                        { domain: "GurusSolutions", citations: 66, share: "2.15%" },
                        { domain: "ZoneAndCo", citations: 66, share: "2.15%" },
                      ].map((row, i) => (
                        <div key={row.domain} style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 0", borderBottom: i < 9 ? "1px solid rgba(0,0,0,0.04)" : "none" }}>
                          <span style={{ fontSize: 10, fontWeight: 500, color: "rgba(0,0,0,0.25)", width: 16 }}>{i + 1}</span>
                          <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: "rgba(0,0,0,0.70)" }}>{row.domain}</span>
                          <span style={{ fontSize: 11, color: "rgba(0,0,0,0.40)", width: 40, textAlign: "right" }}>{row.share}</span>
                          <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(0,0,0,0.55)", width: 28, textAlign: "right" }}>{row.citations}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Google SERP Dominance */}
                <div style={{ border: "1px solid rgba(0,0,0,0.08)", background: "#fff" }}>
                  <div style={{ padding: "20px 28px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                    <div style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(0,0,0,0.30)", marginBottom: 4 }}>Section 3</div>
                    <div style={{ fontSize: 17, fontWeight: 600, color: "#000", letterSpacing: "-0.01em" }}>Google SERP Dominance</div>
                  </div>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                          {["#", "Domain", "Informational", "Commercial", "Transactional", "Long-tail", "Weighted"].map((h) => (
                            <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(0,0,0,0.35)" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { rank: 1, domain: "reddit.com", info: 21, comm: 13, trans: 18, long: 20, weighted: 91.5 },
                          { rank: 2, domain: "netsuite.com", info: 6, comm: 24, trans: 20, long: 7, weighted: 87.3 },
                          { rank: 3, domain: "youtube.com", info: 11, comm: 9, trans: 13, long: 8, weighted: 56.5 },
                          { rank: 4, domain: "anchorgroup.tech", info: 13, comm: 11, trans: 10, long: 9, weighted: 56.3 },
                          { rank: 5, domain: "zoneandco.com", info: 19, comm: 7, trans: 5, long: 19, weighted: 53.8 },
                          { rank: 6, domain: "getgsi.com", info: 11, comm: 10, trans: 9, long: 10, weighted: 51.5 },
                          { rank: 7, domain: "embarkwithus.com", info: 16, comm: 6, trans: 6, long: 14, weighted: 47.5 },
                          { rank: 8, domain: "fourlane.com", info: 11, comm: 8, trans: 8, long: 7, weighted: 44.3 },
                          { rank: 9, domain: "ordwaylabs.com", info: 19, comm: 0, trans: 0, long: 17, weighted: 31.8 },
                          { rank: 10, domain: "g2.com", info: 0, comm: 5, trans: 7, long: 0, weighted: 21.5 },
                        ].map((row) => (
                          <tr key={row.rank} style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                            <td style={{ padding: "10px 16px", color: "rgba(0,0,0,0.30)", fontWeight: 500 }}>{row.rank}</td>
                            <td style={{ padding: "10px 16px", fontWeight: 600, color: "#000" }}>{row.domain}</td>
                            <td style={{ padding: "10px 16px", color: "rgba(0,0,0,0.55)" }}>{row.info}</td>
                            <td style={{ padding: "10px 16px", color: "rgba(0,0,0,0.55)" }}>{row.comm}</td>
                            <td style={{ padding: "10px 16px", color: "rgba(0,0,0,0.55)" }}>{row.trans}</td>
                            <td style={{ padding: "10px 16px", color: "rgba(0,0,0,0.55)" }}>{row.long}</td>
                            <td style={{ padding: "10px 16px", fontWeight: 700, color: "#000" }}>{row.weighted.toFixed(1)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Pricing Intelligence */}
                <div style={{ border: "1px solid rgba(0,0,0,0.08)", background: "#fff" }}>
                  <div style={{ padding: "20px 28px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                    <div style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(0,0,0,0.30)", marginBottom: 4 }}>Section 4</div>
                    <div style={{ fontSize: 17, fontWeight: 600, color: "#000", letterSpacing: "-0.01em" }}>Pricing &amp; Timeline Intelligence</div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
                    <div style={{ padding: "20px 28px", borderRight: "1px solid rgba(0,0,0,0.06)" }}>
                      <div style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(0,0,0,0.35)", marginBottom: 12 }}>Implementation Costs</div>
                      {[
                        { label: "Small (basic)", range: "$25K — $50K" },
                        { label: "Mid-size (standard)", range: "$50K — $150K" },
                        { label: "Large / Complex", range: "$150K — $250K+" },
                        { label: "Data migration only", range: "$5K — $25K+" },
                        { label: "Consulting (onshore)", range: "$150 — $350/hr" },
                        { label: "Consulting (offshore)", range: "$50 — $100/hr" },
                        { label: "Oracle ACS direct", range: "$300/hr" },
                      ].map((row, i) => (
                        <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 6 ? "1px solid rgba(0,0,0,0.04)" : "none" }}>
                          <span style={{ fontSize: 13, color: "rgba(0,0,0,0.55)" }}>{row.label}</span>
                          <span style={{ fontSize: 13, fontWeight: 600, color: "#000" }}>{row.range}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ padding: "20px 28px" }}>
                      <div style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(0,0,0,0.35)", marginBottom: 12 }}>Timelines</div>
                      {[
                        { label: "SuiteSuccess (accelerated)", range: "90 — 120 days" },
                        { label: "Standard mid-size", range: "4 — 6 months" },
                        { label: "Complex + integrations", range: "6 — 12+ months" },
                        { label: "Fastest reasonable", range: "3 — 4 months" },
                      ].map((row, i) => (
                        <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 3 ? "1px solid rgba(0,0,0,0.04)" : "none" }}>
                          <span style={{ fontSize: 13, color: "rgba(0,0,0,0.55)" }}>{row.label}</span>
                          <span style={{ fontSize: 13, fontWeight: 600, color: "#000" }}>{row.range}</span>
                        </div>
                      ))}
                      <div style={{ marginTop: 16, padding: "12px 16px", background: "rgba(220,38,38,0.04)", border: "1px solid rgba(220,38,38,0.12)" }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: "#DC2626", marginBottom: 4 }}>Key Stat</div>
                        <div style={{ fontSize: 12, color: "rgba(0,0,0,0.55)", lineHeight: 1.5 }}>80%+ of data migrations exceed budget, delay go-live, or miss expectations (Gartner)</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Gaps */}
                <div style={{ border: "1px solid rgba(0,0,0,0.08)", background: "#fff" }}>
                  <div style={{ padding: "20px 28px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                    <div style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(0,0,0,0.30)", marginBottom: 4 }}>Section 5</div>
                    <div style={{ fontSize: 17, fontWeight: 600, color: "#000", letterSpacing: "-0.01em" }}>Strategic Opportunities for Source</div>
                  </div>
                  <div style={{ padding: "20px 28px" }}>
                    {[
                      { gap: "AI-powered migration", state: "Zero competitors mention AI", opp: "Wide open — Source's core differentiator is uncontested" },
                      { gap: "Pricing transparency", state: "Only OrdwayLabs provides specific numbers", opp: "High-intent, trust-building content opportunity" },
                      { gap: "Post-implementation optimization", state: "Nearly all content is pre-sale focused", opp: "Underserved high-value topic, thin competition" },
                      { gap: "Industry vertical playbooks", state: "Generic content dominates across competitors", opp: "No one owns SaaS, PE, manufacturing verticals" },
                      { gap: "Neutral ERP comparisons", state: "Most content is vendor-biased / product pitches", opp: "AI models prefer balanced, structured analysis" },
                      { gap: "Failed implementation recovery", state: "Only Rand Group has dedicated service", opp: "High-pain, high-trust niche with low competition" },
                    ].map((row, i) => (
                      <div key={row.gap} style={{ display: "grid", gridTemplateColumns: "180px 1fr 1fr", gap: 16, padding: "12px 0", borderBottom: i < 5 ? "1px solid rgba(0,0,0,0.04)" : "none" }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#000" }}>{row.gap}</span>
                        <span style={{ fontSize: 12, color: "rgba(0,0,0,0.45)", lineHeight: 1.5 }}>{row.state}</span>
                        <span style={{ fontSize: 12, color: "rgba(0,0,0,0.65)", lineHeight: 1.5, fontWeight: 500 }}>{row.opp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Source Position */}
                <div style={{ border: "2px solid rgba(0,0,0,0.15)", background: "#fff", padding: "28px 32px" }}>
                  <div style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(0,0,0,0.30)", marginBottom: 8 }}>Source Current Position</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 20 }}>
                    {[
                      { label: "SERP Appearances", current: "0", target: "5-10" },
                      { label: "AEO Mention Rate", current: "0%", target: "5-10%" },
                      { label: "AirOps Citations", current: "0", target: "10+" },
                      { label: "Power Score", current: "0.0", target: "15-20" },
                      { label: "Content Pages", current: "0", target: "8-12" },
                    ].map((m) => (
                      <div key={m.label}>
                        <div style={{ fontSize: 9, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(0,0,0,0.35)", marginBottom: 6 }}>{m.label}</div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                          <span style={{ fontSize: 24, fontWeight: 700, color: "#DC2626", letterSpacing: "-0.03em" }}>{m.current}</span>
                          <span style={{ fontSize: 11, color: "rgba(0,0,0,0.30)" }}>→ {m.target}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 16, fontSize: 13, color: "rgba(0,0,0,0.50)", lineHeight: 1.6 }}>
                    The corridor is competitive but fragmented. No single player excels at both Google SEO and AI citation simultaneously. Source can establish a unique position by combining AI-native differentiation with structured, citation-ready content.
                  </div>
                </div>

                {/* Search Queries Run */}
                <div style={{ border: "1px solid rgba(0,0,0,0.08)", background: "#fff" }}>
                  <div style={{ padding: "20px 28px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                    <div style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(0,0,0,0.30)", marginBottom: 4 }}>Section 6</div>
                    <div style={{ fontSize: 17, fontWeight: 600, color: "#000", letterSpacing: "-0.01em" }}>Google Search Queries Executed (150+)</div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
                    {[
                      { batch: "Informational (25)", queries: [
                        "quickbooks to netsuite migration", "how to migrate quickbooks to netsuite", "quickbooks vs netsuite comparison",
                        "netsuite migration guide", "quickbooks to netsuite data transfer", "erp migration from quickbooks",
                        "netsuite implementation steps", "quickbooks to netsuite timeline", "benefits of switching to netsuite",
                        "quickbooks to netsuite checklist", "netsuite data migration best practices", "quickbooks export to netsuite",
                        "erp upgrade from quickbooks", "netsuite migration process explained", "moving from quickbooks desktop to netsuite",
                        "quickbooks online to netsuite migration", "netsuite chart of accounts from quickbooks", "how long does netsuite migration take",
                        "quickbooks to netsuite historical data", "netsuite migration risks", "what to know before switching to netsuite",
                        "quickbooks to cloud erp migration", "netsuite data mapping from quickbooks", "erp transition planning quickbooks",
                        "quickbooks to netsuite inventory migration"
                      ]},
                      { batch: "Commercial (25)", queries: [
                        "best netsuite implementation partner", "netsuite consulting firms", "top netsuite migration companies",
                        "netsuite partner reviews", "hire netsuite consultant", "netsuite implementation cost estimate",
                        "best erp consultants for quickbooks migration", "netsuite solution provider comparison", "netsuite alliance partners list",
                        "affordable netsuite implementation", "netsuite consulting rates", "quickbooks to netsuite service providers",
                        "netsuite migration experts near me", "best netsuite partner for small business", "netsuite implementation companies ranked",
                        "netsuite consulting firm comparison", "certified netsuite consultants", "netsuite migration service pricing",
                        "quickbooks to netsuite migration firms", "top rated netsuite partners", "netsuite implementation partner reviews",
                        "boutique netsuite consulting firms", "netsuite partner for startups", "enterprise netsuite implementation firms",
                        "netsuite migration rfp requirements"
                      ]},
                      { batch: "Transactional (25)", queries: [
                        "netsuite free trial", "netsuite demo request", "netsuite pricing calculator",
                        "buy netsuite license", "netsuite implementation quote", "schedule netsuite consultation",
                        "netsuite migration assessment", "get netsuite proposal", "netsuite cost calculator online",
                        "request netsuite migration estimate", "netsuite subscription pricing", "netsuite module pricing breakdown",
                        "netsuite erp purchase", "compare netsuite editions", "netsuite starter edition pricing",
                        "netsuite suitecloud pricing", "netsuite oneworld pricing", "netsuite for small business pricing",
                        "netsuite annual contract cost", "netsuite per user licensing cost", "netsuite implementation rfp template",
                        "netsuite suitesuccess pricing", "netsuite quickstart package", "netsuite migration package deals",
                        "netsuite vs quickbooks total cost of ownership"
                      ]},
                      { batch: "Long-tail / Industry (25)", queries: [
                        "netsuite for ecommerce quickbooks migration", "netsuite manufacturing quickbooks upgrade",
                        "netsuite for saas companies from quickbooks", "private equity portfolio company netsuite migration",
                        "netsuite for nonprofit from quickbooks", "netsuite implementation failed",
                        "netsuite migration problems", "quickbooks to netsuite data migration challenges",
                        "netsuite implementation timeline", "netsuite go live checklist",
                        "quickbooks to netsuite migration cost", "netsuite implementation pricing 2025",
                        "how much does netsuite migration cost", "netsuite consulting rates per hour",
                        "cheapest netsuite implementation partner", "quickbooks vs netsuite comparison",
                        "when to switch from quickbooks to netsuite", "signs you outgrown quickbooks",
                        "netsuite vs sage intacct for quickbooks users", "best erp to replace quickbooks",
                        "protelo netsuite reviews", "anchor group netsuite",
                        "trajectory inc netsuite", "techfino netsuite reviews", "sikich netsuite consulting"
                      ]},
                    ].map((group, gi) => (
                      <div key={group.batch} style={{ padding: "16px 24px", borderRight: gi % 2 === 0 ? "1px solid rgba(0,0,0,0.06)" : "none", borderBottom: gi < 2 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
                        <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.10em", color: "rgba(0,0,0,0.40)", marginBottom: 8 }}>{group.batch}</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                          {group.queries.map((q) => (
                            <span key={q} style={{ fontSize: 9, padding: "2px 6px", background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)", color: "rgba(0,0,0,0.50)", lineHeight: 1.4 }}>{q}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AEO Prompts Tested */}
                <div style={{ border: "1px solid rgba(0,0,0,0.08)", background: "#fff" }}>
                  <div style={{ padding: "20px 28px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                    <div style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(0,0,0,0.30)", marginBottom: 4 }}>Section 7</div>
                    <div style={{ fontSize: 17, fontWeight: 600, color: "#000", letterSpacing: "-0.01em" }}>AEO Prompts Tested (25 prompts, each run 4-8x)</div>
                  </div>
                  <div style={{ padding: "16px 24px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      {[
                        "How do I go from QuickBooks to NetSuite?",
                        "Help me migrate Quickbooks to Netsuite",
                        "I need some firms to help me migrate from QB to NS",
                        "Who should I go to for QB to NS migration?",
                        "How to use AI for migration to NetSuite",
                        "What's a cheaper alternative to Netsuite?",
                        "How expensive is NetSuite?",
                        "NetSuite Migration guide",
                        "Which CPA firms help with NetSuite implementation?",
                        "Best accounting firm for QB to NS migration",
                        "Who uses AI to speed up NetSuite implementations?",
                        "Fastest way to migrate from QB to NS",
                        "Best NetSuite partner for PE portfolio companies",
                        "How much does it cost to migrate QB to NS?",
                        "Can I migrate QB to NS in under 30 days?",
                        "My NetSuite implementation failed — what should I do?",
                        "NetSuite post-implementation optimization services",
                        "NetSuite for manufacturing companies from QB",
                        "Best ERP for growing ecommerce replacing QB",
                        "Should I hire big firm or boutique for NS migration?",
                        "What NetSuite partner has the fastest migration timeline?",
                        "Compare Protelo vs Anchor Group for NetSuite",
                        "Who offers AI-powered NetSuite data migration?",
                        "Best NetSuite implementation for SaaS companies",
                        "NetSuite migration partner with transparent pricing",
                      ].map((prompt) => (
                        <div key={prompt} style={{ fontSize: 11, color: "rgba(0,0,0,0.55)", padding: "6px 10px", background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.05)", lineHeight: 1.4 }}>
                          &ldquo;{prompt}&rdquo;
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 12, fontSize: 11, color: "#DC2626", fontWeight: 500 }}>
                      Source mentioned in 0 out of 25 prompts (0% mention rate)
                    </div>
                  </div>
                </div>

                {/* Extended Domain List */}
                <div style={{ border: "1px solid rgba(0,0,0,0.08)", background: "#fff" }}>
                  <div style={{ padding: "20px 28px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                    <div style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(0,0,0,0.30)", marginBottom: 4 }}>Section 8</div>
                    <div style={{ fontSize: 17, fontWeight: 600, color: "#000", letterSpacing: "-0.01em" }}>All Tracked Domains (Top 40)</div>
                  </div>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                          {["#", "Domain", "Google Appearances", "AEO Citations", "Citation Share", "Channel"].map((h) => (
                            <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 9, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(0,0,0,0.35)" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { d: "anchorgroup.tech", g: 43, a: 191, s: "6.22%", ch: "Dual" },
                          { d: "reddit.com", g: 72, a: 126, s: "4.10%", ch: "Dual" },
                          { d: "netsuite.com", g: 57, a: 124, s: "4.04%", ch: "Dual" },
                          { d: "fourlane.com", g: 34, a: 92, s: "2.99%", ch: "Dual" },
                          { d: "getgsi.com", g: 40, a: 86, s: "2.80%", ch: "Dual" },
                          { d: "zoneandco.com", g: 50, a: 66, s: "2.15%", ch: "Dual" },
                          { d: "youtube.com", g: 41, a: 46, s: "1.50%", ch: "Dual" },
                          { d: "scalenorth.com", g: 0, a: 76, s: "2.47%", ch: "AEO Only" },
                          { d: "brokenrubik.com", g: 0, a: 67, s: "2.18%", ch: "AEO Only" },
                          { d: "houseblend.io", g: 0, a: 67, s: "2.18%", ch: "AEO Only" },
                          { d: "gurussolutions.com", g: 0, a: 66, s: "2.15%", ch: "AEO Only" },
                          { d: "kimberlitepartners.com", g: 0, a: 59, s: "1.92%", ch: "AEO Only" },
                          { d: "ordwaylabs.com", g: 36, a: 58, s: "1.89%", ch: "Dual" },
                          { d: "embarkwithus.com", g: 42, a: 0, s: "0%", ch: "Google Only" },
                          { d: "mmcconvert.com", g: 14, a: 50, s: "1.63%", ch: "Dual" },
                          { d: "paystand.com", g: 8, a: 49, s: "1.59%", ch: "Dual" },
                          { d: "withorb.com", g: 23, a: 36, s: "1.17%", ch: "Dual" },
                          { d: "linealcpa.com", g: 0, a: 42, s: "1.37%", ch: "AEO Only" },
                          { d: "emergetech.com", g: 0, a: 42, s: "1.37%", ch: "AEO Only" },
                          { d: "celigo.com", g: 4, a: 41, s: "1.33%", ch: "Dual" },
                          { d: "quickbooks.intuit.com", g: 9, a: 0, s: "0%", ch: "Google Only" },
                          { d: "g2.com", g: 12, a: 0, s: "0%", ch: "Google Only" },
                          { d: "method.me", g: 0, a: 39, s: "1.27%", ch: "AEO Only" },
                          { d: "saasdirect.com", g: 0, a: 38, s: "1.24%", ch: "AEO Only" },
                          { d: "randgroup.com", g: 0, a: 34, s: "1.11%", ch: "AEO Only" },
                          { d: "suitemigration.com", g: 0, a: 32, s: "1.04%", ch: "AEO Only" },
                          { d: "optimaldataconsulting.com", g: 6, a: 0, s: "0%", ch: "Google Only" },
                          { d: "terillium.com", g: 6, a: 0, s: "0%", ch: "Google Only" },
                          { d: "trustradius.com", g: 4, a: 0, s: "0%", ch: "Google Only" },
                          { d: "sansasolutions.com", g: 4, a: 0, s: "0%", ch: "Google Only" },
                          { d: "mossadams.com", g: 3, a: 0, s: "0%", ch: "Google Only" },
                          { d: "vursor.com", g: 3, a: 0, s: "0%", ch: "Google Only" },
                          { d: "techfino.com", g: 7, a: 0, s: "0%", ch: "Google Only" },
                          { d: "proteloinc.com", g: 2, a: 0, s: "0%", ch: "Google Only" },
                          { d: "withum.com", g: 2, a: 0, s: "0%", ch: "Google Only" },
                          { d: "armanino.com", g: 2, a: 0, s: "0%", ch: "Google Only" },
                          { d: "bpm.com", g: 3, a: 0, s: "0%", ch: "Google Only" },
                          { d: "sikich.com", g: 2, a: 0, s: "0%", ch: "Google Only" },
                          { d: "trajectoryinc.com", g: 2, a: 0, s: "0%", ch: "Google Only" },
                          { d: "forbes.com", g: 2, a: 0, s: "0%", ch: "Google Only" },
                        ].map((row, i) => (
                          <tr key={row.d} style={{ borderBottom: "1px solid rgba(0,0,0,0.03)" }}>
                            <td style={{ padding: "7px 14px", color: "rgba(0,0,0,0.25)", fontWeight: 500 }}>{i + 1}</td>
                            <td style={{ padding: "7px 14px", fontWeight: 600, color: "#000" }}>{row.d}</td>
                            <td style={{ padding: "7px 14px", color: row.g > 0 ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.15)" }}>{row.g || "—"}</td>
                            <td style={{ padding: "7px 14px", color: row.a > 0 ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.15)" }}>{row.a || "—"}</td>
                            <td style={{ padding: "7px 14px", color: "rgba(0,0,0,0.40)" }}>{row.s}</td>
                            <td style={{ padding: "7px 14px" }}>
                              <span style={{ fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", padding: "2px 6px", color: row.ch === "Dual" ? "#10B981" : row.ch === "AEO Only" ? "#a855f7" : "#3b82f6", background: row.ch === "Dual" ? "rgba(16,185,129,0.08)" : row.ch === "AEO Only" ? "rgba(168,85,247,0.08)" : "rgba(59,130,246,0.08)", border: `1px solid ${row.ch === "Dual" ? "rgba(16,185,129,0.20)" : row.ch === "AEO Only" ? "rgba(168,85,247,0.20)" : "rgba(59,130,246,0.20)"}` }}>{row.ch}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : rankingCategory === "all" ? (
              <div style={{ border: "1px solid rgba(0,0,0,0.08)", background: "#fff", padding: "120px 40px", textAlign: "center" }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "rgba(0,0,0,0.30)", marginBottom: 6 }}>
                  Select a migration corridor to view the report
                </div>
                <div style={{ fontSize: 12, color: "rgba(0,0,0,0.20)", lineHeight: 1.5 }}>
                  Reports are generated via deep research and cover search rankings, consultancy landscape, AI visibility, and more.
                </div>
              </div>
            ) : (
              <div style={{ border: "1px solid rgba(0,0,0,0.08)", background: "#fff", padding: "80px 40px", textAlign: "center" }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "rgba(0,0,0,0.30)", marginBottom: 6 }}>
                  Corridor intelligence report not yet generated
                </div>
                <div style={{ fontSize: 12, color: "rgba(0,0,0,0.20)", lineHeight: 1.5 }}>
                  Run the deep research prompt for <strong style={{ color: "rgba(0,0,0,0.40)" }}>{selectedLabel}</strong> to populate competitive intelligence for this corridor.
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {view === "leads" && (<>
      {/* ── Toolbar ── */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          padding: "12px 40px",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        {/* Search */}
        <input
          type="text"
          placeholder="Search all fields..."
          onChange={(e) => handleSearchChange(e.target.value)}
          style={{
            padding: "9px 14px",
            fontSize: 13,
            border: "1.5px solid rgba(0,0,0,0.10)",
            background: "#fafafa",
            width: 300,
            fontFamily: "inherit",
            outline: "none",
            letterSpacing: "-0.01em",
            color: "rgba(0,0,0,0.80)",
            transition: "border-color 0.15s, background 0.15s",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#000";
            e.target.style.background = "#fff";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(0,0,0,0.10)";
            e.target.style.background = "#fafafa";
          }}
        />


        <select
          value={filterHqCountry}
          onChange={(e) => setFilterHqCountry(e.target.value)}
          style={{
            padding: "9px 14px",
            fontSize: 11,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            border: "1.5px solid rgba(0,0,0,0.10)",
            background: filterHqCountry ? "#000" : "#fafafa",
            color: filterHqCountry ? "#fff" : "rgba(0,0,0,0.55)",
            fontFamily: "inherit",
            cursor: "pointer",
            outline: "none",
            transition: "background 0.15s, color 0.15s",
          }}
        >
          <option value="">All Countries</option>
          {COUNTRY_OPTIONS.filter(Boolean).map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>

        {/* Size filter */}
        <select
          value={filterHighlighted}
          onChange={(e) => setFilterHighlighted(e.target.value)}
          style={{
            padding: "9px 14px",
            fontSize: 11,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            border: "1.5px solid rgba(0,0,0,0.10)",
            background: filterHighlighted ? "#000" : "#fafafa",
            color: filterHighlighted ? "#fff" : "rgba(0,0,0,0.55)",
            fontFamily: "inherit",
            cursor: "pointer",
            outline: "none",
            transition: "background 0.15s, color 0.15s",
          }}
        >
          <option value="">All Sizes</option>
          <option value="nobig">No Big Firms</option>
        </select>

        {/* Partner filter */}
        <select
          value={search.startsWith("ps:") ? search : ""}
          onChange={(e) => {
            const v = e.target.value;
            setSearch(v ? `ps:${v}` : "");
          }}
          style={{
            padding: "9px 14px",
            fontSize: 11,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            border: "1.5px solid rgba(0,0,0,0.10)",
            background: "#fafafa",
            color: "rgba(0,0,0,0.55)",
            fontFamily: "inherit",
            cursor: "pointer",
            outline: "none",
          }}
        >
          <option value="">All Partners</option>
          <option value="Alliance Partner">Alliance</option>
          <option value="Solution Provider">Solution Provider</option>
          <option value="Alliance + Solution Provider">Alliance + SP</option>
          <option value="Microsoft Partner">Microsoft</option>
          <option value="Independent">Independent</option>
        </select>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Record count */}
        {!loading && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.10em",
              color: "rgba(0,0,0,0.30)",
            }}
          >
            {leads.length} of {total}
          </span>
        )}

        {/* Export CSV */}
        <button
          type="button"
          onClick={() => {
            window.location.href = "/api/leads/export?format=csv";
          }}
          style={{
            padding: "9px 20px",
            border: "1.5px solid rgba(0,0,0,0.15)",
            background: "transparent",
            fontSize: 11,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "rgba(0,0,0,0.50)",
            fontFamily: "inherit",
            transition: "color 0.15s, border-color 0.15s",
            whiteSpace: "nowrap",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(0,0,0,0.80)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,0,0,0.30)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(0,0,0,0.50)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,0,0,0.15)";
          }}
        >
          Export CSV
        </button>

        {/* Add Firm */}
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            padding: "9px 20px",
            background: "#000",
            color: "#fff",
            border: "2px solid #000",
            fontSize: 11,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "background 0.15s, color 0.15s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#fff";
            (e.currentTarget as HTMLButtonElement).style.color = "#000";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#000";
            (e.currentTarget as HTMLButtonElement).style.color = "#fff";
          }}
        >
          + Add Firm
        </button>
      </div>

      {/* ── Table container ── */}
      <div style={{ overflowX: "auto", position: "relative" }}>
        <table
          style={{
            width: "100%",
            minWidth: colWidths.reduce((a, w) => a + w, 0),
            borderCollapse: "collapse",
            tableLayout: "fixed",
          }}
        >
          {/* Colgroup for widths */}
          <colgroup>
            {orderedColumns.map((col, i) => (
              <col key={col.key} style={{ width: colWidths[i] }} />
            ))}
          </colgroup>

          {/* Sticky thead with resize handles */}
          <thead
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              background: "#fff",
              borderBottom: "2px solid rgba(0,0,0,0.08)",
            }}
          >
            <tr>
              {orderedColumns.map((col, colIdx) => (
                <th
                  key={col.key}
                  draggable={col.key !== "id"}
                  onDragStart={(e) => {
                    dragColRef.current = { from: colIdx, to: colIdx };
                    e.dataTransfer.effectAllowed = "move";
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOverCol(colIdx);
                    if (dragColRef.current) dragColRef.current.to = colIdx;
                  }}
                  onDragLeave={() => setDragOverCol(null)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOverCol(null);
                    if (!dragColRef.current || dragColRef.current.from === dragColRef.current.to) return;
                    const { from, to } = dragColRef.current;
                    setColOrder((prev) => {
                      const next = [...prev];
                      const [moved] = next.splice(from, 1);
                      next.splice(to, 0, moved);
                      try { localStorage.setItem("leads_col_order", JSON.stringify(next)); } catch {}
                      return next;
                    });
                    // Also reorder widths
                    setColWidths((prev) => {
                      const next = [...prev];
                      const [moved] = next.splice(from, 1);
                      next.splice(to, 0, moved);
                      try { localStorage.setItem("leads_col_widths", JSON.stringify(next)); } catch {}
                      return next;
                    });
                    dragColRef.current = null;
                  }}
                  onDragEnd={() => { dragColRef.current = null; setDragOverCol(null); }}
                  onClick={() => handleSort(col.key)}
                  style={{
                    padding: "10px 16px",
                    fontSize: 10,
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: sortCol === col.key ? "#000" : "rgba(0,0,0,0.40)",
                    textAlign: "left",
                    cursor: col.key === "id" ? "pointer" : "grab",
                    userSelect: "none",
                    whiteSpace: "nowrap",
                    background: dragOverCol === colIdx ? "rgba(0,0,0,0.04)" : "#fff",
                    borderBottom: "2px solid rgba(0,0,0,0.08)",
                    borderLeft: dragOverCol === colIdx ? "2px solid #000" : "2px solid transparent",
                    position: "relative",
                    transition: "background 0.1s",
                  }}
                >
                  {col.label}
                  {sortCol === col.key && (
                    <span style={{ marginLeft: 4, opacity: 0.5, fontSize: 9 }}>
                      {sortDir === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                  {/* Resize handle */}
                  {colIdx < orderedColumns.length - 1 && (
                    <div
                      onMouseDown={(e) => onResizeStart(e, colIdx)}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: 6,
                        cursor: "col-resize",
                        zIndex: 1,
                        background: "transparent",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(0,0,0,0.12)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Loading shimmer rows */}
            {loading &&
              Array.from({ length: 14 }).map((_, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                  {orderedColumns.map((col) => (
                    <td key={col.key} style={{ padding: "12px 16px" }}>
                      <div
                        style={{
                          height: 13,
                          borderRadius: 2,
                          background: "linear-gradient(90deg, #f5f5f5 25%, #e5e5e5 50%, #f5f5f5 75%)",
                          backgroundSize: "200% 100%",
                          animation: "shimmer 1.5s ease infinite",
                          width: col.key === "id" ? 24 : "80%",
                        }}
                      />
                    </td>
                  ))}
                </tr>
              ))}

            {/* Empty state */}
            {isEmpty && (
              <tr>
                <td
                  colSpan={orderedColumns.length}
                  style={{
                    padding: "80px 24px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: 32,
                      marginBottom: 12,
                      opacity: 0.15,
                    }}
                  >
                    ◎
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                      color: "rgba(0,0,0,0.70)",
                      marginBottom: 6,
                    }}
                  >
                    No firms found
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "rgba(0,0,0,0.35)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Try adjusting your search or filters
                  </div>
                </td>
              </tr>
            )}

            {/* Data rows */}
            {hasResults &&
              filteredLeads.map((lead, rowIndex) => {
                const isHighlighted = lead.highlighted === 1;
                const isContacted = lead.contacted === "yes" || lead.contacted === "CONFIRMED";
                const isBooking = lead.contacted === "BOOKING MEETING";
                const isReplied = lead.contacted === "replied";
                const isHovered = hoveredRow === lead.id;

                let rowBg = "#fff";
                let leftBorderColor = "transparent";

                if (isReplied) {
                  rowBg = "rgba(168,85,247,0.04)";
                  leftBorderColor = "#a855f7";
                }
                if (isHighlighted) {
                  rowBg = "rgba(0,0,0,0.025)";
                  leftBorderColor = "#000";
                }
                if (isContacted) {
                  rowBg = "rgba(16,185,129,0.04)";
                  leftBorderColor = "#10B981";
                }
                if (isBooking) {
                  rowBg = "rgba(59,130,246,0.05)";
                  leftBorderColor = "#3b82f6";
                }

                const computedBg = isHovered && !isContacted && !isBooking && !isReplied && !isHighlighted
                  ? "rgba(0,0,0,0.018)"
                  : rowBg;

                return (
                  <tr
                    key={lead.id}
                    onMouseEnter={() => setHoveredRow(lead.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{
                      borderBottom: "1px solid rgba(0,0,0,0.05)",
                      background: computedBg,
                      borderLeft: `3px solid ${leftBorderColor}`,
                      transition: "background 0.12s ease",
                    }}
                  >
                    {orderedColumns.map((col) => {
                      const val = lead[col.key as keyof Lead];
                      const isEditing = editCell?.id === lead.id && editCell?.key === col.key;

                      // ── Editing state ──
                      if (isEditing) {
                        if ("type" in col && col.type === "select") {
                          return (
                            <td key={col.key} style={{ padding: "3px 6px" }}>
                              <select
                                value={editValue}
                                autoFocus
                                onChange={(e) => {
                                  const newVal = e.target.value;
                                  setLeads((prev) =>
                                    prev.map((l) =>
                                      l.id === lead.id ? { ...l, [col.key]: newVal } : l
                                    )
                                  );
                                  fetch(`/api/leads/${lead.id}`, {
                                    method: "PATCH",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ [col.key]: newVal }),
                                  });
                                  setEditCell(null);
                                }}
                                onBlur={() => setEditCell(null)}
                                style={{
                                  width: "100%",
                                  padding: "7px 10px",
                                  fontSize: 12,
                                  border: "1.5px solid #000",
                                  fontFamily: "inherit",
                                  outline: "none",
                                  background: "#fff",
                                  letterSpacing: "-0.01em",
                                }}
                              >
                                {col.options?.map((opt: string) => (
                                  <option key={opt} value={opt}>{opt}</option>
                                ))}
                              </select>
                            </td>
                          );
                        }

                        // Notes uses contentEditable inline — skip input box
                        if (col.key === "notes") {
                          setEditCell(null);
                        }

                        return (
                          <td key={col.key} style={{ padding: "3px 6px" }}>
                            <input
                              type="text"
                              value={editValue}
                              autoFocus
                              onChange={(e) => setEditValue(e.target.value)}
                              onBlur={() => saveEdit()}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") saveEdit();
                                if (e.key === "Escape") setEditCell(null);
                              }}
                              style={{
                                width: "100%",
                                padding: "7px 10px",
                                fontSize: 13,
                                border: "1.5px solid #000",
                                fontFamily: "inherit",
                                outline: "none",
                                background: "#fff",
                                letterSpacing: "-0.01em",
                                color: "rgba(0,0,0,0.85)",
                              }}
                            />
                          </td>
                        );
                      }

                      // ── Display mode ──
                      let cellContent: React.ReactNode;
                      let cellStyle: React.CSSProperties = {
                        fontSize: 13,
                        color: "rgba(0,0,0,0.65)",
                        letterSpacing: "-0.01em",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      };

                      if (col.key === "firm_name") {
                        cellContent = (
                          <span style={{ fontSize: 13, fontWeight: 500, color: "#000", letterSpacing: "-0.01em" }}>
                            {String(val ?? "")}
                          </span>
                        );
                      } else if (col.key === "website" && val) {
                        cellContent = (
                          <a
                            href={`https://${String(val).replace(/^https?:\/\//, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#3b82f6", textDecoration: "none", fontSize: 13, letterSpacing: "-0.01em" }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {String(val)}
                          </a>
                        );
                      } else if (col.key === "decision_maker" && val) {
                        // Parse "Name (Title) - url | Name (Title) - url"
                        const contacts = String(val).split(" | ").map((entry) => {
                          const match = entry.match(/^(.+?)\s*\((.+?)\)\s*-\s*(https?:\/\/\S+)/);
                          if (match) return { name: match[1].trim(), title: match[2].trim(), url: match[3].trim() };
                          // Fallback: just show the text
                          const urlMatch = entry.match(/(https?:\/\/\S+)/);
                          return { name: entry.replace(/(https?:\/\/\S+)/, "").replace(/[-|]/, "").trim(), title: "", url: urlMatch?.[1] || "" };
                        });
                        cellStyle = { ...cellStyle, whiteSpace: "normal", lineHeight: "1.5", overflow: "hidden" };
                        cellContent = (
                          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                            {contacts.slice(0, 4).map((c, ci) => (
                              <div key={ci} style={{ display: "flex", alignItems: "baseline", gap: 4, fontSize: 12 }}>
                                {c.url ? (
                                  <a
                                    href={c.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: "#3b82f6", textDecoration: "none", fontWeight: 500, letterSpacing: "-0.01em" }}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {c.name}
                                  </a>
                                ) : (
                                  <span style={{ fontWeight: 500, color: "#000" }}>{c.name}</span>
                                )}
                                {c.title && (
                                  <span style={{ fontSize: 10, color: "rgba(0,0,0,0.35)", fontWeight: 400 }}>
                                    {c.title}
                                  </span>
                                )}
                              </div>
                            ))}
                            {contacts.length > 4 && (
                              <span style={{ fontSize: 10, color: "rgba(0,0,0,0.30)" }}>+{contacts.length - 4} more</span>
                            )}
                          </div>
                        );
                      } else if (col.key === "contacted") {
                        const statusVal = String(val || "");
                        const cfg = STATUS_CONFIG[statusVal] || STATUS_CONFIG[""];
                        cellContent = (
                          <span
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const newVal = e.currentTarget.innerText.trim();
                              if (newVal !== statusVal) {
                                setLeads((prev) =>
                                  prev.map((l) => (l.id === lead.id ? { ...l, contacted: newVal } : l))
                                );
                                fetch(`/api/leads/${lead.id}`, {
                                  method: "PATCH",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ contacted: newVal }),
                                });
                                showToast("Status saved");
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") { e.preventDefault(); (e.currentTarget as HTMLSpanElement).blur(); }
                              if (e.key === "Escape") (e.currentTarget as HTMLSpanElement).blur();
                            }}
                            style={{
                              display: "inline-block",
                              padding: "3px 10px",
                              borderRadius: 100,
                              fontSize: 9,
                              fontWeight: 700,
                              textTransform: "uppercase",
                              letterSpacing: "0.10em",
                              color: cfg.color,
                              background: cfg.bg,
                              border: `1px solid ${cfg.border}`,
                              whiteSpace: "nowrap",
                              outline: "none",
                              cursor: "text",
                              minWidth: 30,
                            }}
                          >
                            {statusVal}
                          </span>
                        );
                      } else if (col.key === "id") {
                        cellContent = (
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ fontSize: 11, color: "rgba(0,0,0,0.30)", fontWeight: 500 }}>
                              {rowIndex + 1}
                            </span>
                            {isHovered && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(lead.id);
                                }}
                                title="Delete firm"
                                style={{
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  color: "rgba(0,0,0,0.25)",
                                  fontSize: 14,
                                  padding: "0 2px",
                                  fontFamily: "inherit",
                                  lineHeight: 1,
                                  transition: "color 0.12s",
                                }}
                                onMouseEnter={(e) => {
                                  (e.currentTarget as HTMLButtonElement).style.color = "#DC2626";
                                }}
                                onMouseLeave={(e) => {
                                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(0,0,0,0.25)";
                                }}
                              >
                                ×
                              </button>
                            )}
                          </div>
                        );
                      } else if (col.key === "notes") {
                        const noteText = String(val ?? "").replace(/\s*\|\s*/g, "\n");
                        const noteLines = noteText.split("\n");
                        const isLong = noteLines.length > 3;
                        const isExpanded = expandedNotes.has(lead.id);
                        const displayText = isLong && !isExpanded ? noteLines.slice(0, 3).join("\n") : noteText;
                        cellStyle = {
                          ...cellStyle,
                          whiteSpace: "pre-wrap",
                          overflow: "hidden",
                          lineHeight: "1.45",
                          fontSize: 12,
                          color: "rgba(0,0,0,0.85)",
                        };
                        cellContent = (
                          <div>
                            <div
                              contentEditable
                              suppressContentEditableWarning
                              onFocus={() => {
                                // Auto-expand when editing
                                if (isLong && !isExpanded) {
                                  setExpandedNotes((prev) => new Set(prev).add(lead.id));
                                }
                              }}
                              onBlur={(e) => {
                                const newText = e.currentTarget.innerText.trim();
                                const oldText = noteText.trim();
                                if (newText !== oldText) {
                                  // Optimistic update
                                  setLeads((prev) =>
                                    prev.map((l) => (l.id === lead.id ? { ...l, notes: newText } : l))
                                  );
                                  fetch(`/api/leads/${lead.id}`, {
                                    method: "PATCH",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ notes: newText }),
                                  });
                                  showToast("Notes saved");
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Escape") {
                                  (e.currentTarget as HTMLDivElement).blur();
                                }
                              }}
                              style={{
                                outline: "none",
                                cursor: "text",
                                minHeight: 18,
                                borderLeft: "2px solid transparent",
                                paddingLeft: 4,
                                marginLeft: -6,
                                transition: "border-color 0.15s",
                              }}
                              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderLeftColor = "rgba(0,0,0,0.10)"; }}
                              onMouseLeave={(e) => {
                                if (document.activeElement !== e.currentTarget)
                                  (e.currentTarget as HTMLDivElement).style.borderLeftColor = "transparent";
                              }}
                              onFocusCapture={(e) => { (e.currentTarget as HTMLDivElement).style.borderLeftColor = "#000"; }}
                              onBlurCapture={(e) => { (e.currentTarget as HTMLDivElement).style.borderLeftColor = "transparent"; }}
                            >
                              {isExpanded ? noteText : displayText}
                            </div>
                            {isLong && !isExpanded && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedNotes((prev) => new Set(prev).add(lead.id));
                                }}
                                style={{
                                  display: "block",
                                  marginTop: 4,
                                  padding: 0,
                                  background: "none",
                                  border: "none",
                                  fontSize: 11,
                                  color: "rgba(0,0,0,0.35)",
                                  cursor: "pointer",
                                  fontFamily: "inherit",
                                  letterSpacing: "0.02em",
                                }}
                              >
                                {`+${noteLines.length - 3} more`}
                              </button>
                            )}
                            {isLong && isExpanded && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedNotes((prev) => { const n = new Set(prev); n.delete(lead.id); return n; });
                                }}
                                style={{
                                  display: "block",
                                  marginTop: 4,
                                  padding: 0,
                                  background: "none",
                                  border: "none",
                                  fontSize: 11,
                                  color: "rgba(0,0,0,0.35)",
                                  cursor: "pointer",
                                  fontFamily: "inherit",
                                  letterSpacing: "0.02em",
                                }}
                              >
                                show less
                              </button>
                            )}
                          </div>
                        );
                      } else {
                        cellContent = (
                          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>
                            {String(val ?? "")}
                          </span>
                        );
                      }

                      const handleCellDoubleClick = () => {
                        if (!col.editable) return;
                        startEdit(lead.id, col.key, val as string | number);
                      };

                      return (
                        <td
                          key={col.key}
                          onDoubleClick={handleCellDoubleClick}
                          title={col.key !== "contacted" ? String(val ?? "") : undefined}
                          style={{
                            padding: "12px 16px",
                            cursor: col.editable ? "text" : "default",
                            overflow: "hidden",
                            ...cellStyle,
                          }}
                        >
                          {cellContent}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>

        {/* Pagination hint */}
        {hasResults && leads.length >= 500 && (
          <div
            style={{
              padding: "12px 40px",
              borderTop: "1px solid rgba(0,0,0,0.06)",
              background: "#fff",
              fontSize: 11,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.10em",
              color: "rgba(0,0,0,0.30)",
            }}
          >
            Showing first 500 results &mdash; refine your search to see more
          </div>
        )}
      </div>

      {/* ── Add Modal ── */}
      {showAddModal && <AddModal onClose={() => setShowAddModal(false)} onAdd={handleAdd} />}
      </>)}

      {/* ── Toast ── */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 28,
            right: 28,
            padding: "14px 24px",
            background: toast.type === "ok" ? "#fff" : "#000",
            color: toast.type === "ok" ? "#000" : "#fff",
            border: toast.type === "ok" ? "1px solid rgba(0,0,0,0.15)" : "none",
            borderLeft: toast.type === "err" ? "2px solid #DC2626" : undefined,
            fontSize: 11,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            zIndex: 200,
            boxShadow: toast.type === "ok" ? "0 4px 12px rgba(0,0,0,0.10)" : "0 4px 12px rgba(0,0,0,0.30)",
            fontFamily: "inherit",
          }}
        >
          {toast.msg}
        </div>
      )}

      {/* ── Chat FAB ── */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          style={{
            position: "fixed",
            bottom: 28,
            right: 28,
            width: 52,
            height: 52,
            background: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 300,
            boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
            transition: "transform 0.15s",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
          title="Ask AI about your leads"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}

      {/* ── Chat Panel ── */}
      {chatOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 28,
            right: 28,
            width: 400,
            height: "calc(100vh - 80px)",
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.12)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            zIndex: 300,
            fontFamily: "inherit",
          }}
        >
          {/* Chat header */}
          <div
            style={{
              padding: "14px 20px",
              background: "#000",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "-0.01em" }}>Source AI Assistant</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.40)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 2 }}>
                {view === "leads" ? "Leads context" : "Reports context"}
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.50)",
                cursor: "pointer",
                fontSize: 18,
                lineHeight: 1,
                padding: "4px 8px",
                fontFamily: "inherit",
              }}
            >
              &times;
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {chatMessages.length === 0 && (
              <div style={{ color: "rgba(0,0,0,0.30)", fontSize: 13, textAlign: "center", marginTop: 40, lineHeight: 1.6 }}>
                Ask anything about your leads,<br />competitive landscape, or market reports.
              </div>
            )}
            {chatMessages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  padding: "10px 14px",
                  background: m.role === "user" ? "#000" : "#f5f5f5",
                  color: m.role === "user" ? "#fff" : "rgba(0,0,0,0.70)",
                  fontSize: 13,
                  lineHeight: 1.55,
                  letterSpacing: "-0.01em",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {m.content}
              </div>
            ))}
            {chatLoading && (
              <div style={{ alignSelf: "flex-start", padding: "10px 14px", background: "#f5f5f5", fontSize: 13 }}>
                <span style={{
                  display: "inline-block",
                  width: 40,
                  height: 12,
                  background: "linear-gradient(90deg, #e5e5e5 25%, #d5d5d5 50%, #e5e5e5 75%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s ease infinite",
                }} />
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "12px 16px",
              borderTop: "1px solid rgba(0,0,0,0.08)",
              display: "flex",
              gap: 8,
            }}
          >
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendChat(); } }}
              placeholder="Ask about your leads..."
              style={{
                flex: 1,
                padding: "10px 14px",
                border: "1.5px solid rgba(0,0,0,0.10)",
                background: "#fafafa",
                fontSize: 13,
                fontFamily: "inherit",
                outline: "none",
                letterSpacing: "-0.01em",
                color: "rgba(0,0,0,0.80)",
              }}
              onFocus={(e) => { e.target.style.borderColor = "#000"; e.target.style.background = "#fff"; }}
              onBlur={(e) => { e.target.style.borderColor = "rgba(0,0,0,0.10)"; e.target.style.background = "#fafafa"; }}
            />
            <button
              onClick={sendChat}
              disabled={!chatInput.trim() || chatLoading}
              style={{
                padding: "10px 16px",
                background: chatInput.trim() && !chatLoading ? "#000" : "rgba(0,0,0,0.15)",
                color: "#fff",
                border: "none",
                fontSize: 10,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                cursor: chatInput.trim() && !chatLoading ? "pointer" : "default",
                fontFamily: "inherit",
                transition: "background 0.15s",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        * { box-sizing: border-box; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}

// ── Add Modal ────────────────────────────────────────────────────────────────

const MODAL_FIELDS: Array<{ key: string; label: string; type?: string; options?: string[] }> = [
  { key: "firm_name", label: "Firm Name" },
  { key: "website", label: "Website" },
  { key: "hq_location", label: "HQ Location" },
  { key: "size", label: "Size" },
  { key: "corridor", label: "Migration Corridor" },
  { key: "target_market", label: "Target Market" },
  { key: "partner_status", label: "Partner Status" },
  { key: "key_differentiator", label: "Key Differentiator" },
  { key: "contacted", label: "Status", type: "select", options: ["no", "pending", "yes", "replied", "CONFIRMED", "BOOKING MEETING"] },
  { key: "evidence", label: "Evidence" },
  { key: "decision_maker", label: "Decision Makers" },
  { key: "notes", label: "Notes / Contacts", type: "textarea" },
];

function AddModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (data: Record<string, string | number>) => void;
}) {
  const [form, setForm] = useState<Record<string, string>>({
    firm_name: "",
    notes: "",
    contacted: "no",
    corridor: "",
    hq_location: "",
    size: "",
    partner_status: "",
    target_market: "",
    key_differentiator: "",
    website: "",
    evidence: "",
  });

  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    fontSize: 14,
    border: "1.5px solid rgba(0,0,0,0.10)",
    background: "#fafafa",
    fontFamily: "inherit",
    outline: "none",
    letterSpacing: "-0.01em",
    color: "rgba(0,0,0,0.85)",
    transition: "border-color 0.15s, background 0.15s",
    borderRadius: 0,
  };

  // Split fields into two columns (except notes which spans full width)
  const twoColFields = MODAL_FIELDS.filter((f) => f.key !== "notes" && f.type !== "textarea");
  const fullFields = MODAL_FIELDS.filter((f) => f.key === "notes" || f.type === "textarea");

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.50)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: 24,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          width: "100%",
          maxWidth: 560,
          maxHeight: "90vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div
          style={{
            padding: "24px 28px 20px",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "rgba(0,0,0,0.30)",
                marginBottom: 4,
              }}
            >
              New Entry
            </div>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                margin: 0,
                color: "#000",
              }}
            >
              Add New Firm
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(0,0,0,0.30)",
              fontSize: 20,
              padding: "4px 8px",
              lineHeight: 1,
              fontFamily: "inherit",
              transition: "color 0.12s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#000"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(0,0,0,0.30)"; }}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Form body */}
        <div style={{ padding: "24px 28px", flex: 1 }}>
          {/* Two-column grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px 20px",
              marginBottom: 16,
            }}
          >
            {twoColFields.map((field) => (
              <div key={field.key}>
                <label
                  style={{
                    display: "block",
                    fontSize: 11,
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "rgba(0,0,0,0.40)",
                    marginBottom: 6,
                  }}
                >
                  {field.label}
                  {field.key === "firm_name" && (
                    <span style={{ color: "#DC2626", marginLeft: 2 }}>*</span>
                  )}
                </label>
                {field.type === "select" ? (
                  <select
                    value={form[field.key] ?? ""}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    style={{ ...inputBase, cursor: "pointer" }}
                    onFocus={(e) => { e.target.style.borderColor = "#000"; e.target.style.background = "#fff"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(0,0,0,0.10)"; e.target.style.background = "#fafafa"; }}
                  >
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={form[field.key] ?? ""}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    placeholder={field.key === "firm_name" ? "e.g. Meridian Advisory" : ""}
                    style={inputBase}
                    onFocus={(e) => { e.target.style.borderColor = "#000"; e.target.style.background = "#fff"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(0,0,0,0.10)"; e.target.style.background = "#fafafa"; }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Full-width fields */}
          {fullFields.map((field) => (
            <div key={field.key} style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 11,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "rgba(0,0,0,0.40)",
                  marginBottom: 6,
                }}
              >
                {field.label}
              </label>
              <textarea
                value={form[field.key] ?? ""}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                rows={3}
                style={{
                  ...inputBase,
                  resize: "vertical",
                  lineHeight: 1.5,
                }}
                onFocus={(e) => { e.target.style.borderColor = "#000"; e.target.style.background = "#fff"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(0,0,0,0.10)"; e.target.style.background = "#fafafa"; }}
              />
            </div>
          ))}
        </div>

        {/* Modal footer */}
        <div
          style={{
            padding: "16px 28px 24px",
            borderTop: "1px solid rgba(0,0,0,0.08)",
            display: "flex",
            gap: 10,
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "12px 24px",
              border: "1.5px solid rgba(0,0,0,0.15)",
              background: "transparent",
              fontSize: 11,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              cursor: "pointer",
              fontFamily: "inherit",
              color: "rgba(0,0,0,0.50)",
              transition: "color 0.15s, border-color 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(0,0,0,0.80)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,0,0,0.30)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(0,0,0,0.50)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,0,0,0.15)";
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => onAdd(form)}
            disabled={!form.firm_name}
            style={{
              padding: "12px 24px",
              background: form.firm_name ? "#000" : "rgba(0,0,0,0.20)",
              color: "#fff",
              border: `2px solid ${form.firm_name ? "#000" : "transparent"}`,
              fontSize: 11,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              cursor: form.firm_name ? "pointer" : "default",
              fontFamily: "inherit",
              transition: "background 0.15s, color 0.15s",
            }}
            onMouseEnter={(e) => {
              if (!form.firm_name) return;
              (e.currentTarget as HTMLButtonElement).style.background = "#333";
            }}
            onMouseLeave={(e) => {
              if (!form.firm_name) return;
              (e.currentTarget as HTMLButtonElement).style.background = "#000";
            }}
          >
            Add Firm
          </button>
        </div>
      </div>
    </div>
  );
}
