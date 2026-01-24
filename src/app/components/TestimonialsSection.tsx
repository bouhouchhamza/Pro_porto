'use client';

import { useState, useEffect, useRef } from 'react';

interface TestimonialCardProps {
  testimonial: {
    quote: string;
    name: string;
    role: string;
    avatar?: string;
  };
  delay: number;
}

function TestimonialCard({ testimonial, delay }: TestimonialCardProps) {
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
      className="testimonial-card"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.8s ease-out ${delay}ms`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Quote */}
      <blockquote className="testimonial-quote">
        "{testimonial.quote}"
      </blockquote>

      {/* Reviewer info */}
      <div className="testimonial-reviewer">
        {testimonial.avatar && (
          <div className="reviewer-avatar">
            <img 
              src={testimonial.avatar} 
              alt={testimonial.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%',
                opacity: 0.8
              }}
            />
          </div>
        )}
        <div className="reviewer-info">
          <div className="reviewer-name">{testimonial.name}</div>
          <div className="reviewer-role">{testimonial.role}</div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
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

  const testimonials = [
    {
      quote: "Exceptional developer who delivers high-quality work on time. Very professional and skilled in modern web technologies.",
      name: "Sarah Johnson",
      role: "Product Manager",
      avatar: "/byby.png"
    },
    {
      quote: "Outstanding problem-solving skills and attention to detail. Built our entire platform from scratch with excellent results.",
      name: "Michael Chen",
      role: "CEO & Founder",
      avatar: "/byby.png"
    },
    {
      quote: "Great communicator and technical expert. Transformed our ideas into a beautiful, functional application.",
      name: "Emily Rodriguez",
      role: "Marketing Director",
      avatar: "/byby.png"
    },
    {
      quote: "Highly recommended! Delivered complex features ahead of schedule with clean, maintainable code.",
      name: "David Kim",
      role: "Tech Lead",
      avatar: "/byby.png"
    },
    {
      quote: "Professional, reliable, and technically brilliant. Exceeded all our expectations with the final product.",
      name: "Jessica Taylor",
      role: "Client Relations",
      avatar: "/byby.png"
    },
    {
      quote: "Excellent full-stack developer with deep understanding of both frontend and backend technologies.",
      name: "Robert Martinez",
      role: "Senior Developer",
      avatar: "/byby.png"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="testimonials-section py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <h2 
          className="testimonials-title"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out'
          }}
        >
          Client Testimonials
        </h2>

        {/* Testimonials grid */}
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              delay={index * 120}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
