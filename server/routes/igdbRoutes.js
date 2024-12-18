const express = require("express");
const { igdbRequest } = require("../utils/igdbClient"); // Utility for IGDB API requests
const Game = require("../models/Game"); // Your Mongoose Game model

const router = express.Router();

// Utility to add delay between requests
const delayFunction = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Route: Fetch games in chunks and store them in MongoDB
router.post("/fetch-games", async (req, res) => {
    try {
        console.log("Starting IGDB game ingestion...");

        const CHUNK_SIZE = 500; // Number of games per request
        const REQUEST_DELAY = 300; // 4 requests per second → 300ms delay
        let offset = 0; // Start at offset 0
        let totalFetched = 0; // Counter for total games fetched

        while (true) {
            console.log(`Fetching games from offset ${offset}...`);

            const query = `
          fields name, platforms, artworks, screenshots, collections, cover, dlcs, first_release_date, genres, involved_companies, summary, videos, websites;
          limit ${CHUNK_SIZE};
          offset ${offset};
        `;

            // Fetch a chunk of games from IGDB
            const gamesChunk = await igdbRequest("games", query);

            // Break if no games are returned (end of data)
            if (gamesChunk.length === 0) {
                console.log("No more games to fetch. Ingestion complete.");
                break;
            }

            // Process and save each game to MongoDB
            for (const game of gamesChunk) {
                const gameDocument = {
                    name: game.name,
                    platforms: game.platforms || [],
                    artworks: game.artworks || [],
                    screenshots: game.screenshots || [],
                    collections: game.collections || [],
                    cover: game.cover || null,
                    dlcs: game.dlcs || null,
                    first_release_date: game.first_release_date
                        ? new Date(game.first_release_date * 1000)
                        : Date.now(),
                    genres: game.genres || [],
                    involved_companies: game.involved_companies || [],
                    summary: game.summary || "",
                    videos: game.videos || [],
                    websites: game.websites || null,
                };

                // Use upsert to update or insert without modifying rating or rating_count
                await Game.updateOne(
                    { name: gameDocument.name }, // Matching criteria
                    { $setOnInsert: gameDocument }, // Insert only fields if new
                    { upsert: true } // Create if not found
                );

                console.log(`Successfully ingested '${gameDocument.name}'`);
            }

            // Increment offset and total fetched
            offset += CHUNK_SIZE;
            totalFetched += gamesChunk.length;

            console.log(`Fetched ${gamesChunk.length} games, total so far: ${totalFetched}`);

            // Delay to respect IGDB's rate limit
            await delayFunction(REQUEST_DELAY);
        }

        res.status(200).json({
            message: `Ingestion complete. Total games fetched: ${totalFetched}`,
        });
    } catch (error) {
        console.error("Error during IGDB game ingestion:", error.message);
        res.status(500).json({ error: "Failed to fetch and store games." });
    }
});

module.exports = router;
