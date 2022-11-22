const express = require('express');
const {Genre, Videogame} = require('../db');
const axios = require('axios');
const router = express.Router();


const API_URL = 'https://api.rawg.io/api/';
const API_KEY = '126e4f42c6264c7d81fccb2b50d9d902';

router
.route('/:idVideogame')
.get(async (req, res) => {
    const id = req.params.idVideogame;
    const videogame = await Videogame.findOne({
        where: {
            id : id
        },
        include: Genre
    });
    if(videogame != null){
        return res.json(videogame)
    }
    axios.get(`${API_URL}games/${id}?key=${API_KEY}`).then(request => {
        res.json(request.data);
    })
    .catch(error => res.json(error.message));
})

.delete(async (req, res) => {
    const id = req.params.idVideogame;
    const videogame = await Videogame.findOne({
        where: {
            id: id
        },
        include: Genre
    })
    if(videogame){
        videogame.destroy();
        return res.send("eliminado correctamente");
    }
})



module.exports = router;