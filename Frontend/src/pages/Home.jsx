import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Home.css"

function Home() {

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div className="home-wrapper">
      <div className="home-card">
        <h1>Welcome 🎉</h1>
        <p>You are successfully logged into your dashboard.</p>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Home