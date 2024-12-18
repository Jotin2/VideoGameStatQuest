const axios = require("axios");
require("dotenv").config();

let accessToken = null;

// Fetch IGDB OAuth token
const fetchAccessToken = async () => {
    const { IGDB_CLIENT_ID, IGDB_CLIENT_SECRET, IGDB_AUTH_URL } = process.env;

    try {
        const response = await axios.post(IGDB_AUTH_URL, null, {
            params: {
                client_id: IGDB_CLIENT_ID,
                client_secret: IGDB_CLIENT_SECRET,
                grant_type: "client_credentials",
            },
        });

        accessToken = response.data.access_token;
        console.log("IGDB Access Token fetched successfully.");
        return accessToken;
    } catch (error) {
        console.error("Error fetching IGDB Access Token:", error.message);
        throw error;
    }
};

// Make a request to IGDB API
const igdbRequest = async (endpoint, query) => {
    if (!accessToken) {
        console.log("Access token is not defined, fetching a new one...");
        accessToken = await fetchAccessToken();
    }

    const { IGDB_BASE_URL, IGDB_CLIENT_ID } = process.env;

    try {
        console.log(`Making IGDB request to endpoint: ${endpoint}`);
        const response = await axios.post(`${IGDB_BASE_URL}/${endpoint}`, query, {
            headers: {
                "Client-ID": IGDB_CLIENT_ID,
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.log("Access token expired, fetching a new one...");
            accessToken = await fetchAccessToken(); // Fetch new token
            return await igdbRequest(endpoint, query); // Retry the request
        }

        console.error("Error making IGDB API request:", error.message);
        throw error;
    }
};

module.exports = { igdbRequest };
