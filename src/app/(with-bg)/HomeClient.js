'use client';

import '../components/Background/bg_style.css';
import '../globals.css';
import Link from 'next/link';
import { useEffect } from 'react';
import MagicEffect from '@/app/components/MagicEffect/MagicEffect';

export default function HomeClient() {
  useEffect(() => {
    const marqueeText = document.querySelectorAll('.marquee span, .marquee b');
    marqueeText.forEach((el) => {
      el.style.color = 'white';
    });
  }, []);

  return (
    <>
      <section className="about-area">
        <div className="container">
          <div className="row">
            <div className="col-md-6" data-aos="zoom-in">
              <div className="about-me-box shadow-box">
                <Link className="overlay-link" href="/about"></Link>
                <img src="/images/bg1.png" alt="BG" className="bg-img" />
                <div className="img-box">
                  <img src="/images/LOGO/pavlopic.png" alt="About Me" />
                </div>
                <div className="infos">
                  <h1>Pavlo Bondarenko</h1>
                  <p className="text-lg">
                    <i style={{ fontSize: '0.95rem' }}>Product @ Xe.com</i>
                  </p>
                  <Link href="#" className="about-btn">
                    <img src="/images/icon.svg" alt="Button" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="about-credentials-wrap">
                <MagicEffect />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 