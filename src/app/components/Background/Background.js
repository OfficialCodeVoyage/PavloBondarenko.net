'use client';
import { useEffect, useRef, useMemo } from "react";
import { usePathname } from "next/navigation";

const ANIMATION_CONFIG = {
  COLS: 290,
  THICKNESS: Math.pow(80, 2),
  MARGIN: 1,
  DRAG: 0.95,
  EASE: 0.25,
  DEFAULT_COLOR: 50,
  ACTIVE_COLOR: {
    RED: 255,
    GREEN: 0,
    BLUE: 0
  }
};

export default function Background() {
  const requestRef = useRef(null);
  const containerRef = useRef(null);
  const pathname = usePathname();

  // Determine rows based on current route
  const rows = useMemo(() => {
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
  }, [pathname]);

  useEffect(() => {
    const ROWS = rows;
    const { COLS, THICKNESS, MARGIN, DRAG, EASE, DEFAULT_COLOR, ACTIVE_COLOR } = ANIMATION_CONFIG;
    const NUM_PARTICLES = ROWS * COLS;
    
    const container = containerRef.current;
    if (!container || ROWS === 0) return; // Don't render if no rows or no container

    // Setup canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const list = [];
    let isToggled = true;
    let isMouseControlled = false;
    let mouseX = 0;
    let mouseY = 0;

    // Template for particle properties
    const particleTemplate = {
      vx: 0,
      vy: 0,
      x: 0,
      y: 0,
      c1: DEFAULT_COLOR,
      c2: DEFAULT_COLOR,
      c3: DEFAULT_COLOR,
      ox: 0, // Original x position
      oy: 0  // Original y position
    };

    // Calculate dimensions
    const SPACING = (window.innerWidth - MARGIN * 2) / COLS;
    const width = COLS * SPACING + MARGIN * 2;
    const height = ROWS * SPACING + MARGIN * 2;

    // Setup canvas dimensions and position
    canvas.width = width;
    canvas.height = height;
    container.style.marginLeft = `${Math.round(width * -0.5)}px`;
    container.style.marginTop = `${Math.round(height * -0.5)}px`;
    container.appendChild(canvas);

    // Generate particles
    for (let i = 0; i < NUM_PARTICLES; i++) {
      const p = { ...particleTemplate };
      p.x = p.ox = MARGIN + SPACING * (i % COLS);
      p.y = p.oy = MARGIN + SPACING * Math.floor(i / COLS);
      list[i] = p;
    }

    // Mouse event handlers
    const handleMouseMove = (e) => {
      const bounds = container.getBoundingClientRect();
      mouseX = e.clientX - bounds.left;
      mouseY = e.clientY - bounds.top;
      isMouseControlled = true;
    };

    const handleMouseOut = () => {
      isMouseControlled = false;
    };

    // Add event listeners
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseout", handleMouseOut);

    // Animation step function
    const step = () => {
      if (isToggled) {
        // Calculate particle positions and colors
        if (!isMouseControlled) {
          // Occasional random movement when mouse isn't controlling
          if (Math.random() > 0.9) {
            const t = Date.now() * 0.001;
            mouseX = Math.floor(canvas.width * 0.5 + Math.cos(t) * canvas.width * 0.3);
            mouseY = Math.floor(canvas.height * 0.5 + Math.sin(t) * canvas.height * 0.3);
          }
        }

        // Update all particles
        for (let i = 0; i < NUM_PARTICLES; i++) {
          const p = list[i];
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const distanceSquared = dx * dx + dy * dy;
          const force = -THICKNESS / distanceSquared;

          // Apply force and change color if particle is close to mouse
          if (distanceSquared < THICKNESS) {
            const angle = Math.atan2(dy, dx);
            p.vx += force * Math.cos(angle);
            p.vy += force * Math.sin(angle);
            p.c1 = ACTIVE_COLOR.RED;
            p.c2 = ACTIVE_COLOR.GREEN;
            p.c3 = ACTIVE_COLOR.BLUE;
          } else {
            p.c1 = p.c2 = p.c3 = DEFAULT_COLOR;
          }

          // Add color effects based on velocity
          if (p.vx > 10) {
            p.c2 = 255; // Green
          }
          if (p.vy > 10) {
            p.c3 = 255; // Blue
          }

          // Update position with velocity and ease back to original position
          p.x += (p.vx *= DRAG) + (p.ox - p.x) * EASE;
          p.y += (p.vy *= DRAG) + (p.oy - p.y) * EASE;
        }

        isToggled = false;
      } else {
        // Render particles to canvas
        const imgData = ctx.createImageData(canvas.width, canvas.height);
        const data = imgData.data;

        for (let i = 0; i < NUM_PARTICLES; i++) {
          const p = list[i];
          // ~~ is a faster Math.floor for positive numbers
          const n = (~~p.x + ~~p.y * canvas.width) * 4;
          data[n] = p.c1;     // Red
          data[n + 1] = p.c2; // Green
          data[n + 2] = p.c3; // Blue
          data[n + 3] = 255;  // Alpha (fully opaque)
        }

        ctx.putImageData(imgData, 0, 0);
        isToggled = true;
      }

      // Request next animation frame
      requestRef.current = requestAnimationFrame(step);
    };

    // Start animation
    step();

    // Cleanup function
    return () => {
      cancelAnimationFrame(requestRef.current);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseout", handleMouseOut);
      if (canvas && container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }, [rows]);

  return (
    <div 
      id="container" 
      ref={containerRef} 
      className="particle-background"
      aria-hidden="true" // Mark as hidden for screen readers since it's decorative
    />
  );
}
