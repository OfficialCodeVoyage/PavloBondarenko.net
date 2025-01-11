'use client';
import './../../bg/bg_style.css';
import bgAbout from "@/bg/bg-about";
import {useEffect} from "react";


const Page = () => {
    useEffect(() => {
        bgAbout(); // Запускаем анимацию
    }, []);

    return (
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
                            <p>Experienced software engineer with over 5 years specializing in backend development and
                                cloud solutions, with a proven track
                                record in enhancing system performance and driving digital transformations. Skilled in
                                developing scalable architectures and
                                engaging digital content, committed to leveraging technology to solve real-world
                                problems.</p>
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
                                    <p className="date">01/2021 - 04/2024</p>
                                    <h2>Software Engineer & Cloud Solutions Engineer</h2>
                                    <p className="type"><a href="https://qit.software/"
                                                           style={{color: '#98D2E6', fontSize: '18px'}}>QIT Software</a></p>
                                </li>
                                <li>
                                    <p className="date">09/2016 - 05/2018</p>
                                    <h2>Full Stack Developer</h2>
                                    <p className="type"><a href="https://123remodeling.com/"
                                                           style={{color: '#98D2E6', fontSize: '18px'}}>123 Remodeling</a>
                                    </p>
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
                                    <p className="type"><a href="https://www.unt.edu/index.html"
                                                           style={{color: '#98D2E6', fontSize: '18px'}}>University of North
                                        Texas</a></p>
                                </li>
                                <li>
                                    <p className="date">2011 - 2015</p>
                                    <h2>B.S. in Computer Engineering</h2>
                                    <p className="type"><a href="https://op.edu.ua/en"
                                                           style={{color: '#98D2E6', fontSize: '18px'}}>Odesа Polytechnic
                                        National University</a></p>
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
                                        <a target="_blank" rel="noopener noreferrer" className="linkedln"
                                           href="https://www.linkedin.com/in/mrbondarenko/">
                                            <i className="iconoir-linkedin"></i>
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer"
                                           href="https://www.instagram.com/pavlo_bondarenko_hello_world/">
                                            <i className="iconoir-instagram"></i>
                                        </a>
                                        <a target="_blank" rel="noopener noreferrer"
                                           href="https://github.com/OfficialCodeVoyage">
                                            <i className="iconoir-github"></i>
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="infos">
                                            <h4>LET'S CONNECT</h4>
                                            <h1>My Social Profiles</h1>
                                        </div>

                                        <a href="./contact.html" className="about-btn">
                                            <img src="/images/icon.svg" alt="Button"/>
                                        </a>

                                    </div>
                                </div>
                            </div>

                            <div data-aos="zoom-in" className="flex-1">
                                <div className="about-contact-box info-box shadow-box">
                                    <a className="overlay-link" href="./contact.html"></a>
                                    <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                                    <img src="/images/icon2.png" alt="Icon" className="star-icon"/>
                                    <h1>Let's <br/>work <span>together.</span></h1>
                                    <a href="./contact.html" className="about-btn">
                                        <img src="/images/icon.svg" alt="Button"/>
                                    </a>
                                </div>
                            </div>

                            <div data-aos="zoom-in" className="h-full">
                                <div className="about-crenditials-box info-box shadow-box">
                                    <a className="overlay-link" href="PavloBondarenkoResume.pdf" download></a>
                                    <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                                    <img src="/images/resume.png" style={{height: '124px'}} alt="Sign"/>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="infos">
                                            <h4>Download My</h4>
                                            <h1>Updated Resume</h1>
                                        </div>

                                        <a href="PavloBondarenkoResume.pdf" download className="about-btn">
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
    );
};

export default Page;