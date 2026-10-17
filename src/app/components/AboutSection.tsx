"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Token {
  text: string;
  className: string;
}

const codeTokens: Token[] = [
  { text: "const ", className: "syntax-keyword" },
  { text: "developer ", className: "syntax-property" },
  { text: "= ", className: "" },
  { text: "{\n", className: "syntax-bracket" },

  { text: "  name", className: "syntax-property" },
  { text: ': "', className: "" },
  { text: "Hamza Bouhouch", className: "syntax-string" },
  { text: '",\n', className: "" },

  { text: "  role", className: "syntax-property" },
  { text: ': "', className: "" },
  { text: "Full-Stack Developer", className: "syntax-string" },
  { text: '",\n', className: "" },

  { text: "  education", className: "syntax-property" },
  { text: ': "', className: "" },
  { text: "YouCode (Web Development)", className: "syntax-string" },
  { text: '",\n', className: "" },

  { text: "  backend", className: "syntax-property" },
  { text: ': [', className: "" },
  { text: '"PHP"', className: "syntax-string" },
  { text: ", ", className: "" },
  { text: '"Laravel"', className: "syntax-string" },
  { text: ", ", className: "" },
  { text: '"Node.js"', className: "syntax-string" },
  { text: ", ", className: "" },
  { text: '"Express"', className: "syntax-string" },
  { text: '],\n', className: "" },

  { text: "  databases", className: "syntax-property" },
  { text: ': [', className: "" },
  { text: '"MySQL"', className: "syntax-string" },
  { text: ", ", className: "" },
  { text: '"MongoDB"', className: "syntax-string" },
  { text: '],\n', className: "" },

  { text: "  practices", className: "syntax-property" },
  { text: ': [', className: "" },
  { text: '"Agile/Scrum"', className: "syntax-string" },
  { text: ", ", className: "" },
  { text: '"Git Workflows"', className: "syntax-string" },
  { text: ']\n', className: "" },

  { text: "};", className: "syntax-bracket" },
];

function AboutTerminalCard({ isVisible }: { isVisible: boolean }) {
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
    }, 22);

    return () => clearInterval(interval);
  }, [isVisible]);

  const renderedElements = codeTokens.map((token, index) => {
    const charsBeforeToken = codeTokens
      .slice(0, index)
      .reduce((total, previousToken) => total + previousToken.text.length, 0);

    if (charsBeforeToken >= visibleChars) return null;

    const remaining = visibleChars - charsBeforeToken;
    const textToShow = token.text.slice(0, remaining);

    return (
      <span key={index} className={token.className}>
        {textToShow}
      </span>
    );
  });

  return (
    <div
      className="about-terminal-card"
      aria-label="About Hamza Bouhouch terminal code card"
      style={{
        opacity: isVisible ? 1 : 0,
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
            src="/terminal_image.jpeg"
            alt="Hamza Bouhouch, Full-Stack Developer based in Morocco"
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
      aria-labelledby="about-section-heading"
    >
      <div className="about-frame-inner">
        {/* Left column: About Me narrative */}
        <div
          className="about-copy"
          style={{
            opacity: isVisible ? 1 : 0,
          }}
        >
          <h2 id="about-section-heading">About Me: Hamza Bouhouch</h2>
          <p>
            I am a Full-Stack Developer trained through intensive, project-based software
            engineering at <strong>YouCode</strong>. My journey focuses on building reliable
            backend systems, well-structured RESTful APIs, and database-backed web applications
            designed for practical business use.
          </p>
          <p>
            My engineering foundation is built on <strong>PHP and Laravel</strong>, alongside{" "}
            <strong>Node.js, Express, MySQL, and MongoDB</strong>. Through Agile/Scrum team
            sprints, peer reviews, and Git feature-branch workflows, I collaborate effectively
            to design modular architectures, secure authentication flows, and clean data schemas.
          </p>
          <p>
            I am driven by SaaS product development, clean code standards, and workflow automation
            with n8n and API integrations. When deploying applications to VPS or edge platforms, I
            prioritize data integrity, reproducible Docker environments, and systematic debugging.
          </p>
        </div>

        {/* Right column: Terminal card */}
        <AboutTerminalCard isVisible={isVisible} />
      </div>
    </section>
  );
}
