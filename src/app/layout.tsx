import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/ui/whatsapp-float";

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

export const metadata: Metadata = {
  title: "Turismo Dabar | Viajes Grupales, Giras de Estudio y Adultos Mayores en Chile",
  description: "Agencia de turismo en Chile especializada en la venta de viajes todo incluido, cursos y paquetes turísticos para grupos grandes, giras de estudio y adultos mayores.",
  keywords: ["Turismo Dabar", "Viajes grupales Chile", "Giras de estudio Chile", "Turismo adultos mayores", "Paquetes turísticos grupos"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} min-h-full antialiased scroll-smooth`}
    >
      <body className="flex min-h-dvh flex-col bg-[#fbfaf7] text-stone-900 antialiased">
        <Navbar />
        <div className="flex w-full flex-1 flex-col">{children}</div>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
