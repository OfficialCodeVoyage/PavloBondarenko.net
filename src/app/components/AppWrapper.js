'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AppWrapper({ children }) {
  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({ duration: 1500, once: true });
    // Set marquee text color to white
    const marqueeEls = document.querySelectorAll('.marquee span, .marquee b');
    marqueeEls.forEach(el => { el.style.color = 'white'; });
  }, []);

  return <>{children}</>;
} 