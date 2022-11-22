import React from 'react';
import {Link} from 'react-router-dom'
import './LandingPage.css'



const LandingPage = () => {
    
    return (
        <div className='LandingPagebg'>          
            <h1 className='title'>VideoGames</h1>
            <Link to='/home'>
                <button className='LPbutton'>Comenzar</button>
            </Link>
           <p className='insertCoin'>Insert Coin</p> 
        </div>
    );
};


export default LandingPage;