'use client';
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function Background() {
    const requestRef = useRef();
    const pathname = usePathname();

    const rows = (() => {
        switch (pathname) {
            case '/':
                return 314;
            case '/about':
                return 344;
            case '/works':
                return 354;
            case '/contact':
                return 264
            default:
                return 0;
        }
    })();

    const containerRef = useRef(null);

    useEffect(() => {
        const ROWS = rows;
        const COLS = 300;
        const NUM_PARTICLES = ROWS * COLS;
        const THICKNESS = Math.pow(80, 2);
        const MARGIN = 1;
        const DRAG = 0.95;
        const EASE = 0.25;
        const COLOR = 220;

        const container = containerRef.current;
        if (!container) return;

        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        let list = [];
        let tog = true, man = false;
        let mx = 0, my = 0;

        const particleTemplate = {
            vx: 0,
            vy: 0,
            x: 0,
            y: 0,
            c1: COLOR,
            c2: COLOR,
            c3: COLOR,
        };

        const SPACING = (window.innerWidth - MARGIN * 2) / COLS;
        const width = COLS * SPACING + MARGIN * 2;
        const height = ROWS * SPACING + MARGIN * 2;

        canvas.width = width;
        canvas.height = height;
        container.style.marginLeft = `${Math.round(width * -0.5)}px`;
        container.style.marginTop = `${Math.round(height * -0.5)}px`;
        container.appendChild(canvas);

        // Генерация частиц
        for (let i = 0; i < NUM_PARTICLES; i++) {
            const p = { ...particleTemplate };
            p.x = p.ox = MARGIN + SPACING * (i % COLS);
            p.y = p.oy = MARGIN + SPACING * Math.floor(i / COLS);
            list[i] = p;
        }

        // Обработчики событий мыши
        function handleMouseMove(e) {
            const bounds = container.getBoundingClientRect();
            mx = e.clientX - bounds.left;
            my = e.clientY - bounds.top;
            man = true;
        }

        function handleMouseOut() {
            man = false;
        }

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseout", handleMouseOut);

        function step() {
            if (tog) {
                if (!man) {
                    if (10* Math.random() > 9) {
                        const t = +new Date() * 0.001;
                        mx = Math.floor(canvas.width * 0.5 + Math.cos(t) * canvas.width * 0.3);
                        my = Math.floor(canvas.height * 0.5 + Math.sin(t) * canvas.height * 0.3);
                    }

                }

                for (let i = 0; i < NUM_PARTICLES; i++) {
                    const p = list[i];
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

                    if (p.vx > 10) {
                        p.c2 = 255; // Зелёный
                    }
                    if (p.vy > 10) {
                        p.c3 = 255; // Синий
                    }

                    p.x += (p.vx *= DRAG) + (p.ox - p.x) * EASE;
                    p.y += (p.vy *= DRAG) + (p.oy - p.y) * EASE;
                }

                tog = false;
            } else {
                const imgData = ctx.createImageData(canvas.width, canvas.height);
                const data = imgData.data;

                for (let i = 0; i < NUM_PARTICLES; i++) {
                    const p = list[i];
                    const n = (~~p.x + ~~p.y * canvas.width) * 4;
                    data[n] = p.c1;
                    data[n + 1] = p.c2;
                    data[n + 2] = p.c3;
                    data[n + 3] = 255;
                }

                ctx.putImageData(imgData, 0, 0);
                tog = true;
            }

            coords.innerHTML = `X=${Math.round(mx)} Y=${Math.round(my)}`;
            requestRef.current = requestAnimationFrame(step);
        }

        step();

        return () => {
            cancelAnimationFrame(requestRef.current);
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseout", handleMouseOut);
            if (canvas && container.contains(canvas)) {
                container.removeChild(canvas);
            }
        };
    }, [rows]);

    return <div id="container" ref={containerRef}  />;
}
