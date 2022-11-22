const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_URL = 'https://api.rawg.io/api/';
const API_KEY = '126e4f42c6264c7d81fccb2b50d9d902';

router
.route('/')
.get((req, res) => {
    axios.get(`${API_URL}platforms?key=${API_KEY}`)
    .then((request) => res.send(request.data.results))
    .catch(error => res.json(error.message));
})

module.exports = router; 