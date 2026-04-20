import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
