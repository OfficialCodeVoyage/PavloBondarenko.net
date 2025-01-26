'use client';
import Form from '../../components/Form/Form'
import '../../components/Background/bg_style.css';
import {useEffect} from "react";

import AOS from 'aos';
import 'aos/dist/aos.css';


const ContactPage = () => {

    useEffect(() => {
        AOS.init({
            duration: 1500,
            once: true,
        });
    }, []);

    return (
        <>
            <div>
                <section className="contact-area">
                    <div className="container">
                        <div className="gx-row d-flex justify-content-between gap-24">
                            <div className="contact-infos">
                                <h3 data-aos="fade-up">Contact Info</h3>
                                <ul className="contact-details">
                                    <li className="d-flex align-items-center" data-aos="zoom-in">
                                        <div className="icon-box shadow-box">
                                            <i className="iconoir-map-pin"></i>
                                        </div>
                                        <div className="right">
                                            <span>From</span>
                                            <h4>Odesa, Ukraine</h4>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center" data-aos="zoom-in">
                                        <div className="icon-box shadow-box">
                                            <i className="iconoir-map-pin"></i>
                                        </div>
                                        <div className="right">
                                            <span>Live in</span>
                                            <h4>Dallas, Texas</h4>
                                        </div>
                                    </li>
                                </ul>

                                <h3 data-aos="fade-up">Social Info</h3>
                                <ul className="social-links d-flex align-center" data-aos="zoom-in">
                                    <li><a className="shadow-box" href="https://www.linkedin.com/in/mrbondarenko/"
                                           target="_blank"><i className="iconoir-linkedin"></i></a></li>
                                    <li><a className="shadow-box" href="https://www.instagram.com/pasha___bond/"
                                           target="_blank"><i className="iconoir-instagram"></i></a></li>
                                    <li><a className="shadow-box" href="https://github.com/OfficialCodeVoyage"
                                           target="_blank"><i className="iconoir-github"></i></a></li>
                                    <li><a className="shadow-box" href="https://www.youtube.com/@OfficialCodeVoyage"
                                           target="_blank"><i className="iconoir-youtube"></i></a></li>

                                </ul>

                            </div>

                            <Form/>

                        </div>
                    </div>
                </section>
            </div>
        </>

    );
};

export default ContactPage;