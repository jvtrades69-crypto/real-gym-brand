import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Move, Shield, Minimize2 } from 'lucide-react';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="home-about-section" ref={sectionRef} id="about">
      <div className="home-about-container">
        {/* Text Content */}
        <div className="home-about-content">
          <h2 className="home-about-title">ABOUT RAZE</h2>
          <p className="home-about-subtitle">Built by Discipline. Made to Move.</p>
          
          <div className="home-about-text">
            <p>
              Most sportswear isn't built for gymnastics — where every routine demands control, grip, and full extension.
            </p>
            <p>
              In gymnastics, every routine demands full range movement, control, and comfort. As gymnasts ourselves, we know how frustrating it is when clothing shifts mid-routine.
            </p>
            <p>
              RAZE was created by gymnasts who got tired of clothing that rides up, restricts motion, or feels wrong at the worst moment. We build minimalist performance wear that moves with you — not against you.
            </p>
          </div>

          {/* What We Stand For - Mini Feature Row */}
          <div className="home-about-features">
            <div className="home-about-feature">
              <Move size={20} className="home-about-feature-icon" />
              <div className="home-about-feature-text">
                <span className="home-about-feature-title">Full-range mobility</span>
                <span className="home-about-feature-desc">Made for dynamic movement</span>
              </div>
            </div>
            <div className="home-about-feature">
              <Shield size={20} className="home-about-feature-icon" />
              <div className="home-about-feature-text">
                <span className="home-about-feature-title">Secure fit</span>
                <span className="home-about-feature-desc">Stays in place during routines</span>
              </div>
            </div>
            <div className="home-about-feature">
              <Minimize2 size={20} className="home-about-feature-icon" />
              <div className="home-about-feature-text">
                <span className="home-about-feature-title">Minimal design</span>
                <span className="home-about-feature-desc">No distractions, just performance</span>
              </div>
            </div>
          </div>
          
          <Link to="/about" className="home-about-link">
            Learn More <ArrowRight size={18} />
          </Link>
        </div>

        {/* Images */}
        <div className="home-about-images">
          <div className={`home-about-image-wrapper ${isVisible ? 'animate-fade-in-up' : ''}`}>
            <img 
              src="/images/athletes/mag_athlete.jpg" 
              alt="Male gymnast training"
              className="home-about-image"
            />
            <span className="home-about-image-label home-about-image-label-subtle">MAG</span>
          </div>
          <div className={`home-about-image-wrapper ${isVisible ? 'animate-fade-in-up delay-200' : ''}`}>
            <img 
              src="/images/athletes/wag_athlete.jpg" 
              alt="Female gymnast training"
              className="home-about-image"
            />
            <span className="home-about-image-label home-about-image-label-subtle">WAG</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
