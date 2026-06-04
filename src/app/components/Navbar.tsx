"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="portfolio-nav">
      <div className="nav-shell">
        <div className="nav-row">
          <Link href="/" className="nav-logo" aria-label="Hamza Bouhouch home">
            <img src="/logo.png" alt="Hamza Bouhouch - Web Developer Morocco logo" className="nav-logo-image" />
          </Link>

          <div className="nav-links">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="nav-link"
                aria-label={`${item.label} Hamza Bouhouch`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link nav-resume"
              aria-label="Open Hamza Bouhouch Full Stack Developer resume"
            >
              Resume
            </a>
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
                aria-label={`${item.label} Hamza Bouhouch`}
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
              aria-label="Open Hamza Bouhouch Full Stack Developer resume"
            >
              Resume
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
