import { NextRequest, NextResponse } from "next/server";
import { getLeads, createLead } from "@/lib/leads-db";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;

  const result = await getLeads({
    q: sp.get("q") || undefined,
    contacted: sp.get("contacted") || undefined,
    highlighted: sp.get("highlighted") || undefined,
    corridor: sp.get("corridor") || undefined,
    market_region: sp.get("market_region") || undefined,
    hq_country: sp.get("hq_country") || undefined,
    source_status: sp.get("source_status") || undefined,
    partnership_fit: sp.get("partnership_fit") || undefined,
    sort: sp.get("sort") || undefined,
    dir: sp.get("dir") || undefined,
    limit: sp.has("limit") ? Number(sp.get("limit")) : undefined,
    offset: sp.has("offset") ? Number(sp.get("offset")) : undefined,
  });

  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.firm_name) {
    return NextResponse.json({ error: "firm_name is required" }, { status: 400 });
  }

  const lead = await createLead(body);
  return NextResponse.json({ lead }, { status: 201 });
}
