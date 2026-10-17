"use client";

import Image from "next/image";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-container">
        <div className="hero-text">
          <div className="hero-top-content">
            <h1 id="hero-title" className="hero-title">
              <span>Hamza Bouhouch:</span>
              <span>Full-Stack Developer</span>
              <span>PHP, Laravel &amp; Node.js</span>
              <span className="hero-supporting-domains">
                REST APIs · Web Applications · SaaS Platforms · AI Automation
              </span>
            </h1>
            <p className="hero-description">
              I&apos;m Hamza Bouhouch, a Full-Stack Developer based in Morocco. I build
              reliable web applications, database-backed REST APIs, and automated
              workflows using Laravel, Node.js, and modern frontend tools.
            </p>
          </div>
          <div className="hero-buttons">
            <a
              href="#projects"
              className="hero-button-primary"
              aria-label="Explore my verified engineering projects"
            >
              Explore Projects
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-button-secondary"
              aria-label="Download Hamza Bouhouch CV (PDF)"
            >
              Download CV
            </a>
            <a
              href="#contact"
              className="hero-button-tertiary"
              aria-label="Contact Hamza Bouhouch directly"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div className="hero-image-container">
          <div className="hero-image-wrapper">
            <div className="hero-flip-inner">
              <div className="hero-card-face hero-card-front">
                <div className="hero-image">
                  <Image
                    src="/byby.jpg"
                    alt="Hamza Bouhouch - Full-Stack Developer in Morocco (PHP, Laravel, Node.js)"
                    width={520}
                    height={650}
                    loading="eager"
                    priority
                    quality={85}
                    sizes="(max-width: 767px) 78vw, 290px"
                  />
                </div>
              </div>
              <div className="hero-card-face hero-card-back" aria-hidden="true">
                <div className="hero-profile-card">
                  <div className="hero-profile-top">
                    <span className="hero-profile-status" />
                    <span>Hamza Bouhouch</span>
                  </div>
                  <div className="hero-profile-middle">
                    <p>Full-Stack Developer</p>
                    <dl>
                      <div>
                        <dt>Location</dt>
                        <dd>Morocco</dd>
                      </div>
                      <div>
                        <dt>Focus</dt>
                        <dd>PHP / Laravel &amp; Node.js</dd>
                      </div>
                      <div>
                        <dt>Availability</dt>
                        <dd>Open for select opportunities</dd>
                      </div>
                    </dl>
                  </div>
                  <div className="hero-profile-stack">
                    <span>Laravel</span>
                    <span>PHP</span>
                    <span>Node.js</span>
                    <span>Express</span>
                    <span>MySQL</span>
                    <span>MongoDB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
