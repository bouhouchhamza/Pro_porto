'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    console.log('Scrolling to section:', id);
    const element = document.getElementById(id);
    console.log('Element found:', element);
    if (element) {
      const navbarHeight = 80; // Approximate navbar height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      console.log('Scroll initiated to position:', offsetPosition);
    } else {
      console.log('Element not found for id:', id);
    }
    setIsMobileMenuOpen(false); // Close mobile menu after clicking
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl sm:text-3xl font-bold text-white">
              Hamza Bouhouch
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('skills')}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection('certifications')}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Certifications
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
          
          {/* Desktop Resume Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/resume.pdf';
                link.download = 'Hamza_Bouhouch_Resume.pdf';
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-full text-base font-medium hover:from-purple-600 hover:to-blue-600 transition-all glow"
            >
              Resume
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-sm border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('skills')}
                className="block w-full text-left text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="block w-full text-left text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection('certifications')}
                className="block w-full text-left text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Certifications
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Contact
              </button>
              <div className="pt-2 border-t border-gray-700">
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/resume.pdf';
                    link.download = 'Hamza_Bouhouch_Resume.pdf';
                    link.target = '_blank';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-full text-base font-medium hover:from-purple-600 hover:to-blue-600 transition-all glow text-center"
                >
                  Resume
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}