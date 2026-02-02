import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Scroll to top and trigger animation when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    // Trigger fade-in animation after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="about-page">
      <div className="about-container">
        {/* Hero Section */}
        <div className="about-hero-section">
          <h1 className="about-main-title">ABOUT RAZE</h1>
          <p className="about-subtitle">Built by Discipline. Made to Move.</p>
        </div>

        {/* Main Content */}
        <div className="about-content">
          <section className="about-story-section">
            <p className="about-lead-text">
              Most sportswear is designed to look good — not to move properly.
            </p>
            <p className="about-paragraph">
              As gymnasts, we understand how frustrating it feels when clothing holds you back during real training:
            </p>
            <ul className="about-pain-points">
              <li>too tight in the shoulders and hips</li>
              <li>too loose during swings and landings</li>
              <li>uncomfortable when stretching, sprinting, or fully extending</li>
            </ul>
            <p className="about-paragraph about-mission">
              That's why RAZE was created — performance clothing designed for full range of movement, so athletes can train comfortably and focus on execution, not adjusting their outfit.
            </p>
          </section>

          {/* RAZE IN MOTION - Image Gallery Section */}
          <section className="about-gallery-section">
            <h2 className="about-gallery-title">RAZE IN MOTION</h2>
            <div className="about-gallery-grid about-gallery-two">
              {/* Image 1 - MAG Athlete with Animation */}
              <div className={`about-gallery-item about-gallery-main ${isVisible ? 'animate-fade-in-up' : ''}`}>
                <img 
                  src="/images/athletes/mag_athlete.jpg" 
                  alt="Male gymnast training - athletic performance"
                  className="about-gallery-image"
                  data-testid="about-image-main"
                />
                <span className="about-image-label">Men's Athletic Gymnastics</span>
              </div>
              
              {/* Image 2 - WAG Athlete */}
              <div className="about-gallery-item">
                <img 
                  src="/images/athletes/wag_athlete.jpg" 
                  alt="Female gymnast training - athletic performance"
                  className="about-gallery-image"
                  data-testid="about-image-lifestyle"
                />
                <span className="about-image-label">Women's Athletic Gymnastics</span>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="about-cta-section">
            <div className="about-cta-content">
              <p className="about-cta-text">Train with purpose. Move with confidence.</p>
              <Link to="/products" className="about-cta-button">
                Shop Collection <ArrowRight size={20} />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
