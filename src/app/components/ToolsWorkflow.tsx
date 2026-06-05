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
          <h2>Web Development &amp; Automation Technologies</h2>
          <p>
            I use a modern full-stack toolkit to build reliable web applications,
            SaaS platforms, mobile apps, and AI automation systems for businesses
            in Morocco and worldwide.
          </p>
          <p>
            I work with React and Next.js interfaces, Laravel and Node.js
            backends, Python and FastAPI services, Supabase, MySQL, PostgreSQL,
            APIs, mobile applications, and automated n8n workflows.
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
