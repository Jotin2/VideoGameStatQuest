const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    name: { type: String, required: true },
    platforms: { type: [Number], default: [] },
    artworks: { type: [Number], default: [] },
    screenshots: { type: [Number], default: [] },
    collections: { type: [Number], default: [] },
    cover: { type: Number },
    dlcs: { type: [Number] },
    first_release_date: { type: Date, default: Date.now },
    genres: { type: [Number], default: [] },
    involved_companies: { type: [Number], default: [] },
    rating: { type: Number },
    rating_count: { type: Number },
    summary: { type: String },
    videos: { type: [Number], default: [] },
    websites: { type: [Number], default: [] },
});

module.exports = mongoose.model("Game", gameSchema);
