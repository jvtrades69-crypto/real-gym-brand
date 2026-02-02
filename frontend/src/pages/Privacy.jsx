import React, { useEffect } from 'react';
import { Shield, Lock, Eye, Database } from 'lucide-react';

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="policy-page">
      <div className="container">
        <div className="policy-header">
          <Shield size={40} />
          <h1 className="policy-title">Privacy Policy</h1>
          <p className="policy-date">Last updated: January 2026</p>
        </div>

        <div className="policy-content">
          <section className="policy-section">
            <h2>Information We Collect</h2>
            <p>
              At RAZE, we collect information you provide directly to us when you create an account, 
              make a purchase, subscribe to our newsletter, or contact us for support. This includes 
              your name, email address, shipping address, and payment information.
            </p>
            <p>
              We also automatically collect certain information when you visit our website, including 
              your IP address, browser type, device information, and pages viewed. This helps us 
              improve our services and provide a better shopping experience.
            </p>
          </section>

          <section className="policy-section">
            <div className="policy-icon-header">
              <Lock size={24} />
              <h2>How We Use Your Information</h2>
            </div>
            <p>
              We use the information we collect to process your orders, communicate with you about 
              your purchases, and provide customer support. We may also use your information to send 
              you marketing communications about new products, sales, and events — but only if you've 
              opted in to receive them.
            </p>
            <p>
              Your payment information is processed securely through Stripe and is never stored on 
              our servers. We use industry-standard encryption to protect your personal data.
            </p>
          </section>

          <section className="policy-section">
            <div className="policy-icon-header">
              <Eye size={24} />
              <h2>Information Sharing</h2>
            </div>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share 
              your information with service providers who assist us in operating our website, processing 
              payments, and fulfilling orders — but only to the extent necessary for them to perform 
              these services.
            </p>
          </section>

          <section className="policy-section">
            <div className="policy-icon-header">
              <Database size={24} />
              <h2>Data Retention & Your Rights</h2>
            </div>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes 
              outlined in this policy, unless a longer retention period is required by law. You have 
              the right to access, correct, or delete your personal information at any time by 
              contacting us at privacy@razetraining.com.
            </p>
            <p>
              If you're located in the EU, you have additional rights under GDPR, including the right 
              to data portability and the right to lodge a complaint with a supervisory authority.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
