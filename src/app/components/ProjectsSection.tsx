"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  liveUrl?: string;
  sourceUrl?: string;
}

const projects: Project[] = [
  {
    title: "Financial Risk Simulation Platform",
    description:
      "Laravel fintech platform for transaction simulation, risk scoring, fraud signals, and admin review workflows.",
    image: "/project-dashboard.svg",
    techStack: ["Laravel", "PHP", "JavaScript", "MySQL"],
    sourceUrl: "https://github.com/bouhouchhamza/Financial_Risk_Simulation_Platform",
  },
  {
    title: "AI Automation Systems",
    description:
      "Workflow automations that connect business tools, process data, and reduce repetitive manual work.",
    image: "/project-ai.svg",
    techStack: ["n8n", "OpenAI", "Node.js", "APIs"],
    sourceUrl: "https://github.com/bouhouchhamza",
  },
  {
    title: "Pet Journey",
    description:
      "Full-stack pet care web application with separated frontend and backend for service and journey management.",
    image: "/project-social.svg",
    techStack: ["JavaScript", "Frontend", "Backend", "Vercel"],
    sourceUrl: "https://github.com/bouhouchhamza/petJourney",
  },
  {
    title: "ShopHub E-Commerce",
    description:
      "Responsive storefront with search, filtering, sorting, wishlist, cart persistence, and checkout flow.",
    image: "/project-ecommerce.svg",
    techStack: ["HTML", "CSS", "JavaScript", "LocalStorage"],
    sourceUrl: "https://github.com/bouhouchhamza/ecommerce_exemple",
  },
  {
    title: "EasyColoc",
    description:
      "Laravel colocation management application focused on roommate, housing, owner, and invitation workflows.",
    image: "/project-realestate.svg",
    techStack: ["Laravel", "PHP", "Blade", "MySQL"],
    sourceUrl: "https://github.com/bouhouchhamza/easycoloc",
  },
  {
    title: "Habit Tracker",
    description:
      "Productivity web app for tracking habits, monitoring consistency, and organizing personal routines.",
    image: "/project-weather.svg",
    techStack: ["Laravel", "PHP", "Blade", "MySQL"],
    sourceUrl: "https://github.com/bouhouchhamza/habit_tracker",
  },
  {
    title: "Supabase Commerce Website",
    description:
      "Modern store experience with product content, responsive browsing, and a clean conversion-focused interface.",
    image: "/project-ecommerce.svg",
    techStack: ["Supabase", "React", "CSS", "APIs"],
    sourceUrl: "https://github.com/bouhouchhamza",
  },
  {
    title: "EAU Tracker",
    description:
      "IoT water monitoring interface for collecting and presenting device data in a practical web dashboard.",
    image: "/project-dashboard.svg",
    techStack: ["Arduino", "PHP", "JavaScript", "CSS"],
    sourceUrl: "https://github.com/bouhouchhamza/EAU_TRACKER",
  },
  {
    title: "Shop Project",
    description:
      "Compact storefront concept built to present products and basic commercial content with a simple layout.",
    image: "/project-social.svg",
    techStack: ["HTML", "CSS", "UI"],
    sourceUrl: "https://github.com/bouhouchhamza/shop_project",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="project-card" style={{ transitionDelay: `${index * 70}ms` }}>
      <div className="project-image-container">
        <Image
          src={project.image}
          alt={`${project.title} by Hamza Bouhouch, Full Stack Developer Morocco`}
          width={520}
          height={320}
          loading="lazy"
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="project-image"
        />
      </div>

      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>

        <div className="project-tech-stack">
          {project.techStack.map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

        <div className="project-actions">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="action-btn primary">
              Live Demo
            </a>
          )}
          {project.sourceUrl && (
            <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="action-btn secondary">
              Source Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

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
      { threshold: 0.1 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`portfolio-section projects-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className="projects-frame-inner">
        <div className="projects-heading-row">
          <h2>Full Stack &amp; AI Automation Projects</h2>
          <p>
            Selected Laravel, React, Next.js, SaaS, and n8n automation work by
            Hamza Bouhouch, a Full Stack Developer and AI Automation Engineer in Morocco.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
