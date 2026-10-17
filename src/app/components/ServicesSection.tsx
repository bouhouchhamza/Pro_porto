"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SERVICES_DATA } from "@/data/services";
import "./services.css";

export default function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.08 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className={`portfolio-section services-section ${isVisible ? "is-visible" : ""}`}
      aria-labelledby="services-section-title"
    >
      <div className="services-container">
        {/* Section Header */}
        <div className="services-heading-group">
          <div className="services-eyebrow" aria-hidden="true">
            <span>✨</span>
            <span>Engineering Capabilities</span>
          </div>
          <h2 id="services-section-title">Technical Capabilities &amp; Services</h2>
          <p>
            Reliable, production-ready software solutions engineered with demonstrated proficiencies
            in PHP/Laravel, Node.js/Express, relational &amp; document databases, and automated workflows.
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="services-bento-grid">
          {SERVICES_DATA.map((service, index) => {
            const spanClass = service.isFlagship
              ? "service-span-flagship"
              : index === 1
              ? "service-span-secondary"
              : "service-span-tertiary";

            return (
              <article
                key={service.id}
                className={`service-bento-card ${spanClass}`}
                aria-labelledby={`service-heading-${service.id}`}
              >
                {/* Ambient Radial Hover Glow */}
                <div className="service-card-glow" aria-hidden="true" />

                <div className="service-card-header">
                  <div className="service-icon-box" aria-hidden="true">
                    {service.icon}
                  </div>
                  {service.isFlagship && (
                    <span className="service-flagship-badge">
                      Flagship Capability
                    </span>
                  )}
                </div>

                <h3 id={`service-heading-${service.id}`} className="service-card-title">
                  {service.title}
                </h3>

                <p className="service-card-tagline">{service.tagline}</p>
                <p className="service-card-desc">{service.description}</p>

                {/* Deliverables List */}
                <ul className="service-deliverables-list" aria-label={`Deliverables for ${service.title}`}>
                  {service.deliverables.map((item, idx) => (
                    <li key={idx} className="service-deliverable-item">
                      <span className="service-deliverable-bullet" aria-hidden="true">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Tags */}
                {service.techStack && (
                  <div className="service-tech-pills" aria-label="Core technologies">
                    {service.techStack.map((tech) => (
                      <span key={tech} className="service-tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Bottom CTA Action */}
                <div className="service-card-action">
                  <Link href="#contact" className="service-cta-link" aria-label={`Discuss ${service.title} project`}>
                    <span>Discuss Needs</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
