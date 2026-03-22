const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    image: {
      type: String, // Cloudinary secure URL
      default: '',
    },
    imagePublicId: {
      type: String, // Cloudinary public_id for deletion
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Destination', destinationSchema);