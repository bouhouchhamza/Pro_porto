"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  liveUrl?: string;
  sourceUrl: string;
}

interface ProjectCardProps {
  project: Project;
  delay: number;
}

function ProjectCard({ project, delay }: ProjectCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentCard = cardRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (currentCard) {
      observer.observe(currentCard);
    }

    return () => {
      if (currentCard) {
        observer.unobserve(currentCard);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="project-card"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.8s ease-out ${delay}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="project-image-container">
        <div className="project-image-wrapper">
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            width={400}
            height={250}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="project-image"
            style={{
              width: "100%",
              height: "250px",
              objectFit: "cover",
              filter: isHovered ? "brightness(1.1)" : "brightness(0.8)",
              transform: isHovered ? "scale(1.02)" : "scale(1)",
            }}
          />
        </div>
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
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn primary"
              aria-label={`View live demo of ${project.title}`}
            >
              Live Demo
            </a>
          )}

          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="action-btn secondary"
            aria-label={`View source code for ${project.title}`}
          >
            Source Code
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentSection = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  const projects: Project[] = [
    {
      title: "Financial Risk Simulation Platform",
      description:
        "Fintech web application built with Laravel that simulates financial transactions, analyzes suspicious behavior, assigns risk scores, and generates fraud alerts for admin review.",
      image: "/project-dashboard.svg",
      techStack: ["Laravel", "PHP", "Blade", "JavaScript", "MySQL", "Chart.js"],
      liveUrl: "https://yourstartup.live",
      sourceUrl:
        "https://github.com/bouhouchhamza/Financial_Risk_Simulation_Platform",
    },
    {
      title: "Bimik_Cafe POS System",
      description:
        "Professional café POS system with local Windows installer, worker/patron roles, stock management, commandes, reports, customizable tickets, and direct thermal printing.",
      image: "/project-bimik-cafe.svg",
      techStack: [
        "Laravel",
        "React",
        "TypeScript",
        "SQLite",
        "Vite",
        "Inno Setup",
      ],
      sourceUrl: "https://github.com/bouhouchhamza/bimik-cafe-pos",
    },
    {
      title: "Pet Journey",
      description:
        "Full-stack pet care web application with separated frontend and backend, designed to help users manage pet-related services and journeys through a clean web interface.",
      image: "/project-social.svg",
      techStack: ["JavaScript", "Frontend", "Backend", "Vercel"],
      sourceUrl: "https://github.com/bouhouchhamza/petJourney",
    },
    {
      title: "Atelya Full-Stack Shop",
      description:
        "Full-stack shop platform with a controlled backend for managing products, categories, and store content. Includes a responsive storefront, product browsing, category-based navigation, and an admin-controlled structure for updating shop data.",
      image: "/project-atelya.svg",
      techStack: ["Next.js", "TypeScript", "React", "Backend", "CSS"],
      sourceUrl: "https://github.com/bouhouchhamza/atelya",
    },
    {
      title: "ShopHub E-Commerce Website",
      description:
        "Responsive e-commerce website featuring product browsing, search, filtering, sorting, wishlist, cart persistence with localStorage, and a checkout flow.",
      image: "/project-ecommerce.svg",
      techStack: ["HTML5", "CSS3", "JavaScript", "LocalStorage"],
      sourceUrl: "https://github.com/bouhouchhamza/ecommerce_exemple",
    },
    {
      title: "EasyColoc",
      description:
        "Laravel colocation management application focused on roommate and housing workflows, including owner-side features and email invitation testing.",
      image: "/project-realestate.svg",
      techStack: ["Laravel", "PHP", "Blade", "MySQL", "Mailpit"],
      sourceUrl: "https://github.com/bouhouchhamza/easycoloc",
    },
    {
      title: "Habit Tracker",
      description:
        "Productivity web application for tracking habits and routines, helping users monitor consistency and organize personal goals.",
      image: "/project-weather.svg",
      techStack: ["Laravel", "PHP", "Blade", "MySQL"],
      sourceUrl: "https://github.com/bouhouchhamza/habit_tracker",
    },
    {
      title: "EAU Tracker",
      description:
        "IoT water monitoring system built to track water status using an Arduino-based device, with a web interface/backend structure for collecting and displaying water-related data.",
      image: "/project-eau-tracker.svg",
      techStack: ["Arduino", "JavaScript", "PHP", "CSS", "Shell"],
      sourceUrl: "https://github.com/bouhouchhamza/EAU_TRACKER",
    },
    {
      title: "Shop Project",
      description:
        "Simple shop website example for a commercial store, built as an early web project with a basic storefront structure and product presentation.",
      image: "/project-shop.svg",
      techStack: ["HTML5"],
      sourceUrl: "https://github.com/bouhouchhamza/shop_project",
    },
    {
      title: "Three.js Starter Projects",
      description:
        "First experimental projects with Three.js, focused on learning 3D scenes, objects, camera controls, animations, and interactive web graphics.",
      image: "/project-threejs.svg",
      techStack: ["Three.js", "JavaScript", "HTML5", "CSS3"],
      sourceUrl: "https://github.com/bouhouchhamza",
    },
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="projects-section py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="projects-title"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease-out",
          }}
        >
          Featured Projects
        </h2>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
