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
        {/* Left Section - Full Height Image */}
        <div className="contact-image-section">
          <div className="image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=800&fit=crop"
              alt="Contact us"
              className="contact-image"
            />
            <div className="image-overlay"></div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="contact-form-section">
          <div className="form-header">
            <p className="form-label-top">GET IN TOUCH WITH US</p>
            <h1 className="form-title">Send us a Message</h1>
            <p className="form-subtitle">Join thousands of travellers exploring the world</p>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            {/* Name Field */}
            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Your Name"
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter Phone Number"
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Address Field */}
            <div className="form-group">
              <div className="input-wrapper">
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter Your Address"
                  className="form-input form-textarea"
                  rows="2"
                ></textarea>
              </div>
            </div>

            {/* Message Field */}
            <div className="form-group">
              <div className="input-wrapper">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  className="form-input form-textarea"
                  rows="3"
                  required
                ></textarea>
              </div>
            </div>

            {/* Communication Preference */}
            <div className="form-group preferences">
              <label className="radio-option">
                <input type="radio" name="preference" value="sms" defaultChecked />
                <span className="radio-label">SMS</span>
              </label>
              <label className="radio-option">
                <input type="radio" name="preference" value="email" />
                <span className="radio-label">Email</span>
              </label>
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
              {loading ? 'Sending...' : 'Send My Message'}
              <span className="btn-arrow">→</span>
            </button>
          </form>

          <p className="form-note">
            Don't have a travel plan? <a href="/signup" className="form-link">Create Account</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contact