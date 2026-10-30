import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Providers from "@/providers";
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#fdfbf7", color: "#1f2937" }}>
        <Providers>
          {/* Day 43 Exact Navigation Header */}
          <header style={{ borderBottom: "1px solid #e5e7eb", background: "#ffffff", position: "sticky", top: 0, zIndex: 50 }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Link href="/" style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0A1F3D", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                🍽️ Addis Eats
              </Link>
              <nav style={{ display: "flex", gap: "1.5rem", alignItems: "center", fontSize: "0.95rem", fontWeight: 600 }}>
                <Link href="/" style={{ color: "#4b5563", textDecoration: "none" }}>Home</Link>
                <Link href="/menu" style={{ color: "#4b5563", textDecoration: "none" }}>Menu</Link>
                <Link href="/cart" style={{ color: "#4b5563", textDecoration: "none" }}>Cart</Link>
                <Link href="/orders" style={{ color: "#4b5563", textDecoration: "none" }}>Orders</Link>
              </nav>
            </div>
          </header>

          {/* Main Content Area */}
          <main style={{ flex: 1 }}>
            {children}
          </main>

          {/* Footer */}
          <footer style={{ borderTop: "1px solid #e5e7eb", background: "#ffffff", padding: "2rem 1.5rem", textAlign: "center", color: "#6b7280", fontSize: "0.875rem" }}>
            <p>© {new Date().getFullYear()} Addis Eats. Traditional Ethiopian food delivery across Addis Ababa.</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
