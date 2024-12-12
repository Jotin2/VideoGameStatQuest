const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

// Register logic
async function registerUser(req, res) {
    const { firstName, lastName, userName, email, phoneNumber, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            userName,
            email,
            phoneNumber,
            hashedPassword,
        });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

// Login logic
async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        // Generate Access Token
        const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "15m" });

        // Generate Refresh Token
        const refreshToken = jwt.sign({ userId: user._id }, REFRESH_SECRET, { expiresIn: "7d" });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.json({ message: "Login successful", accessToken });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

// Refresh logic
async function refreshUser(req, res) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ error: "Refresh token missing" });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

        const newAccessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, {
            expiresIn: "15m",
        });

        res.json({ accessToken: newAccessToken });
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: "Invalid or expired refresh token" });
    }
}

// Logout logic
async function logoutUser(req, res) {
    try {
        res.clearCookie("refreshToken");
        res.json({ message: "Logged out successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to log out" });
    }
}

module.exports = { registerUser, loginUser, refreshUser, logoutUser };
