const express = require("express");
const router = express.Router();

router.get("/healthcheck", (req, res) => {
    res.json({ status: "healthy" });
});

module.exports = router;
