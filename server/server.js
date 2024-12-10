require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Environmental Variables
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Basic Route - Health Check
app.get("/healthcheck", (req, res) => {
    res.json({ status: "healthy" });
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
