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
  title: "Hamza Bouhouch - Full Stack Developer",
  description: "Portfolio of Hamza Bouhouch, a passionate Full Stack Developer specializing in modern web technologies including React, Node.js, and TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
