import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StarBackground from "./components/StarBackground";
import SmoothScroll from "./components/SmoothScroll";
import ScrollAnimations from "./components/ScrollAnimations";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://bouhouch.site/#person",
      "name": "Hamza Bouhouch",
      "url": "https://bouhouch.site",
      "jobTitle": "Full Stack Developer & AI Automation Engineer",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Morocco"
      },
      "sameAs": [
        "https://github.com/bouhouchhamza",
        "https://www.linkedin.com/"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://bouhouch.site/#website",
      "url": "https://bouhouch.site",
      "name": "Hamza Bouhouch Portfolio",
      "publisher": {
        "@id": "https://bouhouch.site/#person"
      }
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://bouhouch.site/#service",
      "name": "Hamza Bouhouch - Full Stack Developer & AI Automation Engineer",
      "url": "https://bouhouch.site",
      "image": "https://bouhouch.site/logo.png",
      "telephone": "+212772247633",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Morocco"
      }
    }
  ]
};

export const metadata: Metadata = {
  title: "Hamza Bouhouch | Full Stack Developer & AI Automation Engineer",
  description: "Hamza Bouhouch builds premium web applications, SaaS dashboards, AI automation workflows, and business systems using React, Next.js, Laravel, n8n, and modern technologies.",
  keywords: ["Hamza Bouhouch", "Full Stack Developer Morocco", "AI Automation Engineer", "React Developer", "Next.js Developer", "Laravel Developer", "n8n automation", "SaaS developer", "web applications", "business automation"],
  authors: [{ name: "Hamza Bouhouch" }],
  creator: "Hamza Bouhouch",
  metadataBase: new URL('https://bouhouch.site'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Hamza Bouhouch | Full Stack Developer & AI Automation Engineer",
    description: "Hamza Bouhouch builds premium web applications, SaaS dashboards, AI automation workflows, and business systems using React, Next.js, Laravel, n8n, and modern technologies.",
    url: 'https://bouhouch.site',
    siteName: "Hamza Bouhouch Portfolio",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hamza Bouhouch - Full Stack Developer & AI Automation Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hamza Bouhouch | Full Stack Developer & AI Automation Engineer",
    description: "Hamza Bouhouch builds premium web applications, SaaS dashboards, AI automation workflows, and business systems using React, Next.js, Laravel, n8n, and modern technologies.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification-token',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#1a1a2e" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StarBackground />
        <SmoothScroll />
        <ScrollAnimations />
        {children}
      </body>
    </html>
  );
}
