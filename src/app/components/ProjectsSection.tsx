"use client";

import { useEffect, useRef, useState } from "react";
import HorizontalProjectsShowcase from "./projects/HorizontalProjectsShowcase";

export default function ProjectsSection() {
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
      id="projects"
      ref={sectionRef}
      className={`portfolio-section projects-section ${isVisible ? "is-visible" : ""}`}
      aria-label="Featured Projects Showcase"
    >
      <div className="projects-frame-inner">
        <HorizontalProjectsShowcase />
      </div>
    </section>
  );
}
