import Link from 'next/link';

const Footer = () => {
    return (
        <div>
            <footer className="footer-area col-md-6">
                <div className="container">
                    <div className="footer-content text-center">
                        <ul className="footer-menu">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/about">About</Link></li>
                            <li><Link href="/projects">My Projects</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                        </ul>
                        <p className="copyright" style={{marginTop: '-20px'}}>
                            3.6.9 &copy; Created with love by <span><a href="https://www.linkedin.com/in/mrbondarenko/"
                                                                 target="_blank">Pavlo Bondarenko</a></span>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;