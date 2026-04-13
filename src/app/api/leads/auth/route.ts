import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { randomBytes, createHmac } from "crypto";

const LEADS_PASSWORD = process.env.LEADS_PASSWORD || "source-leads-2026";
const LEADS_SECRET = process.env.LEADS_JWT_SECRET || "leads-secret-change-me";

function signToken(payload: string): string {
  const hmac = createHmac("sha256", LEADS_SECRET);
  hmac.update(payload);
  return `${payload}.${hmac.digest("hex")}`;
}

export function verifyToken(token: string): boolean {
  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) return false;
  const payload = token.substring(0, lastDot);
  const sig = token.substring(lastDot + 1);
  const hmac = createHmac("sha256", LEADS_SECRET);
  hmac.update(payload);
  return hmac.digest("hex") === sig;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { password } = body;

  if (password !== LEADS_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const sessionId = randomBytes(24).toString("hex");
  const token = signToken(sessionId);

  const cookieStore = await cookies();
  cookieStore.set("leads_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return NextResponse.json({ ok: true });
}
