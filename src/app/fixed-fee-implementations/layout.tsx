import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fixed-Fee ERP Implementations — Any Industry, 24-Hour Quote | Source",
  description:
    "Fixed-price NetSuite, Dynamics & SAP implementations for any industry. Drop your SOW, get a scoped quote in 24 hours. Fully white-labelled, powered by Source AI.",
  openGraph: {
    title: "Fixed-Fee ERP Implementations — Any Industry, 24-Hour Quote",
    description:
      "Drop your SOW or requirements. Source AI scopes, prices, and delivers your ERP project. Fixed price back to you within 24 hours. Fully white-labelled.",
    siteName: "Source",
    url: "https://www.source.shop/fixed-fee-implementations",
    type: "website",
    images: [
      {
        url: "/fixed-fee-implementations/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fixed-Fee ERP Implementations — scoped & priced in 24 hours",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fixed-Fee ERP Implementations — Any Industry, 24-Hour Quote",
    description:
      "Drop your SOW or requirements. Source AI scopes, prices, and delivers your ERP project. Fixed price back to you within 24 hours.",
    images: ["/fixed-fee-implementations/opengraph-image"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
