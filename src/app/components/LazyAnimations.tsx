'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports with no SSR
const ScrollAnimations = dynamic(() => import('./ScrollAnimations'), {
  ssr: false,
  loading: () => null
});

const StarBackground = dynamic(() => import('./StarBackground'), {
  ssr: false,
  loading: () => null
});

export default function LazyAnimations() {
  const [isScrollAnimationsLoaded, setIsScrollAnimationsLoaded] = useState(false);
  const [isStarBackgroundLoaded, setIsStarBackgroundLoaded] = useState(false);
  const starObserverRef = useRef<IntersectionObserver>();

  useEffect(() => {
    // Lazy load ScrollAnimations when user starts scrolling or after delay
    const loadScrollAnimations = () => {
      if (!isScrollAnimationsLoaded) {
        setIsScrollAnimationsLoaded(true);
        window.removeEventListener('scroll', loadScrollAnimations);
        window.removeEventListener('mousemove', loadScrollAnimations);
      }
    };

    // Load ScrollAnimations after initial delay or user interaction
    const scrollTimer = setTimeout(() => {
      loadScrollAnimations();
    }, 2000); // 2 second delay

    // Also load on first user interaction
    window.addEventListener('scroll', loadScrollAnimations, { once: true });
    window.addEventListener('mousemove', loadScrollAnimations, { once: true });

    return () => {
      clearTimeout(scrollTimer);
      window.removeEventListener('scroll', loadScrollAnimations);
      window.removeEventListener('mousemove', loadScrollAnimations);
    };
  }, [isScrollAnimationsLoaded]);

  useEffect(() => {
    // Lazy load StarBackground when page is visible and stable
    const loadStarBackground = () => {
      if (!isStarBackgroundLoaded) {
        setIsStarBackgroundLoaded(true);
        if (starObserverRef.current) {
          starObserverRef.current.disconnect();
        }
      }
    };

    // Use IntersectionObserver to detect when page is stable
    if ('IntersectionObserver' in window) {
      starObserverRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isStarBackgroundLoaded) {
              // Small delay to ensure page is fully loaded
              setTimeout(loadStarBackground, 500);
            }
          });
        },
        { threshold: 0.1 }
      );

      // Observe a sentinel element
      const sentinel = document.createElement('div');
      sentinel.style.position = 'absolute';
      sentinel.style.top = '0';
      sentinel.style.left = '0';
      sentinel.style.width = '1px';
      sentinel.style.height = '1px';
      sentinel.style.pointerEvents = 'none';
      document.body.appendChild(sentinel);

      starObserverRef.current.observe(sentinel);

      return () => {
        if (starObserverRef.current) {
          starObserverRef.current.disconnect();
        }
        if (document.body.contains(sentinel)) {
          document.body.removeChild(sentinel);
        }
      };
    } else {
      // Fallback for browsers without IntersectionObserver
      setTimeout(loadStarBackground, 1000);
    }
  }, [isStarBackgroundLoaded]);

  return (
    <>
      {isStarBackgroundLoaded && <StarBackground />}
      {isScrollAnimationsLoaded && <ScrollAnimations />}
    </>
  );
}
