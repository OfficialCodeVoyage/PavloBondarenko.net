'use client';
import '../../../bg/bg_style.css';
import bgWorks from "@/bg/bg-works";
import {useEffect} from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from "next/link";
import Background from "@/app/components/Background";

const WorkPage = () => {

    useEffect(() => {
        // bgWorks();
        AOS.init({
            duration: 1500,
            once: true,
        });
    }, []);

    return (
        <>
            <Background rows={354} />
            <section className="projects-area">
                <div className="container">
                    <h1 className="section-heading" data-aos="fade-up"><img src="/images/star-2.png"
                                                                            alt="Star"/> All Projects <img
                        src="/images/star-2.png" alt="Star"/></h1>
                    <div className="row">
                        <div className="col-md-4">
                            <div data-aos="zoom-in">
                                <div className="project-item shadow-box">
                                    <Link className="overlay-link" href="https://devpost.com/software/prescriberx"
                                          target="_blank"></Link>
                                    <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                                    <div className="project-img">
                                        <img src="/images/projects/rx1.jpg" alt="Project"/>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="project-info">
                                            <p>Mobile App</p>
                                            <h1>PrescribeRX</h1>
                                        </div>
                                        <Link href="https://devpost.com/software/prescriberx" target="_blank"
                                              className="project-btn">
                                            <img src="/images/icon.svg" alt="Button"/>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div data-aos="zoom-in">
                                <div className="project-item shadow-box">
                                    <Link className="overlay-link" href="https://devpost.com/software/tbd-tmzb5j"
                                          target="_blank"></Link>
                                    <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                                    <div className="project-img">
                                        <img src="/images/projects/uhbotai.png" style={{width: '100%'}} alt="Project"/>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="project-info">
                                            <p>AI Bot (RAG)</p>
                                            <h1>COUGAR (UH) Bot</h1>
                                        </div>
                                        <Link href="https://devpost.com/software/tbd-tmzb5j" target="_blank"
                                              className="project-btn">
                                            <img src="/images/icon.svg" alt="Button"/>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-8">
                            <h1 className="section-heading" data-aos="fade-up"><img src="/images/star-2.png"
                                                                                    alt="Star"/> All Projects <img
                                src="/images/star-2.png" alt="Star"/></h1>

                            <div className="d-flex align-items-start gap-24">
                                <div data-aos="zoom-in" className="flex-1">
                                    <div className="project-item shadow-box">
                                        <Link className="overlay-link"
                                              href="https://devpost.com/software/pavlo_bondarenko_hello_world"
                                              target="_blank"></Link>
                                        <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                                        <div className="project-img">
                                            <img src="/images/projects/plate.png"
                                                 style={{width: '100%', height: '380px'}}
                                                 alt="Project"/>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="project-info">
                                                <p>OpenCV + PyTorch</p>
                                                <h1>AMBER ALERT + TESLA!</h1>
                                            </div>
                                            <Link href="https://devpost.com/software/pavlo_bondarenko_hello_world"
                                                  target="_blank" className="project-btn">
                                                <img src="/images/icon.svg" alt="Button"/>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div data-aos="zoom-in" className="flex-1">
                                    <div className="project-item shadow-box">
                                        <Link className="overlay-link"
                                              href="https://devpost.com/software/e-commerce-app-b5lrem"
                                              target="_blank"></Link>
                                        <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                                        <div className="project-img">
                                            <img src="/images/projects/ifitit.png"
                                                 style={{width: '100%', height: '380px'}} alt="Project"/>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="project-info">
                                                <p>OpenCV + Azure Cloud</p>
                                                <h1>SizeMe: eCommerce</h1>
                                            </div>
                                            <Link href="https://devpost.com/software/e-commerce-app-b5lrem"
                                                  target="_blank"
                                                  className="project-btn">
                                                <img src="/images/icon.svg" alt="Button"/>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex align-items-start gap-24">
                                <div data-aos="zoom-in" className="flex-1">
                                    <div className="project-item shadow-box">
                                        <Link className="overlay-link" href="https://devpost.com/software/tbd-znafp1"
                                              target="_blank"></Link>
                                        <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                                        <div className="project-img">
                                            <img src="/images/projects/astros.png" alt="Project"/>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="project-info">
                                                <p>Data Science Project</p>
                                                <h1>AstrosDebugger</h1>
                                            </div>
                                            <Link href="https://devpost.com/software/tbd-znafp1" target="_blank"
                                                  className="project-btn">
                                                <img src="/images/icon.svg" alt="Button"/>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div data-aos="zoom-in" className="flex-1">
                                    <div className="project-item shadow-box">
                                        <Link className="overlay-link" href="https://devpost.com/software/seethefuture"
                                              target="_blank"></Link>
                                        <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                                        <div className="project-img">
                                            <img src="/images/projects/seethefuture.jpg" style={{height: '220px'}}
                                                 alt="Project"/>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="project-info">
                                                <p>Fintech App</p>
                                                <h1>$SeeTheFuture</h1>
                                            </div>
                                            <Link href="https://devpost.com/software/seethefuture" target="_blank"
                                                  className="project-btn">
                                                <img src="/images/icon.svg" alt="Button"/>
                                            </Link>
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

export default WorkPage;