import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ERP Implementations Under 30 Days for Less Than $10K";
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
          padding: "56px 64px",
          border: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        {/* Top */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "rgba(0,0,0,0.30)",
            }}
          >
            Source
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "rgba(0,0,0,0.85)",
            }}
          >
            ERP Implementations
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: "rgba(0,0,0,0.45)",
              letterSpacing: "-0.01em",
            }}
          >
            Under 30 days for less than $10K
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", gap: 40, borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 24 }}>
          {[
            "No hourly billing",
            "Discovery through go-live",
            "50%+ partner margin",
            "NetSuite · Dynamics · SAP · Sage",
          ].map((item) => (
            <div
              key={item}
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "rgba(0,0,0,0.30)",
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
