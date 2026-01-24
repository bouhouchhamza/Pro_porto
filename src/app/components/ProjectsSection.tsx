'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    image: string;
    techStack: string[];
    liveUrl: string;
    sourceUrl: string;
  };
  delay: number;
}

function ProjectCard({ project, delay }: ProjectCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="project-card"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.8s ease-out ${delay}ms`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project preview image */}
      <div className="project-image-container">
        <div className="project-image-wrapper">
          <Image
            src={project.image}
            alt={`${project.title} - ${project.description}`}
            width={400}
            height={250}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="project-image"
            style={{
              width: '400px',
              height: '250px',
              objectFit: 'cover',
              filter: isHovered ? 'brightness(1.1)' : 'brightness(0.8)',
              transform: isHovered ? 'scale(1.02)' : 'scale(1)'
            }}
          />
        </div>
      </div>

      {/* Project content */}
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        
        <div className="project-tech-stack">
          {project.techStack.map((tech, index) => (
            <span key={index} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

        <div className="project-actions">
          <a 
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="action-btn primary"
            aria-label={`View live demo of ${project.title}`}
          >
            Live Demo
          </a>
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Modern online shopping experience with real-time inventory management and secure payment processing.",
      image: "/project-ecommerce.svg",
      techStack: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "#",
      sourceUrl: "#"
    },
    {
      title: "Task Management Dashboard",
      description: "Collaborative project management tool with real-time updates and team collaboration features.",
      image: "/project-dashboard.svg",
      techStack: ["Next.js", "TypeScript", "PostgreSQL", "Socket.io"],
      liveUrl: "#",
      sourceUrl: "#"
    },
    {
      title: "Weather Analytics App",
      description: "Interactive weather dashboard with advanced forecasting and data visualization capabilities.",
      image: "/project-weather.svg",
      techStack: ["Vue.js", "Chart.js", "OpenWeather API", "Tailwind"],
      liveUrl: "#",
      sourceUrl: "#"
    },
    {
      title: "Social Media Dashboard",
      description: "Comprehensive analytics platform for social media management and performance tracking.",
      image: "/project-social.svg",
      techStack: ["React", "GraphQL", "Redis", "Docker"],
      liveUrl: "#",
      sourceUrl: "#"
    },
    {
      title: "AI Content Generator",
      description: "Machine learning powered content creation tool with natural language processing capabilities.",
      image: "/project-ai.svg",
      techStack: ["Python", "TensorFlow", "FastAPI", "React"],
      liveUrl: "#",
      sourceUrl: "#"
    },
    {
      title: "Real Estate Platform",
      description: "Property listing and management system with virtual tours and advanced search filters.",
      image: "/project-realestate.svg",
      techStack: ["Next.js", "Prisma", "MySQL", "Mapbox"],
      liveUrl: "#",
      sourceUrl: "#"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="projects-section py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <h2 
          className="projects-title"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out'
          }}
        >
          Featured Projects
        </h2>

        {/* Projects grid */}
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
