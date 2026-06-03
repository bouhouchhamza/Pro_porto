"use client";

import Image from "next/image";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-container">
        <div className="hero-text">
          <span className="hero-badge">Premium developer portfolio</span>
          <h1 id="hero-title" className="hero-title">
            <span>Hamza Bouhouch</span>
            <span>Full Stack Developer &amp; AI Automation Engineer in Morocco</span>
          </h1>
          <p className="hero-description">
            I am a professional Full Stack Developer and AI Automation Engineer in Morocco. I build premium websites, web applications, SaaS dashboards, AI automation workflows, and business systems using React, Next.js, Laravel, and n8n.
          </p>
          <div className="hero-buttons">
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="hero-button-primary"
              aria-label="View my portfolio projects"
            >
              View Projects
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="hero-button-secondary"
              aria-label="Contact Hamza Bouhouch"
            >
              Contact Me
            </button>
          </div>
        </div>

        <div className="hero-image-container">
          <div className="hero-image-wrapper glass-panel">
            <div className="hero-image-glow" />
            <div className="hero-image">
              <Image
                src="/byby.jpg"
                alt="Hamza Bouhouch - Full Stack Developer & AI Automation Engineer Morocco"
                width={520}
                height={650}
                loading="eager"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
