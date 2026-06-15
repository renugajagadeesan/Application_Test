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

      // Clear success message after 5 seconds
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
    <div className="contact-container">
      <div className="contact-wrapper">
        <h1 className="contact-title">Get In Touch</h1>
        <p className="contact-subtitle">Have questions? We'd love to hear from you.</p>

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
              placeholder="Enter your full name"
              className="form-input"
              required
            />
          </div>

          {/* Phone Field */}
          <div className="form-group">
            <label htmlFor="phone" className="form-label">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="form-input"
              required
            />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address (Optional)</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="form-input"
            />
          </div>

          {/* Address Field */}
          <div className="form-group">
            <label htmlFor="address" className="form-label">Address *</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="form-input form-textarea"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Message Field */}
          <div className="form-group">
            <label htmlFor="message" className="form-label">Message (Optional)</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us more about your inquiry"
              className="form-input form-textarea"
              rows="4"
            ></textarea>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="message success-message">
              {successMessage}
            </div>
          )}

          {/* Error Message */}
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
            {loading ? '📤 Sending...' : '📤 Send Message'}
          </button>
        </form>

        <p className="contact-note">
          💬 You'll receive a WhatsApp message and email confirmation once we process your request.
        </p>
      </div>
    </div>
  )
}

export default Contact
