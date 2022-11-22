import React from 'react';
import {useState} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { getGenre, getPlatforms, createVideogame } from '../../redux/actions';
import './CreateVideogame.css';

const CreateVideogame = () => {
        const [videogame, setVideogame] = useState({});
        let genresInput = [];
        let platformsInput = [];
        const dispatch = useDispatch();
        React.useEffect(() => {
            dispatch(getGenre());
            dispatch(getPlatforms());
        },[]);

        const handlePlatformChange = (e) => {
            if (e.target.checked)
                platformsInput.push(e.target.name);
            else
                platformsInput = platformsInput.filter(platform => platform != e.target.name)
        }
        const handleSubmit = (e) => {
            e.preventDefault();
            dispatch(createVideogame({...videogame, platforms: platformsInput.toString(), genre: genresInput}));
        }
        const handleGenreChange = (e) => {
            if(e.target.checked)
                genresInput.push(e.target.id);
            else
                genresInput = genresInput.filter(genres => genres != e.target.id);
        }
        const handleChange = (e) => {
            setVideogame({...videogame, [e.target.name] : e.target.value});
            console.log(videogame);
        }
        const platforms = useSelector(state => state.platforms);
        const genres = useSelector(state => state.genres);
        console.log(platforms);
        return (
            <div>
                <form onSubmit={(e) => handleSubmit(e)}>
                <p>Nombre: </p>
                <input name='name' onChange={handleChange} className='creationInput'></input>
                <p>Descripcion: </p>
                <input name='description' onChange={handleChange} className='creationInput'></input>
                <p>Fecha de lanzamiento:</p>
                <input type="date" name='release' onChange={handleChange} className='creationInput'></input>
                <p>Rating:</p>
                <input type='number' min='0' max='5' step='.01' name='rating' onChange={handleChange} className='creationInput'></input>
                <p>genero:</p>
                <div className='container'>
                <div>
                {genres?.map((genre) => {
                    return(
                        <p><input type="checkbox" name={genre.name} id={genre.id} onChange={(e) => handleGenreChange(e)}></input>{genre.name}</p>
                    )
                })}<br/>
                </div>
                </div>
                <p>plataformas:</p>
                <div className='container'>
                {platforms?.map((platform, i) => {
                    return(
                        <p><input type="checkbox" name={platform.name} id={i} onChange={(e) => handlePlatformChange(e)}></input>{platform.name}</p>
                    )
                })}
                </div>
                <button className="Createbutton">Crear</button>
                </form>  
                       
            </div>
        );
};

export default CreateVideogame;