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

export const metadata: Metadata = {
  title: "Full Stack Developer Portfolio – Hamza Bouhouch | React, Node.js, TypeScript",
  description: "Hamza Bouhouch - Full Stack Developer building modern web applications with React, Node.js, TypeScript, and Next.js. Expert in frontend & backend development, responsive design, and performance optimization.",
  metadataBase: new URL('https://hamzabouhouch.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Full Stack Developer Portfolio – Hamza Bouhouch",
    description: "Passionate Full Stack Developer specializing in React, Node.js, TypeScript. Building modern, scalable web applications with exceptional user experiences.",
    url: 'https://hamzabouhouch.vercel.app',
    siteName: "Hamza Bouhouch Portfolio",
    images: [
      {
        url: '/byby.png',
        width: 1200,
        height: 630,
        alt: 'Hamza Bouhouch - Full Stack Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Full Stack Developer Portfolio – Hamza Bouhouch",
    description: "Passionate Full Stack Developer specializing in React, Node.js, TypeScript. Building modern web applications.",
    images: ['/byby.png'],
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
        <meta name="author" content="Hamza Bouhouch" />
        <meta name="keywords" content="Hamza Bouhouch, Full Stack Developer, React, Node.js, TypeScript, Next.js, Web Developer, Portfolio, Frontend, Backend, JavaScript, Morocco" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preload" href="/byby.png" as="image" type="image/png" />
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
