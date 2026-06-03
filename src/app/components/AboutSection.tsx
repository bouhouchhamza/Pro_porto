"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Token {
  text: string;
  className: string;
}

const codeTokens: Token[] = [
  { text: "const ", className: "syntax-keyword" },
  { text: "aboutMe ", className: "syntax-property" },
  { text: "= ", className: "" },
  { text: "{\n", className: "syntax-bracket" },
  
  { text: "  role", className: "syntax-property" },
  { text: ': "', className: "" },
  { text: "Full Stack & AI Automation", className: "syntax-string" },
  { text: '",\n', className: "" },
  
  { text: "  builds", className: "syntax-property" },
  { text: ': [', className: "" },
  { text: '"SaaS"', className: "syntax-string" },
  { text: ", ", className: "" },
  { text: '"AI Workflows"', className: "syntax-string" },
  { text: ", ", className: "" },
  { text: '"n8n"', className: "syntax-string" },
  { text: '],\n', className: "" },
  
  { text: "  stack", className: "syntax-property" },
  { text: ': [', className: "" },
  { text: '"Laravel"', className: "syntax-string" },
  { text: ", ", className: "" },
  { text: '"React"', className: "syntax-string" },
  { text: ", ", className: "" },
  { text: '"Next.js"', className: "syntax-string" },
  { text: '],\n', className: "" },
  
  { text: "  service", className: "syntax-property" },
  { text: ': "', className: "" },
  { text: "Business Systems for Clients", className: "syntax-string" },
  { text: '"\n', className: "" },
  
  { text: "};", className: "syntax-bracket" }
];

function AboutTerminalCard({
  isVisible,
}: {
  isVisible: boolean;
}) {
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const totalChars = codeTokens.reduce((sum, token) => sum + token.text.length, 0);
    let current = 0;

    const interval = setInterval(() => {
      current += 1;
      setVisibleChars(current);
      if (current >= totalChars) {
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [isVisible]);

  let charsRendered = 0;
  const renderedElements = codeTokens.map((token, index) => {
    if (charsRendered >= visibleChars) return null;
    const remaining = visibleChars - charsRendered;
    const textToShow = token.text.slice(0, remaining);
    charsRendered += token.text.length;

    return (
      <span key={index} className={token.className}>
        {textToShow}
      </span>
    );
  });

  return (
    <div
      className="about-terminal-card"
      aria-label="About Me JavaScript terminal card"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
      }}
    >
      {/* Header bar with mac dots and JavaScript label */}
      <div className="about-terminal-header">
        <div className="about-terminal-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className="about-terminal-lang">JavaScript</span>
      </div>

      {/* Terminal body */}
      <div className="about-terminal-body">
        <pre className="about-terminal-code">
          <code>{renderedElements}</code>
        </pre>

        {/* Blinking cursor at bottom left */}
        <div className="about-terminal-cursor" aria-hidden="true" />

        {/* Portrait image overlay */}
        <div className="about-terminal-portrait-wrap">
          <Image
            src="/byby.jpg"
            alt="Hamza Bouhouch - Website Developer Morocco"
            width={505}
            height={343}
            className="about-terminal-portrait"
          />
        </div>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`portfolio-section about-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className="about-frame-inner">
        {/* Left column: About Me title + description */}
        <div
          className="about-copy"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <h2>About Me</h2>
          <p>
            I am Hamza Bouhouch, an experienced Full Stack Developer Morocco and AI Automation Engineer Morocco. I build high-converting websites, web applications, and automated workflows that streamline operations and drive growth.
          </p>
          <p>
            With deep expertise in React, Next.js, Laravel, and n8n, I partner with companies to create custom SaaS dashboards and intelligent business automation systems tailored to their workflows.
          </p>
        </div>

        {/* Right column: Terminal card */}
        <AboutTerminalCard isVisible={isVisible} />
      </div>
    </section>
  );
}
