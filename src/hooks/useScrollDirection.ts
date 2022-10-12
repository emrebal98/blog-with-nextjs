import { useState, useEffect } from 'react';

/**
 * Detects the scroll direction
 * @returns {string} 'up' or 'down'
 */
export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.pageYOffset; //used pageYOffset instead of scrollY because of cross browser compatibility
    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset; //used pageYOffset instead of scrollY because of cross browser compatibility

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }

      setScrollDirection(scrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        //used requestAnimationFrame to make sure that we are calculating the new offset after the page got rendered completely after scroll
        window.requestAnimationFrame(updateScrollDirection);
        ticking = false;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollDirection]);

  return scrollDirection;
};
