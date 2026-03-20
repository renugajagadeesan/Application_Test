// models/Destination.js
const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  city: { type: String, required: true },
  country: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Destination', destinationSchema);