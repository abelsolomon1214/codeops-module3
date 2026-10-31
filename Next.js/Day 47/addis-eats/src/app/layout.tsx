import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import Providers from "@/providers";
import { getSession } from "@/lib/session";
import { signOutAction } from "@/app/actions";

export const metadata: Metadata = {
  metadataBase: new URL("https://addis-eats-git-main-ibts-projects.vercel.app"),
  title: {
    template: "%s | Addis Eats",
    default: "Addis Eats | Authentic Ethiopian Cuisine in Addis Ababa",
  },
  description:
    "Explore traditional Ethiopian dishes with authentic recipes, seasonal fasting menus, and real-time delivery tracking across Addis Ababa.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="app-shell">
            <header className="site-header">
              <div className="site-header__inner">
                <Link href="/" className="brand-lockup">
                  <span className="brand-logo" aria-hidden="true">AE</span>
                  <div className="brand-text">
                    <span className="brand-title">Addis Eats</span>
                    <span className="brand-subtitle">ETHIOPIAN KITCHEN</span>
                  </div>
                </Link>

                <nav className="site-nav" aria-label="Main Navigation">
                  <Link href="/" className="nav-link">Home</Link>
                  <Link href="/menu" className="nav-link">Menu</Link>
                  <Link href="/cart" className="nav-link">Cart</Link>
                  <Link href="/orders" className="nav-link">Orders</Link>
                  <Link href="/dashboard" className="nav-link">Dashboard</Link>
                </nav>

                <div className="site-header__actions">
                  <Link href="/menu" className="button button--primary header-cta">
                    Order now
                  </Link>

                  {session ? (
                    <div className="header-user-panel">
                      <span className="header-user-name">{session.name}</span>
                      <form action={signOutAction} style={{ display: "inline" }}>
                        <button type="submit" className="button button--ghost-small">
                          Sign out
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="header-auth-links">
                      <Link href="/signin" className="nav-link">Sign in</Link>
                      <Link href="/signup" className="nav-link">Sign up</Link>
                    </div>
                  )}
                </div>
              </div>
            </header>

            <div className="page-content">{children}</div>

            <footer className="site-footer">
              <div className="site-footer__inner">
                <p>&copy; 2026 Addis Eats. Built with care in Addis Ababa.</p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
