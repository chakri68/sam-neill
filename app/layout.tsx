import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { site } from "@/src/content/loaders/site";
import { getImage } from "@/src/content/loaders/assets";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display face for names, years, and section titles. Tribeca (design.md §3.3)
// is personal-use-only and never shipped; Bebas Neue is the licensed stand-in
// and the real fallback in --font-display, so headings stop degrading to
// Arial Black when the Tribeca files are absent.
const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

// Editorial serif for narrative, quotes, and emotional copy (design.md §3.3).
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const ogImage = getImage(site.social.ogImage);

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: site.title,
  description: site.social.description,
  openGraph: {
    title: site.title,
    description: site.social.description,
    images: ogImage.src ? [{ url: ogImage.src, alt: ogImage.alt }] : undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${bebas.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
