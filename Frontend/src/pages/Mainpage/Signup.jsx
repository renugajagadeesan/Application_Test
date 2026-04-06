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

    const [otpMode, setOtpMode] = useState(false); // Toggle OTP input
    const [otp, setOtp] = useState("");
    const [method, setMethod] = useState("sms"); // 'sms' or 'call'
    const [otpSent, setOtpSent] = useState(false); // Track if OTP sent

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSendOtp = async () => {
        try {
            await axios.post("http://localhost:5000/api/auth/send-otp", {
                phone: form.phone,
                method: method
            });
            setOtpSent(true);
            setOtpMode(true);
        } catch (err) {
            alert(err.response?.data || "Failed to send OTP");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Signup after OTP verification
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/auth/verify-otp", {
                phone: form.phone,
                otp: otp
            });
            // Now signup
            await axios.post("http://localhost:5000/api/auth/signup", {
                username: form.username,
                email: form.email,
                password: form.password,
                phone: form.phone
            });
            alert("Signup Successful ✅");
            navigate("/login");
        } catch (err) {
            alert(err.response?.data || "OTP Verification Failed");
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

                    {!otpMode ? (
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
                                {form.phone && !otpSent && (
                                    <button type="button" onClick={handleSendOtp} className="send-otp-btn">
                                        Send OTP
                                    </button>
                                )}
                            </div>

                            <div className="input-group">
                                <label>
                                    <input
                                        type="radio"
                                        value="sms"
                                        checked={method === "sms"}
                                        onChange={(e) => setMethod(e.target.value)}
                                    /> SMS
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="call"
                                        checked={method === "call"}
                                        onChange={(e) => setMethod(e.target.value)}
                                    /> Phone Call
                                </label>
                            </div>

                            <button type="submit" className="signup-btn" disabled={!otpSent}>
                                <span>Create My Account</span>
                                <span className="btn-arrow">→</span>
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleOtpSubmit}>
                            <p>Enter the OTP sent to {form.phone}</p>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    className="signup-input"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="signup-btn">
                                <span>Verify OTP</span>
                            </button>
                        </form>
                    )}

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