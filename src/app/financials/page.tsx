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
  CreditCard,
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
  Clock,
  DollarSign,
  Users,
  ChevronDown,
  ChevronRight,
  Building2,
  Briefcase,
  Code2,
  Monitor,
  Heart,
  Hotel,
  Home,
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
  "Current system assessment (System agnostic)",
  "Chart of Accounts review + redesign (if needed)",
  "Financial reporting requirements (P&L, BS, Cash Flow, segments)",
  "Close process review (monthly / quarterly)",
  "Tax / compliance requirements review",
  "Define scope boundaries (financials only — no ops)",
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
  "Bank balances & reconciliations",
  "Full historical transaction migration",
  "Journal entry imports for balances",
];

const PROCESSES = [
  "Invoice generation (basic)",
  "Vendor bill processing",
  "Payment processing (checks, ACH)",
  "Collections / dunning (light config)",
  "Approval workflows (AP approvals)",
  "Month-end close checklist",
];

const REPORTING = [
  "Profit & Loss",
  "Balance Sheet",
  "Cash Flow Statement",
  "Custom segmentation reporting",
  "Saved searches (AR aging, AP aging, cash position)",
  "Executive dashboards (CFO-level)",
];

const INTEGRATIONS = [
  "NetSuite-native bank feeds",
  "SuiteApp activation & configuration",
  "Native payroll connectors (NS-supported)",
  "Native tax engines (e.g. Avalara via SuiteApp)",
];

const TESTING = [
  "Unit testing (financial flows)",
  "UAT support (finance team only)",
  "Data validation: trial balance tie-out",
  "Data validation: AR/AP reconciliation",
  "Parallel close (optional, recommended)",
];

const GOLIVE = [
  "Cutover plan (typically aligned to month-end)",
  "Final data migration (open balances)",
  "System validation",
];

const PARTNER_ACTIVITIES = [
  "Finance team training",
  "Admin-level training (light)",
  "Client relationship management",
  "Stakeholder alignment & executive workshops",
  "Change management & internal communications",
  "Post go-live hypercare: issue resolution",
  "Post go-live hypercare: report adjustments",
  "Post go-live hypercare: first month close cycle support",
];

const EXCLUSIONS = [
  "Inventory / WMS modules",
  "Order Management",
  "Manufacturing modules",
  "Advanced CRM",
  "Complex customisations",
  "Heavy operational ERP environments",
];

// ─── Pricing data ───────────────────────────────────────────────────────────

const PRICING_TABLE = [
  { client: "$10,000", source: "$5,000", margin: "$5,000", pct: "50%" },
  { client: "$15,000", source: "$7,500", margin: "$7,500", pct: "50%" },
  { client: "$25,000", source: "$12,500", margin: "$12,500", pct: "50%" },
  { client: ">$25,000", source: "Custom", margin: "Custom", pct: "" },
];

// ─── Margin Calculator ──────────────────────────────────────────────────────

