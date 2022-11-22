import React, { Component } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import { getVideogameName } from '../../redux/actions';
import { useState } from 'react';
import './NavBar.css';

const Nav = () => {
    const [Searched, setSearched] = useState('');
    const dispatch = useDispatch();

    const handleOnchange = (e) => {
        e.preventDefault();
        setSearched(e.target.value);
    }
    console.log(Searched);
    
    const handleSubmit = (e) => {
        e.preventDefault();
            dispatch(getVideogameName(Searched));
    }

    

        return (
            <div>
                <ul>
                <Link to='/Home' className='lis'>Pagina Principal</Link>
                <Link to='/Videogame' className='lis'>Crear Juego</Link>
                <form onSubmit={(e) => handleSubmit(e)}>
                <input placeholder='ingrese el nombre'  className='searchInput' onChange={(e)=> handleOnchange(e)}></input>
                </form>
                </ul>                
            </div>
        );
};

export default Nav;