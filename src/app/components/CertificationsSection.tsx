'use client';

import { useState, useEffect, useRef } from 'react';

interface CertificationCardProps {
  certification: {
    title: string;
    issuer: string;
    issuerIcon: string;
    issueDate: string;
    skills: string[];
    image: string;
    certificateUrl: string;
  };
  delay: number;
}

function CertificationCard({ certification, delay }: CertificationCardProps) {
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
      className="certification-card"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.8s ease-out ${delay}ms`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Certificate preview image */}
      <div className="cert-image-container">
        <div 
          className="cert-image"
          style={{
            backgroundImage: `url(${certification.image})`,
            filter: isHovered ? 'brightness(1.1)' : 'brightness(0.7)',
            transform: isHovered ? 'scale(1.02)' : 'scale(1)'
          }}
        />
        {isHovered && (
          <div className="cert-image-overlay">
            <a 
              href={certification.certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="view-cert-btn"
            >
              View Certificate
            </a>
          </div>
        )}
      </div>

      {/* Certificate content */}
      <div className="cert-content">
        <h3 className="cert-title">{certification.title}</h3>
        
        <div className="cert-issuer">
          <span className="issuer-icon">{certification.issuerIcon}</span>
          <span className="issuer-name">{certification.issuer}</span>
        </div>

        <div className="cert-date">{certification.issueDate}</div>

        <div className="cert-skills">
          {certification.skills.map((skill, index) => (
            <span key={index} className="skill-pill">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CertificationsSection() {
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

  const certifications = [
    {
      title: "Google Cloud Professional Cloud Architect",
      issuer: "Google Cloud",
      issuerIcon: "☁️",
      issueDate: "March 2024",
      skills: ["Cloud Architecture", "GCP", "Infrastructure", "Security"],
      image: "/cert-neutral.svg",
      certificateUrl: "#"
    },
    {
      title: "IBM Data Science Professional Certificate",
      issuer: "IBM",
      issuerIcon: "🔷",
      issueDate: "January 2024",
      skills: ["Data Science", "Python", "Machine Learning", "Statistics"],
      image: "/cert-neutral.svg",
      certificateUrl: "#"
    },
    {
      title: "LinkedIn Learning Full Stack Development",
      issuer: "LinkedIn Learning",
      issuerIcon: "💼",
      issueDate: "December 2023",
      skills: ["React", "Node.js", "MongoDB", "REST APIs"],
      image: "/cert-neutral.svg",
      certificateUrl: "#"
    },
    {
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      issuerIcon: "🟠",
      issueDate: "November 2023",
      skills: ["AWS", "Cloud Computing", "Architecture", "DevOps"],
      image: "/cert-neutral.svg",
      certificateUrl: "#"
    },
    {
      title: "Meta Frontend Developer Professional Certificate",
      issuer: "Meta",
      issuerIcon: "🔵",
      issueDate: "October 2023",
      skills: ["React", "JavaScript", "CSS", "HTML5"],
      image: "/cert-neutral.svg",
      certificateUrl: "#"
    },
    {
      title: "Microsoft Azure Fundamentals",
      issuer: "Microsoft",
      issuerIcon: "🪟",
      issueDate: "September 2023",
      skills: ["Azure", "Cloud Services", "Networking", "Storage"],
      image: "/cert-neutral.svg",
      certificateUrl: "#"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="certifications-section py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <h2 
          className="certifications-title"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out'
          }}
        >
          Professional Certifications
        </h2>

        {/* Certifications grid */}
        <div className="certifications-grid">
          {certifications.map((cert, index) => (
            <CertificationCard
              key={cert.title}
              certification={cert}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
