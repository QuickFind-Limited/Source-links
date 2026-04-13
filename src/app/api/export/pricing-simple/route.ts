import { NextRequest, NextResponse } from "next/server";
import jsPDF from "jspdf";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const partnerName = searchParams.get("partner") || "";

  try {
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pw = doc.internal.pageSize.getWidth();
    const ph = doc.internal.pageSize.getHeight();
    const m = 20;
    let y = 20;

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Fixed-Price ERP Implementation", m, y);
    y += 8;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 120, 120);
    const dateLine = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    doc.text(partnerName ? `Prepared for ${partnerName}  ·  ${dateLine}` : dateLine, m, y);
    y += 4;
    doc.setDrawColor(200, 200, 200);
    doc.line(m, y, pw - m, y);
    y += 10;

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("Pricing by Company Size", m, y);
    y += 6;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    const desc =
      "Complete ERP implementation at a fixed fee — no hourly billing, no change orders. Covers system scan, BRD, data migration, configuration, integrations, UAT, and go-live.";
    const descLines = doc.splitTextToSize(desc, pw - m * 2);
    doc.text(descLines, m, y);
    y += descLines.length * 4 + 6;

    const rows = [
      ["Tier", "Revenue Band", "Price"],
      ["1", "$5M – $25M", "$7,500"],
      ["2", "$25M – $50M", "$25,000"],
      ["3", "$50M – $100M", "$50,000"],
      ["4", "$100M+", "Call for pricing"],
    ];

    const colX = [m, m + 20, m + 70];
    rows.forEach((row, ri) => {
      const isHeader = ri === 0;
      doc.setFont("helvetica", isHeader ? "bold" : "normal");
      doc.setFontSize(isHeader ? 8.5 : 9);
      doc.setTextColor(isHeader ? 100 : 30, isHeader ? 100 : 30, isHeader ? 100 : 30);
      row.forEach((cell, ci) => doc.text(cell, colX[ci], y));
      y += isHeader ? 5 : 4.5;
      if (isHeader) {
        doc.setDrawColor(200, 200, 200);
        doc.line(m, y - 2, pw - m, y - 2);
      }
    });
    y += 6;

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("What's Included (End-to-End)", m, y);
    y += 6;

    const included = [
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

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    const colW = (pw - m * 2) / 2;
    const halfIncl = Math.ceil(included.length / 2);
    included.forEach((item, i) => {
      const col = i < halfIncl ? 0 : 1;
      const row = i < halfIncl ? i : i - halfIncl;
      doc.setTextColor(22, 163, 74);
      doc.text("✓", m + col * colW, y + row * 4.5);
      doc.setTextColor(50, 50, 50);
      doc.text(item, m + col * colW + 5, y + row * 4.5);
    });
    y += halfIncl * 4.5 + 6;

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Not Included", m, y);
    y += 6;

    const notIncluded = [
      "Human education / training",
      "Human aftercare / post-go-live support",
      "Human relationship management",
    ];

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    notIncluded.forEach((item) => {
      doc.setTextColor(180, 60, 60);
      doc.text("✗", m, y);
      doc.setTextColor(80, 80, 80);
      doc.text(item, m + 5, y);
      y += 4.5;
    });
    y += 6;

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Full Implementation Industries (Fixed Price)", m, y);
    y += 6;

    const fullIndustries = [
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

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    const halfFull = Math.ceil(fullIndustries.length / 2);
    fullIndustries.forEach((name, i) => {
      const col = i < halfFull ? 0 : 1;
      const row = i < halfFull ? i : i - halfFull;
      doc.setTextColor(50, 50, 50);
      doc.text(`•  ${name}`, m + col * colW, y + row * 4.5);
    });
    y += halfFull * 4.5 + 6;

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Data Migration, Transformation — Financials Only", m, y);
    y += 5;
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 120, 120);
    doc.text("Pricing available on request, per project.", m, y);
    y += 6;

    const dataMigration = [
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

    doc.setFontSize(9);
    const halfDm = Math.ceil(dataMigration.length / 2);
    dataMigration.forEach((name, i) => {
      const col = i < halfDm ? 0 : 1;
      const row = i < halfDm ? i : i - halfDm;
      doc.setTextColor(50, 50, 50);
      doc.text(`•  ${name}`, m + col * colW, y + row * 4.5);
    });
    y += halfDm * 4.5 + 6;

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Custom Scoping — Discovery & BRD", m, y);
    y += 5;
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 120, 120);
    doc.text("Complex or regulated industries requiring a discovery call.", m, y);
    y += 6;

    const customScoping = [
      "Mining",
      "Transportation / Logistics",
      "Chemicals / Process Mfg",
      "Aerospace & Defense",
      "Life Sciences / Pharma",
      "Healthcare",
      "Oil & Gas",
      "Energy / Utilities",
    ];

    doc.setFontSize(9);
    const halfCs = Math.ceil(customScoping.length / 2);
    customScoping.forEach((name, i) => {
      const col = i < halfCs ? 0 : 1;
      const row = i < halfCs ? i : i - halfCs;
      doc.setTextColor(50, 50, 50);
      doc.text(`•  ${name}`, m + col * colW, y + row * 4.5);
    });

    doc.setDrawColor(200, 200, 200);
    doc.line(m, ph - 16, pw - m, ph - 16);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(170, 170, 170);
    doc.text("Pricing subject to change.", m, ph - 10);
    const dateFooter = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
    doc.text(dateFooter, pw - m - doc.getTextWidth(dateFooter), ph - 10);

    const pdfBuffer = doc.output("arraybuffer");
    const safeName = partnerName ? `${partnerName.replace(/[^a-zA-Z0-9]/g, "_")}_` : "";
    const filename = `${safeName}ERP_Implementation_Pricing.pdf`;

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Simple pricing PDF error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
