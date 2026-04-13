import { NextRequest, NextResponse } from "next/server";
import { getLeads } from "@/lib/leads-db";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || "";

export async function POST(req: NextRequest) {
  if (!ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  const { messages, context } = await req.json();

  // Build system prompt with leads context
  let systemPrompt = `You are Source's internal research assistant for ERP migration leads and market intelligence. You have access to a database of ~242 consulting firms that handle ERP migrations (primarily QuickBooks to NetSuite).

You help the team:
- Analyze the competitive landscape
- Answer questions about specific firms
- Identify patterns in the data (geography, size, partner status)
- Provide strategic insights for outreach
- Discuss market report findings

Be concise, data-driven, and actionable. Use specific numbers and firm names when relevant. Format responses with markdown.`;

  // If context is "leads", fetch current leads data summary
  if (context === "leads") {
    try {
      const { leads, total } = await getLeads({ limit: 500 });
      const statusCounts = {
        no: leads.filter((l) => l.contacted === "no").length,
        pending: leads.filter((l) => l.contacted === "pending").length,
        yes: leads.filter((l) => l.contacted === "yes").length,
        replied: leads.filter((l) => l.contacted === "replied").length,
        confirmed: leads.filter((l) => l.contacted === "CONFIRMED").length,
        booking: leads.filter((l) => l.contacted === "BOOKING MEETING").length,
      };
      const corridors = new Map<string, number>();
      const locations = new Map<string, number>();
      leads.forEach((l) => {
        if (l.corridor) corridors.set(l.corridor, (corridors.get(l.corridor) || 0) + 1);
        if (l.hq_location) locations.set(l.hq_location, (locations.get(l.hq_location) || 0) + 1);
      });

      // Include a compact summary + first 100 firms detail
      const firmSummaries = leads.slice(0, 200).map((l) =>
        `[${l.id}] ${l.firm_name} | ${l.website} | ${l.contacted} | ${l.corridor} | ${l.hq_location} | ${l.size} | emp:${l.employee_count ?? "?"} | rev:${l.annual_revenue || "?"} | ${l.partner_status} | ${(l.notes || "").slice(0, 150)}`
      ).join("\n");

      systemPrompt += `\n\n## Current Database State
Total firms: ${total}
Contact status: ${JSON.stringify(statusCounts)}
Top corridors: ${Array.from(corridors.entries()).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([k, v]) => `${k} (${v})`).join(", ")}
Top locations: ${Array.from(locations.entries()).sort((a, b) => b[1] - a[1]).slice(0, 15).map(([k, v]) => `${k} (${v})`).join(", ")}

## Firm Data (first 200)
${firmSummaries}`;
    } catch {
      systemPrompt += "\n\n[Could not load leads data for this query]";
    }
  }

  // Call Anthropic API
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-opus-4-20250514",
      max_tokens: 4096,
      system: systemPrompt,
      messages,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return NextResponse.json({ error: `Anthropic API error: ${err}` }, { status: 502 });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
