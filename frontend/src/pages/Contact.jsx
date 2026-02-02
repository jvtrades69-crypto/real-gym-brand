import React, { useState, useEffect } from 'react';
import { Mail, MessageSquare, Send, CheckCircle, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-header">
          <Mail size={40} />
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-subtitle">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Form */}
          <div className="contact-form-section">
            {submitted ? (
              <div className="form-success">
                <CheckCircle size={60} />
                <h2>Message Sent!</h2>
                <p>Thanks for reaching out. We'll get back to you within 24-48 hours.</p>
                <button 
                  className="btn-secondary"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="How can we help you?"
                  />
                </div>

                <button type="submit" className="btn-primary btn-submit">
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="contact-info-section">
            <div className="contact-info-card">
              <MessageSquare size={24} />
              <h3>Customer Support</h3>
              <p>For order inquiries and general questions</p>
              <a href="mailto:support@razetraining.com">support@razetraining.com</a>
            </div>

            <div className="contact-info-card">
              <MapPin size={24} />
              <h3>Headquarters</h3>
              <p>RAZE Training</p>
              <p>Los Angeles, CA</p>
              <p>United States</p>
            </div>

            <div className="contact-info-card">
              <Clock size={24} />
              <h3>Response Time</h3>
              <p>We typically respond within 24-48 hours during business days.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
