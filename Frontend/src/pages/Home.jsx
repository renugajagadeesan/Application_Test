import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Home.css';

const HomePage = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [popularDestinations, setPopularDestinations] = useState([]);
  const navigate = useNavigate();

  const goToSignin = () => {
    navigate("/signup"); // or "/login" depending on your route
  };


  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // const popularDestinations = [

  //   { id: 1, city: 'Paris', country: 'France', price: '$120', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400', rating: 4.8 },
  //   { id: 2, city: 'Tokyo', country: 'Japan', price: '$95', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400', rating: 4.9 },
  //   { id: 3, city: 'New York', country: 'USA', price: '$150', image: 'https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?w=400', rating: 4.7 },
  //   { id: 4, city: 'Dubai', country: 'UAE', price: '$200', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400', rating: 4.6 },
  //   { id: 5, city: 'Rome', country: 'Italy', price: '$110', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400', rating: 4.7 },
  //   { id: 6, city: 'Bali', country: 'Indonesia', price: '$75', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400', rating: 4.8 },
  //   { id: 7, city: 'Barcelona', country: 'Spain', price: '$105', image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400', rating: 4.7 },
  //   { id: 8, city: 'Sydney', country: 'Australia', price: '$180', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400', rating: 4.6 },
  //   { id: 9, city: 'Santorini', country: 'Greece', price: '$130', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400', rating: 4.9 },
  //   { id: 10, city: 'Maldives', country: 'Maldives', price: '$350', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400', rating: 5.0 },
  //   { id: 11, city: 'Amsterdam', country: 'Netherlands', price: '$115', image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400', rating: 4.6 },
  //   { id: 12, city: 'Cape Town', country: 'South Africa', price: '$90', image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400', rating: 4.8 },
  // ];

useEffect(() => {
  const handleScroll = () => {
    setIsSticky(window.scrollY > 100);
  };

  window.addEventListener('scroll', handleScroll);

  // ✅ FETCH DESTINATIONS
  fetchDestinations();

  return () => window.removeEventListener('scroll', handleScroll);
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
      {/* Header */}
      <header className={`header ${isSticky ? 'sticky' : ''}`}>
        <nav className="navbar">
          <div className="nav-container">
            <div className="logo">
              <span className="logo-icon">🏨</span>
              <span className="logo-text">LuxStay</span>
            </div>

            <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
              <li><a href="#home" className="nav-link">Home</a></li>
              <li><a href="#destinations" className="nav-link">Destinations</a></li>
              <li><a href="#deals" className="nav-link">Deals</a></li>
              <li><a href="#about" className="nav-link">About</a></li>
              <li><a href="#contact" className="nav-link">Contact</a></li>
            </ul>

            <div className="nav-actions">
              <button className="btn-secondary" onClick={goToSignin}>Sign In</button>
              <button className="btn-primary">Register</button>
            </div>

            <div className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
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
          {/* <p className="hero-subtitle">Experience luxury hotels at unbeatable prices worldwide</p> */}

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

        {/* <div className="hero-stats">
          <div className="stat">
            <h3>2M+</h3>
            <p>Happy Customers</p>
          </div>
          <div className="stat">
            <h3>1000+</h3>
            <p>Hotels Worldwide</p>
          </div>
          <div className="stat">
            <h3>4.9★</h3>
            <p>Average Rating</p>
          </div>
        </div> */}
      </section>

      {/* Popular Destinations */}
      <section className="destinations" id="destinations">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Popular Destinations</h2>
            <p className="section-subtitle">Explore our most booked locations</p>
          </div>

          <div className="destination-grid">
            {popularDestinations.map((dest) => (
              <div key={dest.id} className="destination-card">
                <div className="card-image">
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
                    <span className="price">From <strong>{dest.price}</strong>/night</span>
                    <button className="book-btn">Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
            <form className="newsletter-form">
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
