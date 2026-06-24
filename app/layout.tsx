import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      'Seminarul Teologic Ortodox „Sfântul Ioan Gură de Aur" · Târgoviște',
    template: "%s · Seminarul Teologic Târgoviște",
  },
  description:
    'Seminarul Teologic Ortodox „Sfântul Ioan Gură de Aur" din Târgoviște — de peste 30 de ani în slujba Bisericii și a Educației.',
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title:
      'Seminarul Teologic Ortodox „Sfântul Ioan Gură de Aur" · Târgoviște',
    description:
      "De peste 30 de ani în slujba Bisericii și a Educației, în inima cetății Târgoviștei.",
    locale: "ro_RO",
    type: "website",
  },
  icons: {
    icon: "/assets/favicon-32.png",
    apple: "/assets/favicon-180.png",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  url: siteConfig.url,
  logo: `${siteConfig.url}/assets/noBgLogo.png`,
  description:
    'Seminar Teologic Ortodox din Târgoviște, județul Dâmbovița — liceu vocațional sub oblăduirea Arhiepiscopiei Târgoviștei. Pregătește elevi pentru slujirea preoțească (Teologie Pastorală), pentru profilul filologic și gimnaziu. Reînființat în 1992.',
  foundingDate: "1992",
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    postalCode: siteConfig.address.postalCode,
    addressCountry: "RO",
    addressRegion: "DB",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.geo.lat,
    longitude: siteConfig.geo.lng,
  },
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  sameAs: ([
    siteConfig.social.facebook,
    siteConfig.social.tiktok,
    siteConfig.social.instagram,
  ] as string[]).filter((s) => s && s !== "#"),
  parentOrganization: {
    "@type": "Organization",
    name: siteConfig.diocese,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-parchment text-ink">
        {children}
        {/* JSON-LD: EducationalOrganization. Helps Google show the seminary as a
            rich result + gives AI agents a structured handle on the school. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {/* Vercel monitoring — no-op locally, only sends data from the deployed site. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
