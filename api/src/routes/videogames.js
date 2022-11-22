const express = require('express');
const {Genre, VideogameGenre, Videogame} = require('../db');
const axios = require('axios');
const {Op} = require('sequelize');
const router = express.Router();


const API_URL = 'https://api.rawg.io/api/';
const API_KEY = '126e4f42c6264c7d81fccb2b50d9d902';
let id = 0;

router
.route('/')
.get(async (req, res) => {
    const name = req.query.name;
    if (name){
        let videogame = await Videogame.findAll({include: Genre});
        videogame = videogame.filter(videogame => videogame.name.includes(name));
        axios.get(`${API_URL}games?key=${API_KEY}&search=${name}`).then(async function (request) {
            return res.status(200).send([...videogame ,...request.data.results].slice(0,15));
        })
        .catch(error => res.json(error.message)); 
    }
    else{
        const videogame = await Videogame.findAll({include: Genre});        
        Promise.all(
            [axios.get(`${API_URL}games?page_size=40&key=${API_KEY}`).then((request) => request.data.results)
            ,axios.get(`${API_URL}games?page=2&page_size=40&key=${API_KEY}`).then((request) => request.data.results)
            ,axios.get(`${API_URL}games?page=5&key=${API_KEY}`).then((request) => request.data.results)
            ]
        ).then(results => res.status(200).json([...results.flat(1), ...videogame]));
        }
})
.post(async (req, res) => {
    const {name, description, release, rating, platforms, genreID} = req.body;
    let idApi;
    id++;
    //////chequea que no falten datos///////////////
    if(!name || !description || !platforms) return res.status(400).send("Faltan Datos Obligatorios");
    
////////guarda en la base de datos///////////////
    try{
        axios.get(`${API_URL}games?key=${API_KEY}`).then(async function(request){
        idApi = (request.data.count);

///////////chequea que no se repita el nombre////////////////

        const isUnique = await Videogame.findOne({
            where: {[Op.or]: [{name: name}, {id: id+idApi}]}
        });

        if(isUnique != null){
            return res.status(400).send("ya existe un juego con esos datos");
        }

        const videogame = await Videogame.create({
            id: idApi + id,
            name: name,
            description: description,
            released: release,
            rating: rating,
            platforms: platforms
        });
        
        genreID.map(async (genre) => {
                await VideogameGenre.create({
                videogameId: id + idApi,
                genreId: genre
                });
        })
        
        res.status(200).json({videogame});      
        })
    }
    catch{
        res.status(404).send("Error al guardar en la base de datos")
    }

    
})



module.exports = router;


