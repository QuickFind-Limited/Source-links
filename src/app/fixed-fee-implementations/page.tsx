"use client";

import React, { useState } from "react";
import {
  Check,
  X,
  Calendar,
  FileText,
  Search,
  Database,
  BarChart3,
  Settings,
  Link,
  Workflow,
  ShieldCheck,
  ArrowRightLeft,
  TestTube,
  BookOpen,
  Receipt,
  Globe,
  Download,
  Truck,
  Landmark,
  FlaskConical,
  Plane,
  Pill,
  HeartPulse,
  Fuel,
  Zap,
  Hammer,
  Users,
  ChevronDown,
  ChevronRight,
  ShoppingCart,
  Server,
  Store,
  GraduationCap,
  Warehouse,
  Tractor,
} from "lucide-react";
import type { ElementType } from "react";

// ─── Scope of Work data ─────────────────────────────────────────────────────

const DISCOVERY = [
  "Current system assessment (system agnostic)",
  "Chart of Accounts review + redesign (if needed)",
  "Financial & operational requirements gathering",
  "Industry-specific workflow analysis",
  "Integration requirements mapping",
  "Define scope boundaries & deliverables",
];

const CONFIG_AND_MIGRATION = [
  "Chart of Accounts setup, transformation & migration",
  "Subsidiaries & multi-entity / multi-currency",
  "Accounting periods & fiscal calendar",
  "Segmentation strategy (Class, Department, Location, etc)",
  "AP, AR, Bank, Fixed Assets, Rev Rec & Tax configuration",
  "Customer & vendor record migration",
  "Open AR invoices & open AP bills",
  "Beginning balances (GL)",
  "Historical financials (up to 10 years)",
  "Full historical transaction migration",
  "Inventory data migration (where applicable)",
  "Order history & open orders migration",
];

const OPERATIONAL = [
  "Inventory management setup",
  "Order management workflows",
  "Procurement & purchase order flows",
  "Warehouse / fulfilment configuration",
  "Industry-specific module setup",
  "Custom fields & record types",
];

const INTEGRATIONS = [
  "E-commerce platform connectors (Shopify, WooCommerce, etc)",
  "Payment gateway integrations",
  "Shipping & logistics integrations",
  "Native bank feeds & payroll connectors",
  "Native tax engines (e.g. Avalara)",
  "Custom API integrations (scoped individually)",
];

const TESTING = [
  "Unit testing (financial + operational flows)",
  "UAT support (finance & operations team)",
  "Data validation: trial balance tie-out",
  "Data validation: inventory reconciliation",
  "End-to-end process testing",
];

const GOLIVE = [
  "Cutover plan (typically aligned to month-end)",
  "Final data migration (open balances + inventory)",
  "System validation",
];

const PARTNER_ACTIVITIES = [
  "Team training (finance & operations)",
  "Admin-level training (light)",
  "Client relationship management",
  "Stakeholder alignment & executive workshops",
  "Change management & internal communications",
  "Post go-live hypercare",
];

// ─── Industry data ──────────────────────────────────────────────────────────

