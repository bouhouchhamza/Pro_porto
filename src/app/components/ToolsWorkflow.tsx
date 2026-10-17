"use client";

import { useEffect, useRef, useState } from "react";
import { IconCloud } from "@/registry/magicui/icon-cloud";

const slugs = [
  "typescript",
  "javascript",
  "react",
  "nextdotjs",
  "laravel",
  "php",
  "python",
  "fastapi",
  "nodedotjs",
  "express",
  "html5",
  "css3",
  "tailwindcss",
  "bootstrap",
  "mysql",
  "postgresql",
  "mongodb",
  "supabase",
  "firebase",
  "docker",
  "git",
  "github",
  "vercel",
  "figma",
  "visualstudiocode",
  "android",
  "flutter",
  "n8n",
];

const images = slugs.map((slug) => `https://cdn.simpleicons.org/${slug}`);

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
          className="workflow-copy"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <h2>Development Toolkit &amp; Tech Ecosystem</h2>
          <p>
            An interactive 3D visualization of the languages, frameworks, databases,
            and developer tooling I practice across full-stack engineering, REST API
            development, and automated workflows.
          </p>
          <p>
            From core backend engines in PHP/Laravel and Node.js/Express to relational
            and document databases (MySQL, MongoDB, PostgreSQL) and containerized
            Docker workflows.
          </p>
        </div>

        <div
          className="workflow-icon-cloud"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
          }}
          aria-label="Technology stack icon cloud"
        >
          <IconCloud images={images} />
        </div>
      </div>
    </section>
  );
}
