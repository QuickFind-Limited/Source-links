import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ERP Implementations Under 30 Days for Less Than $10K — Financials";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000",
          color: "#fff",
          fontFamily: "Inter, system-ui, sans-serif",
          padding: "60px 72px",
        }}
      >
        {/* Top */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.40)",
            }}
          >
            Source AI
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            ERP Implementations
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "rgba(255,255,255,0.50)",
            }}
          >
            Under 30 Days for Less Than $10K
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "-0.01em",
              marginTop: 12,
            }}
          >
            Financials — Discovery through Go-Live · Fixed Fee · No Hourly Billing
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
          {[
            "GL · AP · AR · Bank · Tax",
            "Discovery → Go-live",
            "NetSuite · Dynamics · SAP · Sage",
          ].map((item) => (
            <div
              key={item}
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: "rgba(255,255,255,0.30)",
                letterSpacing: "0.02em",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
