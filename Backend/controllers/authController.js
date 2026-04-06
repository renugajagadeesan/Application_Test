const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");

// 2Factor SMS API setup
const smsApiKey = process.env.SMS_API_KEY;

// In-memory OTP store (use Redis or DB in production)
const otpStore = new Map();






//  .............................................. signup and login functions............................................

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
isVerified: true
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

// SEND OTP
exports.sendOtp = async (req, res) => {
    const { phone, method } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(phone, { otp, expires: Date.now() + 5 * 60 * 1000 }); // 5 min expiry

    console.log(`OTP for ${phone}: ${otp}`); // For testing

    try {
        if (method === 'sms') {
            // Assuming phone is +91xxxxxxxxxx, extract number
            const phoneNumber = phone.replace(/^\+91/, '');
            const url = `https://2factor.in/API/V1/${smsApiKey}/SMS/${phoneNumber}/${otp}`;
            console.log('Sending to URL:', url);
            const response = await axios.get(url);
            console.log('2Factor response:', response.data);
        } else {
            // For call, 2Factor may have voice API, but for now, skip or use SMS
            res.status(400).json({ error: 'Call method not supported with current API' });
            return;
        }
        res.json({ message: 'OTP sent' });
    } catch (err) {
        console.error('SMS API error:', err.message);
        res.status(500).json({ error: 'Failed to send OTP' });
    }
};

// VERIFY OTP
exports.verifyOtp = async (req, res) => {
    const { phone, otp } = req.body;
    const stored = otpStore.get(phone);
    if (!stored || stored.otp !== otp || Date.now() > stored.expires) {
        return res.status(400).json({ error: 'Invalid or expired OTP' });
    }
    otpStore.delete(phone); // Clear OTP after verification
    res.json({ message: 'OTP verified' });
};




//......................................... destination card  crud operations............................................

// controllers/destinationController.js
const Destination = require('../models/Destination');

// CREATE
exports.createDestination = async (req, res) => {
  try {
    console.log("FILE:", req.file);
    console.log("BODY:", req.body);

    const { city, country, price, rating } = req.body;

    if (!req.file) {
      return res.status(400).json("Image is required");
    }

    const destination = new Destination({
      city,
      country,
      price,
      rating: Number(rating),
      image: req.file.path
    });

    const saved = await destination.save();
    res.status(201).json(saved);

  } catch (err) {
    console.error("ERROR FULL:", err);
    res.status(500).json(err.message);
  }
};

// READ ALL
exports.getAllDestinations = async (req, res) => {
  try {
    const data = await Destination.find();
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

// READ ONE
exports.getDestinationById = async (req, res) => {
  try {
    const data = await Destination.findById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE
exports.updateDestination = async (req, res) => {
  try {
    const updateData = {
      city: req.body.city,
      country: req.body.country,
      price: req.body.price,
      rating: req.body.rating
    };

    if (req.file) {
      updateData.image = req.file.path; // ✅ new image
    }

    const updated = await Destination.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json(err.message);
  }
};

// DELETE
exports.deleteDestination = async (req, res) => {
  try {
    await Destination.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
};