function MarginCalculator() {
  const [clientPrice, setClientPrice] = useState<string>("");

  const price = parseFloat(clientPrice.replace(/[^0-9.]/g, "")) || 0;
  const sourceCost = Math.round(price * 0.5);
  const margin = price - sourceCost;
  const marginPct = price > 0 ? 50 : 0;

  const estimatedWeeks = price <= 0 ? null : price <= 10000 ? "2–3" : price <= 15000 ? "3–4" : price <= 25000 ? "4–5" : "5–6";

  function formatUSD(n: number): string {
    return n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
  }

  return (
    <div className="border-t border-black/[0.06] pt-4">
      <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-black/30 mb-3">Margin Calculator</div>
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="w-full sm:w-[220px]">
          <label className="text-[11px] font-mono uppercase tracking-[0.08em] text-black/40 mb-1.5 block">
            Client Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-black/30">$</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="12,000"
              value={clientPrice}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                if (raw) {
                  setClientPrice(parseInt(raw, 10).toLocaleString("en-US"));
                } else {
                  setClientPrice("");
                }
              }}
              className="w-full pl-7 pr-3 py-2.5 text-[16px] font-medium text-black bg-white border border-black/[0.12] rounded-sm focus:outline-none focus:border-black/30 transition-colors"
            />
          </div>
        </div>

        {price > 0 && (
          <div className="flex items-center gap-6 pt-1 sm:pt-5">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.08em] text-black/30 mb-0.5">Source Cost</div>
              <div className="text-[16px] text-black/50">{formatUSD(sourceCost)}</div>
            </div>
            <div className="w-px h-8 bg-black/[0.08]" />
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.08em] text-black/30 mb-0.5">Your Margin</div>
              <div className="text-[16px] font-semibold text-black">{formatUSD(margin)} <span className="text-[#16a34a] text-[13px] font-medium">({marginPct}%)</span></div>
            </div>
            {estimatedWeeks && (
              <>
                <div className="w-px h-8 bg-black/[0.08]" />
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.08em] text-black/30 mb-0.5">Est. Timeline</div>
                  <div className="text-[16px] text-black/70 font-medium">{estimatedWeeks} weeks</div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Industry data ──────────────────────────────────────────────────────────

const FIXED_INDUSTRIES: { name: string; eg: string; Icon: ElementType }[] = [
  { name: "Corporate Services", eg: "Holding companies, shared service centres, family offices", Icon: Building2 },
  { name: "Business Services", eg: "Staffing, cleaning, security, facility management, fleet", Icon: Briefcase },
  { name: "Professional Services", eg: "Law firms, accounting firms, consultancies, IT services", Icon: Users },
  { name: "Software / SaaS", eg: "B2B SaaS, dev tools, cloud platforms, cybersecurity", Icon: Code2 },
  { name: "Media & Internet", eg: "Digital publishers, streaming, podcasting, social media", Icon: Monitor },
  { name: "Nonprofit", eg: "Foundations, charities, associations, membership orgs", Icon: Heart },
  { name: "Hospitality", eg: "Hotels, restaurants, cafes, catering, event venues", Icon: Hotel },
  { name: "Real Estate", eg: "Property managers, brokerages, investment firms, REITs", Icon: Home },
];

const PER_PROJECT_INDUSTRIES: { name: string; eg: string; Icon: ElementType }[] = [
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

// ─── Collapsible scope section ──────────────────────────────────────────────

function ScopeSection({
  title,
  items,
  owner = "source",
  defaultOpen = false,
}: {
  title: string;
  items: string[];
  owner?: "source" | "partner" | "mixed";
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
                : owner === "partner"
                ? "text-[#ea580c] bg-[#ea580c]/[0.08] border border-[#ea580c]/20"
                : "text-black/50 bg-black/[0.04] border border-black/10"
            }`}
          >
            {owner === "source" ? "Source" : owner === "partner" ? "Partner" : "Shared"}
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

// ─── Copy & Send tabs ───────────────────────────────────────────────────────

const TEMPLATES: { id: string; label: string; content: string }[] = [
  {
    id: "email",
    label: "Email",
    content: `Subject: NetSuite Financials — live in under 30 days, guaranteed fixed price

Hi [Name],

We can get you off your current system and fully live on NetSuite Financials in under 30 days at a guaranteed fixed cost — no hourly billing, no scope creep, no surprises.

Here's what's included in the fixed fee:

— Discovery & requirements (system agnostic — we assess whatever you're on)
— Chart of Accounts setup, redesign, and full migration
— GL, AP, AR, Bank, Tax, Fixed Assets, and Revenue Recognition configuration
— Full master data migration (customers, vendors, open invoices, open bills)
— Historical transaction migration (up to 10 years)
— Financial workflows (invoice generation, bill processing, AP approvals, month-end close)
— CFO-level reporting: P&L, Balance Sheet, Cash Flow, AR/AP aging, executive dashboards
— Native integrations (bank feeds, payroll connectors, Avalara tax)
— Full UAT, trial balance tie-out, AR/AP reconciliation, and go-live

The fee is fixed between $10K and $25K depending on company size. Cutover is typically aligned to month-end.

No other provider offers this. Traditional financials-only implementations are not at this price or speed.

Happy to walk through the full scope in 15 minutes. Would [day] work?

[Your name]
[Your firm]`,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    content: `Hey [Name] — we're now offering complete Financials First NetSuite implementations at a fixed fee ($10K–$25K), delivered in under 30 days.

That's everything: discovery, CoA migration, GL/AP/AR/Bank/Tax config, up to 10 years of historical data, financial workflows, CFO-level dashboards, UAT, and go-live. One price, no hourly billing.

No other provider does this at this price. Happy to share the full scope doc if useful.`,
  },
  {
    id: "proposal",
    label: "Proposal Insert",
    content: `FINANCIALS FIRST IMPLEMENTATION — FIXED FEE

Complete financials-only NetSuite / Dynamics implementation covering:

Discovery & Requirements — Current system assessment, Chart of Accounts review, financial reporting requirements (P&L, BS, Cash Flow, segments), close process review, tax/compliance review.

Configuration — General Ledger setup, subsidiaries, accounting periods, multi-entity/multi-currency, segmentation strategy. Full AP, AR, Bank/Cash Management, Fixed Assets, Revenue Recognition, and Tax configuration.

Data Migration — Chart of Accounts, customers, vendors, open AR/AP, beginning balances, historical financials (up to 10 years), bank reconciliations. Full transaction migration including open invoices, open bills, unpaid balances, and journal entries.

Workflows & Reporting — Invoice generation, vendor bill processing, payment processing, collections/dunning, AP approval workflows, month-end close checklist. P&L, Balance Sheet, Cash Flow, segmentation reporting, saved searches (AR/AP aging, cash position), executive dashboards.

Integrations — NetSuite-native bank feeds, SuiteApp activation, native payroll connectors, native tax engines (Avalara).

Testing & Go-Live — Unit testing, UAT support, trial balance tie-out, AR/AP reconciliation, parallel close, cutover plan, final data migration, system validation.

Fixed fee: $[amount]  |  Timeline: Under 30 days  |  Payment: 50% kick-off, 50% go-live (Net 15)

Excludes: Inventory/WMS, Order Management, Manufacturing, Advanced CRM, complex SuiteScript customisations. External integrations (Ramp, Brex, Bill.com, etc.) scoped and quoted separately.`,
  },
  {
    id: "oneliner",
    label: "One-Liners",
    content: `• We can get you off your system and fully live on NetSuite Financials in under 30 days at a guaranteed fixed cost, no hourly billing, no scope creep, no surprises.

• Complete financials migration — GL, AP, AR, Bank, Tax, 10 years of history, CFO dashboards — $10K to $25K fixed.

• No other provider offers a guaranteed fixed cost for end-to-end financial ERP migration, configuration, and go-live.

• From legacy to NetSuite in 30 days: discovery, data migration, configuration, reporting, UAT, go-live. One fixed fee.

• Traditional financials-only implementations are not at this price. We deliver in under 30 days, fully configured, fully migrated.`,
  },
  {
    id: "scope",
    label: "Scope Summary",
    content: `WHAT'S INCLUDED (END-TO-END)

✓ Discovery & requirements (system agnostic)
✓ Chart of Accounts setup or transformation
✓ GL, AP, AR, Bank, Tax, Fixed Assets, Rev Rec configuration
✓ Subsidiaries, multi-entity, multi-currency
✓ Full master data migration (CoA, customers, vendors, open AR/AP, GL balances)
✓ Historical financials migration (up to 10 years)
✓ Full transaction migration (open invoices, bills, unpaid balances, journal entries)
✓ Financial workflows (invoicing, bill processing, payments, AP approvals, month-end close)
✓ Reporting: P&L, Balance Sheet, Cash Flow, segmentation, AR/AP aging, executive dashboards
✓ Native integrations (bank feeds, payroll, Avalara tax)
✓ UAT, trial balance tie-out, AR/AP reconciliation
✓ Cutover plan and go-live

WHAT'S NOT INCLUDED
✗ Inventory / WMS modules
✗ Order Management
✗ Manufacturing modules
✗ Advanced CRM
✗ Complex SuiteScript customisations
✗ External integrations (Ramp, Brex, Bill.com — scoped separately)`,
  },
];

function CopySendTabs() {
  const [active, setActive] = useState("email");
  const [copied, setCopied] = useState(false);
  const current = TEMPLATES.find((t) => t.id === active)!;

  function handleCopy() {
    navigator.clipboard.writeText(current.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-white border border-black/[0.08] p-4 sm:p-6 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[14px] sm:text-[16px] font-medium text-black/80">Copy & Send</div>
        <button
          onClick={handleCopy}
          className="text-[11px] font-mono uppercase tracking-[0.08em] text-black/60 border border-black/[0.14] px-3 py-1.5 hover:text-black hover:border-black/25 transition-colors"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={() => { setActive(t.id); setCopied(false); }}
            className={`text-[11px] font-mono uppercase tracking-[0.08em] px-3 py-1.5 transition-colors ${
              active === t.id
                ? "bg-black text-white"
                : "text-black/50 border border-black/[0.10] hover:text-black/70 hover:border-black/20"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="bg-[#fafafa] border border-black/[0.06] rounded-sm p-4 sm:p-5">
        <pre className="text-[13px] sm:text-[14px] text-black/65 leading-[1.7] whitespace-pre-wrap font-[inherit]">
          {current.content}
        </pre>
      </div>
    </div>
  );
}

// ─── Other Industries link ───────────────────────────────────────────────────

const TERMS_TABS = {
  "Scope & Pricing": [
    "Fixed price covers financials-only modules as defined in scope",
    "$7.5K–$25K applies strictly to defined financial deliverables",
    "External integrations scoped and quoted separately",
    "Reporting and dashboards available as an add-on",
  ],
  Delivery: [
    "Target: sub-30 days from kick-off to go-live",
    "Cutover typically aligned to month-end",
    "14-day post go-live defect resolution window",
    "Source AI handles all technical delivery end-to-end",
  ],
  Commercial: [
    "Source AI cost invoiced to partner, not end-client",
    "Payment: 50% kick-off, 50% go-live. Net 15",
    "Partner pricing to end-client at partner's discretion",
    "Partner must disclose price charged to end-client — transparency is required",
    "All data governed by executed NDA and MSA",
  ],
} as const;

type TermsTabKey = keyof typeof TERMS_TABS;

function TermsTabs() {
  const tabs = Object.keys(TERMS_TABS) as TermsTabKey[];
  const [active, setActive] = useState<TermsTabKey>(tabs[0]);

  return (
    <div className="bg-[#f8f8f6] border-t border-black/[0.06] p-4 sm:p-6">
      <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-black/30 font-bold mb-4">
        Terms & Conditions
      </div>
      <div className="flex items-center gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.08em] px-3 sm:px-4 py-2 border transition-colors ${
              active === tab
                ? "bg-white border-black/[0.12] text-black font-bold shadow-sm"
                : "bg-transparent border-black/[0.06] text-black/40 hover:text-black/60 hover:border-black/[0.10]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="bg-white border border-black/[0.06] rounded-sm px-5 py-4">
        {TERMS_TABS[active].map((item) => (
          <div key={item} className="flex items-start gap-2.5 py-1.5">
            <span className="mt-[7px] w-1 h-1 bg-black/25 rounded-full shrink-0" />
            <span className="text-[13px] sm:text-[14px] text-black/70 leading-[1.6]">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OtherIndustries() {
  return (
    <div className="mt-10">
      <a
        href="/fixed-fee-implementations"
        className="w-full flex items-center gap-6 sm:gap-8 px-8 sm:px-10 py-8 sm:py-10 bg-white border-2 border-black/[0.08] hover:border-black/[0.20] transition-colors group text-left"
      >
        <div className="flex-1">
          <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.14em] text-black/30 mb-2">
            Need more than financials?
          </div>
          <div className="text-[24px] sm:text-[30px] font-medium tracking-tight text-black/85 group-hover:text-black transition-colors mb-2 leading-[1.2]">
            Get a fixed price for any implementation
          </div>
          <div className="text-[15px] sm:text-[17px] text-black/45 leading-[1.65] max-w-[700px]">
            Inventory, order management, e-commerce, manufacturing, and more — every project scoped individually and priced as a fixed fee. Share your requirements and receive a full proposal within 24 hours.
          </div>
        </div>
        <span className="text-[13px] sm:text-[14px] font-mono uppercase tracking-[0.08em] text-black/25 group-hover:text-black/60 shrink-0 transition-colors font-bold">View →</span>
      </a>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function FinancialsFirstPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-black">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-5 border-b border-black/[0.06] gap-2">
          <span className="text-[32px] sm:text-[38px] font-display tracking-normal leading-tight text-black">
            Source
          </span>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="text-[14px] sm:text-[22px] font-mono uppercase tracking-[0.06em] text-black/70 font-bold">
              AI Financials Implementation
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <div className="mb-6">
          <div className="text-[13px] sm:text-[14px] font-mono uppercase tracking-[0.08em] text-black/40 mb-1">
            Partner Pricing, Scope & Terms of Engagement
          </div>
          <p className="text-[17px] sm:text-[20px] italic text-black/55 leading-[1.5]">
            Scale your finance-heavy implementations with AI and make 50%+ margin.
          </p>
        </div>

        {/* Hero stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
          <div className="bg-white border border-black/[0.06] px-5 sm:px-6 py-5 sm:py-6 text-center">
            <Clock className="w-5 h-5 mx-auto text-black/25 mb-2" strokeWidth={1.75} />
            <div className="text-[32px] sm:text-[36px] font-medium tracking-tight text-black select-none">
              Under 30 Days
            </div>
            <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.12em] text-black/50 font-bold mt-1">
              Kick-off to go-live
            </div>
          </div>
          <div className="bg-white border border-black/[0.06] px-5 sm:px-6 py-5 sm:py-6 text-center">
            <DollarSign className="w-5 h-5 mx-auto text-black/25 mb-2" strokeWidth={1.75} />
            <div className="text-[32px] sm:text-[36px] font-medium tracking-tight text-black select-none">
              $7.5K – $25K
            </div>
            <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.12em] text-black/50 font-bold mt-1">
              Fixed fee, no surprises
            </div>
          </div>
          <div className="bg-white border border-black/[0.06] px-5 sm:px-6 py-5 sm:py-6 text-center">
            <Users className="w-5 h-5 mx-auto text-black/25 mb-2" strokeWidth={1.75} />
            <div className="text-[32px] sm:text-[36px] font-medium tracking-tight text-black select-none">
              Co-Branded
            </div>
            <div className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.12em] text-black/50 font-bold mt-1">
              Powered by Source AI
            </div>
          </div>
        </div>

        {/* Overview + What's Included sidebar */}
        <div className="bg-white border border-black/[0.08] mb-6">
          <div className="flex flex-col md:flex-row">
            <div className="md:flex-1 p-4 sm:p-6 md:border-r border-b md:border-b-0 border-black/[0.06] flex flex-col">
              {/* Value prop */}
              <div className="border-2 border-black/[0.08] rounded-sm px-6 sm:px-8 py-5 sm:py-6 mb-5">
                <p className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold text-black/90 leading-[1.35]">
                  Complete financials implementations with Source AI for a fixed price, in under 30 days
                </p>
                <p className="text-[15px] sm:text-[16px] text-black/50 mt-3 leading-[1.65]">
                  Discovery through go-live in under 30 days. Source AI handles all technical delivery — you keep the client relationship.
                </p>
              </div>

              {/* Partner pitch */}
              <div className="bg-[#f7f7f5] border border-black/[0.08] rounded-sm px-6 sm:px-9 py-7 sm:py-9 mb-2">
                <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-black/30 mb-5">
                  What You Can Tell Your Clients
                </div>
                <p className="text-[20px] sm:text-[25px] md:text-[27px] italic leading-[1.55] text-black/70 mb-7">
                  &ldquo;We can get you off your system and fully live on NetSuite Financials in under{" "}
                  <span className="not-italic font-semibold text-black">30 days</span> for{" "}
                  <span className="not-italic font-semibold text-black">$10K</span>, no
                  hourly billing, no scope creep, no surprises.&rdquo;
                </p>
                <div className="pt-5 border-t border-black/[0.08]">
                  <div className="text-[16px] sm:text-[18px] font-semibold text-black/80 mb-1">
                    No other provider offers this.
                  </div>
                  <div className="text-[14px] sm:text-[15px] text-black/40 mt-1 leading-[1.6]">
                    Traditional financials-only implementations are not at this price or speed.
                  </div>
                </div>
              </div>

              {/* Logos — pushed to bottom */}
              <div className="mt-auto pt-8 flex justify-center">
                <div className="w-full flex items-center justify-between px-2 sm:px-4 py-4">
                  {[
                    { src: "/logos/netsuite.svg", alt: "NetSuite", h: "h-[60px] sm:h-[80px] md:h-[100px]" },
                    { src: "/logos/dynamics365.svg", alt: "Dynamics 365", h: "h-[48px] sm:h-[64px] md:h-[80px]" },
                    { src: "/logos/sap.svg", alt: "SAP", h: "h-[44px] sm:h-[60px] md:h-[76px]" },
                    { src: "/logos/sage.svg", alt: "Sage", h: "h-[40px] sm:h-[56px] md:h-[72px]" },
                  ].map((logo) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={logo.alt} src={logo.src} alt={logo.alt} className={`${logo.h} w-auto object-contain`} />
                  ))}
                </div>
              </div>

            </div>

            {/* Black sidebar — scope summary */}
            <div className="md:w-[320px] shrink-0 bg-black p-4 sm:p-5">
              <div className="text-[13px] sm:text-[14px] font-mono uppercase tracking-[0.08em] text-white font-bold mb-3">
                Source AI Handles<br />(End-to-End)
              </div>
              <div className="h-px bg-white/20 mb-4" />
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-2.5 sm:gap-0 sm:space-y-3">
                {[
                  { label: "Discovery & requirements", Icon: FileText },
                  { label: "GL & financial config", Icon: Settings },
                  { label: "AP, AR, bank, tax modules", Icon: Receipt },
                  { label: "Data & transaction migration", Icon: Database },
                  { label: "10+ years of historical data", Icon: ArrowRightLeft },
                  { label: "Workflows & close process", Icon: Workflow },
                  { label: "Native integrations", Icon: Link },
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
                  "Finance team training",
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

        {/* ── Pricing Schedule ────────────────────────────────────────────── */}
        <div id="pricing" className="bg-white border border-black/[0.08] p-4 sm:p-6 mb-6 scroll-mt-4">
          <div className="text-[22px] sm:text-[28px] font-medium tracking-tight text-black mb-2">
            Example Partner Pricing
          </div>
          <div className="text-[16px] sm:text-[18px] text-black/50 leading-[1.7] mb-5">
            Example prices partners can quote to clients. Source AI cost is the platform fee invoiced to the partner.
          </div>

          <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-black/30 font-bold mb-3">
            Example Pricing Scenarios
          </div>
          {/* Table */}
          <div className="border border-black/[0.08] rounded-sm overflow-hidden mb-4">
            <div className="grid grid-cols-3 bg-[#f5f5f3] border-b border-black/[0.08]">
              <div className="px-4 sm:px-6 py-4 sm:py-5 text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.10em] font-bold text-black/50">
                Price (Quoted to Client)
              </div>
              <div className="px-4 sm:px-6 py-4 sm:py-5 text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.10em] font-bold text-black/50 border-l border-black/[0.06]">
                Source AI Cost
              </div>
              <div className="px-4 sm:px-6 py-4 sm:py-5 text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.10em] font-bold text-black/50 border-l border-black/[0.06]">
                Your Margin
              </div>
            </div>
            {PRICING_TABLE.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-white" : "bg-[#fafafa]"} ${
                  i < PRICING_TABLE.length - 1 ? "border-b border-black/[0.06]" : ""
                }`}
              >
                <div className="px-4 sm:px-5 py-3.5 text-[14px] sm:text-[16px] text-black/80 font-medium">
                  {row.client}
                </div>
                <div className="px-4 sm:px-5 py-3.5 text-[14px] sm:text-[16px] text-black/50 border-l border-black/[0.06]">
                  {row.source}
                </div>
                <div className="px-4 sm:px-5 py-3.5 text-[14px] sm:text-[16px] font-semibold border-l border-black/[0.06]">
                  <span className="text-black">{row.margin}</span>
                  {row.pct && <span className="text-[#16a34a] ml-2">({row.pct})</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#f8f8f6] border border-black/[0.06] rounded-sm px-4 sm:px-5 py-3.5 mt-4">
            <p className="text-[13px] sm:text-[14px] text-black/50 leading-[1.65] mb-4">
              You can charge your end client anywhere from <span className="font-semibold text-black/70">$7,500</span> to <span className="font-semibold text-black/70">$25,000</span> knowing you&apos;ll keep a <span className="font-semibold text-[#16a34a]">50% margin</span> on every deal. Higher volume partners can negotiate improved margins directly with Source for custom arrangements.
            </p>
          </div>

          {/* Supported Industries */}
          <div id="industries" className="mt-6 pt-6 border-t border-black/[0.06]">
            <div className="text-[18px] sm:text-[22px] font-medium tracking-tight text-black mb-1">
              Supported Industries
            </div>
            <div className="text-[13px] sm:text-[14px] text-black/45 mb-4">
              Fixed pricing applies to the following industries. Industries not listed require custom scoping.
            </div>
            <div className="bg-[#f8f8f6] border border-black/[0.06] rounded-sm p-4 sm:p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {FIXED_INDUSTRIES.map(({ name, eg, Icon }) => (
                  <div key={name} className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-white shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-black/60" strokeWidth={2.25} />
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

        {/* ── Scope of Work ───────────────────────────────────────────────── */}
        <div className="bg-white border border-black/[0.08] mb-6">
          <div className="p-4 sm:p-6 pb-0 sm:pb-0">
            <div className="text-[16px] sm:text-[22px] font-medium tracking-tight text-black mb-1">
              Scope of Work
            </div>
            <div className="text-[14px] sm:text-[15px] text-black/50 leading-[1.7] mb-4">
              Complete scope grouped by implementation phase. Items marked <span className="font-medium text-black/70">Source</span> are included in the fixed fee. Items marked <span className="font-medium text-black/70">Partner</span> are the partner&apos;s responsibility.
            </div>

            {/* Delivery Breakdown */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2.5">
                <div className="text-[14px] sm:text-[15px] font-medium italic text-black/70">Delivery Breakdown</div>
                <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-black/30 font-bold">Who Does What</div>
              </div>
              <div className="flex gap-1.5">
                <div className="flex-[17] bg-black rounded-sm px-4 py-2.5 flex items-center justify-center">
                  <span className="text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.08em] text-white font-bold">
                    Source AI — 85%
                  </span>
                </div>
                <div className="flex-[3] bg-[#f0eeeb] rounded-sm px-2 py-2.5 flex items-center justify-center">
                  <span className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.06em] text-black/50 font-bold">
                    15%
                  </span>
                </div>
              </div>
              <div className="flex items-start justify-between mt-1.5">
                <div className="text-[12px] sm:text-[13px] text-black/40 leading-snug">
                  Discovery, config, migration, workflows, reporting, testing, go-live
                </div>
                <div className="text-[12px] sm:text-[13px] text-black/40 shrink-0 ml-4">
                  Partner
                </div>
              </div>
            </div>
          </div>

          <ScopeSection title="Discovery & Requirements" items={DISCOVERY} owner="source" defaultOpen />
          <ScopeSection title="Configuration & Data Migration" items={CONFIG_AND_MIGRATION} owner="source" defaultOpen />
          <ScopeSection title="Financial Processes & Workflows" items={PROCESSES} owner="source" defaultOpen />
          <ScopeSection title="Integrations (Native)" items={INTEGRATIONS} owner="source" />
          <ScopeSection title="Testing & Validation" items={TESTING} owner="source" />
          <ScopeSection title="Go-Live & Cutover" items={GOLIVE} owner="source" />
          <ScopeSection title="Partner-Owned Activities" items={PARTNER_ACTIVITIES} owner="partner" defaultOpen />
        </div>

        {/* ── Custom Integrations callout ──────────────────────────────────── */}
        <div className="bg-[#f8f8f6] border border-black/[0.08] rounded-sm p-4 sm:p-6 mb-6">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white shrink-0 mt-0.5">
              <Link className="w-4 h-4 text-black/50" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-[15px] sm:text-[16px] font-semibold text-black/80 mb-1">
                Custom Integrations & External Services — Additional Fee
              </div>
              <p className="text-[14px] sm:text-[15px] text-black/55 leading-[1.65]">
                Anything beyond native NetSuite functionality and SuiteApps is subject to a small additional fee, scoped
                per project. This includes custom reporting and dashboards (P&amp;L, Balance Sheet, Cash Flow, segmentation,
                executive dashboards), custom API connections, custom SuiteScript workflows, and external services
                such as Ramp, Brex, Bill.com, non-native payment gateways, third-party expense management, eCommerce
                connectors, WMS, or CRM platforms.
              </p>
            </div>
          </div>
        </div>

        {/* ── Exclusions + Terms & Conditions ─────────────────────────────── */}
        <div className="bg-white border border-black/[0.08] mb-6 overflow-hidden">
          <div className="p-4 sm:p-6">
            <div className="text-[16px] sm:text-[22px] font-medium tracking-tight text-black mb-1">
              Exclusions
            </div>
            <div className="text-[14px] sm:text-[15px] text-black/50 mb-4 leading-[1.7]">
              The following are explicitly excluded from the Financials First fixed fee and require separate scoping if
              needed.
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {EXCLUSIONS.map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <X className="w-4 h-4 shrink-0 text-red-500/50" strokeWidth={2.5} />
                  <span className="text-[14px] sm:text-[15px] text-black/65 font-[450]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <TermsTabs />
        </div>


        {/* ── Other Industries Toggle ─────────────────────────────────────── */}
        <OtherIndustries />

        {/* ── Confidentiality notice ──────────────────────────────────────── */}
        <div className="mt-6 bg-[#f8f8f6] border border-black/[0.06] rounded-sm px-4 sm:px-5 py-3.5">
          <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-black/30 mb-1">Confidentiality</div>
          <p className="text-[13px] sm:text-[14px] text-black/45 leading-[1.6]">
            This document and all pricing herein are confidential to the partner. May not be shared with end-clients or
            third parties without Source AI&apos;s written consent.
          </p>
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
