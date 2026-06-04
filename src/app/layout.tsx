import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StarBackground from "./components/StarBackground";
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
      "name": "Hamza Bouhouch - Full Stack Developer & AI Automation Engineer Morocco",
      "url": "https://bouhouch.site",
      "image": "https://bouhouch.site/logo.png",
      "telephone": "+212772247633",
      "priceRange": "$$",
      "email": "bouhouchhamza075@gmail.com",
      "areaServed": "Morocco",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Morocco"
      }
    },
    {
      "@type": "CreativeWork",
      "@id": "https://bouhouch.site/#project-financial-risk",
      "name": "Financial Risk Simulation Platform",
      "description": "Laravel fintech platform for transaction simulation, risk scoring, fraud signals, and admin review workflows.",
      "url": "https://github.com/bouhouchhamza/Financial_Risk_Simulation_Platform",
      "creator": {
        "@id": "https://bouhouch.site/#person"
      }
    },
    {
      "@type": "CreativeWork",
      "@id": "https://bouhouch.site/#project-ai-automation",
      "name": "AI Automation Systems",
      "description": "Workflow automations that connect business tools, process data, and reduce repetitive manual work using n8n and OpenAI.",
      "url": "https://github.com/bouhouchhamza",
      "creator": {
        "@id": "https://bouhouch.site/#person"
      }
    },
    {
      "@type": "CreativeWork",
      "@id": "https://bouhouch.site/#project-pet-journey",
      "name": "Pet Journey",
      "description": "Full-stack pet care web application with separated frontend and backend for service and journey management.",
      "url": "https://github.com/bouhouchhamza/petJourney",
      "creator": {
        "@id": "https://bouhouch.site/#person"
      }
    }
  ]
};

export const metadata: Metadata = {
  title: "Hamza Bouhouch | Full Stack Developer & AI Automation Engineer in Morocco",
  description: "Hamza Bouhouch is a Full Stack Developer and AI Automation Engineer in Morocco building websites, web applications, SaaS dashboards, AI workflows, n8n automations, Laravel systems, React and Next.js projects for businesses.",
  keywords: [
    "Hamza Bouhouch",
    "bouhouch",
    "bouhouch.site",
    "Full Stack Developer Morocco",
    "Website Developer Morocco",
    "Web Developer Morocco",
    "AI Automation Engineer Morocco",
    "Laravel Developer Morocco",
    "React Developer Morocco",
    "Next.js Developer Morocco",
    "n8n Automation Developer",
    "SaaS Developer Morocco",
    "business automation"
  ],
  authors: [{ name: "Hamza Bouhouch" }],
  creator: "Hamza Bouhouch",
  metadataBase: new URL('https://bouhouch.site'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Hamza Bouhouch | Full Stack Developer & AI Automation Engineer in Morocco",
    description: "Hamza Bouhouch is a Full Stack Developer and AI Automation Engineer in Morocco building websites, web applications, SaaS dashboards, AI workflows, n8n automations, Laravel systems, React and Next.js projects for businesses.",
    url: 'https://bouhouch.site',
    siteName: "Hamza Bouhouch Portfolio",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hamza Bouhouch - Full Stack Developer & AI Automation Engineer Morocco',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hamza Bouhouch | Full Stack Developer & AI Automation Engineer in Morocco",
    description: "Hamza Bouhouch is a Full Stack Developer and AI Automation Engineer in Morocco building websites, web applications, SaaS dashboards, AI workflows, n8n automations, Laravel systems, React and Next.js projects for businesses.",
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
  icons: {
    icon: '/logo.png',
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
        <link rel="icon" href="/logo.png" type="image/png" />
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
        <ScrollAnimations />
        {children}
      </body>
    </html>
  );
}
