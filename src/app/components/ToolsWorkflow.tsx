"use client";

import { useEffect, useRef, useState } from "react";

const tools = [
  { name: "HTML", icon: "🌐" },
  { name: "CSS", icon: "🎨" },
  { name: "Tailwind", icon: "💨" },
  { name: "Bootstrap", icon: "🅱️" },
  { name: "JavaScript", icon: "⚡" },
  { name: "TypeScript", icon: "📘" },
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "Node.js", icon: "🟢" },
  { name: "PHP", icon: "🐘" },
  { name: "MySQL", icon: "🐬" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Git", icon: "📦" },
  { name: "Docker", icon: "🐳" },
  { name: "Figma", icon: "🎨" },
  { name: "VS Code", icon: "💻" },
];

export default function ToolsWorkflow() {
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
      id="workflow"
      ref={sectionRef}
      className={`portfolio-section workflow-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className="section-shell workflow-layout">
        <div
          className="tools-grid"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          {tools.map((tool, index) => (
            <div
              className="tool-card"
              key={tool.name}
              style={{ transitionDelay: `${index * 25}ms` }}
            >
              <span>{tool.icon}</span>
              <strong>{tool.name}</strong>
            </div>
          ))}
        </div>

        <div
          className="workflow-copy"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <h2>Web Development &amp; Automation Technologies</h2>
          <p>
            Hamza Bouhouch uses a modern full stack toolkit to deliver reliable
            web applications and AI automation systems for businesses in Morocco and worldwide.
          </p>
          <p>
            The stack combines React and Next.js interfaces, Laravel and Node.js
            backends, Docker, databases, APIs, and automated n8n workflows.
          </p>
        </div>
      </div>
    </section>
  );
}
