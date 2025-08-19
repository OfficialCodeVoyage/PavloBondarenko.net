'use client';
import '../components/Background/bg_style.css'
import '../globals.css'
import Image from 'next/image';
import Link from 'next/link';
import MagicEffect from "@/app/components/MagicEffect/MagicEffect";

const HomePage: React.FC = () => {
  // Removed DOM manipulation - now handled by CSS
  
  return (
      <>
        <section className="about-area">
          <div className="container">
            <div className="row">
              <div className="col-md-6" data-aos="zoom-in">
                <div className="about-me-box shadow-box">
                  <Link className="overlay-link" href="/about"></Link>
                  <Image src="/images/bg1.png" alt="BG" className="bg-img" fill style={{ objectFit: 'cover' }} />
                  <div className="img-box">
                    <Image src="/images/LOGO/pavlopic3.png" alt="About Me" width={300} height={300} style={{ width: '100%', height: 'auto' }} loading="lazy" />
                  </div>
                  <div className="infos">
                    <h4></h4>
                    <h1>Pavlo Bondarenko</h1>
                    <p className="text-lg">
                      <i style={{fontSize: '0.95rem'}}>Product @ Xe.com</i>
                    </p>
                    <Link href="#" className="about-btn" onClick={(e) => e.preventDefault()}>
                      <img src="/images/icon.svg" alt="Button"/>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="about-credentials-wrap">
                  <div data-aos="zoom-in">
                    <div className="banner shadow-box">
                      <div className="marquee">
                        <div>
                          <span>
                            {/* PM/Business Tools */}
                            <Image src="/images/jira.png" height={17} width={17} alt="Jira" loading="lazy" style={{ display: 'inline-block' }}/> <b>JIRA</b> <Image src="/images/star1.svg" height={17} width={17} alt="Star" loading="lazy" style={{ display: 'inline-block' }}/>
                            <Image src="/images/figma.png" height={17} width={17} alt="Figma" loading="lazy" style={{ display: 'inline-block' }}/> <b>FIGMA</b> <Image src="/images/star1.svg" height={17} width={17} alt="Star" loading="lazy" style={{ display: 'inline-block' }}/>
                            <Image src="/images/powerbi.png" height={17} width={17} alt="PowerBI" loading="lazy" style={{ display: 'inline-block' }}/> <b>POWER BI</b> <Image src="/images/star1.svg" height={17} width={17} alt="Star" loading="lazy" style={{ display: 'inline-block' }}/>
                            <Image src="/images/amplitude.png" height={17} width={17} alt="Amplitude" loading="lazy" style={{ display: 'inline-block' }}/> <b>Amplitude</b> <Image src="/images/star1.svg" height={17} width={17} alt="Star" loading="lazy" style={{ display: 'inline-block' }}/>
                            
                            {/* Technical Skills */}
                            <Image src="/images/python-logo-only.png" height={17} width={17} alt="Python" loading="lazy" style={{ display: 'inline-block' }}/> <b>PYTHON</b> <Image src="/images/star1.svg" height={17} width={17} alt="Star" loading="lazy" style={{ display: 'inline-block' }}/>
                            <Image src="/images/Git_icon.png" height={17} width={17} alt="GIT" loading="lazy" style={{ display: 'inline-block' }}/> <b>GIT</b> <Image src="/images/star1.svg" height={17} width={17} alt="Star" loading="lazy" style={{ display: 'inline-block' }}/>
                            
                            {/* Cloud/Infrastructure */}
                            <Image src="/images/azure.png" height={17} width={17} alt="Azure" loading="lazy" style={{ display: 'inline-block' }}/> <b>AZURE</b> <Image src="/images/star1.svg" height={17} width={17} alt="Star" loading="lazy" style={{ display: 'inline-block' }}/>
                            <Image src="/images/aws.png" height={17} width={17} alt="AWS" loading="lazy" style={{ display: 'inline-block' }}/> <b>AWS</b> <Image src="/images/star1.svg" height={17} width={17} alt="Star" loading="lazy" style={{ display: 'inline-block' }}/>
                            <Image src="/images/GCP.png" height={17} width={17} alt="GCP" loading="lazy" style={{ display: 'inline-block' }}/> <b>GCP</b> <Image src="/images/star1.svg" height={17} width={17} alt="Star" loading="lazy" style={{ display: 'inline-block' }}/>
                            
                            {/* Other Relevant Skills */}
                            <Image src="/images/linux.png" height={17} width={17} alt="Linux" loading="lazy" style={{ display: 'inline-block' }}/> <b>LINUX</b> <Image src="/images/star1.svg" height={17} width={17} alt="Star" loading="lazy" style={{ display: 'inline-block' }}/>
                            <Image src="/images/davinciresolve.png" height={17} width={17} alt="DaVinci Resolve" loading="lazy" style={{ display: 'inline-block' }}/> <b>DAVINCI RESOLVE</b> <Image src="/images/star1.svg" height={17} width={17} alt="Star" loading="lazy" style={{ display: 'inline-block' }}/>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="gx-row d-flex gap-24">
                    <div data-aos="zoom-in">
                      <div className="about-crenditials-box info-box shadow-box h-full">
                        <Link className="overlay-link" href="/about"></Link>
                        <Image src="/images/bg1.png" alt="BG" className="bg-img" fill style={{ objectFit: 'cover' }} />
                        <Image src="/images/pbsignature.png" alt="Sign" width={200} height={100} style={{ width: 'auto', height: 'auto' }} loading="lazy" />
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="infos">
                            <h4>Credentials</h4>
                            <h1>More About Me</h1>
                          </div>

                          <Link href="/about" className="about-btn">
                            <img src="/images/icon.svg" alt="Button"/>
                          </Link>

                        </div>
                      </div>
                    </div>

                    <div data-aos="zoom-in">
                      <div className="about-project-box info-box shadow-box h-full">
                        <Link className="overlay-link" href="/projects"></Link>
                        <Image src="/images/bg1.png" alt="BG" className="bg-img" fill style={{ objectFit: 'cover' }} />
                        <Image src="/images/1my-works.png" alt="My Works" width={250} height={200} style={{ width: 'auto', height: 'auto' }} loading="lazy" />
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="infos">
                            <h4>SHOWCASE</h4>
                            <h1>Projects</h1>
                          </div>

                          <Link href="#" className="about-btn" onClick={(e) => e.preventDefault()}>
                            <img src="/images/icon.svg" alt="Button"/>
                          </Link>

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
                      <Link target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/@OfficialCodeVoyage"
                         className="overlay-link"></Link>
                      <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                      <Image src="/images/yt1.png" height={126} width={200} alt="YouTube" style={{opacity: '1', width: 'auto', height: 'auto', maxWidth: '200px'}} loading="lazy" />
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="infos">
                          <h4>My hobby</h4>
                          <h1>YouTube</h1>
                        </div>

                        <Link href="https://www.youtube.com/@OfficialCodeVoyage" target="_blank" rel="noopener noreferrer" className="about-btn">
                          <img src="/images/icon.svg" alt="Button"/>
                        </Link>

                      </div>
                    </div>
                  </div>

                  <div data-aos="zoom-in" className="flex-1">
                    <div className="about-services-box info-box shadow-box h-full">
                      <img src="/images/bg1.png" alt="BG" className="bg-img"/>

                      <div className="d-flex align-items-center justify-content-between magic-container">


          {/*              <script type="x-shader/x-vertex" id="vertexshader">*/}
          {/*                {`*/}
          {/*  attribute float size;*/}
          {/*  attribute vec3 customColor;*/}
          {/*  varying vec3 vColor;*/}

          {/*  void main() {*/}
          {/*    vColor = customColor;*/}
          {/*    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );*/}
          {/*    gl_PointSize = size * ( 300.0 / -mvPosition.z );*/}
          {/*    gl_Position = projectionMatrix * mvPosition;*/}
          {/*  }*/}
          {/*`}*/}
          {/*              </script>*/}

          {/*              <script type="x-shader/x-fragment" id="fragmentshader">*/}
          {/*                {`*/}
          {/*  uniform vec3 color;*/}
          {/*  uniform sampler2D pointTexture;*/}
          {/*  varying vec3 vColor;*/}

          {/*  void main() {*/}
          {/*    gl_FragColor = vec4( color * vColor, 1.0 );*/}
          {/*    gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );*/}
          {/*  }*/}
          {/*`}*/}
          {/*              </script>*/}

                          <MagicEffect/>


                      </div>
                    </div>
                  </div>

                  <div data-aos="zoom-in">
                    <div className="about-profile-box info-box shadow-box h-full">
                      <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                      <div className="inner-profile-icons shadow-box">
                        <Link target="_blank" rel="noopener noreferrer" className="linkedln"
                              href="https://www.linkedin.com/in/mrbondarenko/">
                          <i className="iconoir-linkedin"></i>
                        </Link>
                        <Link target="_blank" rel="noopener noreferrer"
                              href="https://www.instagram.com/pasha.369.bond/">
                          <i className="iconoir-instagram"></i>
                        </Link>
                        <Link target="_blank" rel="noopener noreferrer" href="https://github.com/OfficialCodeVoyage">
                          <i className="iconoir-github"></i>
                        </Link>

                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="infos">
                          <h4>Let's Connect</h4>
                          <h1>My Social Profiles</h1>
                        </div>

                        <Link href="/contact" className="about-btn">
                          <img src="/images/icon.svg" alt="Button"/>
                        </Link>

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
                      <h1>04</h1>
                      <p>Years <br/>Experience</p>
                    </div>

                    <div className="client-item client-item-bg2">
                      <h1><i className="iconoir-heart-solid"></i></h1>
                      <p>MADE <br/>WITH LOVE</p>
                    </div>

                    <div className="client-item client-item-bg3">
                      <h1>+76</h1>
                      <p>Total <br/>Projects</p>
                    </div>
                  </div>
                </div>

              </div>
              <div className="col-md-6" data-aos="zoom-in">

                <div className="about-contact-box info-box shadow-box">
                  <Link className="overlay-link" href="/contact"></Link>
                  <Image src="/images/bg1.png" alt="BG" className="bg-img" fill style={{ objectFit: 'cover' }} />
                  <Image src="/images/icon2.png" alt="Icon" className="star-icon" width={100} height={100} style={{ width: 'auto', height: 'auto' }} loading="lazy" />
                  <h1>Let's <br/>work <span>together.</span></h1>
                  <Link href="#" className="about-btn" onClick={(e) => e.preventDefault()}>
                    <img src="/images/icon.svg" alt="Button"/>
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </section>
      </>

  );
}

export default HomePage;
