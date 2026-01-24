'use client';

import Image from 'next/image';
import './Hero.css';

export default function Hero() {

  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-container">
        <div className="hero-text">
          <span className="hero-badge">✨ Welcome to My Portfolio</span>
          <h1 id="hero-title" className="hero-title">
            <span>Hamza Bouhouch:</span><br />
            <span>Full Stack Developer &</span><br />
            <span>Creative Builder</span>
          </h1>
          <p className="hero-description">
            Passionate Full Stack Developer specializing in React, Node.js, and modern web technologies.
            Crafting innovative web solutions with 5+ years of experience in user-centric design.
          </p>
          <div className="hero-buttons">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="hero-button-primary"
              aria-label="View my portfolio projects"
            >
              View My Work
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="hero-button-secondary"
              aria-label="Get in touch with me"
            >
              Contact Me
            </button>
          </div>
        </div>
        <div className="hero-image-container">
          <div className="hero-image-wrapper">
            <div className="hero-image-glow"></div>
            <div className="hero-image">
              <Image
                src="/byby.png"
                alt="Hamza Bouhouch - Full Stack Developer"
                width={384}
                height={288}
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