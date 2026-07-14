import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist_Mono, Cormorant_Garamond, Bebas_Neue, Lato } from "next/font/google";
import "./globals.css";
import { site } from "@/src/content/loaders/site";
import { theme } from "@/src/content/loaders/theme";
import { getImage } from "@/src/content/loaders/assets";
import { siteUrl } from "@/src/lib/site-url";

// UI face for nav, eyebrows, captions, and labels — quietly formal, and
// clearly distinct from both the display and editorial voices.
const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
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
  metadataBase: new URL(siteUrl),
  title: site.title,
  description: site.social.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.nav.brand,
    url: "/",
    title: site.title,
    description: site.social.description,
    images: ogImage.src
      ? [{ url: ogImage.src, alt: ogImage.alt, width: ogImage.width, height: ogImage.height }]
      : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.social.description,
    images: ogImage.src ? [ogImage.src] : undefined,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: theme.colours.charcoal,
};

// Structured data for search engines, built from the same content JSON as the
// page so it can't drift from the visible copy.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.nav.brand,
  description: site.social.description,
  url: siteUrl,
  about: { "@type": "Person", name: site.hero.name.join(" ") },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${geistMono.variable} ${cormorant.variable} ${bebas.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        {/* Cloudflare Web Analytics — production only: from localhost the
            beacon's pings are CORS-rejected (console noise) and dev visits
            would pollute the stats anyway. */}
        {process.env.NODE_ENV === "production" ? (
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            strategy="afterInteractive"
            data-cf-beacon='{"token": "65d33d3b81514f5f9355a991fb9fccd6"}'
          />
        ) : null}
      </body>
    </html>
  );
}
