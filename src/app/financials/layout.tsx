import type { Metadata } from "next";

const title = "ERP Implementations for $10K with Source AI";
const description =
  "Complete financials-only ERP implementations for a fixed price starting at $7.5K. Under 30 days, 50% partner margin, no hourly billing.";
const url = "https://www.source.shop/financials";
const imageUrl = "https://www.source.shop/financials/opengraph-image";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    url,
    siteName: "Source",
    type: "website",
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: "ERP Implementations for $10K with Source AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [imageUrl],
  },
};

export default function FinancialsFirstLayout({ children }: { children: React.ReactNode }) {
  return children;
}
