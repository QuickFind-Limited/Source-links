import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PUBLIC_PATHS = ["/", "/contact", "/api/auth"]

const LEADS_SECRET = process.env.LEADS_JWT_SECRET || "leads-secret-change-me"
const MCP_API_KEY = process.env.MCP_API_KEY || ""

async function verifyLeadsToken(token: string): Promise<boolean> {
  const lastDot = token.lastIndexOf(".")
  if (lastDot === -1) return false
  const payload = token.substring(0, lastDot)
  const sig = token.substring(lastDot + 1)

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(LEADS_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )
  const signed = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload))
  const hex = Array.from(new Uint8Array(signed))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")

  return hex === sig
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // === Leads routes: separate auth system ===
  if (pathname.startsWith("/leads") || pathname.startsWith("/api/leads")) {
    // Allow login page and auth endpoint
    if (pathname === "/leads/login" || pathname === "/api/leads/auth") {
      return NextResponse.next()
    }

    // Check MCP API key for API routes
    if (pathname.startsWith("/api/leads") && MCP_API_KEY) {
      const apiKey = request.headers.get("x-mcp-key")
      if (apiKey === MCP_API_KEY) {
        return NextResponse.next()
      }
    }

    // Check leads session cookie
    const token = request.cookies.get("leads_session")?.value
    if (token && (await verifyLeadsToken(token))) {
      return NextResponse.next()
    }

    // Redirect to leads login for page requests, 401 for API
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const loginUrl = new URL("/leads/login", request.url)
    loginUrl.searchParams.set("next", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // === Main site auth ===
  if (
    PUBLIC_PATHS.includes(pathname) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/partner") ||
    pathname.startsWith("/onepager") ||
    pathname.startsWith("/managed-services") ||
    pathname.startsWith("/fixed-price") ||
    pathname.startsWith("/fixed-pricing") ||
    pathname.startsWith("/pricing") ||
    pathname.startsWith("/financials") ||
    pathname.startsWith("/fixed-fee") ||
    pathname.startsWith("/healthcheck") ||
    pathname.startsWith("/get-quote") ||
    pathname.startsWith("/api/export") ||
    pathname.startsWith("/api/ping") ||
    pathname.startsWith("/reports") ||
    pathname === "/opengraph-image" ||
    pathname === "/twitter-image" ||
    pathname.match(/\.(svg|png|jpg|ico|css|js|html|woff|woff2|pdf)$/)
  ) {
    return NextResponse.next()
  }

  // Check for main site auth cookie
  const auth = request.cookies.get("source_auth")
  if (auth?.value === "granted") {
    return NextResponse.next()
  }

  // Redirect to main site login
  const loginUrl = new URL("/api/auth", request.url)
  loginUrl.searchParams.set("next", pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon).*)"],
}
