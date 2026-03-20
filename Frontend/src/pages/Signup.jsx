import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

function Signup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        phone: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/auth/signup", {
                username: form.username,
                email: form.email,
                password: form.password,
                phone: form.phone
            });
            alert("Signup Successful ✅");
            navigate("/login");
        } catch (err) {
            alert(err.response?.data || "Signup Failed");
        }
    };

    return (
        <div className="signup-container">

            {/* ── LEFT PANEL — Form ── */}
            <div className="signup-left">
                <div className="signup-logo">✈ TravelNest</div>

                <div className="signup-form-wrap">
                    <p className="signup-eyebrow">Start your adventure</p>
                    <h2>Create Account</h2>
                    <p className="signup-subtitle">Join thousands of travellers exploring the world</p>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <span className="input-icon">👤</span>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter Username"
                                className="signup-input"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <span className="input-icon">✉</span>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Email"
                                className="signup-input"
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
                                className="signup-input"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <span className="input-icon">📱</span>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Enter Phone Number"
                                className="signup-input"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="signup-btn">
                            <span>Create My Account</span>
                            <span className="btn-arrow">→</span>
                        </button>
                    </form>

                    <div className="signup-footer">
                        Already have an account? <Link to="/login">Login</Link>
                    </div>
                </div>
            </div>

            {/* ── RIGHT PANEL — Hero ── */}
            <div className="signup-right">
                <div className="right-overlay" />
                <div className="right-content">
                    <div className="hero-badge">🌍 Explore the World</div>
                    <h1 className="hero-title">
                        Your Next<br /><em>Dream Trip</em><br />Awaits You
                    </h1>
                    <p className="hero-desc">
                        Discover breathtaking destinations, plan seamless itineraries,
                        and create memories that last a lifetime.
                    </p>
                    <div className="hero-stats">
                        <div className="stat">
                            <span className="stat-num">150+</span>
                            <span className="stat-label">Destinations</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat">
                            <span className="stat-num">50K+</span>
                            <span className="stat-label">Travellers</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat">
                            <span className="stat-num">4.9★</span>
                            <span className="stat-label">Rating</span>
                        </div>
                    </div>
                    <div className="hero-destinations">
                        <span className="dest-pill">🏝 Maldives</span>
                        <span className="dest-pill">🗼 Paris</span>
                        <span className="dest-pill">🏯 Kyoto</span>
                        <span className="dest-pill">🏔 Patagonia</span>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Signup;