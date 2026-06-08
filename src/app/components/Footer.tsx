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
              alt="Hamza Bouhouch full stack developer portfolio logo"
              width={180}
              height={56}
              className="footer-logo-image"
            />
          </div>

          {/* Right Column: Two columns of nav links & contact info */}
          <div className="footer-right-cols">
            {/* Column 1: Links */}
            <div className="footer-links-col">
              <a href="#about">About Me</a>
              <a href="#skills">My Skills</a>
              <a href="#projects">My Projects</a>
              <a href="#contact">Contact Me</a>
            </div>

            {/* Column 2: Contact Info */}
            <div className="footer-info-col">
              <a href="mailto:bouhouchhamza075@gmail.com">
                bouhouchhamza075@gmail.com
              </a>
              <a href="tel:+212680413783">
                +212 680413783
              </a>
              <span>Morocco</span>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <hr className="footer-divider" />

        {/* Bottom Sub-bar */}
        <div className="footer-bottom-bar">
          <span className="footer-designer">Designed by BPL-Studios</span>
          <span className="footer-copyright">2026 All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
}
