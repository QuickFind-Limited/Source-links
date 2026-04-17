import type { Metadata } from "next";

const title = "ERP Implementations Under 30 Days with AI for Less Than $10K";
const description =
  "Fixed-fee ERP financials implementations — discovery through go-live in under 30 days for less than $10K. No hourly billing, no scope creep.";
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
        alt: "ERP Implementations Under 30 Days for Less Than $10K",
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
