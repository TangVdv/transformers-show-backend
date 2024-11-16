const axios = require('axios');
const { apiUrl } = require('../config/apiConfig');
const jwtService = require('../services/jwtService');

exports.getShows = async function getShows(req, res) {
    try {
        const token = await jwtService.getJwtToken();
        const response = await axios({
            method: 'GET',
            url: `${apiUrl}/api/shows/`,
            headers: { Authorization: `Bearer ${token}` }
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: "Erreur serveur" });
    }
}

exports.getSpecificShow = async function getSpecificShow(req, res) {
    try {
        const token = await jwtService.getJwtToken();
        const id = req.params.id
        const response = await axios({
            method: 'GET',
            url: `${apiUrl}/api/shows/${id}`,
            headers: { Authorization: `Bearer ${token}` }
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: "Erreur serveur" });
    }
}