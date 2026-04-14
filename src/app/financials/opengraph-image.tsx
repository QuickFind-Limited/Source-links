import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Source — Fixed-Fee Financials Implementations | $7.5K–$25K | Under 30 Days";
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
          padding: "56px 64px",
        }}
      >
        {/* Top */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.40)",
            }}
          >
            Source
          </div>
          <div
            style={{
              fontSize: 54,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            $7.5K – $25K
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: "rgba(255,255,255,0.60)",
              letterSpacing: "-0.01em",
            }}
          >
            Fixed-fee financials implementations, under 30 days
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", gap: 32 }}>
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
                fontWeight: 500,
                color: "rgba(255,255,255,0.35)",
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
