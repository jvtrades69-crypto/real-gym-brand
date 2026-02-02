import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

const OrderConfirmed = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="order-confirmed-page">
      <div className="container">
        <div className="order-confirmed-content">
          {/* Success Icon */}
          <div className="success-icon">
            <CheckCircle size={80} strokeWidth={1.5} />
          </div>

          {/* Main Title */}
          <h1 className="order-confirmed-title">Order Confirmed</h1>

          {/* Message */}
          <p className="order-confirmed-message">
            Thanks — your order is being prepared.
          </p>

          <p className="order-confirmed-subtext">
            We'll send you a confirmation email with tracking details shortly.
          </p>

          {/* Order Info */}
          <div className="order-info-box">
            <Package size={24} />
            <div>
              <p className="info-label">What's next?</p>
              <p className="info-text">Your order will be shipped within 1-2 business days.</p>
            </div>
          </div>

          {/* Actions */}
          <div className="order-actions">
            <Link to="/" className="btn-primary">
              Back to Home
            </Link>
            <Link to="/shop" className="btn-secondary">
              Continue Shopping <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmed;
