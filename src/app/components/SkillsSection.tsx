"use client";

import { useEffect, useRef, useState } from "react";

const skillCards = [
  { title: "Frontend", icon: "🎨", count: "7 Technologies" },
  { title: "Database", icon: "🗄️", count: "4 Technologies" },
  { title: "Backend", icon: "⚙️", count: "3 Technologies" },
  { title: "Full Stack", icon: "🚀", count: "7 Technologies" },
  { title: "Management", icon: "📊", count: "3 Technologies" },
  { title: "CMS", icon: "📝", count: "2 Technologies" },
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
    >
      <div className="skills-frame-inner">
        <div className="skills-copy">
          <h2>Full Stack &amp; AI Automation Skills</h2>
          <p>
            As a Laravel Developer, React Developer, and Next.js Developer in
            Morocco, I build secure custom web applications and SaaS platforms
            designed for performance and growth.
          </p>
          <p>
            I specialize in n8n workflows, API integrations, OpenAI solutions,
            Python and FastAPI services, dashboards, and practical business
            automation systems.
          </p>
        </div>

        <div className="skills-card-grid">
          {skillCards.map((skill, index) => (
            <article
              key={skill.title}
              className="skill-expertise-card"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <span className="skill-expertise-icon">{skill.icon}</span>
              <strong>{skill.title}</strong>
              <small>{skill.count}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
