import { NextRequest, NextResponse } from "next/server";
import jsPDF from "jspdf";

const FULL_IMPL_INDUSTRIES = [
  "Corporate Services",
  "Business Services",
  "Professional Services",
  "Software / SaaS",
  "Media & Internet",
  "Nonprofit",
  "Hospitality",
  "Real Estate",
  "E-commerce",
  "Data Centres",
  "Retail (Small/Mid)",
  "Education / EdTech",
  "Wholesale Distribution",
  "Agriculture / AgriTech",
];

const DATA_MIGRATION_INDUSTRIES = [
  "Financial Services (RIA)",
  "Financial Services (General)",
  "Insurance",
  "Nursing Home / Aged Care",
  "Manufacturing",
  "Construction",
  "Apparel & Fashion",
  "Retail (Omnichannel)",
  "Food & Beverage",
  "CPG",
  "Recycling",
  "Solar / Renewables",
];

const CUSTOM_SCOPING_INDUSTRIES = [
  "Mining",
  "Transportation / Logistics",
  "Chemicals / Process Mfg",
  "Aerospace & Defense",
  "Life Sciences / Pharma",
  "Healthcare",
  "Oil & Gas",
  "Energy / Utilities",
];

const DELIVERABLES = [
  "Requirements & scoping",
  "System scan",
  "Data migration",
  "Data cleanup",
  "Data transformation",
  "GL, AP, AR & COA mapping",
  "ERP configuration",
  "Integrations",
  "Custom workflows",
  "10+ years of historical data",
  "UAT & go-live",
  "System agnostic",
];

const SOURCE_HANDLES = [
  "Chart of Accounts mapping",
  "General Ledger restructuring",
  "Accounts Receivable migration",
  "Accounts Payable migration",
  "Trial balance reconciliation",
  "Historical transaction migration",
  "Vendor & customer record transfer",
  "Data validation & quality checks",
  "Bank reconciliation mapping",
  "Multi-subsidiary consolidation",
];

const NOT_INCLUDED = [
  "Full ERP configuration",
  "Custom workflows & automation",
  "Operational modules (inventory, mfg)",
  "Third-party integrations",
  "User training & change management",
  "Post-go-live support",
];

// Draw a checkmark using lines (jsPDF Helvetica doesn't support Unicode ✓)
function drawCheck(doc: jsPDF, x: number, y: number, size: number = 1.5) {
  const lw = doc.getLineWidth();
  doc.setLineWidth(0.35);
  // Short down-stroke then long up-stroke
  doc.line(x, y - size * 0.1, x + size * 0.35, y + size * 0.4);
  doc.line(x + size * 0.35, y + size * 0.4, x + size, y - size * 0.5);
  doc.setLineWidth(lw);
}

