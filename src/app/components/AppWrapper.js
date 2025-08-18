'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AppWrapper({ children }) {
  useEffect(() => {
    // Initialize AOS animation library with reduced duration and delay
    AOS.init({ 
      duration: 600,  // Reduced from 1500ms to 600ms
      once: true,
      startEvent: 'DOMContentLoaded',  // Wait for DOM to be ready
      disable: window.innerWidth < 768  // Disable on mobile to prevent issues
    });
    // Set marquee text color to white
    const marqueeEls = document.querySelectorAll('.marquee span, .marquee b');
    marqueeEls.forEach(el => { el.style.color = 'white'; });
  }, []);

  return <>{children}</>;
} 