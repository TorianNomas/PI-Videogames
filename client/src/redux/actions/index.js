import axios from "axios";

export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const CREATE_VIDEOGAMES = "CREATE_VIDEOGAMES";
export const GET_VIDEOGAME_BY_ID = "GET_VIDEOGAME_BY_ID";
export const GET_VIDEOGAME_BY_NAME = "GET_VIDEOGAME_BY_NAME";
export const GET_GENRE = "GET_TYPE";
export const DELETE_VIDEOGAME = "DELETE_VIDEOGAME";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const SET_ORDER = "SET_ORDER";


export const getAllvideogames = () => dispatch => {
    return axios.get(`http://localhost:3001/videogames`)    
    .then(r => r.data)
    .then(data => {
        dispatch({type: GET_ALL_VIDEOGAMES, payload:data});
    })
};


export const getVideogameId = (id) => dispatch => {
    
    return axios.get(`http://localhost:3001/videogame/${id}`)
    .then(r=>r.data)
    .then(data => {
        dispatch({ type: GET_VIDEOGAME_BY_ID, payload: data});
    })
};


export const getVideogameName = (name) => dispatch => {
    
    return axios.get(`http://localhost:3001/videogames?name=${name}`)
    .then(r=>r.data)
    .then(data => {
        console.log('data');
        dispatch({ type: GET_VIDEOGAME_BY_NAME, payload: data});
    })
};


export const createVideogame = (value) => {
    axios.post(`http://localhost:3001/videogames`, {
        name: value.name,
        description: value.description,
        release: value.release,
        rating: value.rating,
        platforms: value.platforms,
        genreID : value.genre
    })
    .then(() => alert("juego creado correctamente"))
    .catch(error => {alert(`Codigo de error ${error.response.status}: ${error.response.data} `)})
    let action = {type: CREATE_VIDEOGAMES, payload: {...value}}
    return action;
};

export const deleteVideogame = (id) => {
    axios.delete(`http://localhost:3001/videogame/${id}`)
    .then((message) => {alert(message.data)});
    return {type: DELETE_VIDEOGAME, payload: id}
};

export const getGenre = () => dispatch => {
    return axios.get(`http://localhost:3001/genres`)
    .then(r=>r.data)
    .then(data => {
        dispatch({ type: GET_GENRE, payload: data});
    })

};

export const getPlatforms = () => dispatch => {
    return axios.get(`http://localhost:3001/platforms`)
    .then(r=>r.data)
    .then(data => {
        dispatch({ type: GET_PLATFORMS, payload: data});
    })
};

