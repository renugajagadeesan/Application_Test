import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/Mainpage/Signup'
import Login from './pages/Mainpage/Login'
import Home from './pages/Mainpage/Home'
import Admin from "./pages/Adminpage/admin"
import Hotels from './pages/Mainpage/Hotels'
import DestinationPage from "./pages/Mainpage/DestinationPage"; // we'll create this



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/destination/:slug" element={<DestinationPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App