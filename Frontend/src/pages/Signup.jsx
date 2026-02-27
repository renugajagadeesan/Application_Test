import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import './Signup.css'

function Signup() {
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
      await axios.post("http://localhost:5000/api/auth/signup", form)
      alert("Signup Successful ✅")
      navigate("/login")
    } catch (err) {
      alert(err.response?.data || "Signup Failed")
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="signup-input"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="signup-input"
            onChange={handleChange}
            required
          />

          <button type="submit" className="signup-btn">
            Signup
          </button>
        </form>

        <div className="signup-footer">
          Already have account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup