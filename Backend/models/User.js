const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    phone: String,
    isVerified: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("User", userSchema);