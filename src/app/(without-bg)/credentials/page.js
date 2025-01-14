'use client';
import Link from 'next/link';

const CredentialsPage = () => {
    return (
        <section className="credential-area">
            <div className="container">
                <div className="gx-row d-flex">
                    <div className="credential-sidebar-wrap" data-aos="zoom-in">
                        <div className="credential-sidebar text-center">
                            <div className="shadow-box">
                                <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                                <div className="img-box">
                                    <img src="/images/me.png" alt="About Me"/>
                                </div>
                                <h2>David Henderson</h2>
                                <p>@davidhenderson</p>

                                <ul className="social-links d-flex justify-content-center">
                                    <li><Link href="#"><i className="iconoir-dribbble"></i></Link></li>
                                    <li><Link href="#"><i className="iconoir-twitter"></i></Link></li>
                                    <li><Link href="#"><i className="iconoir-instagram"></i></Link></li>
                                    <li><Link href="#"><i className="iconoir-facebook-tag"></i></Link></li>
                                </ul>

                                <Link href="/contact" className="theme-btn">Contact Me</Link>
                            </div>
                        </div>
                    </div>

                    <div className="credential-content flex-1">
                        <div className="credential-about" data-aos="zoom-in">
                            <h2>About Me</h2>
                            <p>Sit amet luctussd fav venenatis, lectus magna fringilla inis urna, porttitor rhoncus
                                dolor purus non enim praesent in elementum sahas facilisis leo, vel fringilla est
                                ullamcorper eget nulla facilisi etisam dignissim diam quis enim lobortis viverra orci
                                sagittis eu volutpat odio facilisis mauris sit.</p>
                            <p>Scelerisque fermentum duisi faucibus in ornare quam sisd sit amet luctussd fav venenatis,
                                lectus magna fringilla zac urna, porttitor rhoncus dolor purus non enim praesent cuz
                                elementum sahas facilisis leot.</p>
                        </div>

                        <div className="credential-edc-exp credential-experience">
                            <h2 data-aos="fade-up">Experience</h2>
                            <div className="credential-edc-exp-item" data-aos="zoom-in">
                                <h4>2007 - 2017</h4>
                                <h3>Framer Designer & Developer</h3>
                                <h5>Bluebase Designs</h5>
                                <p>Sit amet luctussd fav venenatis, lectus magna fringilla inis urna, porttitor rhoncus
                                    dolor purus non enim praesent in elementum sahas facilisis leo, vel fringilla est
                                    ullamcorper eget nulla facilisi etisam dignissim diam quis enim lobortis viverra
                                    orci sagittis eu volutpat odio facilisis mauris sit.</p>
                            </div>
                            <div className="credential-edc-exp-item" data-aos="zoom-in">
                                <h4>2017 - 2023</h4>
                                <h3>Front-End Developer</h3>
                                <h5>Larsen & Toubro</h5>
                                <p>Sit amet luctussd fav venenatis, lectus magna fringilla inis urna, porttitor rhoncus
                                    dolor purus non enim praesent in elementum sahas facilisis leo, vel fringilla est
                                    ullamcorper eget nulla facilisi etisam dignissim diam quis enim lobortis viverra
                                    orci sagittis eu volutpat odio facilisis mauris sit.</p>
                            </div>
                        </div>

                        <div className="credential-edc-exp credential-education">
                            <h2 data-aos="fade-up">Education</h2>
                            <div className="credential-edc-exp-item" data-aos="zoom-in">
                                <h4>2004 - 2007</h4>
                                <h3>Bachelor Degree in Psychology</h3>
                                <h5>University of California</h5>
                                <p>Sit amet luctussd fav venenatis, lectus magna fringilla inis urna, porttitor rhoncus
                                    dolor purus non enim praesent in elementum sahas facilisis leo, vel fringilla est
                                    ullamcorper eget nulla facilisi etisam dignissim diam quis enim lobortis viverra
                                    orci sagittis eu volutpat odio facilisis mauris sit.</p>
                            </div>
                            <div className="credential-edc-exp-item" data-aos="zoom-in">
                                <h4>2007 - 2009</h4>
                                <h3>Master Degree in Designing</h3>
                                <h5>University of Texas</h5>
                                <p>Sit amet luctussd fav venenatis, lectus magna fringilla inis urna, porttitor rhoncus
                                    dolor purus non enim praesent in elementum sahas facilisis leo, vel fringilla est
                                    ullamcorper eget nulla facilisi etisam dignissim diam quis enim lobortis viverra
                                    orci sagittis eu volutpat odio facilisis mauris sit.</p>
                            </div>
                        </div>

                        <div className="skills-wrap">
                            <h2 data-aos="fade-up">Skills</h2>
                            <div className="d-grid skill-items gap-24 flex-wrap">
                                <div className="skill-item" data-aos="zoom-in">
                                    <span className="percent">85%</span>
                                    <h3 className="name">JavaScript</h3>
                                    <p>Non enim praesent</p>
                                </div>
                                <div className="skill-item" data-aos="zoom-in">
                                    <span className="percent">78%</span>
                                    <h3 className="name">Python</h3>
                                    <p>Non enim praesent</p>
                                </div>
                                <div className="skill-item" data-aos="zoom-in">
                                    <span className="percent">92%</span>
                                    <h3 className="name">Figma</h3>
                                    <p>Non enim praesent</p>
                                </div>
                                <div className="skill-item" data-aos="zoom-in">
                                    <span className="percent">90%</span>
                                    <h3 className="name">WordPress</h3>
                                    <p>Non enim praesent</p>
                                </div>
                                <div className="skill-item" data-aos="zoom-in">
                                    <span className="percent">81%</span>
                                    <h3 className="name">React</h3>
                                    <p>Non enim praesent</p>
                                </div>
                                <div className="skill-item" data-aos="zoom-in">
                                    <span className="percent">87%</span>
                                    <h3 className="name">Adobe XD</h3>
                                    <p>Non enim praesent</p>
                                </div>

                            </div>
                        </div>

                        <div className="skills-wrap awards-wrap">
                            <h2 data-aos="fade-up">Awards</h2>
                            <div className="d-grid skill-items gap-24 flex-wrap">
                                <div className="skill-item" data-aos="zoom-in">
                                    <span className="percent">14 May 2020</span>
                                    <h3 className="name">Bluebase</h3>
                                    <p>Non enim praesent</p>
                                </div>
                                <div className="skill-item" data-aos="zoom-in">
                                    <span className="percent">26 June 2018</span>
                                    <h3 className="name">Demble</h3>
                                    <p>Non enim praesent</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CredentialsPage;