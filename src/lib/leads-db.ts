import { createClient, type Client } from "@libsql/client";

let client: Client | null = null;

function getClient(): Client {
  if (client) return client;
  client = createClient({
    url: process.env.TURSO_URL || "file:leads.db",
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  return client;
}

export interface Lead {
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

const EXTRA_COLUMNS: Record<string, string> = {
  hq_country: "TEXT DEFAULT ''",
  market_region: "TEXT DEFAULT 'United States'",
  source_status: "TEXT DEFAULT ''",
  partnership_fit: "TEXT DEFAULT ''",
  employee_count: "INTEGER DEFAULT NULL",
  annual_revenue: "TEXT DEFAULT ''",
  decision_maker: "TEXT DEFAULT ''",
};

async function ensureLeadColumns() {
  const db = getClient();
  const result = await db.execute("PRAGMA table_info(leads)");
  const existing = new Set(result.rows.map((row) => String(row.name || "")));

  for (const [column, definition] of Object.entries(EXTRA_COLUMNS)) {
    if (!existing.has(column)) {
      await db.execute(`ALTER TABLE leads ADD COLUMN ${column} ${definition}`);
    }
  }
}

export async function runMigrations() {
  const db = getClient();
  await db.execute(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firm_name TEXT NOT NULL,
      notes TEXT DEFAULT '',
      contacted TEXT DEFAULT 'no',
      corridor TEXT DEFAULT '',
      hq_location TEXT DEFAULT '',
      hq_country TEXT DEFAULT '',
      market_region TEXT DEFAULT 'United States',
      size TEXT DEFAULT '',
      partner_status TEXT DEFAULT '',
      target_market TEXT DEFAULT '',
      key_differentiator TEXT DEFAULT '',
      website TEXT DEFAULT '',
      evidence TEXT DEFAULT '',
      source_status TEXT DEFAULT '',
      partnership_fit TEXT DEFAULT '',
      highlighted INTEGER DEFAULT 0,
      employee_count INTEGER DEFAULT NULL,
      annual_revenue TEXT DEFAULT '',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    )
  `);
  await ensureLeadColumns();
}

export async function getLeads(params: {
  q?: string;
  contacted?: string;
  highlighted?: string;
  corridor?: string;
  market_region?: string;
  hq_country?: string;
  source_status?: string;
  partnership_fit?: string;
  sort?: string;
  dir?: string;
  limit?: number;
  offset?: number;
}): Promise<{ leads: Lead[]; total: number }> {
  const db = getClient();
  await runMigrations();

  const conditions: string[] = [];
  const args: (string | number)[] = [];

  if (params.contacted) {
    conditions.push("contacted = ?");
    args.push(params.contacted);
  }
  if (params.highlighted === "1" || params.highlighted === "true") {
    conditions.push("highlighted = 1");
  }
  if (params.corridor) {
    conditions.push("corridor LIKE ?");
    args.push(`%${params.corridor}%`);
  }
  if (params.market_region) {
    conditions.push("market_region = ?");
    args.push(params.market_region);
  }
  if (params.hq_country) {
    if (params.hq_country === "United States") {
      conditions.push("(hq_country = ? OR market_region = ?)");
      args.push(params.hq_country, params.hq_country);
    } else {
      conditions.push("hq_country = ?");
      args.push(params.hq_country);
    }
  }
  if (params.source_status) {
    conditions.push("source_status = ?");
    args.push(params.source_status);
  }
  if (params.partnership_fit) {
    conditions.push("partnership_fit = ?");
    args.push(params.partnership_fit);
  }
  if (params.q) {
    conditions.push(
      "(firm_name LIKE ? OR notes LIKE ? OR corridor LIKE ? OR hq_location LIKE ? OR hq_country LIKE ? OR market_region LIKE ? OR target_market LIKE ? OR key_differentiator LIKE ? OR website LIKE ? OR evidence LIKE ? OR source_status LIKE ? OR partnership_fit LIKE ? OR annual_revenue LIKE ? OR CAST(employee_count AS TEXT) LIKE ?)"
    );
    const q = `%${params.q}%`;
    args.push(q, q, q, q, q, q, q, q, q, q, q, q, q, q);
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const allowedSorts = [
    "id", "firm_name", "contacted", "corridor", "hq_location",
    "hq_country", "market_region", "size", "partner_status", "source_status",
    "partnership_fit", "highlighted", "employee_count", "annual_revenue",
    "created_at", "updated_at",
  ];
  const sort = allowedSorts.includes(params.sort || "") ? params.sort : "id";
  const dir = params.dir === "desc" ? "DESC" : "ASC";
  const limit = Math.min(params.limit || 500, 500);
  const offset = params.offset || 0;

  const countResult = await db.execute({
    sql: `SELECT COUNT(*) as total FROM leads ${where}`,
    args,
  });
  const total = Number(countResult.rows[0]?.total ?? 0);

  const result = await db.execute({
    sql: `SELECT * FROM leads ${where} ORDER BY ${sort} ${dir} LIMIT ? OFFSET ?`,
    args: [...args, limit, offset],
  });

  return {
    leads: result.rows as unknown as Lead[],
    total,
  };
}

export async function getLead(id: number): Promise<Lead | null> {
  const db = getClient();
  await runMigrations();
  const result = await db.execute({ sql: "SELECT * FROM leads WHERE id = ?", args: [id] });
  return (result.rows[0] as unknown as Lead) || null;
}

export async function createLead(data: Partial<Lead>): Promise<Lead> {
  const db = getClient();
  await runMigrations();
  const result = await db.execute({
    sql: `INSERT INTO leads (
            firm_name, notes, contacted, corridor, hq_location, hq_country, market_region,
            size, partner_status, target_market, key_differentiator, website, evidence,
            source_status, partnership_fit, highlighted, employee_count, annual_revenue, decision_maker
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      data.firm_name || "",
      data.notes || "",
      data.contacted || "no",
      data.corridor || "",
      data.hq_location || "",
      data.hq_country || "",
      data.market_region || "United States",
      data.size || "",
      data.partner_status || "",
      data.target_market || "",
      data.key_differentiator || "",
      data.website || "",
      data.evidence || "",
      data.source_status || "",
      data.partnership_fit || "",
      data.highlighted || 0,
      data.employee_count ?? null,
      data.annual_revenue || "",
      data.decision_maker || "",
    ],
  });
  const id = Number(result.lastInsertRowid);
  return (await getLead(id))!;
}

export async function updateLead(id: number, data: Partial<Lead>): Promise<Lead | null> {
  const db = getClient();
  await runMigrations();

  const fields: string[] = [];
  const args: (string | number)[] = [];

  const updatable = [
    "firm_name", "notes", "contacted", "corridor", "hq_location",
    "hq_country", "market_region", "size", "partner_status", "target_market",
    "key_differentiator", "website", "evidence", "source_status", "partnership_fit",
    "highlighted", "employee_count", "annual_revenue", "decision_maker",
  ] as const;

  for (const key of updatable) {
    if (key in data && data[key] !== undefined) {
      fields.push(`${key} = ?`);
      args.push(data[key] as string | number);
    }
  }

  if (fields.length === 0) return getLead(id);

  fields.push("updated_at = datetime('now')");
  args.push(id);

  await db.execute({
    sql: `UPDATE leads SET ${fields.join(", ")} WHERE id = ?`,
    args,
  });

  return getLead(id);
}

export async function deleteLead(id: number): Promise<boolean> {
  const db = getClient();
  await runMigrations();
  const result = await db.execute({ sql: "DELETE FROM leads WHERE id = ?", args: [id] });
  return (result.rowsAffected ?? 0) > 0;
}

export async function getAllLeads(): Promise<Lead[]> {
  const db = getClient();
  await runMigrations();
  const result = await db.execute("SELECT * FROM leads ORDER BY id ASC");
  return result.rows as unknown as Lead[];
}
