// Frontend/src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { appRoutes } from '../config/appRoutes';
import './Navbar.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();

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
