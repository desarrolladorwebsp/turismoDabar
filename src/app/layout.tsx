import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/ui/whatsapp-float";
import { JsonLd } from "@/components/seo/json-ld";
import { siteMetadata } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-CL"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} min-h-full antialiased scroll-smooth`}
    >
      <body className="flex min-h-dvh flex-col bg-[#fbfaf7] text-stone-900 antialiased">
        <JsonLd />
        <Navbar />
        <div className="flex w-full flex-1 flex-col">{children}</div>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
