'use client';

import Link from 'next/link';

export default function Navbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          <div className="flex-shrink-0">
            <Link href="/" className="text-3xl font-bold text-white">
              Portfolio
            </Link>
          </div>
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
          <div className="flex items-center">
            <a
              href="/resume.pdf"
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-full text-base font-medium hover:from-purple-600 hover:to-blue-600 transition-all glow"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}