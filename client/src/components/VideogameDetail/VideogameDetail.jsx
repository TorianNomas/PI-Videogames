import React from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { getVideogameId, deleteVideogame } from '../../redux/actions';
import {useHistory} from 'react-router-dom';



import './VideogameDetail.css';

const VideogameDetail = () => {
    const url = window.location.pathname;
    const id = url.split('/')[url.split('/').length - 1]; 
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getVideogameId(id))
    },[]);
    const history = useHistory();

    const handleDelete = () => {
        dispatch(deleteVideogame(id));
        history.goBack();
    }
    const videogame = useSelector((state) => state.videogame);
    console.log(videogame);
        return (
            <div>
                <h3>{videogame.name}</h3>  
                <img src={videogame.background_image} className='DetailImage'></img>
                <div className='cuadrado'> 
                    <div className='Card'>   

                        

                        <div className='GenreContainer'>
                            <p>Generos:</p>
                            {videogame.genres?.map(vg => 
                            { 
                                return(
                                <p>{vg.name}&nbsp;</p>
                                )
                            })
                            }
                        </div>

                        <p>Rating: {videogame.rating}</p>

                        <div className='DetailDataContainer'>
                            {typeof videogame.platforms !== "string" ? videogame.platforms?.map(vg => 
                                {
                                    return(
                                        <p>{vg.platform.name} &nbsp;</p>
                                    )
                                }) : videogame.platforms}
                        </div>

                        <p>Released: {videogame.released}</p>
                    </div>
                    
                    <p>{videogame.hasOwnProperty("description_raw") ? videogame.description_raw : videogame.description}</p>
                </div>
                {!videogame.hasOwnProperty("added") && 
                    (
                        <div>
                            <button onClick={handleDelete} className="Deletebutton">eliminar</button> 
                        </div>
                   )}
            </div>
        );
};

export default VideogameDetail;