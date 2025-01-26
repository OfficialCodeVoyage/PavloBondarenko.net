'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

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
                            <img src="/images/LOGO/logo3.png" width="400px" alt="Logo" />
                        </Link>

                        <nav className={`navbar ${menuActive ? 'active' : ''}`}>
                            <ul className="menu">
                                <li className={getActiveClass('/')}>
                                    <Link href="/">Home</Link>
                                </li>
                                <li className={getActiveClass('/about')}>
                                    <Link href="/about">About</Link>
                                </li>
                                <li className={getActiveClass('/works')}>
                                    <Link href="/works">Works</Link>
                                </li>
                                <li className={getActiveClass('/contact')}>
                                    <Link href="/contact">Contact</Link>
                                </li>
                            </ul>
                        </nav>

                        {pathname === '/' ? (
                            <Link href="https://www.linkedin.com/in/mrbondarenko/" target="_blank" className="theme-btn">
                                Let's connect
                            </Link>
                        ) : (
                            <Link href="/contact" className="theme-btn">
                                Let's talk
                            </Link>
                        )}

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
