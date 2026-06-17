// Frontend/src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { appRoutes } from '../config/appRoutes';
import './Navbar.css';

const countries = [
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({ code: 'IN', name: 'India', flag: '🇮🇳' });
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user's location from IP
    const fetchUserLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const country = countries.find(c => c.code === data.country_code);
        if (country) {
          setSelectedCountry(country);
        }
      } catch (err) {
        console.log('Could not fetch location, using default India');
        setSelectedCountry({ code: 'IN', name: 'India', flag: '🇮🇳' });
      }
    };

    fetchUserLocation();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (route) => {
    if (route.type === 'page') {
      navigate(route.path);
    }
    setMobileMenuOpen(false);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setCountryDropdownOpen(false);
  };

  return (
    <header className={`header ${isSticky ? 'sticky' : ''}`}>
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo" onClick={() => navigate('/home')}>
            <span className="logo-icon">✈</span>
            <span className="logo-text">TravelNest</span>
          </div>

          <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            {appRoutes.map((route) => (
              <li key={route.id}>
                {route.type === 'page' ? (
                  <a 
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(route);
                    }}
                    href={route.path}
                    className="nav-link" 
                    style={{ cursor: 'pointer' }}
                  >
                    {route.label}
                  </a>
                ) : (
                  <a 
                    href={route.path} 
                    className="nav-link"
                    onClick={() => handleNavClick(route)}
                  >
                    {route.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            {/* Country Selector */}
            <div className="country-selector">
              <button 
                className={`country-btn ${countryDropdownOpen ? 'active' : ''}`}
                onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
              >
                <span className="country-flag">{selectedCountry.flag}</span>
                <div className="country-info">
                  <span className="country-label">Region</span>
                  <span className="country-name-display">{selectedCountry.name}</span>
                </div>
                <span className={`dropdown-arrow ${countryDropdownOpen ? 'open' : ''}`}>▼</span>
              </button>
              
              {countryDropdownOpen && (
                <div className="country-dropdown">
                  <div className="dropdown-header">
                    <h4>Select Your Region</h4>
                    <p>Choose your preferred travel region</p>
                  </div>
                  <div className="countries-list">
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        className={`country-option ${selectedCountry.code === country.code ? 'active' : ''}`}
                        onClick={() => handleCountrySelect(country)}
                      >
                        <span className="option-flag">{country.flag}</span>
                        <span className="option-name">{country.name}</span>
                        {selectedCountry.code === country.code && <span className="checkmark">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button className="btn-secondary" onClick={() => navigate("/signup")}>Sign In</button>
            <button className="btn-primary" onClick={() => navigate("/login")}>Register</button>
          </div>

          <div className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
