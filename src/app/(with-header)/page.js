'use client';
import { useEffect } from 'react';
import bgMain from '../../bg/bg-main.js';
import '../../bg/bg_style.css'
import '../globals.css'

import Background from "@/app/components/Background";

export default function HomePage() {

  // useEffect(() => {
  //   bgMain(); // Запускаем анимацию
  // }, []);

  return (
      <>

        <Background rows={314}></Background>
        <section className="about-area">
          <div className="container">
            <div className="row">
              <div className="col-md-6" data-aos="zoom-in">
                <div className="about-me-box shadow-box">
                  <a className="overlay-link" href="about.html"></a>
                  <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                  <div className="img-box">
                    <img src="/images/LOGO/pavlopic.png" alt="About Me"/>
                  </div>
                  <div className="infos">
                    <h4></h4>
                    <h1>Pavlo Bondarenko</h1>
                    <p>Software Engineer</p>
                    <a href="#" className="about-btn">
                      <img src="/images/icon.svg" alt="Button"/>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="about-credentials-wrap">
                  <div data-aos="zoom-in">
                    <div className="banner shadow-box">
                      <div className="marquee">
                        <div>
                      <span><img src="/images/html_icon.png" height="17px" alt="Python"/><img
                          src="/images/css_logo.png" height="17px" alt="Python"/>  <b>HTML/CSS</b> <img
                          src="/images/star1.svg" alt="Star"/><img src="/images/cpp_logo.png"
                                                                   height="17px" alt="C++"/> <b>C++</b> <img
                          src="/images/star1.svg" alt="Star"/><img src="/images/Git_icon.png"
                                                                   height="17px" alt="GIT"/> <b>GIT</b> <img
                          src="/images/star1.svg" alt="Star"/><img src="/images/python-logo-only.png"
                                                                   height="17px"
                                                                   alt="Python"/> <b>PYTHON</b> <img
                          src="/images/star1.svg" alt="Star"/><img src="/images/azure.png" height="17px"
                                                                   alt="Bootstrap"/> <b>AZURE</b> <img
                          src="/images/star1.svg" alt="Star"/><img src="/images/linux.png" height="17px"
                                                                   alt="Linux"/> <b>LINUX</b> <img
                          src="/images/star1.svg" alt="Star"/><img src="/images/GCP.png" height="17px"
                                                                   alt="Linux"/> <b>GCP</b> <img
                          src="/images/star1.svg" alt="Star"/><img src="/images/aws.png" height="17px"
                                                                   alt="AWS"/> <b>AWS</b> <img
                          src="/images/star1.svg" alt="Star"/><img src="/images/davinciresolve.png"
                                                                   height="17px" alt="davinciresolve"/> <b>DAVINCI RESOLVE</b> <img
                          src="/images/star1.svg" alt="Star"/></span>
                        </div>
                      </div>

                    </div>

                  </div>

                  <div className="gx-row d-flex gap-24">
                    <div data-aos="zoom-in">
                      <div className="about-crenditials-box info-box shadow-box h-full">
                        <a className="overlay-link" href="about.html"></a>
                        <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                        <img src="/images/pbsignature.png" alt="Sign"/>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="infos">
                            <h4>Credentials</h4>
                            <h1>More About Me</h1>
                          </div>

                          <a href="./credentials.html" className="about-btn">
                            <img src="/images/icon.svg" alt="Button"/>
                          </a>

                        </div>
                      </div>
                    </div>

                    <div data-aos="zoom-in">
                      <div className="about-project-box info-box shadow-box h-full">
                        <a className="overlay-link" href="works.html"></a>
                        <img src="./images/bg1.png" alt="BG" className="bg-img"/>
                        <img src="./images/1my-works.png" alt="My Works"/>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="infos">
                            <h4>SHOWCASE</h4>
                            <h1>Projects</h1>
                          </div>

                          <a href="#" className="about-btn">
                            <img src="/images/icon.svg" alt="Button"/>
                          </a>

                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-24">
              <div className="col-md-12">
                <div className="blog-service-profile-wrap d-flex gap-24">
                  <div data-aos="zoom-in">
                    <div className="about-blog-box info-box shadow-box h-full">
                      <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/@OfficialCodeVoyage"
                         className="overlay-link"></a>
                      <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                      <img src="/images/yt1.png" height="126px" alt="GFonts" style={{opacity: '1'}}/>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="infos">
                          <h4>My hobby</h4>
                          <h1>YouTube</h1>
                        </div>

                        <a href="./blog.html" className="about-btn">
                          <img src="/images/icon.svg" alt="Button"/>

                        </a>

                      </div>
                    </div>
                  </div>

                  <div data-aos="zoom-in" className="flex-1">
                    <div className="about-services-box info-box shadow-box h-full">
                      <img src="/images/bg1.png" alt="BG" className="bg-img"/>

                      <div className="d-flex align-items-center justify-content-between">


                        {/*<script type="x-shader/x-vertex" id="vertexshader">*/}

                        {/*  attribute float size;*/}
                        {/*  attribute vec3 customColor;*/}
                        {/*  varying vec3 vColor;*/}

                        {/*  void main() {*/}

                        {/*  vColor = customColor;*/}
                        {/*  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );*/}
                        {/*  gl_PointSize = size * ( 300.0 / -mvPosition.z );*/}
                        {/*  gl_Position = projectionMatrix * mvPosition;*/}

                        {/*}*/}

                        {/*</script>*/}
                        {/*<script type="x-shader/x-fragment" id="fragmentshader">*/}

                        {/*  uniform vec3 color;*/}
                        {/*  uniform sampler2D pointTexture;*/}

                        {/*  varying vec3 vColor;*/}

                        {/*  void main() {*/}

                        {/*  gl_FragColor = vec4 (color * vColor, 1.0);*/}
                        {/*  gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );*/}

                        {/*}*/}
                        {/*</script>*/}

                        <div id="magic"></div>


                      </div>
                    </div>
                  </div>

                  <div data-aos="zoom-in">
                    <div className="about-profile-box info-box shadow-box h-full">
                      <img src="./images/bg1.png" alt="BG" className="bg-img"/>
                      <div className="inner-profile-icons shadow-box">
                        <a target="_blank" rel="noopener noreferrer" className="linkedln"
                           href="https://www.linkedin.com/in/mrbondarenko/">
                          <i className="iconoir-linkedin"></i>
                        </a>
                        <a target="_blank" rel="noopener noreferrer"
                           href="https://www.instagram.com/officialcodevoyage/">
                          <i className="iconoir-instagram"></i>
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="https://github.com/OfficialCodeVoyage">
                          <i className="iconoir-github"></i>
                        </a>

                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="infos">
                          <h4>Let's Connect</h4>
                          <h1>My Social Profiles</h1>
                        </div>

                        <a href="contact.html" className="about-btn">
                          <img src="/images/icon.svg" alt="Button"/>
                        </a>

                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            <div className="row mt-24">
              <div className="col-md-6" data-aos="zoom-in">

                <div className="about-client-box info-box shadow-box">
                  <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                  <div className="clients d-flex align-items-start gap-24 justify-content-center">
                    <div className="client-item client-item-bg1">
                      <h1>03</h1>
                      <p>Years <br/>Experience</p>
                    </div>

                    <div className="client-item client-item-bg2">
                      <h1><i className="iconoir-heart-solid"></i></h1>
                      <p>MADE <br/>WITH LOVE</p>
                    </div>

                    <div className="client-item client-item-bg3">
                      <h1>+56</h1>
                      <p>Total <br/>Projects</p>
                    </div>
                  </div>
                </div>

              </div>
              <div className="col-md-6" data-aos="zoom-in">

                <div className="about-contact-box info-box shadow-box">
                  <a className="overlay-link" href="contact.html"></a>
                  <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                  <img src="/images/icon2.png" alt="Icon" className="star-icon"/>
                  <h1>Let's <br/>work <span>together.</span></h1>
                  <a href="#" className="about-btn">
                    <img src="/images/icon.svg" alt="Button"/>
                  </a>
                </div>

              </div>
            </div>
          </div>
        </section>
      </>

  );
}
