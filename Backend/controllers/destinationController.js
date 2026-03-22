const Destination = require('../models/Destination');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

// Helper: upload buffer to Cloudinary via stream
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'destinations' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// @desc    Get all destinations
// @route   GET /api/auth/destinations
const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find().sort({ createdAt: -1 });
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single destination
// @route   GET /api/auth/destinations/:id
const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create a destination
// @route   POST /api/auth/
const createDestination = async (req, res) => {
  try {
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);

    const { city, country, price, rating } = req.body;

    let imageUrl = '';
    let imagePublicId = '';

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
      imagePublicId = result.public_id;
    }

    const destination = await Destination.create({
      city, country, price, rating: rating || 0,
      image: imageUrl,
      imagePublicId,
    });

    res.status(201).json(destination);
  } catch (error) {
    console.error('❌ CREATE ERROR:', error.message); // ← shows real reason
    res.status(500).json({ message: error.message });
  }
};
// @desc    Update a destination
// @route   PUT /api/auth/:id
const updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    const { city, country, price, rating } = req.body;

    let imageUrl = destination.image;
    let imagePublicId = destination.imagePublicId;

    // If a new file is uploaded, delete the old Cloudinary image and upload new one
    if (req.file) {
      if (destination.imagePublicId) {
        await cloudinary.uploader.destroy(destination.imagePublicId);
      }
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
      imagePublicId = result.public_id;
    }

    const updated = await Destination.findByIdAndUpdate(
      req.params.id,
      {
        city: city || destination.city,
        country: country || destination.country,
        price: price || destination.price,
        rating: rating !== undefined ? rating : destination.rating,
        image: imageUrl,
        imagePublicId,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a destination
// @route   DELETE /api/auth/destinations/:id
const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    // Delete image from Cloudinary if it exists
    if (destination.imagePublicId) {
      await cloudinary.uploader.destroy(destination.imagePublicId);
    }

    await Destination.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Destination deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
};