const COMPATIBLE_INDUSTRIES: { name: string; eg: string; Icon: ElementType }[] = [
  { name: "E-commerce", eg: "Shopify stores, DTC brands, Amazon sellers, marketplaces", Icon: ShoppingCart },
  { name: "Data Centres", eg: "Colocation, managed hosting, cloud infrastructure, ISPs", Icon: Server },
  { name: "Retail (Small/Mid)", eg: "Boutiques, specialty shops, single-location, franchisees", Icon: Store },
  { name: "Education / EdTech", eg: "Schools, universities, online learning, training providers", Icon: GraduationCap },
  { name: "Wholesale Distribution", eg: "Industrial distributors, electrical supply, plumbing supply, auto parts", Icon: Warehouse },
  { name: "Insurance", eg: "P&C carriers, life insurers, reinsurers, MGAs, insurtech", Icon: ShieldCheck },
  { name: "Agriculture / AgriTech", eg: "Farms, agri-processors, crop management", Icon: Tractor },
  { name: "Financial Services (RIA)", eg: "Wealth managers, RIAs, financial planners", Icon: BarChart3 },
  { name: "Financial Services (General)", eg: "Banks, brokerages, insurance back-office", Icon: Landmark },
  { name: "Nursing Home / Aged Care", eg: "Nursing homes, assisted living, aged care", Icon: HeartPulse },
  { name: "Manufacturing", eg: "Machine shops, electronics assembly, contract mfg", Icon: Settings },
  { name: "Construction", eg: "General contractors, subcontractors, civil engineering", Icon: Hammer },
  { name: "Apparel & Fashion", eg: "Clothing brands, fashion labels, textile mfg", Icon: Store },
  { name: "Retail (Omnichannel)", eg: "Multi-store chains, department stores, franchises", Icon: ShoppingCart },
  { name: "Food & Beverage", eg: "Breweries, bakeries, dairy processors, meat packers", Icon: Store },
  { name: "CPG", eg: "Packaged food, personal care, cleaning products", Icon: Store },
  { name: "Recycling", eg: "Scrap metal yards, paper recyclers, e-waste", Icon: ArrowRightLeft },
  { name: "Solar / Renewables", eg: "Solar installers, wind farm operators, EPC", Icon: Zap },
];

const CUSTOM_SCOPING_INDUSTRIES: { name: string; eg: string; Icon: ElementType }[] = [
  { name: "Mining", eg: "Gold/copper mines, quarries, mineral exploration", Icon: Hammer },
  { name: "Transportation / Logistics", eg: "Trucking, freight brokers, courier services", Icon: Truck },
  { name: "Government", eg: "Agencies, municipalities, public sector depts", Icon: Landmark },
  { name: "Chemicals / Process Mfg", eg: "Chemical producers, paint mfg, adhesives, coatings", Icon: FlaskConical },
  { name: "Aerospace & Defense", eg: "Aircraft parts suppliers, defense contractors, MRO", Icon: Plane },
  { name: "Life Sciences / Pharma", eg: "Pharma, biotech, medical device mfg, CROs", Icon: Pill },
  { name: "Healthcare", eg: "Hospitals, clinics, physician groups, telehealth", Icon: HeartPulse },
  { name: "Oil & Gas", eg: "E&P companies, oilfield services, midstream", Icon: Fuel },
  { name: "Energy / Utilities", eg: "Electric utilities, water utilities, gas distributors", Icon: Zap },
];

// ─── Target systems ─────────────────────────────────────────────────────────

const TARGET_SYSTEMS = [
  "Oracle NetSuite", "SAP S/4HANA Cloud", "Dynamics 365 BC", "Dynamics 365 F&O",
  "Sage Intacct", "SAP Business One", "Acumatica", "Epicor Kinetic",
  "Infor M3", "Infor CloudSuite", "Odoo", "SAP ECC",
  "IFS Cloud", "SYSPRO", "Sage X3", "Oracle Fusion Cloud",
];

const SOURCE_DESKTOP = [
  "QuickBooks (all versions)", "Xero", "MYOB / Reckon",
  "Sage 50 / 100 / 300", "FreshBooks / Wave", "Zoho Books",
];

const SOURCE_LEGACY = [
  "Dynamics GP / Great Plains", "Dynamics NAV / Navision", "SAP ECC / R/3",
  "Oracle E-Business Suite", "Epicor (all versions)", "Infor (all versions)",
];

const SOURCE_OTHER = [
  "Spreadsheets / Excel", "CSV / flat file exports", "Custom / in-house systems",
  "Access databases", "SQL / database exports", "+ any other system",
];

// ─── Collapsible scope section ──────────────────────────────────────────────

