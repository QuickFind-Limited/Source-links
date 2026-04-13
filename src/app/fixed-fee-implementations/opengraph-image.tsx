import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Fixed-Fee ERP Implementations — scoped & priced in 24 hours";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  const industries = [
    "Manufacturing & Distribution",
    "E-Commerce & Retail",
    "Professional Services",
    "SaaS & Technology",
    "Nonprofit & Education",
    "Healthcare & Life Sciences",
    "Construction & Real Estate",
    "Hospitality & Food & Bev",
  ];

  const steps = [
    { n: "1", label: "You share your SOW or requirements" },
    { n: "2", label: "Source AI scopes & prices in 24 hours" },
    { n: "3", label: "You deliver — fully white-labelled" },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* ── Left panel ── */}
        <div
          style={{
            width: "680px",
            height: "630px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "50px 52px",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "12px" }}>
            <div style={{ fontSize: "22px", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.5px" }}>
              Source
            </div>
            <div style={{ width: "1px", height: "18px", background: "rgba(255,255,255,0.15)" }} />
            <div style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: "2.5px" }}>
              PARTNER PROGRAM
            </div>
          </div>

          {/* Headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.28)", letterSpacing: "3px" }}>
              FIXED-FEE ERP IMPLEMENTATIONS
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "52px", fontWeight: 800, color: "#ffffff", lineHeight: "1.05", letterSpacing: "-2px" }}>
                Fixed price. Any
              </div>
              <div style={{ fontSize: "52px", fontWeight: 800, color: "#ffffff", lineHeight: "1.05", letterSpacing: "-2px" }}>
                ERP. 24 hours.
              </div>
            </div>
            <div style={{ fontSize: "17px", color: "rgba(255,255,255,0.38)", fontWeight: 400, marginTop: "4px" }}>
              Drop your SOW &mdash; get a scoped quote back within 24 hours
            </div>
          </div>

          {/* How it works steps */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: "2px", marginBottom: "4px" }}>
              HOW IT WORKS
            </div>
            {steps.map((s) => (
              <div key={s.n} style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "6px",
                    background: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <div style={{ fontSize: "12px", fontWeight: 800, color: "#000000", lineHeight: "1" }}>{s.n}</div>
                </div>
                <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div
          style={{
            width: "1px",
            height: "550px",
            background: "rgba(255,255,255,0.07)",
            marginTop: "40px",
          }}
        />

        {/* ── Right panel — industries ── */}
        <div
          style={{
            width: "519px",
            height: "630px",
            display: "flex",
            flexDirection: "column",
            padding: "50px 44px",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              fontWeight: 700,
              color: "rgba(255,255,255,0.28)",
              letterSpacing: "2.5px",
              marginBottom: "20px",
            }}
          >
            SUPPORTED INDUSTRIES
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {industries.map((ind) => (
              <div
                key={ind}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "10px",
                  padding: "9px 12px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "6px",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.3)",
                    flexShrink: 0,
                  }}
                />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>
                  {ind}
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div
            style={{
              marginTop: "16px",
              padding: "12px 14px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>
              Fully white-labelled. You own the client.
            </div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)", fontWeight: 400 }}>
              NetSuite &middot; Dynamics 365 &middot; SAP &middot; Sage
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
