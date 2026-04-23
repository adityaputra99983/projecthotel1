import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hutan Lembah - Penginapan Hotel",
  description: "Hotel butik di tengah hutan hujan Jawa. Nikmati ketenangan dan keindahan alam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <head>
        <link rel="icon" href="/hotel-icon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
