import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ERP Implementations Under 30 Days with AI for Less Than $10K";
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
          background: "#fafafa",
          color: "#000",
          fontFamily: "Inter, system-ui, sans-serif",
          padding: "72px 80px",
          border: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        {/* Top */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.20em",
              color: "rgba(0,0,0,0.35)",
            }}
          >
            Source
          </div>
          <div
            style={{
              fontSize: 104,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 0.98,
              color: "#000",
            }}
          >
            ERP Implementations
          </div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              color: "rgba(0,0,0,0.85)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Under 30 days with AI
          </div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              color: "rgba(0,0,0,0.85)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            for less than $10K
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", gap: 48, borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 28 }}>
          {[
            "No hourly billing",
            "Discovery → go-live",
            "NetSuite · Dynamics · SAP · Sage",
          ].map((item) => (
            <div
              key={item}
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: "rgba(0,0,0,0.35)",
                letterSpacing: "-0.01em",
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
