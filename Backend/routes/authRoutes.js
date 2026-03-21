const express = require("express");
const router = express.Router();

const auth = require("../controllers/authController");
const upload = require("../middleware/upload");

// AUTH
router.post("/signup", auth.signup);
router.post("/login", auth.login);

// DESTINATION (same controller)
router.post("/", upload.single("image"), auth.createDestination);
router.put("/:id", upload.single("image"), auth.updateDestination);
router.get("/destinations", auth.getAllDestinations);
router.get("/:id", auth.getDestinationById);
router.delete("/:id", auth.deleteDestination);

module.exports = router;