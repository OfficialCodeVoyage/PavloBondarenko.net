'use client';
import '../../components/Background/bg_style.css';
import {useEffect} from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from "next/link";

const WorkPage = () => {

    useEffect(() => {
        AOS.init({
            duration: 1500,
            once: true,
        });
    }, []);

    return (
        <>
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
                                          target="_blank" rel="noopener noreferrer"></Link>
                                    <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                                    <div className="project-img">
                                        <img src="/images/projects/update5172025/v1/prescriberx.png" style={{width: '350px', height: '300px'}} alt="PrescribeRX"/>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="project-info">
                                            <p>Mobile App</p>
                                            <h1>PrescribeRX</h1>
                                            <p style={{fontSize: '14px'}}>Advanced Prescription Management</p>
                                        </div>
                                        <Link href="https://devpost.com/software/prescriberx" target="_blank" rel="noopener noreferrer"
                                              className="project-btn">
                                            <img src="/images/icon.svg" alt="Button"/>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div data-aos="zoom-in">
                                <div className="project-item shadow-box">
                                    <Link className="overlay-link" href="https://devpost.com/software/tbd-tmzb5j"
                                          target="_blank" rel="noopener noreferrer"></Link>
                                    <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                                    <div className="project-img">
                                        <img src="/images/projects/update5172025/v1/cougargpt.png" style={{width: '350px', height: '300px'}} alt="COUGAR (UH) Bot"/>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="project-info">
                                            <p>AI Bot (RAG)</p>
                                            <h1>COUGAR (UH) Bot</h1>
                                            <p style={{fontSize: '14px'}}>University Helper Bot</p>
                                        </div>
                                        <Link href="https://devpost.com/software/tbd-tmzb5j" target="_blank" rel="noopener noreferrer"
                                              className="project-btn">
                                            <img src="/images/icon.svg" alt="Button"/>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div data-aos="zoom-in">
                                <div className="project-item shadow-box">
                                    <Link className="overlay-link" href="https://devpost.com/software/nurseai-gr7p84"
                                          target="_blank" rel="noopener noreferrer"></Link>
                                    <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                                    <div className="project-img">
                                        <img src="/images/projects/update5172025/v1/nurseai.png" style={{width: '350px', height: '300px'}} alt="NurseAI"/>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="project-info">
                                            <p>LLM + Emergency Button</p>
                                            <h1>NurseAI</h1>
                                            <p style={{fontSize: '14px'}}>Emergency Button with AI features</p>
                                        </div>
                                        <Link href="https://devpost.com/software/nurseai-gr7p84" target="_blank" rel="noopener noreferrer"
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
                                              target="_blank" rel="noopener noreferrer"></Link>
                                        <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                                        <div className="project-img">
                                            <img src="/images/projects/update5172025/v1/ambertesla.png"
                                                 style={{width: '350px', height: '300px'}}
                                                 alt="AMBER ALERT + TESLA!"/>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="project-info">
                                                <p>OpenCV + PyTorch</p>
                                                <h1>AMBER ALERT + TESLA!</h1>
                                                <p style={{fontSize: '16px'}}>Child Safety & Vehicle Integration</p>
                                            </div>
                                            <Link href="https://devpost.com/software/pavlo_bondarenko_hello_world"
                                                  target="_blank" rel="noopener noreferrer" className="project-btn">
                                                <img src="/images/icon.svg" alt="Button"/>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div data-aos="zoom-in" className="flex-1">
                                    <div className="project-item shadow-box">
                                        <Link className="overlay-link"
                                              href="https://devpost.com/software/e-commerce-app-b5lrem"
                                              target="_blank" rel="noopener noreferrer"></Link>
                                        <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                                        <div className="project-img">
                                            <img src="/images/projects/update5172025/v1/SizeMeProject.png"
                                                 style={{width: '350px', height: '300px'}} alt="SizeMe: eCommerce"/>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="project-info">
                                                <p>OpenCV + Azure Cloud</p>
                                                <h1>SizeMe: eCommerce</h1>
                                                <p style={{fontSize: '14px'}}>Virtual Fitting Room for Online Shopping</p>
                                            </div>
                                            <Link href="https://devpost.com/software/e-commerce-app-b5lrem"
                                                  target="_blank" rel="noopener noreferrer"
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
                                              target="_blank" rel="noopener noreferrer"></Link>
                                        <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                                        <div className="project-img">
                                            <img src="/images/projects/update5172025/v1/astros.png" style={{width: '350px', height: '300px'}} alt="AstrosDebugger"/>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="project-info">
                                                <p>Data Science Project</p>
                                                <h1>AstrosDebugger</h1>
                                                <p style={{fontSize: '14px'}}>Data-Driven Debugging Tool</p>
                                            </div>
                                            <Link href="https://devpost.com/software/tbd-znafp1" target="_blank" rel="noopener noreferrer"
                                                  className="project-btn">
                                                <img src="/images/icon.svg" alt="Button"/>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div data-aos="zoom-in" className="flex-1">
                                    <div className="project-item shadow-box">
                                        <Link className="overlay-link" href="https://devpost.com/software/seethefuture"
                                              target="_blank" rel="noopener noreferrer"></Link>
                                        <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                                        <div className="project-img">
                                            <img src="/images/projects/update5172025/v1/seethefuture.png" style={{width: '350px', height: '300px'}}
                                                 alt="$SeeTheFuture"/>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="project-info">
                                                <p>Fintech App</p>
                                                <h1>$SeeTheFuture</h1>
                                                <p style={{fontSize: '14px'}}>AI Stock Market Predictor</p>
                                            </div>
                                            <Link href="https://devpost.com/software/seethefuture" target="_blank" rel="noopener noreferrer"
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
                                        <Link className="overlay-link"
                                              href="https://devpost.com/software/tbd-ir3qd5"
                                              target="_blank" rel="noopener noreferrer"></Link>
                                        <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                                        <div className="project-img">
                                            <img src="/images/projects/update5172025/v1/restoreio.png"
                                                 style={{width: '350px', height: '300px'}}
                                                 alt="RestoreIO"/>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="project-info">
                                                <p>LLM + OpenCV</p>
                                                <h1>RestoreIO</h1>
                                                <p style={{fontSize: '14px'}}>After Surgery Recovery Assistant</p>
                                            </div>
                                            <Link href="https://devpost.com/software/tbd-ir3qd5"
                                                  target="_blank" rel="noopener noreferrer" className="project-btn">
                                                <img src="/images/icon.svg" alt="Button"/>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div data-aos="zoom-in" className="flex-1">
                                    <div className="project-item shadow-box">
                                        <Link className="overlay-link"
                                              href="https://devpost.com/software/memory-palace-bnofj5"
                                              target="_blank" rel="noopener noreferrer"></Link>
                                        <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                                        <div className="project-img">
                                            <img src="/images/projects/update5172025/v1/memorypalace.png"
                                                 style={{width: '350px', height: '300px'}} alt="MemoryPalace"/>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="project-info">
                                                <p>LLM + Game</p>
                                                <h1>MemoryPalace</h1>
                                                <p style={{fontSize: '14px'}}>Helping seniors preserve their memories</p>
                                            </div>
                                            <Link href="https://devpost.com/software/memory-palace-bnofj5"
                                                  target="_blank" rel="noopener noreferrer"
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