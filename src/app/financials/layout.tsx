import type { Metadata } from "next";

const title = "Source Financials First - Fixed-Fee ERP Implementation";
const description =
  "Financials First partner pricing, scope, and terms. Fixed-fee ERP implementations in under 30 days.";
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
