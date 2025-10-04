import Link from 'next/link';

const Footer: React.FC = () => {
    return (
        <div>
            <footer className="footer-area col-md-6">
                <div className="container">
                    <div className="footer-content text-center">
                        <nav aria-label="Footer navigation">
                            <ul className="footer-menu">
                                <li>
                                    <Link
                                        href="/"
                                        title="Homepage - Pavlo Bondarenko Portfolio"
                                        aria-label="Go to homepage"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/about"
                                        title="About Pavlo Bondarenko - Experience & Skills"
                                        aria-label="Learn more about Pavlo"
                                    >
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/projects"
                                        title="View Projects Portfolio - 76+ Innovative Projects"
                                        aria-label="Browse project portfolio"
                                    >
                                        My Projects
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact"
                                        title="Contact Pavlo - Get in Touch"
                                        aria-label="Contact Pavlo Bondarenko"
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <p className="copyright" style={{marginTop: '-20px'}}>
                            3.6.9 &copy; Created with love by <span><a
                                href="https://www.linkedin.com/in/mrbondarenko/"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Connect with Pavlo Bondarenko on LinkedIn"
                                aria-label="Pavlo Bondarenko LinkedIn profile"
                            >Pavlo Bondarenko</a></span>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;