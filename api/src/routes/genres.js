const express = require('express');
const {Genre} = require('../db');
const axios = require('axios');
const router = express.Router();

const API_URL = 'https://api.rawg.io/api/';
const API_KEY = '126e4f42c6264c7d81fccb2b50d9d902';

router
.route('/')
.get((req,res) => {
    axios.get(`${API_URL}genres?key=${API_KEY}`).then(async function(request){
//////////////////comprueba que no esten cargados en la base de datos/////////////////////////////////// 
const results = request.data.results;    
const genres = await Genre.findAll();
if(genres.length < results.length){
    for(const i in results){
            const genre = await Genre.create({
                id: results[i].id,
                name: results[i].name
            });
        }
       return res.status(200).send(results);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
    res.send(results)
    })
    
})

module.exports = router; 
