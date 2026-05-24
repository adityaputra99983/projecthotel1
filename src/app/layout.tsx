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
  openGraph: {
    title: "Hutan Lembah - Penginapan Hotel",
    description: "Hotel butik di tengah hutan hujan Jawa. Nikmati ketenangan dan keindahan alam.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} dark`}>
      <head>
        <link rel="icon" href="/hotel-icon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#0a1a0a" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
