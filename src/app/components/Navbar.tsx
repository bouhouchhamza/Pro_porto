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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 58;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;

      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: "smooth",
      });
    }

    setIsMobileMenuOpen(false);
  };

  const openResume = () => {
    window.open("/resume.pdf", "_blank", "noopener,noreferrer");
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="portfolio-nav">
      <div className="nav-shell">
        <div className="nav-row">
          <Link href="/" className="nav-logo" aria-label="Hamza Bouhouch home">
            <img src="/logo.png" alt="Hamza Bouhouch Logo" className="nav-logo-image" />
          </Link>

          <div className="nav-links">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="nav-link"
              >
                {item.label}
              </button>
            ))}
            <button onClick={openResume} className="nav-link nav-resume">
              Resume
            </button>
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
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="mobile-nav-link"
              >
                {item.label}
              </button>
            ))}
            <button onClick={openResume} className="mobile-nav-link mobile-resume">
              Resume
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