function ScopeSection({
  title,
  items,
  owner = "source",
  defaultOpen = false,
}: {
  title: string;
  items: string[];
  owner?: "source" | "partner";
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-black/[0.06] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 text-left hover:bg-[#fafafa] transition-colors"
      >
        <span className="text-[15px] sm:text-[16px] font-medium text-black/80">{title}</span>
        <div className="flex items-center gap-3">
          <span
            className={`text-[10px] font-mono uppercase tracking-[0.10em] font-bold px-2.5 py-1 ${
              owner === "source"
                ? "text-[#16a34a] bg-[#16a34a]/[0.08] border border-[#16a34a]/20"
                : "text-[#ea580c] bg-[#ea580c]/[0.08] border border-[#ea580c]/20"
            }`}
          >
            {owner === "source" ? "Source" : "Partner"}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-black/30 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            strokeWidth={2}
          />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 sm:px-6 pb-5 sm:pb-6">
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 ${owner === "partner" ? "bg-[#ea580c]/[0.03] border border-[#ea580c]/10 rounded-sm p-4 sm:p-5" : ""}`}>
            {items.map((item) => (
              <div key={item} className="flex items-start gap-3">
                {owner === "partner" ? (
                  <div className="w-5 h-5 shrink-0 mt-0.5 rounded-full border border-[#ea580c]/25 bg-[#ea580c]/[0.06] flex items-center justify-center">
                    <Users className="w-2.5 h-2.5 text-[#ea580c]/70" strokeWidth={2.5} />
                  </div>
                ) : (
                  <Check className="w-4 h-4 shrink-0 mt-0.5 text-[#16a34a]/70" strokeWidth={2.5} />
                )}
                <span className={`text-[14px] sm:text-[15px] font-[450] leading-snug ${owner === "partner" ? "text-black/70" : "text-black/65"}`}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function FixedFeeImplementationsPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-black">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-5 border-b border-black/[0.06] gap-2">
          <span className="text-[32px] sm:text-[38px] font-display tracking-normal leading-tight text-black">Source</span>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="text-[14px] sm:text-[22px] font-mono uppercase tracking-[0.06em] text-black/70 font-bold">
              Per-Project Fixed Fee
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <div className="mb-6">
          <div className="text-[13px] sm:text-[14px] font-mono uppercase tracking-[0.08em] text-black/40 mb-1">
            Partner Pricing, Scope & Terms
          </div>
        </div>

        {/* Overview + Sidebar */}
        <div className="bg-white border border-black/[0.08] mb-6">
          <div className="flex flex-col md:flex-row">
            <div className="md:flex-1 p-4 sm:p-6 md:border-r border-b md:border-b-0 border-black/[0.06] flex flex-col">
              {/* Value prop */}
              <div className="border-2 border-black/[0.08] rounded-sm px-6 sm:px-8 py-5 sm:py-6 mb-5">
                <p className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold text-black/90 leading-[1.35]">
                  Fixed-price implementations for industries beyond core financials
                </p>
                <p className="text-[15px] sm:text-[16px] text-black/50 mt-3 leading-[1.65]">
                  For engagements where operational elements matter — inventory, order management, industry-specific workflows. Every project scoped individually, priced fixed, delivered white-label.
                </p>
              </div>

              {/* How it works */}
              <div className="bg-[#f7f7f5] border border-black/[0.08] rounded-sm px-5 sm:px-7 py-5 sm:py-6 mb-2">
                <div className="text-[11px] font-mono uppercase tracking-[0.12em] text-black/35 mb-3.5">
                  How It Works
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  {[
                    { step: "1", title: "You Share", desc: "Drop your SOWs or requirements into a shared Google Drive" },
                    { step: "2", title: "Source AI Scopes", desc: "Fixed-price SOW back to you within 24 hours" },
                    { step: "3", title: "You Deliver", desc: "White-label it to your client. We handle delivery." },
                  ].map(({ step, title, desc }) => (
                    <div key={step} className="flex items-start gap-3">
                    <div className="flex h-7 w-7 items-center justify-center bg-black text-white text-[12px] font-bold shrink-0">
                        {step}
                      </div>
                      <div>
                        <div className="text-[15px] font-semibold text-black/80">{title}</div>
                        <div className="text-[13px] sm:text-[14px] text-black/50 leading-snug mt-0.5">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-black/[0.08]">
                  <div className="text-[15px] sm:text-[16px] font-semibold text-black/80">
                    Share your existing SOWs, discovery transcripts, or requirements.
                  </div>
                  <div className="text-[14px] text-black/45 mt-0.5">
                    We return a complete SOW, fixed-price quote, and proposal within 24 hours. Fully white-labelled.
                  </div>
                </div>
              </div>

              {/* Logos */}
              <div className="mt-auto pt-6 flex justify-center">
                <div className="inline-flex items-center flex-wrap sm:flex-nowrap gap-x-6 gap-y-0 sm:gap-x-8 px-4 sm:px-5 py-3">
                  {[
                    { src: "/logos/netsuite.svg", alt: "NetSuite", h: "h-[70px] sm:h-[78px] md:h-[86px]" },
                    { src: "/logos/dynamics365.svg", alt: "Dynamics 365", h: "h-[52px] sm:h-[60px] md:h-[68px]" },
                    { src: "/logos/sap.svg", alt: "SAP", h: "h-[48px] sm:h-[56px] md:h-[64px]" },
                    { src: "/logos/sage.svg", alt: "Sage", h: "h-[46px] sm:h-[54px] md:h-[62px]" },
                  ].map((logo) => (
                    <img key={logo.alt} src={logo.src} alt={logo.alt} className={`${logo.h} w-auto shrink-0 block object-contain`} />
                  ))}
                </div>
              </div>
            </div>

            {/* Black sidebar — What Source AI Handles */}
            <div className="md:w-[320px] shrink-0 bg-black p-4 sm:p-5">
              <div className="text-[13px] sm:text-[14px] font-mono uppercase tracking-[0.08em] text-white font-bold mb-3">
                Source AI Handles<br />(End-to-End)
              </div>
              <div className="h-px bg-white/20 mb-4" />
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-2.5 sm:gap-0 sm:space-y-3">
                {[
                  { label: "Discovery & requirements", Icon: FileText },
                  { label: "ERP configuration", Icon: Settings },
                  { label: "Data & transaction migration", Icon: Database },
                  { label: "Operational modules", Icon: Workflow },
                  { label: "Custom workflows", Icon: ArrowRightLeft },
                  { label: "Integrations", Icon: Link },
                  { label: "Reporting & dashboards", Icon: BarChart3 },
                  { label: "Testing & validation", Icon: TestTube },
                  { label: "Go-live & cutover", Icon: ShieldCheck },
                ].map(({ label, Icon }) => (
                  <div key={label} className="flex items-center gap-2 sm:gap-2.5">
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/35 shrink-0" strokeWidth={1.75} />
                    <span className="text-[13px] sm:text-[15px] font-medium text-white/85">{label}</span>
                  </div>
                ))}
              </div>
              <div className="h-px bg-white/10 mt-4 mb-3" />
              <div className="text-[10px] font-mono uppercase tracking-[0.10em] text-red-400/70 font-bold mb-2">
                Partner-Owned
              </div>
              <div className="space-y-2.5">
                {[
                  "Team training",
                  "Client relationship",
                  "Change management",
                  "Post go-live hypercare",
                  "Stakeholder alignment",
                ].map((label) => (
                  <div key={label} className="flex items-center gap-2 sm:gap-2.5">
                    <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400/60 shrink-0" strokeWidth={2} />
                    <span className="text-[13px] sm:text-[15px] font-medium text-white/40 line-through decoration-white/20">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Pricing ────────────────────────────────────────────────────── */}
        <div id="pricing" className="bg-white border border-black/[0.08] p-4 sm:p-6 mb-6 scroll-mt-4">
          <div className="text-[22px] sm:text-[28px] font-medium tracking-tight text-black mb-2">
            Pricing
          </div>
          <div className="text-[16px] sm:text-[18px] text-black/50 leading-[1.7] mb-5">
            Fixed per project. Scoped based on client size, complexity, and module requirements.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {[
              { range: "$5M – $25M Revenue", label: "SMEs", price: "Avg $7.5K" },
              { range: "$25M – $50M Revenue", label: "Mid-Market", price: "Avg $25K" },
              { range: "$50M – $100M Revenue", label: "Upper Mid-Market", price: "Avg $50K" },
              { range: "$100M+ Revenue", label: "Enterprise", price: "Custom" },
            ].map((tier) => (
              <div key={tier.range} className="bg-white border border-black/[0.06] px-5 sm:px-6 py-5 sm:py-6 text-center">
                <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.12em] text-black/55 font-bold mb-1">{tier.range}</div>
                <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-black/35 mb-2">{tier.label}</div>
                <div className="text-[28px] sm:text-[32px] font-medium tracking-tight text-black">{tier.price}</div>
              </div>
            ))}
          </div>

          {/* Industries */}
          <div id="industries" className="mt-6 pt-6 border-t border-black/[0.06]">
            <div className="text-[18px] sm:text-[22px] font-medium tracking-tight text-black mb-1">
              Compatible Industries
            </div>
            <div className="text-[13px] sm:text-[14px] text-black/45 mb-4">
              Industries with operational components. Source AI offers fixed pricing for these projects on a case-by-case basis.
            </div>
            <div className="bg-[#f8f8f6] border border-black/[0.06] rounded-sm p-4 sm:p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {COMPATIBLE_INDUSTRIES.map(({ name, eg, Icon }) => (
                  <div key={name} className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-white shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-black/50" strokeWidth={1.75} />
                    </div>
                    <div>
                      <div className="text-[16px] sm:text-[18px] font-medium text-black/80">{name}</div>
                      <div className="text-[13px] sm:text-[14px] text-black/45 leading-snug mt-0.5">{eg}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Scope of Work ────────────────────────────────────────────── */}
        <div className="bg-white border border-black/[0.08] p-4 sm:p-6 mb-6">
          <div className="text-[22px] sm:text-[28px] font-medium tracking-tight text-black mb-2">
            Scope of Work
          </div>
          <div className="text-[16px] sm:text-[18px] text-black/50 leading-[1.7] mb-5">
            Everything Source AI handles end-to-end for per-project implementations.
          </div>

          <ScopeSection title="Discovery & Requirements" items={DISCOVERY} owner="source" defaultOpen />
          <ScopeSection title="Configuration & Data Migration" items={CONFIG_AND_MIGRATION} owner="source" defaultOpen />
          <ScopeSection title="Operational Modules" items={OPERATIONAL} owner="source" defaultOpen />
          <ScopeSection title="Integrations" items={INTEGRATIONS} owner="source" />
          <ScopeSection title="Testing & Validation" items={TESTING} owner="source" />
          <ScopeSection title="Go-Live & Cutover" items={GOLIVE} owner="source" />
          <ScopeSection title="Partner-Owned Activities" items={PARTNER_ACTIVITIES} owner="partner" defaultOpen />
        </div>

        {/* ── Target Systems ──────────────────────────────────────────── */}
        <div className="bg-white border border-black/[0.08] p-4 sm:p-6 mb-6">
          <div className="text-[18px] sm:text-[22px] font-medium tracking-tight text-black mb-1">
            Supported Target Systems
          </div>
          <div className="text-[13px] sm:text-[14px] text-black/45 mb-4">
            Source AI delivers implementations across all major ERP platforms.
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {TARGET_SYSTEMS.map((system) => (
              <div key={system} className="flex items-center gap-2.5">
                <Check className="w-3.5 h-3.5 shrink-0 text-[#16a34a]" strokeWidth={2} />
                <span className="text-[13px] sm:text-[14px] text-black/75 font-[450]">{system}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Exclusions + Terms ──────────────────────────────────────── */}
        <div className="bg-white border border-black/[0.08] mb-6 overflow-hidden">
          <div className="p-4 sm:p-6">
            <div className="text-[16px] sm:text-[22px] font-medium tracking-tight text-black mb-1">
              Terms & Conditions
            </div>
            <div className="text-[14px] sm:text-[15px] text-black/50 mb-4 leading-[1.7]">
              Per-project fixed pricing terms.
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
              {[
                "Fixed price covers scoped modules as defined in SOW",
                "Each project scoped and quoted individually",
                "Source AI cost invoiced to partner, not end-client",
                "Payment: 50% kick-off, 50% go-live. Net 15",
                "Partner pricing to end-client at partner's discretion",
                "14-day post go-live defect resolution window",
                "External integrations scoped and quoted separately",
                "All data governed by executed NDA and MSA",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 py-1">
                  <span className="mt-[7px] w-1 h-1 bg-black/25 rounded-full shrink-0" />
                  <span className="text-[13px] sm:text-[14px] text-black/55 leading-[1.6]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Custom Scoping ─────────────────────────────────────────── */}
        <CustomScopingSection />

        {/* ── Confidentiality notice ──────────────────────────────────── */}
        <div className="mt-6 bg-[#f8f8f6] border border-black/[0.06] rounded-sm px-4 sm:px-5 py-3.5">
          <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-black/30 mb-1">Confidentiality</div>
          <p className="text-[13px] sm:text-[14px] text-black/45 leading-[1.6]">
            This document and all pricing herein are confidential to the partner. May not be shared with end-clients or
            third parties without Source AI&apos;s written consent.
          </p>
        </div>

        {/* Download */}
        <div className="mt-8 flex justify-center">
          <a
            href="/api/export/per-project"
            className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.08em] text-black/70 border border-black/[0.18] bg-white px-4 sm:px-5 py-2 hover:text-black hover:border-black/30 transition-colors"
          >
            <Download className="w-3.5 h-3.5" strokeWidth={2} />
            Download PDF
          </a>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-black/20">
            Source AI is a product of QuickFind AI, Inc. Confidential. Pricing subject to change.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Custom Scoping (collapsible) ───────────────────────────────────────────

function CustomScopingSection() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-2">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.08em] text-black/40 hover:text-black/60 transition-colors mb-4"
      >
        <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-90" : ""}`} strokeWidth={2} />
        See industries requiring custom scoping
      </button>

      {open && (
        <div className="bg-black p-4 sm:p-6 rounded-sm">
          <div className="text-[12px] sm:text-[14px] font-mono uppercase tracking-[0.08em] text-white font-bold mb-2">
            Custom Scoping — Limited
          </div>
          <div className="w-full h-px bg-white/15 mb-3 sm:mb-4" />
          <p className="text-[13px] sm:text-[14px] text-white/70 leading-[1.6] mb-3 sm:mb-4">
            Complex or regulated industries. Requires custom scoping and discussing with our internal consultants and team.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CUSTOM_SCOPING_INDUSTRIES.map(({ name, eg, Icon }) => (
              <div key={name} className="border border-white/10 bg-white/[0.03] rounded-sm p-3 sm:p-3.5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] shrink-0">
                    <Icon className="w-4 h-4 text-white/75" strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="text-[15px] sm:text-[16px] font-semibold text-white/90">{name}</div>
                    <div className="text-[13px] sm:text-[14px] text-white/50 leading-snug mt-0.5">{eg}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <a
              href="https://cal.com/source-ai/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.08em] bg-white text-black px-5 py-2.5 hover:bg-white/90 transition-colors w-full sm:w-auto justify-center sm:justify-start"
            >
              <Calendar className="w-3.5 h-3.5" strokeWidth={1.75} />
              Schedule a Call
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
