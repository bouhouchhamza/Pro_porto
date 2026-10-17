"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ThemeSelector from "./ThemeSelector";

const navItems = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="portfolio-nav">
      <div className="nav-shell">
        <div className="nav-row">
          <Link href="/" className="nav-logo" aria-label="Hamza Bouhouch home">
            <Image
              src="/logo.png"
              alt="Hamza Bouhouch - Full-Stack Developer"
              width={180}
              height={42}
              className="nav-logo-image"
              priority
            />
          </Link>

          <div className="nav-links">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="nav-link"
                aria-label={`${item.label} - Hamza Bouhouch`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link nav-resume"
              aria-label="Download Hamza Bouhouch CV (PDF)"
            >
              Resume
            </a>
            <ThemeSelector className="nav-theme-selector" />
          </div>

          <button
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="mobile-menu-button"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="mobile-nav">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-nav-link"
                aria-label={`${item.label} - Hamza Bouhouch`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-nav-link mobile-resume"
              aria-label="Download Hamza Bouhouch CV (PDF)"
            >
              Resume
            </a>
            <div className="mobile-theme-row">
              <span className="mobile-theme-label">Theme</span>
              <ThemeSelector isMobile className="mobile-theme-selector" />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
