"use client";

import { useEffect, useRef, useState } from "react";
import { WORK_EXPERIENCE, EDUCATION_HISTORY } from "@/data/experience";
import "./experience.css";

export default function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className={`portfolio-section experience-section ${isVisible ? "is-visible" : ""}`}
      aria-labelledby="experience-section-title"
    >
      <div className="experience-container">
        {/* Section Heading Group */}
        <div className="experience-heading-group">
          <div className="experience-eyebrow" aria-hidden="true">
            <span>💼</span>
            <span>Career &amp; Learning</span>
          </div>
          <h2 id="experience-section-title">Experience &amp; Education</h2>
          <p>My journey so far.</p>
        </div>

        {/* Compact Two-Column Grid: Left Experience, Right Education */}
        <div className="experience-columns-grid">
          {/* Column 1: Experience */}
          <div className="experience-column">
            <div className="experience-column-header">
              <span className="experience-column-icon" aria-hidden="true">💼</span>
              <h3 className="experience-column-title">Experience</h3>
            </div>

            <div className="experience-entries-list">
              {WORK_EXPERIENCE.map((item) => (
                <article key={item.id} className="experience-compact-card">
                  <div className="experience-card-top">
                    <span className="experience-period-pill">{item.period}</span>
                    <span className="experience-org-name">{item.organization}</span>
                  </div>
                  <h4 className="experience-role-title">{item.role}</h4>
                  <p className="experience-description">{item.description}</p>
                </article>
              ))}
            </div>
          </div>

          {/* Column 2: Education */}
          <div className="experience-column">
            <div className="experience-column-header">
              <span className="experience-column-icon" aria-hidden="true">🎓</span>
              <h3 className="experience-column-title">Education</h3>
            </div>

            <div className="experience-entries-list">
              {EDUCATION_HISTORY.map((item) => (
                <article key={item.id} className="experience-compact-card">
                  <div className="experience-card-top">
                    <span className="experience-period-pill">{item.period}</span>
                    <span className="experience-org-name">{item.organization}</span>
                  </div>
                  <h4 className="experience-role-title">{item.role}</h4>
                  <p className="experience-description">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
