import React from 'react';
import {Link} from 'react-router-dom'
import './VideogameCard.css'
import notFound from '../../img/NotFound.jpg';



const VideogameCard = (data) => {
    return (
        <div className="column"> 
        <div className="card">
        {data.sprite ? <img src={data.sprite} className='Gameimg'></img> : <img src={notFound} className='Gameimg'></img>}
            <p>{data.name}</p>
            <div className='genreContainer'>
            {data.genres.slice(0, 2)?.map(genre => {
                return(
                    <h6 className='p'>{`${genre.name} `}</h6>
                );
            })}
            </div>
            <p>Rating: {data.rating}</p>
            <p>{data.release}</p>
        <Link to={`/detail/${data.id}`}>
        <button className='Detailbutton'>Detalle</button>
        </Link>
        </div>
      </div>
    );
};


export default VideogameCard;