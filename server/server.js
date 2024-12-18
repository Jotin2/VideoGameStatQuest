require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const User = require("./models/User");

// Import routes
const authMiddleware = require("./middleware/authMiddleware");
const authRoutes = require("./routes/auth");
const healthCheckRoutes = require("./routes/healthcheck");
const igdbRoutes = require("./routes/igdbRoutes");

// Import passport configuration
//require("./config/passport"); GOOGLE OAUTH NOT SET UP YET

const app = express();

// CORS Configuration
const corsOptions = {
    origin: "http://localhost:5173", // Frontend origin
    credentials: true, // Allow credentials (cookies)
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//app.use(passport.initialize()); GOOGLE OAUTH NOT SET UP YET

// CORS Configuration

// Environmental Variables
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Use Routes
app.use("/auth", authRoutes);
app.use("/api", healthCheckRoutes);
app.use(cors(corsOptions));
app.use("/api/igdb", igdbRoutes);

app.get("/protected", authMiddleware, (req, res) => {
    res.json({ message: "Access granted", userId: req.userId });
});

// Connect to MongoDB
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        // Start Server only after DB connection is successful
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    });
