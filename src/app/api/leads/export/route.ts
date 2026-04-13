import { NextRequest, NextResponse } from "next/server";
import { getAllLeads } from "@/lib/leads-db";

export async function GET(req: NextRequest) {
  const format = req.nextUrl.searchParams.get("format") || "csv";
  const leads = await getAllLeads();

  const headers = [
    "ID", "Firm Name", "Notes/Contacts", "Contacted", "Migration Corridor",
    "HQ Location", "HQ Country", "Market Region", "Size", "Employee Count",
    "Annual Revenue", "Partner Status", "Target Market", "Key Differentiator",
    "Website", "Evidence", "Source Status", "Partnership Fit", "Highlighted",
  ];

  const escape = (val: string | number | null) => {
    const s = String(val ?? "");
    if (s.includes(",") || s.includes('"') || s.includes("\n")) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };

  const rows = leads.map((l) => [
    l.id, l.firm_name, l.notes, l.contacted, l.corridor,
    l.hq_location, l.hq_country, l.market_region, l.size, l.employee_count,
    l.annual_revenue, l.partner_status, l.target_market, l.key_differentiator,
    l.website, l.evidence, l.source_status, l.partnership_fit, l.highlighted,
  ].map(escape).join(","));

  const csv = [headers.join(","), ...rows].join("\n");

  if (format === "csv") {
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="leads-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  }

  return new NextResponse(csv, {
    headers: { "Content-Type": "text/csv" },
  });
}
