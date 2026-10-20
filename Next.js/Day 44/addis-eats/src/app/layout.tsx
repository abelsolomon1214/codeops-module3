import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://addiseats.et"),
  title: {
    template: "%s · Addis Eats",
    default: "Addis Eats — food delivery in Addis Ababa"
  },
  description: "Order Doro Wat, Tibs and Kitfo from kitchens in Bole and Kazanchis. Delivery across Addis Ababa, paid with TeleBirr."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
