import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import "./Login.css"

function Login() {

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form)
      localStorage.setItem("token", res.data.token)
      alert("Login Successful ✅")
      navigate("/home")
    } catch (err) {
      alert(err.response?.data || "Invalid Credentials")
    }
  }

  return (
    <div className="login-wrapper">

      {/* ── LEFT PANEL — Hero Image ── */}
      <div className="login-left">
        <div className="left-overlay" />
        <div className="left-content">
          <div className="hero-badge">✈ Welcome Back</div>
          <h1 className="hero-title">
            The World<br />is Waiting<br /><em>For You</em>
          </h1>
          <p className="hero-desc">
            Log back in and pick up right where you left off.
            Your next adventure is just one click away.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">500+</span>
              <span className="stat-label">Hotels</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">200+</span>
              <span className="stat-label">Routes</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
          <div className="hero-destinations">
            <span className="dest-pill">🌊 Bali</span>
            <span className="dest-pill">🏛 Rome</span>
            <span className="dest-pill">🌃 New York</span>
            <span className="dest-pill">🐘 Serengeti</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL — Form ── */}
      <div className="login-right">
        <div className="login-logo">✈ TravelNest</div>

        <div className="login-form-wrap">
          <p className="login-eyebrow">Good to see you again</p>
          <h2>Welcome Back 👋</h2>
          <p className="login-subtitle">Sign in to continue your journey</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <span className="input-icon">✉</span>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="login-input"
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className="login-input"
                onChange={handleChange}
                required
              />
            </div>

            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            <button type="submit" className="login-btn">
              <span>Login to Account</span>
              <span className="btn-arrow">→</span>
            </button>
          </form>

          <div className="login-footer">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login