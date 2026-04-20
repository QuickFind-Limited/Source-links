import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "The go-to AI partner for ERP Vars and Firms";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "Inter, sans-serif",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.20em",
            color: "rgba(255,255,255,0.50)",
          }}
        >
          Source · Onepager
        </div>

        <div
          style={{
            fontSize: 92,
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 1.02,
            maxWidth: "90%",
            display: "flex",
          }}
        >
          The go-to AI partner for ERP Vars and Firms
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          <span>source.shop/onepager</span>
          <span>Consultant-grade delivery</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
