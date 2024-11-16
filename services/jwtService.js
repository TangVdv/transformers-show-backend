const axios = require('axios');
const { apiUrl, clientId, clientSecret } = require('../config/apiConfig');

let jwtToken = null;
let tokenExpiration = null;

async function fetchJwtToken() {
    const response = await axios.post(`${apiUrl}/auth/token`, {
        client_id: clientId,
        client_secret: clientSecret
    });
    jwtToken = response.data.token;
    tokenExpiration = Date.now() + 3600;
}

async function getJwtToken() {
    if (!jwtToken || Date.now() >= tokenExpiration) {
        await fetchJwtToken();
    }
    return jwtToken;
}

module.exports = { getJwtToken };
