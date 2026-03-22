const express = require("express");
const router = express.Router();

const auth = require("../controllers/authController");
const upload = require("../middleware/upload");
const {
  getAllDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
} = require('../controllers/destinationController');

// AUTH
router.post("/signup", auth.signup);
router.post("/login", auth.login);

// DESTINATION (same controller)
// GET all destinations
router.get('/destinations', getAllDestinations);
 
// GET single destination
router.get('/destinations/:id', getDestinationById);
 
// POST create destination (with optional image upload)
router.post('/', upload.single('image'), createDestination);
 
// PUT update destination (with optional new image)
router.put('/:id', upload.single('image'), updateDestination);
 
// DELETE destination
router.delete('/destinations/:id', deleteDestination);

module.exports = router;