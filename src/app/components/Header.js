'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Используем usePathname для получения текущего пути

const Header = () => {
    const pathname = usePathname(); // Текущий путь

    // Функция для добавления класса "active"
    const getActiveClass = (path) => (pathname === path ? 'active' : '');

    return (
        <div>
            <header className="header-area">
                <div className="container">
                    <div className="gx-row d-flex align-items-center justify-content-between ">
                        <Link href="/" className="logo">
                            <img src="/images/LOGO/logo3.png" width="400px" alt="Logo" />
                        </Link>

                        <nav className="navbar">
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

                        {/* Условный рендеринг кнопки */}
                        {pathname === '/' ? (
                            <Link href="https://www.linkedin.com/in/mrbondarenko/" target="_blank" className="theme-btn">
                                Let's connect
                            </Link>
                        ) : (
                            <Link href="/contact" className="theme-btn">
                                Let's talk
                            </Link>
                        )}

                        <div className="show-menu">
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
