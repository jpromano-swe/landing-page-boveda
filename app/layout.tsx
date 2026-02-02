import type { Metadata } from "next";
import { Instrument_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "BÓVEDA | Ahorrá en Bitcoin automático",
  description:
    "Ahorro automático en BTC: depositás ARS en Binance y BÓVEDA compra y envía a tu bóveda.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${body.variable} ${display.variable} font-body antialiased bg-[#f6f4ef] text-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}