// Draw an X mark using lines
function drawCross(doc: jsPDF, x: number, y: number, size: number = 1.2) {
  const lw = doc.getLineWidth();
  doc.setLineWidth(0.35);
  doc.line(x, y - size * 0.4, x + size, y + size * 0.4);
  doc.line(x, y + size * 0.4, x + size, y - size * 0.4);
  doc.setLineWidth(lw);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const partnerName = searchParams.get("partner") || "";

  try {
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pw = doc.internal.pageSize.getWidth();
    const ph = doc.internal.pageSize.getHeight();
    const m = 18;
    const cw = pw - m * 2;
    let y = 0;

    // ─── Header bar ────────────────────────────────────────────────────
    doc.setFillColor(10, 10, 10);
    doc.rect(0, 0, pw, 18, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("FIXED IMPLEMENTATION PRICING", m, 12);
    if (partnerName) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      const rightLabel = `Prepared for ${partnerName}`;
      doc.text(rightLabel, pw - m - doc.getTextWidth(rightLabel), 12);
    }

    y = 26;

    // ─── Title ─────────────────────────────────────────────────────────
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Fixed-Price ERP Implementation", m, y);
    y += 6;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 120, 120);
    doc.text("AI-powered, fixed-price ERP implementation \u2014 end-to-end, from discovery through go-live.", m, y);
    y += 3;
    doc.setDrawColor(220, 220, 220);
    doc.line(m, y, pw - m, y);
    y += 6;

    // ─── Pricing Tiers ─────────────────────────────────────────────────
    const tierW = (cw - 9) / 4;
    const tiers = [
      { label: "$5M \u2013 $25M REVENUE", price: "$7.5K" },
      { label: "$25M \u2013 $50M REVENUE", price: "$25K" },
      { label: "$50M \u2013 $100M REVENUE", price: "$50K" },
      { label: "$100M+ REVENUE", price: "Call Us" },
    ];

    tiers.forEach((tier, i) => {
      const tx = m + i * (tierW + 3);
      doc.setFillColor(248, 248, 248);
      doc.setDrawColor(230, 230, 230);
      doc.rect(tx, y, tierW, 22, "FD");

      doc.setFontSize(7);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(100, 100, 100);
      doc.text(tier.label, tx + tierW / 2, y + 7, { align: "center" });

      doc.setFontSize(17);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(tier.price, tx + tierW / 2, y + 17, { align: "center" });
    });

    y += 28;

    // ─── What's Included — split layout ────────────────────────────────
    const leftW = cw * 0.58;
    const rightX = m + leftW;
    const rightW = cw - leftW;
    const inclBoxH = 58;

    doc.setFillColor(250, 250, 250);
    doc.rect(m, y, leftW, inclBoxH, "F");

    let ly = y + 6;
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(150, 150, 150);
    doc.text("WHAT'S INCLUDED", m + 6, ly);
    ly += 5;

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(70, 70, 70);

    const p1 = "The first and only AI-powered, fixed-price ERP implementation service. The prices above apply to the relevant company size bracket \u2014 no hourly billing, no change orders. Live across 14 compatible industries today and growing.";
    const p1Lines = doc.splitTextToSize(p1, leftW - 14);
    doc.text(p1Lines, m + 6, ly);
    ly += p1Lines.length * 3.5 + 3;

    const p2 = "System agnostic \u2014 connects to any existing ERP, scans every record, auto-drafts a BRD customised to your methodology, then delivers full migration, configuration, integrations, and go-live in a single fixed fee from discovery through launch.";
    const p2Lines = doc.splitTextToSize(p2, leftW - 14);
    doc.text(p2Lines, m + 6, ly);
    ly += p2Lines.length * 3.5 + 3;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(100, 100, 100);
    doc.text("Compatible with: NetSuite  |  Dynamics 365  |  SAP  |  Sage  |  Odoo & more", m + 6, ly);

    // Right side — black deliverables box
    doc.setFillColor(20, 20, 20);
    doc.rect(rightX, y, rightW, inclBoxH, "F");

    let ry = y + 6;
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("INCLUDED (END-TO-END)", rightX + 5, ry);
    ry += 2;
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.15);
    doc.line(rightX + 5, ry, rightX + rightW - 5, ry);
    doc.setLineWidth(0.2);
    ry += 3.5;

    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    DELIVERABLES.forEach((item) => {
      doc.setDrawColor(100, 100, 100);
      drawCheck(doc, rightX + 5, ry - 0.8, 1.3);
      doc.setTextColor(200, 200, 200);
      doc.text(item, rightX + 10, ry);
      ry += 3.8;
    });

    y += inclBoxH + 5;

    // ─── Full Implementation Industries ────────────────────────────────
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(150, 150, 150);
    doc.text("FULL IMPLEMENTATION INDUSTRIES", m, y);

    doc.setTextColor(100, 100, 100);
    const fixedTag = "FIXED PRICE";
    doc.text(fixedTag, pw - m - doc.getTextWidth(fixedTag), y);
    y += 4;

    const colW = cw / 2;
    const half = Math.ceil(FULL_IMPL_INDUSTRIES.length / 2);
    doc.setFontSize(7.5);
    const startY = y;
    FULL_IMPL_INDUSTRIES.slice(0, half).forEach((name, i) => {
      doc.setFont("helvetica", "normal");
      doc.setDrawColor(22, 163, 74);
      drawCheck(doc, m, startY + i * 3.8 - 0.8, 1.3);
      doc.setTextColor(60, 60, 60);
      doc.text(name, m + 5, startY + i * 3.8);
    });
    FULL_IMPL_INDUSTRIES.slice(half).forEach((name, i) => {
      doc.setDrawColor(22, 163, 74);
      drawCheck(doc, m + colW, startY + i * 3.8 - 0.8, 1.3);
      doc.setTextColor(60, 60, 60);
      doc.text(name, m + colW + 5, startY + i * 3.8);
    });

    y = startY + half * 3.8 + 3;

    // ─── Divider: Non-Fixed Price ──────────────────────────────────────
    doc.setDrawColor(210, 210, 210);
    const tagText = "NON-FIXED PRICE";
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(160, 160, 160);
    const tagW = doc.getTextWidth(tagText) + 8;
    const tagX = pw / 2 - tagW / 2;
    doc.line(m, y, tagX - 2, y);
    doc.line(tagX + tagW + 2, y, pw - m, y);
    doc.setDrawColor(180, 180, 180);
    doc.rect(tagX, y - 3, tagW, 6, "S");
    doc.text(tagText, pw / 2 - doc.getTextWidth(tagText) / 2, y + 1.5);
    y += 7;

    // ─── Data Migration Industries ─────────────────────────────────────
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(150, 150, 150);
    doc.text("DATA MIGRATION, TRANSFORMATION (FINANCIALS ONLY)", m, y);
    y += 3;

    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text("Pricing available on request, per project.", m, y);
    y += 4;

    const dmHalf = Math.ceil(DATA_MIGRATION_INDUSTRIES.length / 2);
    doc.setFontSize(7.5);
    const dmStartY = y;
    DATA_MIGRATION_INDUSTRIES.slice(0, dmHalf).forEach((name, i) => {
      doc.setDrawColor(22, 163, 74);
      drawCheck(doc, m, dmStartY + i * 3.8 - 0.8, 1.3);
      doc.setTextColor(80, 80, 80);
      doc.text(name, m + 5, dmStartY + i * 3.8);
    });
    DATA_MIGRATION_INDUSTRIES.slice(dmHalf).forEach((name, i) => {
      doc.setDrawColor(22, 163, 74);
      drawCheck(doc, m + colW, dmStartY + i * 3.8 - 0.8, 1.3);
      doc.setTextColor(80, 80, 80);
      doc.text(name, m + colW + 5, dmStartY + i * 3.8);
    });

    y = dmStartY + dmHalf * 3.8 + 3;

    // ─── Handles / Not Included (compact) ──────────────────────────────
    const shBoxH = 28;
    doc.setFillColor(245, 245, 245);
    doc.rect(m, y, cw / 2 - 1.5, shBoxH, "F");
    doc.setFillColor(245, 245, 245);
    doc.rect(m + cw / 2 + 1.5, y, cw / 2 - 1.5, shBoxH, "F");

    let shY = y + 4;
    doc.setFontSize(6);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(150, 150, 150);
    doc.text("WHAT WE HANDLE", m + 4, shY);
    doc.setTextColor(180, 80, 80);
    doc.text("NOT INCLUDED", m + cw / 2 + 5, shY);
    shY += 3.5;

    doc.setFontSize(6.5);
    doc.setFont("helvetica", "normal");
    SOURCE_HANDLES.forEach((item, i) => {
      doc.setDrawColor(100, 100, 100);
      drawCheck(doc, m + 4, shY + i * 2.3 - 0.6, 1.0);
      doc.setTextColor(80, 80, 80);
      doc.text(item, m + 8, shY + i * 2.3);
    });

    NOT_INCLUDED.forEach((item, i) => {
      doc.setDrawColor(180, 80, 80);
      drawCross(doc, m + cw / 2 + 5, shY + i * 3.2 - 0.5, 1.0);
      doc.setTextColor(100, 100, 100);
      doc.text(item, m + cw / 2 + 10, shY + i * 3.2);
    });

    y += shBoxH + 4;

    // ─── Custom Scoping ────────────────────────────────────────────────
    const csBoxH = 30;
    doc.setFillColor(20, 20, 20);
    doc.rect(m, y, cw, csBoxH, "F");

    let csY = y + 5;
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("CUSTOM SCOPING", m + 6, csY);
    csY += 2.5;
    doc.setDrawColor(60, 60, 60);
    doc.line(m + 6, csY, m + cw - 6, csY);
    csY += 3.5;

    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(180, 180, 180);
    doc.text("Complex or regulated industries requiring a discovery call to scope.", m + 6, csY);
    csY += 5;

    const csColW = cw / 3;
    doc.setFontSize(7);
    CUSTOM_SCOPING_INDUSTRIES.forEach((name, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      doc.setTextColor(200, 200, 200);
      doc.text(name, m + 6 + col * csColW, csY + row * 3.8);
    });

    // ─── Footer ────────────────────────────────────────────────────────
    const footerY = y + csBoxH + 4;
    doc.setDrawColor(220, 220, 220);
    doc.line(m, footerY, pw - m, footerY);
    doc.setFontSize(6.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(170, 170, 170);
    doc.text("Pricing subject to change.", m, footerY + 4);
    const dateStr = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
    doc.text(dateStr, pw - m - doc.getTextWidth(dateStr), footerY + 4);

    // ─── Generate & return ─────────────────────────────────────────────
    const pdfBuffer = doc.output("arraybuffer");
    const safeName = partnerName ? partnerName.replace(/[^a-zA-Z0-9]/g, "_") + "_" : "";
    const filename = `${safeName}Fixed_Implementation_Pricing.pdf`;

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Partner one-pager PDF error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
