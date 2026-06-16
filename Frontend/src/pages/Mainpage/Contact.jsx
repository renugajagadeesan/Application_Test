import React, { useState } from 'react'
import axios from 'axios'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/contact', {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        message: formData.message
      });

      setSuccessMessage('✅ Thank you! Your message has been sent. We will contact you soon!');
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
        message: ''
      });

      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Failed to send message. Please try again.';
      setErrorMessage('❌ ' + errorMsg);
      setTimeout(() => setErrorMessage(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-grid">
        {/* Left Section - Image & Info */}
        <div className="contact-image-section">
          <div className="image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=800&fit=crop"
              alt="Contact us"
              className="contact-image"
            />
            <div className="image-overlay"></div>
          </div>
          
          <div className="contact-info-box">
            <h3>Let's Connect</h3>
            <p>We're here to help and answer any question you might have.</p>
            
            <div className="info-items">
              <div className="info-item">
                <span className="info-icon">📧</span>
                <div>
                  <p className="info-label">Email</p>
                  <p className="info-value">hello@company.com</p>
                </div>
              </div>
              
              <div className="info-item">
                <span className="info-icon">📱</span>
                <div>
                  <p className="info-label">Phone</p>
                  <p className="info-value">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="info-item">
                <span className="info-icon">📍</span>
                <div>
                  <p className="info-label">Location</p>
                  <p className="info-value">123 Main Street, NY</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="contact-form-section">
          <div className="form-header">
            <h1 className="form-title">Send us a Message</h1>
            <p className="form-subtitle">We'll get back to you as soon as possible</p>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            {/* Name Field */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="form-input"
                required
              />
            </div>

            {/* Two Column Row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Address Field */}
            <div className="form-group">
              <label htmlFor="address" className="form-label">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className="form-input form-textarea"
                rows="2"
              ></textarea>
            </div>

            {/* Message Field */}
            <div className="form-group">
              <label htmlFor="message" className="form-label">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us more about your inquiry..."
                className="form-input form-textarea"
                rows="4"
                required
              ></textarea>
            </div>

            {/* Messages */}
            {successMessage && (
              <div className="message success-message">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="message error-message">
                {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="submit-btn"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          <p className="form-note">
            We'll respond within 24 hours. Your information is safe with us.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contact