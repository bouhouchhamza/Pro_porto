"use client";

import { useEffect, useRef, useState } from "react";

const skillCards = [
  { title: "Frontend", icon: "🎨", count: "5 Technologies" },
  { title: "Database", icon: "🗄️", count: "5 Technologies" },
  { title: "Backend", icon: "⚙️", count: "5 Technologies" },
  { title: "Full Stack", icon: "🚀", count: "5 Technologies" },
  { title: "Management", icon: "📊", count: "5 Technologies" },
  { title: "CMS", icon: "📝", count: "5 Technologies" },
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
          <h2>Skills &amp; Expertise</h2>
          <p>
            Specializing in React, Node.js, and modern web technologies.
            Helping businesses and e-commerce grow with custom web solutions
            focused on performance, SEO, and scalability.
          </p>
          <p>
            Technologies. Helping businesses and e-commerce grow with custom
            web solutions focused on performance, SEO, and scalability.
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
