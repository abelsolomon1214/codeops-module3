import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Addis Eats | Ethiopian Food, Delivered",
    template: "%s | Addis Eats",
  },
  description:
    "Discover authentic Ethiopian dishes from Addis Eats. Explore the menu, choose your favorites, and enjoy a better way to experience Ethiopian food.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <CartProvider>
          <header className="site-header">
            <div className="site-header__inner">
              <Link href="/" className="brand">
                <span className="brand__mark">AE</span>

                <span className="brand__text">
                  <strong>Addis Eats</strong>
                  <small>ETHIOPIAN KITCHEN</small>
                </span>
              </Link>

              <nav className="site-nav" aria-label="Main navigation">
                <Link href="/">Home</Link>
                <Link href="/menu">Menu</Link>
                <Link href="/cart">Cart</Link>
              </nav>

              <Link href="/menu" className="header-cta">
                Order now
              </Link>
            </div>
          </header>

          <main>{children}</main>

          <footer className="site-footer">
            <div className="site-footer__inner">
              <div>
                <Link href="/" className="footer-brand">
                  Addis Eats
                </Link>
                <p>
                  A modern way to discover the flavors of Ethiopian cuisine.
                </p>
              </div>

              <div className="footer-links">
                <Link href="/menu">Explore menu</Link>
                <Link href="/cart">Your cart</Link>
                <Link href="/checkout">Checkout</Link>
              </div>

              <p className="footer-copy">
                © 2026 Addis Eats. Built with care in Addis Ababa.
              </p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}