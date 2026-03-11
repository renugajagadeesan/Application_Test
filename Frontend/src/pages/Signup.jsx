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
phone: "",
otp: ""
});

const [otpSent, setOtpSent] = useState(false);
const [verified, setVerified] = useState(false);

const handleChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value });
};



// SEND OTP
const sendOtp = async () => {

try {

await axios.post("http://localhost:5000/api/auth/send-otp", {
phone: form.phone
});

alert("OTP Sent 📱");

setOtpSent(true);

} catch (err) {
alert(err.response?.data || "OTP Failed");
}

};



// VERIFY OTP
const verifyOtp = async () => {

try {

await axios.post("http://localhost:5000/api/auth/verify-otp", {
phone: form.phone,
otp: form.otp
});

alert("Phone Verified ✅");

setVerified(true);

} catch (err) {
alert(err.response?.data || "Invalid OTP");
}

};



// SIGNUP
const handleSubmit = async (e) => {

e.preventDefault();

if (!verified) {
alert("Please verify phone number first");
return;
}

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

<div className="signup-card">

<h2>Create Account</h2>

<form onSubmit={handleSubmit}>

<input
type="text"
name="username"
placeholder="Enter Username"
className="signup-input"
onChange={handleChange}
required
/>

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

<input
type="text"
name="phone"
placeholder="Enter Phone Number"
className="signup-input"
onChange={handleChange}
required
/>

{/* SEND OTP */}

{!otpSent && (

<button
type="button"
className="otp-btn"
onClick={sendOtp}
>

Send OTP

</button>

)}



{/* OTP INPUT */}

{otpSent && !verified && (

<>

<input
type="text"
name="otp"
placeholder="Enter OTP"
className="signup-input"
onChange={handleChange}
/>

<button
type="button"
className="otp-btn"
onClick={verifyOtp}
>

Verify OTP

</button>

</>

)}



{verified && (

<p className="verified-text">

Phone Verified ✅

</p>

)}



<button type="submit" className="signup-btn">

Signup

</button>

</form>



<div className="signup-footer">

Already have account? <Link to="/login">Login</Link>

</div>

</div>

</div>

);

}

export default Signup;