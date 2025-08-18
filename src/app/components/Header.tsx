'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Raleway_Dots } from 'next/font/google';

const ralewayDots = Raleway_Dots({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
});

const Header: React.FC = () => {
    const pathname = usePathname(); // Current path
    const [menuActive, setMenuActive] = useState<boolean>(false);

    // Close the mobile menu whenever the route changes
    useEffect(() => {
        // Whenever pathname updates (i.e., a new route is pushed), close the menu
        setMenuActive(false);
    }, [pathname]);

    // Prevent body from scrolling while the mobile menu is open
    useEffect(() => {
        if (menuActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [menuActive]);

    // Close menu on escape key press
    useEffect(() => {
        const handleEscKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && menuActive) {
                setMenuActive(false);
            }
        };

        window.addEventListener('keydown', handleEscKey);
        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };
    }, [menuActive]);

    const getActiveClass = (path: string): string => (pathname === path ? 'active' : '');

    const handleToggleMenu = (): void => {
        setMenuActive(!menuActive);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggleMenu();
        }
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
                                    <Link href="/" onClick={handleToggleMenu}>Home</Link>
                                </li>
                                <li className={getActiveClass('/about')}>
                                    <Link href="/about" onClick={handleToggleMenu}>About</Link>
                                </li>
                                <li className={getActiveClass('/projects')}>
                                    <Link href="/projects" onClick={handleToggleMenu}>My Projects</Link>
                                </li>
                                <li className={getActiveClass('/contact')}>
                                    <Link href="/contact" onClick={handleToggleMenu}>Contact</Link>
                                </li>
                            </ul>
                        </nav>

                        <Link 
                            href="https://www.linkedin.com/in/mrbondarenko/" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="linkedin-btn-glass"
                            aria-label="My LinkedIn"
                        >
                            <i className="iconoir-linkedin"></i>
                            <span>Let&apos;s Connect!</span>
                        </Link>

                        <div
                            className={`show-menu ${menuActive ? 'active' : ''}`}
                            onClick={handleToggleMenu}
                            onKeyDown={handleKeyDown}
                            tabIndex={0}
                            role="button"
                            aria-label="Toggle navigation menu"
                            aria-expanded={menuActive}
                            aria-controls="navigation-menu"
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