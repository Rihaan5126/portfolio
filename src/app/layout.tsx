import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { profile } from "@/lib/data";
import { siteUrl } from "@/lib/site";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/ui/Footer";
import { RevealObserver } from "@/components/ui/RevealObserver";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const defaultTitle = `${profile.name} · Software, systems and AI`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s · ${profile.name}`,
  },
  description: profile.description,
  keywords: [
    "Rihaan",
    "portfolio",
    "software engineer",
    "Computer Engineering",
    "machine learning",
    "Rust",
    "Three.js",
    "robotics software",
  ],
  authors: [{ name: profile.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: defaultTitle,
    description: profile.description,
    siteName: `${profile.name}'s portfolio`,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: profile.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#070b16" },
    { media: "(prefers-color-scheme: light)", color: "#f3f6fc" },
  ],
};

// Runs before hydration so the right theme class is on <html> before first
// paint (no flash). It also adds "js", which scopes the reveal-on-scroll hidden
// state so content is fully visible when JavaScript is unavailable.
const themeInitScript = `
  (function () {
    var root = document.documentElement;
    root.classList.add("js");
    try {
      var stored = localStorage.getItem("theme");
      var theme = stored === "light" ? "light" : "dark";
      root.classList.toggle("dark", theme === "dark");
      root.style.colorScheme = theme;
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </head>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
