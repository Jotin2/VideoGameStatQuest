const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: String },
    hashedPassword: { type: String },
    googleID: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
