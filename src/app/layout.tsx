import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { LiveChat } from "@/components/LiveChat";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://belgianmalinoisspecialbreed.be";
const siteName = "Belgian Malinois Special Breed";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Premium Belgian Malinois Puppies | Belgium`,
    template: `%s | ${siteName}`,
  },
  description:
    "Premium health-tested Belgian Malinois puppies from working lines in the United States. Official HD/ED scores, DNA panel, excellent temperament. Inquire about available puppies.",
  keywords: [
    "Belgian Malinois puppies",
    "Belgian Malinois for sale",
    "Malinois kennel USA",
    "working line Malinois",
    "health tested Malinois",
    "Belgian Malinois breeder",
    "Malinois puppies Europe",
    "FCI Malinois",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_BE",
    url: siteUrl,
    siteName,
    title: `${siteName} | Premium Belgian Malinois Puppies`,
    description:
      "Health-tested Belgian Malinois puppies from carefully selected working bloodlines. Raised in the United States with verified HD/ED and DNA clearances.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Belgian Malinois Special Breed – Premium Working Dogs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Premium Belgian Malinois Puppies`,
    description:
      "Health-tested Belgian Malinois puppies from working lines in the United States. Official clearances, excellent temperament.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Pets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased bg-cream text-charcoal">
        <JsonLd />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <LiveChat />
      </body>
    </html>
  );
}
