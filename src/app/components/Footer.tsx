import Image from "next/image";

export default function Footer() {
  return (
    <footer className="portfolio-footer">
      <div className="footer-shell">
        {/* Main row */}
        <div className="footer-main-row">
          {/* Left Column: Full logo.png */}
          <div className="footer-brand">
            <Image
              src="/logo.png"
              alt="Hamza Bouhouch - Full-Stack Developer portfolio logo"
              width={180}
              height={56}
              className="footer-logo-image"
            />
          </div>

          {/* Right Column: Two columns of nav links & contact info */}
          <div className="footer-right-cols">
            {/* Column 1: Links */}
            <div className="footer-links-col">
              <a href="#about">About</a>
              <a href="#projects">Projects</a>
              <a href="#skills">Skills</a>
              <a href="#experience">Experience</a>
              <a href="#contact">Contact</a>
            </div>

            {/* Column 2: Contact Info */}
            <div className="footer-info-col">
              <a href="mailto:bouhouchhamza075@gmail.com" aria-label="Send email to Hamza Bouhouch">
                bouhouchhamza075@gmail.com
              </a>
              <a href="tel:+212680413783" aria-label="Call Hamza Bouhouch">
                +212 680 413 783
              </a>
              <span>Morocco</span>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <hr className="footer-divider" />

        {/* Bottom Sub-bar */}
        <div className="footer-bottom-bar">
          <span className="footer-designer">Hamza Bouhouch Portfolio</span>
          <span className="footer-copyright">© 2026 All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
}
