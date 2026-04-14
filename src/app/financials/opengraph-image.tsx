import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Source — Fixed-Fee Financials Implementations in Under 30 Days";
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
          background: "#fafafa",
          fontFamily: "Inter, system-ui, sans-serif",
          color: "#000",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 48px",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            background: "#fff",
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.01em" }}>Source</div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "rgba(0,0,0,0.70)",
            }}
          >
            AI Financials Implementation
          </div>
        </div>

        {/* Subtitle */}
        <div style={{ padding: "16px 48px 0", display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "rgba(0,0,0,0.40)",
              marginBottom: 4,
            }}
          >
            Partner Pricing, Scope &amp; Terms of Engagement
          </div>
          <div style={{ fontSize: 16, fontStyle: "italic", color: "rgba(0,0,0,0.50)" }}>
            Scale your finance-heavy implementations with AI and make 50%+ margin.
          </div>
        </div>

        {/* Stat cards row */}
        <div style={{ display: "flex", gap: 12, padding: "16px 48px 0" }}>
          {[
            { value: "Under 30 Days", label: "KICK-OFF TO GO-LIVE" },
            { value: "$7.5K – $25K", label: "FIXED FEE, NO SURPRISES" },
            { value: "Co-Branded", label: "POWERED BY SOURCE AI" },
          ].map((stat) => (
            <div
              key={stat.value}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.06)",
                padding: "22px 16px",
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-0.02em" }}>{stat.value}</div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "rgba(0,0,0,0.45)",
                  marginTop: 6,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Two-panel: value prop + black sidebar */}
        <div
          style={{
            display: "flex",
            margin: "16px 48px 0",
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.08)",
            flex: 1,
            overflow: "hidden",
          }}
        >
          {/* Left panel */}
          <div
            style={{
              flex: 1,
              padding: "24px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              borderRight: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 600,
                lineHeight: 1.35,
                letterSpacing: "-0.01em",
                color: "rgba(0,0,0,0.90)",
                marginBottom: 10,
              }}
            >
              Complete financials implementations with Source AI for a fixed price, in under 30 days
            </div>
            <div style={{ fontSize: 13, color: "rgba(0,0,0,0.50)", lineHeight: 1.6 }}>
              Discovery through go-live in under 30 days. Source AI handles all technical delivery — you keep the client relationship.
            </div>
          </div>

          {/* Black sidebar */}
          <div
            style={{
              width: 280,
              background: "#000",
              padding: "20px 22px",
              display: "flex",
              flexDirection: "column",
              color: "#fff",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.85)",
                marginBottom: 14,
              }}
            >
              Source AI Handles (End-to-End)
            </div>
            {[
              "Discovery & requirements",
              "GL & financial config",
              "AP, AR, bank, tax modules",
              "Data & transaction migration",
              "10+ years of historical data",
              "Workflows & close process",
              "Reporting & dashboards",
              "Native integrations",
              "Testing & validation",
              "Go-live & cutover",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 7,
                }}
              >
                <div
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.35)",
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.80)" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
