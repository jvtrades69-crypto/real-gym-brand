import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Custom Tag Icon to avoid lucide-react import issues
const TagIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/>
    <path d="M7 7h.01"/>
  </svg>
);

const SalePromoSection = () => {
  // Countdown timer state (optional - using static for now, can enable real countdown)
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 12,
    minutes: 45,
    seconds: 30
  });

  // Real countdown timer (uncomment to enable)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num) => String(num).padStart(2, '0');

  return (
    <section className="sale-promo-section" data-testid="sale-promo-section">
      <div className="sale-promo-container">
        {/* Background glow effect */}
        <div className="sale-promo-glow"></div>
        
        {/* Content */}
        <div className="sale-promo-content">
          {/* Badge/Pill */}
          <div className="sale-promo-badge">
            <TagIcon size={14} />
            <span>11.11 SALE</span>
          </div>

          {/* Main Heading */}
          <h2 className="sale-promo-heading">
            11.11 Sale — Biggest Sale of the Year
          </h2>

          {/* Subheading */}
          <p className="sale-promo-subheading">
            Up to 50% off selected performance wear. Limited time only.
          </p>

          {/* Countdown */}
          <div className="sale-promo-countdown">
            <span className="countdown-label">Ends in:</span>
            <div className="countdown-timer">
              <div className="countdown-unit">
                <span className="countdown-value">{formatTime(timeLeft.days)}</span>
                <span className="countdown-text">days</span>
              </div>
              <span className="countdown-separator">:</span>
              <div className="countdown-unit">
                <span className="countdown-value">{formatTime(timeLeft.hours)}</span>
                <span className="countdown-text">hrs</span>
              </div>
              <span className="countdown-separator">:</span>
              <div className="countdown-unit">
                <span className="countdown-value">{formatTime(timeLeft.minutes)}</span>
                <span className="countdown-text">min</span>
              </div>
              <span className="countdown-separator">:</span>
              <div className="countdown-unit">
                <span className="countdown-value">{formatTime(timeLeft.seconds)}</span>
                <span className="countdown-text">sec</span>
              </div>
            </div>
          </div>

          {/* Primary CTA Button */}
          <Link to="/1111-sale" className="sale-promo-button" data-testid="shop-sale-btn">
            Shop 11.11 Sale
          </Link>

          {/* Secondary Link */}
          <Link to="/1111-sale" className="sale-promo-link" data-testid="view-sale-link">
            View all sale items <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SalePromoSection;
