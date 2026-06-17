import React from 'react'
import './About.css'

function About() {
  const services = [
    {
      icon: '🌍',
      title: 'Global Coverage',
      description: 'Access hotels and accommodations across 150+ countries and growing'
    },
    {
      icon: '💎',
      title: 'Premium Quality',
      description: 'Hand-picked luxury properties with verified ratings and reviews'
    },
    {
      icon: '🔒',
      title: 'Secure Booking',
      description: 'Safe transactions with SSL encryption and buyer protection guarantee'
    },
    {
      icon: '⚡',
      title: 'Instant Confirmation',
      description: 'Book now and get instant confirmation with flexible cancellation'
    },
    {
      icon: '💬',
      title: 'Expert Support',
      description: 'Dedicated support team ready to assist 24/7 via chat, phone, or email'
    },
    {
      icon: '🎁',
      title: 'Loyalty Rewards',
      description: 'Earn points on every booking and redeem for future discounts'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Travelers' },
    { number: '150+', label: 'Destinations' },
    { number: '10K+', label: 'Hotel Partners' },
    { number: '99%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About TravelNest</h1>
          <p>Your trusted companion for unforgettable travel experiences worldwide</p>
        </div>
      </section>

      {/* Main About Section */}
      <section className="about-main">
        <div className="container">
          <div className="about-header">
            <p className="about-label">DISCOVER OUR STORY</p>
            <h2 className="section-title">Our Journey & Mission</h2>
          </div>

          <div className="about-content">
            <div className="about-text">
              <div className="about-section">
                <h3>Our Mission</h3>
                <p>At TravelNest, we believe that travel is more than just a journey—it's an opportunity to explore new cultures, create lasting memories, and discover the beauty of our world. Our mission is to make travel accessible, affordable, and extraordinary for everyone.</p>
              </div>

              <div className="about-section">
                <h3>Why We're Different</h3>
                <ul className="about-features">
                  <li><span className="check">✓</span> Curated hotel selections from luxury to budget-friendly</li>
                  <li><span className="check">✓</span> Real-time pricing with best price guarantee</li>
                  <li><span className="check">✓</span> 24/7 customer support in multiple languages</li>
                  <li><span className="check">✓</span> Personalized travel recommendations</li>
                  <li><span className="check">✓</span> Exclusive deals and loyalty rewards</li>
                </ul>
              </div>

              <div className="about-section">
                <h3>Our Values</h3>
                <p>We're committed to transparency, reliability, and customer satisfaction. Every partnership and every booking reflects our dedication to providing you with the best travel experience possible.</p>
              </div>
            </div>

            <div className="about-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <h4 className="stat-number">{stat.number}</h4>
                  <p className="stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What We Offer</h2>
            <p className="section-subtitle">Comprehensive travel solutions tailored for you</p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h4>{service.title}</h4>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose TravelNest?</h2>
            <p className="section-subtitle">We're more than just a booking platform</p>
          </div>

          <div className="team-grid">
            <div className="team-card">
              <div className="team-icon">🎯</div>
              <h4>Goal Oriented</h4>
              <p>We focus on your travel goals and make them a reality</p>
            </div>
            <div className="team-card">
              <div className="team-icon">🤝</div>
              <h4>Customer First</h4>
              <p>Your satisfaction is our top priority every step of the way</p>
            </div>
            <div className="team-card">
              <div className="team-icon">⭐</div>
              <h4>Quality Assured</h4>
              <p>Every hotel and service is carefully vetted for excellence</p>
            </div>
            <div className="team-card">
              <div className="team-icon">🚀</div>
              <h4>Innovation</h4>
              <p>Continuously improving our platform for better user experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Journey?</h2>
            <p>Discover thousands of hotels and create unforgettable memories</p>
            <button className="cta-btn" onClick={() => window.location.href = '/hotels'}>
              Explore Hotels
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
