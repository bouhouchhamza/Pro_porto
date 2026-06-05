import type { Metadata, Viewport } from "next";
import { Questrial } from "next/font/google";
import "./globals.css";
import StarBackground from "./components/StarBackground";
import ScrollAnimations from "./components/ScrollAnimations";
import { siteMetadata, structuredData } from "./metadata";

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
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-MA">
      <body className={`${questrial.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <StarBackground />
        <ScrollAnimations />
        {children}
      </body>
    </html>
  );
}
