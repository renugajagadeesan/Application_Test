const User = require("../models/User");
const Otp = require("../models/Otp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const twilio = require("twilio");

const client = twilio(
process.env.TWILIO_ACCOUNT_SID,
process.env.TWILIO_AUTH_TOKEN
);



// SEND OTP
exports.sendOtp = async (req, res) => {

try {

const { phone } = req.body;

const otp = Math.floor(100000 + Math.random() * 900000);

await Otp.create({
phone,
otp,
expiresAt: Date.now() + 5 * 60 * 1000
});

await client.messages.create({
body: `Your OTP is ${otp}`,
from: process.env.TWILIO_PHONE_NUMBER,
to: phone
});

res.json("OTP sent successfully");

} catch (err) {
res.status(500).json(err.message);
}
};



// VERIFY OTP
exports.verifyOtp = async (req, res) => {

try {

const { phone, otp } = req.body;

const record = await Otp.findOne({ phone, otp });

if (!record) return res.status(400).json("Invalid OTP");

if (record.expiresAt < Date.now())
return res.status(400).json("OTP expired");

await Otp.deleteMany({ phone });

res.json("Phone verified");

} catch (err) {
res.status(500).json(err.message);
}
};



// SIGNUP
exports.signup = async (req, res) => {

try {

const {username, email, password, phone } = req.body;

const exists = await User.findOne({ email });
if (exists) return res.status(400).json("User already exists");

const hashedPassword = await bcrypt.hash(password, 10);

const user = await User.create({
username,
email,
password: hashedPassword,
phone,
phoneVerified: true
});

res.json({ message: "Signup Successful", user });

} catch (err) {
res.status(500).json(err.message);
}
};



// LOGIN
exports.login = async (req, res) => {

try {

const { email, password } = req.body;

const user = await User.findOne({ email });

if (!user) return res.status(400).json("Invalid credentials");

const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) return res.status(400).json("Invalid credentials");

const token = jwt.sign(
{ id: user._id },
process.env.JWT_SECRET,
{ expiresIn: "1d" }
);

res.json({
token,
user: { email: user.email }
});

} catch (err) {
res.status(500).json(err.message);
}
};