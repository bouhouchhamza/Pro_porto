"use client";

import Image from "next/image";
import { Questrial } from "next/font/google";
import "./Hero.css";

const questrial = Questrial({
  weight: "400",
  subsets: ["latin"],
});

export default function Hero() {
  return (
    <section className={`${questrial.className} hero-section`} aria-labelledby="hero-title">
      <div className="hero-container">
        <div className="hero-text">
          <div className="hero-top-content">
            <h1 id="hero-title" className="hero-title">
              <span>Hamza Bouhouch:</span>
              <span>Full Stack Web Developer</span>
              <span>AI Automation Engineer</span>
              <span>in Morocco</span>
            </h1>
            <p className="hero-description">
              Hamza Bouhouch builds custom web applications, SaaS products, and
              business automation using Laravel, React, Next.js, Node.js, and n8n.
            </p>
          </div>
          <div className="hero-buttons">
            <a
              href="#projects"
              className="hero-button-primary"
              aria-label="View Hamza Bouhouch full stack and AI automation projects"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="hero-button-secondary"
              aria-label="Contact Hamza Bouhouch for web development and AI automation"
            >
              Contact us &gt;
            </a>
          </div>
        </div>

        <div className="hero-image-container">
          <div className="hero-image-wrapper glass-panel">
            <div className="hero-image-glow" />
            <div className="hero-flip-inner">
              <div className="hero-card-face hero-card-front">
                <div className="hero-image">
                  <Image
                    src="/byby.jpg"
                    alt="Hamza Bouhouch - Full Stack Developer & AI Automation Engineer Morocco"
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
                    <p>Full Stack Developer</p>
                    <dl>
                      <div>
                        <dt>Location</dt>
                        <dd>Morocco</dd>
                      </div>
                      <div>
                        <dt>Availability</dt>
                        <dd>Open for select projects</dd>
                      </div>
                    </dl>
                  </div>
                  <div className="hero-profile-stack">
                    <span>Laravel</span>
                    <span>React</span>
                    <span>Next.js</span>
                    <span>n8n</span>
                    <span>AI Automation</span>
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
