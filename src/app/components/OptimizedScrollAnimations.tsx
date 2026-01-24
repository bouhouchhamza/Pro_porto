'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function OptimizedScrollAnimations() {
  const animationsRef = useRef<gsap.core.Tween[]>([]);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    // Early return if not in browser
    if (typeof window === 'undefined') return;

    // Debounced resize handler to prevent layout thrashing
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    };

    // Optimized animation setup with batch processing
    const setupAnimations = () => {
      // Clear existing animations
      animationsRef.current.forEach(tween => tween.kill());
      triggersRef.current.forEach(trigger => trigger.kill());
      animationsRef.current = [];
      triggersRef.current = [];

      // Batch DOM queries to minimize layout thrashing
      const elements = {
        heroTitle: document.querySelector('.hero-title'),
        heroDescription: document.querySelector('.hero-description'),
        heroButtons: document.querySelector('.hero-buttons'),
        skillItems: document.querySelectorAll('.skill-item'),
        projectCards: document.querySelectorAll('.project-card'),
        reviewCards: document.querySelectorAll('.review-card'),
        aboutContent: document.querySelector('.about-content')
      };

      // Hero section animations - delayed and optimized
      if (elements.heroTitle) {
        const tween = gsap.from(elements.heroTitle, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: 'power1.out',
          force3D: true,
          willChange: 'transform, opacity',
          onStart: () => {
            gsap.set(elements.heroTitle, { willChange: 'auto' });
          }
        });
        animationsRef.current.push(tween);
      }

      if (elements.heroDescription) {
        const tween = gsap.from(elements.heroDescription, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          delay: 0.1,
          ease: 'power1.out',
          force3D: true,
          willChange: 'transform, opacity',
          onStart: () => {
            gsap.set(elements.heroDescription, { willChange: 'auto' });
          }
        });
        animationsRef.current.push(tween);
      }

      // Skills section - optimized with stagger and single trigger
      if (elements.skillItems.length > 0) {
        const trigger = ScrollTrigger.create({
          trigger: '.skills-section',
          start: 'top 80%',
          once: true,
          onEnter: () => {
            const tween = gsap.from(elements.skillItems, {
              opacity: 0,
              y: 25,
              duration: 0.5,
              stagger: 0.1,
              ease: 'power1.out',
              force3D: true,
              willChange: 'transform, opacity',
              onComplete: () => {
                elements.skillItems.forEach(item => {
                  gsap.set(item, { willChange: 'auto' });
                });
              }
            });
            animationsRef.current.push(tween);
          }
        });
        triggersRef.current.push(trigger);
      }

      // Projects section - optimized batch processing
      if (elements.projectCards.length > 0) {
        const trigger = ScrollTrigger.create({
          trigger: '.projects-section',
          start: 'top 80%',
          once: true,
          onEnter: () => {
            const tween = gsap.from(elements.projectCards, {
              opacity: 0,
              y: 30,
              duration: 0.6,
              stagger: 0.15,
              ease: 'power1.out',
              force3D: true,
              willChange: 'transform, opacity',
              onComplete: () => {
                elements.projectCards.forEach(item => {
                  gsap.set(item, { willChange: 'auto' });
                });
              }
            });
            animationsRef.current.push(tween);
          }
        });
        triggersRef.current.push(trigger);
      }

      // Reviews section - optimized
      if (elements.reviewCards.length > 0) {
        const trigger = ScrollTrigger.create({
          trigger: '.reviews-section',
          start: 'top 80%',
          once: true,
          onEnter: () => {
            const tween = gsap.from(elements.reviewCards, {
              opacity: 0,
              y: 20,
              duration: 0.5,
              stagger: 0.1,
              ease: 'power1.out',
              force3D: true,
              willChange: 'transform, opacity',
              onComplete: () => {
                elements.reviewCards.forEach(item => {
                  gsap.set(item, { willChange: 'auto' });
                });
              }
            });
            animationsRef.current.push(tween);
          }
        });
        triggersRef.current.push(trigger);
      }

      // About section - optimized
      if (elements.aboutContent) {
        const trigger = ScrollTrigger.create({
          trigger: '.about-section',
          start: 'top 80%',
          once: true,
          onEnter: () => {
            const tween = gsap.from(elements.aboutContent, {
              opacity: 0,
              y: 25,
              duration: 0.6,
              ease: 'power1.out',
              force3D: true,
              willChange: 'transform, opacity',
              onComplete: () => {
                gsap.set(elements.aboutContent, { willChange: 'auto' });
              }
            });
            animationsRef.current.push(tween);
          }
        });
        triggersRef.current.push(trigger);
      }
    };

    // Delay setup to reduce initial blocking time
    const setupTimeout = setTimeout(setupAnimations, 100);

    // Event listeners
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      clearTimeout(setupTimeout);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      
      // Kill all animations and triggers
      animationsRef.current.forEach(tween => tween.kill());
      triggersRef.current.forEach(trigger => trigger.kill());
      
      // Clear refs
      animationsRef.current = [];
      triggersRef.current = [];
      
      // Kill all ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return null;
}
