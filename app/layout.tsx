import type { Metadata, Viewport } from "next";
import { Geist_Mono, Cormorant_Garamond, Bebas_Neue, Lato } from "next/font/google";
import "./globals.css";
import { site } from "@/src/content/loaders/site";
import { theme } from "@/src/content/loaders/theme";
import { getImage } from "@/src/content/loaders/assets";
import { siteOrigin, siteUrl, withBasePath } from "@/src/lib/site-url";

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
  // Origin only: ogImage.src arrives already base-path-prefixed (the image
  // schema does it), so resolving against the full siteUrl would double the
  // path. Canonical and og:url are absolute for the same reason.
  metadataBase: new URL(siteOrigin),
  title: site.title,
  description: site.social.description,
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    siteName: site.nav.brand,
    url: siteUrl,
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

// Tribeca (display face) is declared here rather than globals.css because CSS
// url()s never get the deploy base path prefixed — this is the one absolute
// asset path Next can't rewrite. Free for personal use only; see
// /public/fonts/README.md. Missing files still just fall back to Bebas.
const tribecaFontFace = `@font-face {
  font-family: "Tribeca";
  src:
    url("${withBasePath("/fonts/tribeca.woff2")}") format("woff2"),
    url("${withBasePath("/fonts/tribeca.woff")}") format("woff"),
    url("${withBasePath("/fonts/Tribeca.ttf")}") format("truetype");
  font-display: swap;
}`;

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
        <style dangerouslySetInnerHTML={{ __html: tribecaFontFace }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
