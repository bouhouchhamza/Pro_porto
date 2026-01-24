'use client';

import { useState, useEffect, useRef } from 'react';

interface SkillCardProps {
  title: string;
  icon: string;
  count: number;
  delay: number;
}

function SkillCard({ title, icon, count, delay }: SkillCardProps) {
  const [isVisible, setIsVisible] = useState(false);
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
      className="skill-category-card"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
        transition: `all 0.6s ease-out ${delay}ms`
      }}
    >
      <div className="skill-icon">{icon}</div>
      <h3 className="skill-title">{title}</h3>
      <div className="skill-count">{count} Technologies</div>
    </div>
  );
}

interface TechCardProps {
  name: string;
  icon: string;
  delay: number;
}

function TechCard({ name, icon, delay }: TechCardProps) {
  const [isVisible, setIsVisible] = useState(false);
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
      className="tech-card"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
        transition: `all 0.5s ease-out ${delay}ms`
      }}
    >
      <div className="tech-icon">{icon}</div>
      <span className="tech-name">{name}</span>
      <div className="tech-indicator"></div>
    </div>
  );
}

export default function SkillsSection() {
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

  const skillCategories = [
    { title: 'Frontend', icon: '🎨', count: 8 },
    { title: 'Design', icon: '🎯', count: 6 },
    { title: 'Backend', icon: '⚙️', count: 7 },
    { title: 'Full Stack', icon: '🚀', count: 12 },
    { title: 'CMS', icon: '📝', count: 4 },
    { title: 'Database', icon: '🗄️', count: 5 },
    { title: 'Project Management', icon: '📊', count: 3 }
  ];

  const technologies = [
    { name: 'HTML', icon: '🌐' },
    { name: 'CSS', icon: '🎨' },
    { name: 'Tailwind', icon: '💨' },
    { name: 'Bootstrap', icon: '🅱️' },
    { name: 'JavaScript', icon: '⚡' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'React', icon: '⚛️' },
    { name: 'Next.js', icon: '▲' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'PHP', icon: '🐘' },
    { name: 'MySQL', icon: '🐬' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'Git', icon: '📦' },
    { name: 'Docker', icon: '🐳' },
    { name: 'Figma', icon: '🎨' },
    { name: 'VS Code', icon: '💻' }
  ];

  return (
    <section 
      ref={sectionRef}
      className="skills-section py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <h2 
          className="skills-title"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out'
          }}
        >
          Skills & Expertise
        </h2>

        {/* Expertise categories grid */}
        <div className="skills-categories-grid">
          {skillCategories.map((skill, index) => (
            <SkillCard
              key={skill.title}
              title={skill.title}
              icon={skill.icon}
              count={skill.count}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Individual technologies */}
        <div className="technologies-section">
          <h3 
            className="tech-subtitle"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out 0.4s'
            }}
          >
            Technologies & Tools
          </h3>
          
          <div className="technologies-grid">
            {technologies.map((tech, index) => (
              <TechCard
                key={tech.name}
                name={tech.name}
                icon={tech.icon}
                delay={400 + index * 50}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
