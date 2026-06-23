import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  metadataBase: new URL("https://seminarortodoxtargoviste.ro"),
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
        {/* Vercel monitoring — no-op locally, only sends data from the deployed site. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
