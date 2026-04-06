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
} = require("../controllers/destinationController");

const { getHotelsByCity, searchDestination } = require("../controllers/hotelController");

// ================= AUTH =================
router.post("/signup", auth.signup);
router.post("/login", auth.login);
router.post("/send-otp", auth.sendOtp);
router.post("/verify-otp", auth.verifyOtp);


// ================= DESTINATIONS =================
router.get("/destinations", getAllDestinations);
router.get("/destinations/:id", getDestinationById);

router.post("/destinations", upload.single("image"), createDestination);
router.put("/destinations/:id", upload.single("image"), updateDestination);
router.delete("/destinations/:id", deleteDestination);


// ================= HOTELS =================
router.get("/hotels", getHotelsByCity);
// router.get("/search-destination", searchDestination);

module.exports = router;