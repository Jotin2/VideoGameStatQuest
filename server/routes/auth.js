const express = require("express");
const {
    registerUser,
    loginUser,
    refreshUser,
    logoutUser,
} = require("../controllers/authController");
//const passport = require("passport"); GOOGLE OAUTH NOT SET UP YET

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Refresh route
router.post("/refresh", refreshUser);

// Logout route
router.post("/logout", logoutUser);

// Google Oauth route

// Google Oauth callback route

module.exports = router;
