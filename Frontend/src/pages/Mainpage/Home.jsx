import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Home.css';

const toSlug = (name) => name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const HomePage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [popularDestinations, setPopularDestinations] = useState([]);
  const navigate = useNavigate();

  const goToSignin = () => {
    navigate("/signup");
  };

  // ✅ Single merged useEffect — no duplicate scroll listener
  useEffect(() => {
    fetchDestinations(); // ✅ fetch on mount

    return () => {};
  }, []);

  const fetchDestinations = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/destinations");
      const data = await res.json();
      setPopularDestinations(data);
    } catch (err) {
      console.error("Error fetching destinations:", err);
    }
  };

  const features = [
    { icon: '🏨', title: 'Best Hotels', description: 'Hand-picked luxury accommodations' },
    { icon: '💰', title: 'Best Prices', description: 'Guaranteed lowest rates available' },
    { icon: '🛡️', title: 'Secure Booking', description: '100% safe and secure transactions' },
    { icon: '⭐', title: 'Top Rated', description: 'Highly rated by thousands of guests' }
  ];

  const testimonials = [
    { name: 'Sarah Johnson', role: 'Travel Blogger', text: 'Amazing experience! Found the perfect hotel at an unbeatable price.', rating: 5 },
    { name: 'Mike Chen', role: 'Business Traveler', text: 'Seamless booking process and excellent customer service.', rating: 5 },
    { name: 'Emma Wilson', role: 'Vacation Planner', text: 'The variety of options and easy filters made planning so simple!', rating: 5 }
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-home" id="home">
        <div className="hero-bg">
          <div className="floating-element element-1">✈️</div>
          <div className="floating-element element-2">🌴</div>
          <div className="floating-element element-3">🏖️</div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-line">Discover Your</span>
            <span className="title-line highlight">Perfect Stay</span>
          </h1>

          <div className="search-box">
            <div className="search-field">
              <label>📍 Location</label>
              <input type="text" placeholder="Where are you going?" />
            </div>
            <div className="search-field">
              <label>📅 Check-in</label>
              <input type="date" onChange={(e) => setSelectedDate(e.target.value)} />
            </div>
            <div className="search-field">
              <label>📅 Check-out</label>
              <input type="date" />
            </div>
            <div className="search-field">
              <label>👥 Guests</label>
              <select>
                <option>2 Adults</option>
                <option>1 Adult</option>
                <option>3 Adults</option>
                <option>4+ Adults</option>
              </select>
            </div>
            <button className="search-btn">
              <span>Search Hotels</span>
              <span className="btn-icon">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="destinations" id="destinations">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Popular Destinations</h2>
            <p className="section-subtitle">Explore our most booked locations</p>
          </div>

          {/* ✅ Loading state */}
          {popularDestinations.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#888' }}>Loading destinations...</p>
          ) : (
            <div className="destination-grid">
              {popularDestinations.map((dest) => (
                <div 
                  key={dest._id} 
                  className="destination-card"
                  onClick={() => navigate(`/destination/${toSlug(dest.city)}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-image">
                    {/* ✅ Cloudinary URL stored in dest.image */}
                    <img src={dest.image} alt={dest.city} />
                    <div className="card-overlay">
                      <button className="explore-btn">Explore</button>
                    </div>
                    <span className="card-badge">Hot Deal</span>
                  </div>
                  <div className="card-content">
                    <div className="card-header">
                      <h3>{dest.city}</h3>
                      <span className="rating">⭐ {dest.rating}</span>
                    </div>
                    <p className="location">{dest.country}</p>
                    <div className="card-footer">
                      {/* ✅ price stored as number in DB — prefix ₹ here */}
                      <span className="price">From <strong>₹{dest.price}</strong>/night</span>
                      <button className="book-btn">Book Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose LuxStay?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <div className="about-header">
            <p className="about-label">DISCOVER OUR STORY</p>
            <h2 className="section-title">About TravelNest</h2>
            <p className="about-intro">Your trusted companion for unforgettable travel experiences worldwide</p>
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
            </div>

            <div className="about-stats">
              <div className="stat-card">
                <h4 className="stat-number">50K+</h4>
                <p className="stat-label">Happy Travelers</p>
              </div>
              <div className="stat-card">
                <h4 className="stat-number">150+</h4>
                <p className="stat-label">Destinations</p>
              </div>
              <div className="stat-card">
                <h4 className="stat-number">10K+</h4>
                <p className="stat-label">Hotel Partners</p>
              </div>
              <div className="stat-card">
                <h4 className="stat-number">99%</h4>
                <p className="stat-label">Satisfaction Rate</p>
              </div>
            </div>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🌍</div>
              <h4>Global Coverage</h4>
              <p>Access hotels and accommodations across 150+ countries and growing</p>
            </div>
            <div className="service-card">
              <div className="service-icon">💎</div>
              <h4>Premium Quality</h4>
              <p>Hand-picked luxury properties with verified ratings and reviews</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🔒</div>
              <h4>Secure Booking</h4>
              <p>Safe transactions with SSL encryption and buyer protection guarantee</p>
            </div>
            <div className="service-card">
              <div className="service-icon">⚡</div>
              <h4>Instant Confirmation</h4>
              <p>Book now and get instant confirmation with flexible cancellation</p>
            </div>
            <div className="service-card">
              <div className="service-icon">💬</div>
              <h4>Expert Support</h4>
              <p>Dedicated support team ready to assist 24/7 via chat, phone, or email</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🎁</div>
              <h4>Loyalty Rewards</h4>
              <p>Earn points on every booking and redeem for future discounts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="special-offers">
        <div className="container">
          <div className="offer-banner">
            <div className="offer-content">
              <span className="offer-tag">Limited Time Offer</span>
              <h2>Summer Special</h2>
              <h3>Get 30% Off Your First Booking</h3>
              <p>Book your dream vacation today and save big on luxury hotels worldwide</p>
              <div className="offer-timer">
                <div className="timer-item">
                  <span className="timer-value">24</span>
                  <span className="timer-label">Days</span>
                </div>
                <div className="timer-item">
                  <span className="timer-value">15</span>
                  <span className="timer-label">Hours</span>
                </div>
                <div className="timer-item">
                  <span className="timer-value">37</span>
                  <span className="timer-label">Minutes</span>
                </div>
              </div>
              <button className="cta-btn">Claim Offer</button>
            </div>
            <div className="offer-image">
              <div className="animated-circle circle-1"></div>
              <div className="animated-circle circle-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Guests Say</h2>
          <div className="testimonial-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="quote-icon">"</div>
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.name[0]}</div>
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
                <div className="testimonial-rating">
                  {'⭐'.repeat(testimonial.rating)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h2>Subscribe to Our Newsletter</h2>
            <p>Get exclusive deals and travel tips delivered to your inbox</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <span className="logo-icon">🏨</span>
                <span className="logo-text">LuxStay</span>
              </div>
              <p>Your gateway to unforgettable hotel experiences around the world.</p>
              <div className="social-links">
                <a href="#" className="social-link">📘</a>
                <a href="#" className="social-link">🐦</a>
                <a href="#" className="social-link">📷</a>
                <a href="#" className="social-link">💼</a>
              </div>
            </div>

            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Destinations</a></li>
                <li><a href="#">Special Offers</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Contact Info</h4>
              <ul className="contact-info">
                <li>📧 info@luxstay.com</li>
                <li>📱 +1 (555) 123-4567</li>
                <li>📍 123 Travel Street, NY 10001</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 LuxStay. All rights reserved.</p>
            <div className="payment-methods">
              <span>💳</span>
              <span>💰</span>
              <span>🏦</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;