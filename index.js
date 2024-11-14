// backend/index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

let jwtToken = null;


app.use(cors({
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
}));

app.use(cookieParser());

app.get('/test', async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `${process.env.SYMFONY_API_URL}/api/shows`,
            headers: {
                Authorization: `Bearer ${jwtToken}`
            },
            data: req.body
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error("API Proxy Error:", error);
        res.status(error.response?.status || 500).json(error.response?.data || { message: "Error" });
    }
});

const client_id = process.env.API_CLIENT;
const client_secret = process.env.API_SECRET;

async function fetchJwtToken() {
    try {
        const response = await axios.post(`${process.env.SYMFONY_API_URL}/auth/token`, {
            client_id,
            client_secret
        });
        jwtToken = response.data.token;
        setTimeout(fetchJwtToken, (response.data.expires_in - 60) * 1000);
    } catch (error) {
        console.error("Error fetching JWT:", error);
    }
}

app.listen(PORT, () => {
    console.log(`Backend proxy en écoute sur http://localhost:${PORT}`);
});

fetchJwtToken();
