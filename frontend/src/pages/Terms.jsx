import React, { useEffect } from 'react';
import { FileText, Scale, AlertCircle, ShoppingBag } from 'lucide-react';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="policy-page">
      <div className="container">
        <div className="policy-header">
          <FileText size={40} />
          <h1 className="policy-title">Terms of Service</h1>
          <p className="policy-date">Last updated: January 2026</p>
        </div>

        <div className="policy-content">
          <section className="policy-section">
            <h2>Welcome to RAZE</h2>
            <p>
              These Terms of Service govern your use of the RAZE website and your purchase of products 
              from our online store. By accessing our website or placing an order, you agree to be bound 
              by these terms. Please read them carefully before making a purchase.
            </p>
            <p>
              RAZE reserves the right to update these terms at any time. Changes will be posted on this 
              page with an updated revision date. Your continued use of the website after any changes 
              indicates your acceptance of the new terms.
            </p>
          </section>

          <section className="policy-section">
            <div className="policy-icon-header">
              <ShoppingBag size={24} />
              <h2>Orders & Payments</h2>
            </div>
            <p>
              All orders are subject to availability and confirmation of the order price. We reserve the 
              right to refuse or cancel any order for any reason, including suspected fraud or unauthorized 
              transactions. Payment must be received in full before your order is shipped.
            </p>
            <p>
              Prices displayed on our website are in USD and do not include shipping costs or applicable 
              taxes, which will be calculated at checkout. We accept major credit cards, Apple Pay, 
              Google Pay, and other payment methods through our secure payment processor, Stripe.
            </p>
          </section>

          <section className="policy-section">
            <div className="policy-icon-header">
              <Scale size={24} />
              <h2>Intellectual Property</h2>
            </div>
            <p>
              All content on this website, including text, graphics, logos, images, and software, is the 
              property of RAZE or its content suppliers and is protected by international copyright laws. 
              You may not reproduce, distribute, or create derivative works from any content without our 
              express written permission.
            </p>
          </section>

          <section className="policy-section">
            <div className="policy-icon-header">
              <AlertCircle size={24} />
              <h2>Limitation of Liability</h2>
            </div>
            <p>
              RAZE shall not be liable for any indirect, incidental, special, or consequential damages 
              arising from your use of our website or products. Our total liability for any claim arising 
              from a purchase shall not exceed the amount you paid for that product.
            </p>
            <p>
              We make no warranties, express or implied, regarding the fitness of our products for any 
              particular purpose. Product images on our website are for illustration purposes and actual 
              products may vary slightly in color or appearance.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
