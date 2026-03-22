const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");






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
// phoneVerified: true
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