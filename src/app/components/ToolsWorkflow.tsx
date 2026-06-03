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
          <h2>Technologies &amp; Tools</h2>
          <p>
            Specializing in React, Node.js, and modern web technologies.
            Helping businesses and e-commerce grow with custom web solutions
            focused on performance, SEO, and scalability.
          </p>
          <p>
            Technologies. Helping businesses and e-commerce grow with custom web
            solutions focused on performance, SEO, and scalability.
          </p>
        </div>
      </div>
    </section>
  );
}
