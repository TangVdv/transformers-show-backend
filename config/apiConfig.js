require('dotenv').config();

module.exports = {
    apiUrl: process.env.SYMFONY_API_URL,
    clientId: process.env.API_CLIENT,
    clientSecret: process.env.API_SECRET
};