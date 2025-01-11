import Link from 'next/link';

const Header = () => {
    return (
        <div>
            <header className="header-area">
                <div className="container">
                    <div className="gx-row d-flex align-items-center justify-content-between ">
                        <Link href="/" className="logo">
                            <img src="/images/LOGO/logo3.png" width="400px" alt="Logo"/>
                        </Link>

                        <nav className="navbar">
                            <ul className="menu">
                                <li className="active"><Link href="/">Home</Link></li>
                                <li><Link href="/about">About</Link></li>
                                <li><Link href="/works">Works</Link></li>
                                <li><Link href="/contact">Contact</Link></li>
                            </ul>
                        </nav>

                        <Link href="https://www.linkedin.com/in/mrbondarenko/" target="_blank" className="theme-btn">Let's
                            connect</Link>

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


