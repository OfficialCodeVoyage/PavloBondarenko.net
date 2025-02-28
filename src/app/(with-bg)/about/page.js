'use client';
import '../../components/Background/bg_style.css';
import '../../globals.css'
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from "next/link";


const AboutPage = () => {
    useEffect(() => {
        AOS.init({
            duration: 1500,
            once: true,
        });
    }, []);

    return (
        <>
            <section className="about-area">
                <div className="container">
                    <div className="d-flex about-me-wrap align-items-start gap-24">
                        <div data-aos="zoom-in">
                            <div className="about-image-box shadow-box">
                                <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                                <div className="image-inner">
                                    <img src="/images/about_me_profile_pic.png" alt="About Me"/>
                                </div>
                            </div>
                        </div>

                        <div className="about-details" data-aos="zoom-in">
                            <h1 className="section-heading" data-aos="fade-up"><img src="/images/star-2.png"
                                                                                    alt="Star"/> Self-summary <img
                                src="/images/star-2.png" alt="Star"/></h1>
                            <div className="about-details-inner shadow-box">
                                <img src="/images/icon2.png" alt="Star"/>
                                <h1 style={{marginTop: '-35px'}}><span>Pavlo Bondarenko</span></h1>
                                <p>
  I swapped my code wizard cape for a product manager hat—mixing tech savvy with a splash of fun to build awesome, scalable solutions.
 Always ready to innovate and create next-level products. Always smiling :)
</p>
                            </div>

                        </div>
                    </div>

                    <div className="row mt-24">
                        <div className="col-md-6" data-aos="zoom-in">
                            <div className="about-edc-exp about-experience shadow-box">
                                <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                                <h3>EXPERIENCE</h3>

                                <ul>
                                <li>
                                        <p className="date">01/2025 - Present</p>
                                        <h2>Associate Product Manager</h2>
                                        <p className="type"><Link href="hhttps://www.xe.com"
                                                                  style={{color: '#98D2E6', fontSize: '18px'}}>Xe.com</Link>
                                        </p>
                                    </li>
                                    <li>
                                        <p className="date">01/2021 - 04/2024</p>
                                        <h2>Software Engineer & Cloud Solutions Engineer</h2>
                                        <p className="type"><Link href="https://qit.software/"
                                                                  style={{color: '#98D2E6', fontSize: '18px'}}>QIT
                                            Software</Link></p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6" data-aos="zoom-in">
                            <div className="about-edc-exp about-education shadow-box">
                                <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                                <h3>EDUCATION</h3>

                                <ul>
                                    <li>
                                        <p className="date">2023 - 2024</p>
                                        <h2>B.S. in Computer Science</h2>
                                        <p className="type"><Link href="https://www.unt.edu/index.html"
                                                                  style={{color: '#98D2E6', fontSize: '18px'}}>University
                                            of North
                                            Texas</Link></p>
                                    </li>
                                    <li>
                                        <p className="date">2011 - 2015</p>
                                        <h2>B.S. in Computer Engineering</h2>
                                        <p className="type"><Link href="https://op.edu.ua/en"
                                                                  style={{color: '#98D2E6', fontSize: '18px'}}>Odesа
                                            Polytechnic
                                            National University</Link></p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-24">
                        <div className="col-md-12">
                            <div className="d-flex profile-contact-credentials-wrap gap-24">

                                <div data-aos="zoom-in">
                                    <div className="about-profile-box info-box shadow-box h-full">
                                        <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                                        <div className="inner-profile-icons shadow-box">
                                            <Link target="_blank" rel="noopener noreferrer" className="linkedln"
                                                  href="https://www.linkedin.com/in/mrbondarenko/">
                                                <i className="iconoir-linkedin"></i>
                                            </Link>
                                            <Link target="_blank" rel="noopener noreferrer"
                                                  href="https://www.instagram.com/pasha___bond/">
                                                <i className="iconoir-instagram"></i>
                                            </Link>
                                            <Link target="_blank" rel="noopener noreferrer"
                                                  href="https://github.com/OfficialCodeVoyage">
                                                <i className="iconoir-github"></i>
                                            </Link>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="infos">
                                                <h4>LET'S CONNECT</h4>
                                                <h1>My Social Profiles</h1>
                                            </div>

                                            <Link href='../contact' className="about-btn">
                                                <img src="/images/icon.svg" alt="Button"/>
                                            </Link>

                                        </div>
                                    </div>
                                </div>

                                <div data-aos="zoom-in" className="flex-1">
                                    <div className="about-contact-box info-box shadow-box">
                                        <Link className="overlay-link" href='../contact'></Link>
                                        <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                                        <img src="/images/icon2.png" alt="Icon" className="star-icon"/>
                                        <h1>Let's <br/>work <span>together.</span></h1>
                                        <Link href='../contact' className="about-btn">
                                            <img src="/images/icon.svg" alt="Button"/>
                                        </Link>
                                    </div>
                                </div>

                                <div data-aos="zoom-in" className="h-full">
                                    <div className="about-crenditials-box info-box shadow-box">
                                        <Link className="overlay-link" href="#" download ></Link>
                                        <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                                        <img src="/images/resume.png" style={{height: '124px'}} alt="Sign"/>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="infos">
                                                <h4>Download My</h4>
                                                <h1>Updated Resume</h1>
                                            </div>

                                            <a href="/PavloBondarenkoResume.pdf" download className="about-btn">
                                                <img src="/images/icon.svg" alt="Button"/>
                                            </a>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
};

export default AboutPage;