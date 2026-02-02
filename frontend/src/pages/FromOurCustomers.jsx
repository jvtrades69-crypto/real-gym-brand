import React, { useEffect } from 'react';
import { Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Marcus T.",
    rating: 5,
    text: "fits perfect, doesn't ride up during handstands. exactly what i was looking for",
    product: "Black / Cyan"
  },
  {
    id: 2,
    name: "Sarah K.",
    rating: 5,
    text: "finally a shirt that actually stays put. ordered 2 more lol",
    product: "Grey / Cyan"
  },
  {
    id: 3,
    name: "James R.",
    rating: 5,
    text: "wore it all week training, still looks new. quality is 10/10",
    product: "Black / Cyan"
  },
  {
    id: 4,
    name: "Emily W.",
    rating: 5,
    text: "so lightweight but somehow still holds its shape. love the minimal look",
    product: "Grey / Cyan"
  },
  {
    id: 5,
    name: "David L.",
    rating: 5,
    text: "best gym shirt i own now. wish i found this brand sooner",
    product: "Black / Cyan"
  },
  {
    id: 6,
    name: "Nina P.",
    rating: 5,
    text: "the fabric is amazing for gymnastics. breathes so well",
    product: "Grey / Cyan"
  },
  {
    id: 7,
    name: "Chris M.",
    rating: 5,
    text: "clean design, no annoying logos everywhere. just quality",
    product: "Black / Cyan"
  },
  {
    id: 8,
    name: "Alex H.",
    rating: 5,
    text: "bought for my husband, he won't wear anything else now",
    product: "Black / Cyan"
  },
  {
    id: 9,
    name: "Jordan B.",
    rating: 5,
    text: "perfect for training sessions. doesn't restrict any movement",
    product: "Grey / White"
  },
  {
    id: 10,
    name: "Mia C.",
    rating: 5,
    text: "the quality is insane for the price. highly recommend",
    product: "Black / Silver"
  }
];

const FromOurCustomers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="customers-page">
      <div className="customers-container">
        {/* Header with Intro */}
        <div className="customers-header">
          <h1 className="customers-title">From our customers</h1>
          <p className="customers-intro">
            Real feedback from athletes who train in RAZE. See what our community has to say about their experience.
          </p>
          
          {/* Star Rating Summary */}
          <div className="customers-rating-summary">
            <div className="rating-stars-large">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={28} fill="#F59E0B" color="#F59E0B" />
              ))}
            </div>
            <div className="rating-info">
              <span className="rating-score">4.9</span>
              <span className="rating-text">out of 5 based on <strong>127 reviews</strong></span>
            </div>
          </div>
        </div>

        {/* Reviews Grid - 10 testimonial cards */}
        <div className="customers-reviews-grid">
          {reviews.map((review) => (
            <div key={review.id} className="customers-review-card" data-testid={`review-${review.id}`}>
              <div className="customers-review-stars">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill="#F59E0B"
                    color="#F59E0B"
                  />
                ))}
              </div>
              <p className="customers-review-text">"{review.text}"</p>
              <div className="customers-review-author">
                <span className="customers-author-name">{review.name}</span>
                <span className="customers-author-product">{review.product}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FromOurCustomers;
