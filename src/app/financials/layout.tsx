import type { Metadata } from "next";

const title = "Source — Fixed-Fee Financials Implementations in Under 30 Days";
const description =
  "Complete financials implementations with Source AI for a fixed price, in under 30 days. $7.5K–$25K fixed fee. Partner pricing, scope & terms.";
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
        alt: "Source Financials First",
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
