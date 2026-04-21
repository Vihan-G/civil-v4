import type { Metadata } from "next";
import localFont from "next/font/local";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import "./globals.css";

const displayFont = localFont({
  display: "swap",
  src: "./fonts/SFCompact.ttf",
  variable: "--font-display",
  weight: "500 700"
});

const bodyFont = localFont({
  display: "swap",
  src: "./fonts/SFNS.ttf",
  variable: "--font-body",
  weight: "400 500"
});

const monoFont = localFont({
  display: "swap",
  src: "./fonts/SFNSMono.ttf",
  variable: "--font-mono",
  weight: "500"
});

export const metadata: Metadata = {
  title: "Civil Agent - Preliminary structural design",
  description:
    "Civil Agent turns architectural massing into auditable preliminary structural schemes for AEC teams."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
      lang="en"
    >
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
