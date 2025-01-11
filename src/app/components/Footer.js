const Footer = () => {
    return (
        <div>
            <footer className="footer-area col-md-6">
                <div className="container">
                    <div className="footer-content text-center">
                        <ul className="footer-menu">
                            {/*<li><a href="index.html">Home</a></li>*/}
                            {/*<li><a href="about.html">About</a></li>*/}
                            {/*<li><a href="works.html">Works</a></li>*/}
                            {/*<li><a href="contact.html">Contact</a></li>*/}
                        </ul>
                        <p className="copyright" style={{marginTop: '-20px'}}>
                            &copy; Created with love by <span><a href="https://www.linkedin.com/in/mrbondarenko/"
                                                                 target="_blank">Pavlo Bondarenko</a></span>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;