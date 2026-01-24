'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimations() {
  useEffect(() => {
    // Hero animations - perfectly balanced timing
    gsap.from('.hero-badge', { opacity: 0, y: 10, duration: 0.6, ease: 'power2.out' });
    gsap.from('.hero-title', { opacity: 0, y: 8, duration: 0.8, ease: 'power2.out', delay: 0.15 });
    gsap.from('.hero-description', { opacity: 0, y: 6, duration: 0.6, ease: 'power2.out', delay: 0.25 });
    // Buttons - no animation to ensure visibility
    // Buttons are handled by CSS only
    gsap.from('.hero-image-container', { opacity: 0, x: 15, duration: 0.9, ease: 'power2.out', delay: 0.3 });

    // Section titles - performance optimized
    gsap.utils.toArray('section h2').forEach((title) => {
      gsap.set(title as Element, { willChange: 'transform, opacity' });
      gsap.from(title as Element, {
        scrollTrigger: {
          trigger: title as Element,
          start: 'top 85%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true
        },
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: 'power2.out',
        force3D: true,
        clearProps: 'will-change'
      });
    });

    // Cards - strict performance rules
    gsap.utils.toArray('.glass').forEach((card, index) => {
      gsap.set(card as Element, { willChange: 'transform, opacity' });
      gsap.from(card as Element, {
        scrollTrigger: {
          trigger: card as Element,
          start: 'top 85%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true
        },
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: 'power2.out',
        delay: index * 0.08,
        force3D: true,
        clearProps: 'will-change'
      });
    });

    // About content - minimal animation
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
      gsap.set(aboutContent, { willChange: 'transform, opacity' });
      gsap.from(aboutContent, {
        scrollTrigger: {
          trigger: aboutContent,
          start: 'top 85%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true
        },
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: 'power2.out',
        force3D: true,
        clearProps: 'will-change'
      });
    }

    // Skills - visible by default, safe animation only
    gsap.utils.toArray('.skill-item').forEach((item, index) => {
      // Ensure element is visible first
      gsap.set(item as Element, { 
        opacity: 1, 
        transform: 'none',
        willChange: 'transform, opacity' 
      });
      
      // Safe animation - non-blocking
      gsap.from(item as Element, {
        scrollTrigger: {
          trigger: item as Element,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
          invalidateOnRefresh: true,
          onLeave: () => {
            // Ensure visibility if scroll fails
            gsap.set(item as Element, { opacity: 1, transform: 'none' });
          }
        },
        opacity: 0.3, // Start mostly visible, not hidden
        y: 10, // Minimal movement
        duration: 0.3,
        ease: 'power1.out',
        delay: index * 0.05,
        force3D: true,
        clearProps: 'will-change',
        onComplete: () => {
          // Ensure final visibility
          gsap.set(item as Element, { opacity: 1, transform: 'none' });
        }
      });
    });

    // Contact form - minimal
    gsap.utils.toArray('.contact-form input, .contact-form textarea, .contact-form button').forEach((element, index) => {
      gsap.set(element as Element, { willChange: 'transform, opacity' });
      gsap.from(element as Element, {
        scrollTrigger: {
          trigger: element as Element,
          start: 'top 85%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true
        },
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: 'power2.out',
        delay: index * 0.08,
        force3D: true,
        clearProps: 'will-change'
      });
    });

    // Review cards - strict performance
    gsap.utils.toArray('.review-card').forEach((card, index) => {
      gsap.set(card as Element, { willChange: 'transform, opacity' });
      gsap.from(card as Element, {
        scrollTrigger: {
          trigger: card as Element,
          start: 'top 85%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true
        },
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: 'power2.out',
        delay: index * 0.08,
        force3D: true,
        clearProps: 'will-change'
      });
    });

    // Footer - minimal
    const footer = document.querySelector('footer');
    if (footer) {
      gsap.set(footer, { willChange: 'transform, opacity' });
      gsap.from(footer, {
        scrollTrigger: {
          trigger: footer,
          start: 'top 85%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true
        },
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: 'power2.out',
        force3D: true,
        clearProps: 'will-change'
      });
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return null;
}
