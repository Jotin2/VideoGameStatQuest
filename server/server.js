require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("./models/User");

// Import routes
const authRoutes = require("./routes/auth");
const healthCheckRoutes = require("./routes/healthcheck");

// Import passport configuration
//require("./config/passport"); GOOGLE OAUTH NOT SET UP YET

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
//app.use(passport.initialize()); GOOGLE OAUTH NOT SET UP YET

// Environmental Variables
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Use Routes
app.use("/auth", authRoutes);
app.use("/api", healthCheckRoutes);

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
