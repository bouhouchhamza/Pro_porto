'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function SmoothScroll() {
  useEffect(() => {
    let scrollY = 0;
    let targetScrollY = 0;
    let isScrolling = false;

    const updateScroll = () => {
      if (!isScrolling) return;
      scrollY += (targetScrollY - scrollY) * 0.1;
      if (Math.abs(targetScrollY - scrollY) < 0.1) {
        scrollY = targetScrollY;
        isScrolling = false;
      }
      window.scrollTo(0, scrollY);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetScrollY += e.deltaY;
      targetScrollY = Math.max(0, Math.min(targetScrollY, document.body.scrollHeight - window.innerHeight));
      isScrolling = true;
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    gsap.ticker.add(updateScroll);

    return () => {
      window.removeEventListener('wheel', onWheel);
      gsap.ticker.remove(updateScroll);
    };
  }, []);

  return null;
}