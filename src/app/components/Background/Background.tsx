'use client';
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface Particle {
    vx: number;
    vy: number;
    x: number;
    y: number;
    ox: number;
    oy: number;
    c1: number;
    c2: number;
    c3: number;
}

const Background: React.FC = () => {
  const requestRef = useRef<number>();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  // Path-based row logic (as before)
  const rows = (() => {
    switch (pathname) {
      case '/':
        return 314;
      case '/about':
        return 344;
      case '/works':
        return 354;
      case '/contact':
        return 264;
      default:
        return 0;
    }
  })();

  useEffect(() => {
    const COLS = 300;
    const THICKNESS = Math.pow(80, 2);
    const MARGIN = 1;
    const DRAG = 0.95;
    const EASE = 0.25;
    const DEFAULT_COLOR = 220;
    
    // Extra space to add at the bottom (tweak as needed)
    const EXTRA_HEIGHT = window.innerHeight * 1;

    let mx = 0, my = 0;
    let isMouseActive = false;
    let simulateStep = true;

    const container = containerRef.current;
    if (!container) return;

    // Create canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Calculate spacing
    const SPACING = (window.innerWidth - MARGIN * 2) / COLS;

    // Rows needed to fill the screen, plus an extra offset
    const neededRowsToFill = Math.ceil(
      ((window.innerHeight + EXTRA_HEIGHT) - MARGIN * 2) / SPACING
    );

    // Use whichever is larger: path-based rows or the rows needed to fill
    const finalRows = Math.max(rows, neededRowsToFill);
    const NUM_PARTICLES = finalRows * COLS;

    // Canvas width/height
    const width = COLS * SPACING + MARGIN * 2;
    const height = finalRows * SPACING + MARGIN * 2;

    canvas.width = width;
    canvas.height = height;

    // Center container
    container.style.marginLeft = `${Math.round(width * -0.5)}px`;
    container.style.marginTop = `${Math.round(height * -0.5)}px`;
    container.appendChild(canvas);

    // Particle template
    const particleTemplate: Particle = {
      vx: 0,
      vy: 0,
      x: 0,
      y: 0,
      ox: 0,
      oy: 0,
      c1: DEFAULT_COLOR,
      c2: DEFAULT_COLOR,
      c3: DEFAULT_COLOR,
    };

    // Generate particles
    const particles: Particle[] = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
      const p: Particle = { ...particleTemplate };
      p.x = p.ox = MARGIN + SPACING * (i % COLS);
      p.y = p.oy = MARGIN + SPACING * Math.floor(i / COLS);
      particles.push(p);
    }

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent): void => {
      const bounds = container.getBoundingClientRect();
      mx = e.clientX - bounds.left;
      my = e.clientY - bounds.top;
      isMouseActive = true;
    };
    const handleMouseOut = (): void => {
      isMouseActive = false;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseout", handleMouseOut);

    // Animation loop
    const step = (): void => {
      if (simulateStep) {
        if (!isMouseActive && Math.random() * 10 > 9) {
          const t = Date.now() * 0.001;
          mx = Math.floor(canvas.width * 0.5 + Math.cos(t) * canvas.width * 0.3);
          my = Math.floor(canvas.height * 0.5 + Math.sin(t) * canvas.height * 0.3);
        }
        // Update physics
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = mx - p.x;
          const dy = my - p.y;
          const d = dx * dx + dy * dy;
          const f = -THICKNESS / d;

          if (d < THICKNESS) {
            const angle = Math.atan2(dy, dx);
            p.vx += f * Math.cos(angle);
            p.vy += f * Math.sin(angle);
            p.c1 = 255;
            p.c2 = 0;
            p.c3 = 0;
          } else {
            p.c1 = p.c2 = p.c3 = 50;
          }

          if (p.vx > 10) p.c2 = 255;
          if (p.vy > 10) p.c3 = 255;

          p.x += (p.vx *= DRAG) + (p.ox - p.x) * EASE;
          p.y += (p.vy *= DRAG) + (p.oy - p.y) * EASE;
        }
      } else {
        // Render
        const imgData = ctx.createImageData(canvas.width, canvas.height);
        const data = imgData.data;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const n = ((~~p.x) + (~~p.y) * canvas.width) * 4;
          data[n] = p.c1;
          data[n + 1] = p.c2;
          data[n + 2] = p.c3;
          data[n + 3] = 255;
        }
        ctx.putImageData(imgData, 0, 0);
      }

      simulateStep = !simulateStep;
      requestRef.current = requestAnimationFrame(step);
    };

    step();

    // Cleanup
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseout", handleMouseOut);
      if (canvas && container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }, [pathname, rows]);

  return <div id="container" ref={containerRef} />;
}

export default Background;