"use client";

import { useEffect, useRef, useState } from "react";
import "./skills.css";

interface SkillCardData {
  title: string;
  icon: string;
  meta: string;
}

const skillCards: SkillCardData[] = [
  {
    title: "Backend & REST APIs",
    icon: "⚙️",
    meta: "PHP · Laravel · Node.js",
  },
  {
    title: "Frontend Fundamentals",
    icon: "🎨",
    meta: "HTML5 · CSS3 · Modern JS",
  },
  {
    title: "Databases",
    icon: "🗄️",
    meta: "MySQL · MongoDB · PostgreSQL",
  },
  {
    title: "Development Tools",
    icon: "🛠️",
    meta: "Git · Docker · Linux VPS",
  },
  {
    title: "Automation & Integrations",
    icon: "⚡",
    meta: "n8n · Webhooks · REST APIs",
  },
  {
    title: "Collaboration & Methods",
    icon: "👥",
    meta: "Agile · Scrum · Clean Code",
  },
];

export default function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.12 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`portfolio-section skills-section ${isVisible ? "is-visible" : ""}`}
      aria-labelledby="skills-section-heading"
    >
      <div className="skills-frame-inner">
        <div className="skills-copy">
          <h2 id="skills-section-heading">Full Stack &amp; AI Automation Skills</h2>
          <p>
            Specialized in solid backend architecture with PHP, Laravel, and Node.js,
            complemented by modern web fundamentals, relational and document databases, and
            streamlined workflow automations.
          </p>
          <p>
            Focused on shipping dependable web applications, clean RESTful APIs, and
            automated integration pipelines that solve real-world problems.
          </p>
        </div>

        <div className="skills-card-grid">
          {skillCards.map((skill, index) => (
            <article
              key={skill.title}
              className="skill-expertise-card"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <span className="skill-expertise-icon" aria-hidden="true">
                {skill.icon}
              </span>
              <strong>{skill.title}</strong>
              <small>{skill.meta}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
