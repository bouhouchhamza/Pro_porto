import type { Metadata, Viewport } from "next";
import { Questrial } from "next/font/google";
import "./globals.css";
import StarBackground from "./components/StarBackground";
import ScrollAnimations from "./components/ScrollAnimations";
import { siteMetadata, structuredData } from "./metadata";
import { ThemeProvider } from "@/context/ThemeContext";

const questrial = Questrial({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-questrial",
  display: "swap",
});

export const metadata: Metadata = siteMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#141423",
  colorScheme: "dark light",
};

const themeScript = `(function() {
  try {
    var stored = localStorage.getItem('portfolio-theme-preference');
    var theme = stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'dark';
    var resolved = theme === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
    document.documentElement.setAttribute('data-theme', resolved);
    document.documentElement.classList.add('theme-' + resolved);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.classList.add('theme-dark');
  }
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-MA" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeScript,
          }}
        />
      </head>
      <body className={`${questrial.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <ThemeProvider>
          <StarBackground />
          <ScrollAnimations />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

