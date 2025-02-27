'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Raleway_Dots } from 'next/font/google';

const ralewayDots = Raleway_Dots({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
});

const Header = () => {
    const pathname = usePathname(); // Текущий путь
    const [menuActive, setMenuActive] = useState(false);

    const getActiveClass = (path) => (pathname === path ? 'active' : '');

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    return (
        <div>
            <header className="header-area">
                <div className="container">
                    <div className="gx-row d-flex align-items-center justify-content-between">
                        <Link href="/" className="logo">
                            <span className={`logo-text ${ralewayDots.className}`}>Hello World!</span>
                        </Link>

                        <nav className={`navbar ${menuActive ? 'active' : ''}`}>
                            <ul className="menu">
                                <li className={getActiveClass('/')}>
                                    <Link href="/">Home</Link>
                                </li>
                                <li className={getActiveClass('/about')}>
                                    <Link href="/about">About</Link>
                                </li>
                                <li className={getActiveClass('/projects')}>
                                    <Link href="/projects">My Projects</Link>
                                </li>
                                <li className={getActiveClass('/contact')}>
                                    <Link href="/contact">Contact</Link>
                                </li>
                            </ul>
                        </nav>

                        <Link 
                            href="https://www.linkedin.com/in/mrbondarenko/" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="theme-btn linkedin-btn flex items-center gap-2 group transition-all duration-300"
                            aria-label="My LinkedIn"
                        >
                            <i className="iconoir-linkedin text-xl" aria-hidden="true"></i>
                            <span className="relative">
                                Let's Connect!
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white/20 group-hover:w-full transition-all duration-300"></span>
                            </span>
                        </Link>

                        <div
                            className={`show-menu ${menuActive ? 'active' : ''}`}
                            onClick={toggleMenu}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
