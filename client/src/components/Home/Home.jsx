import React from 'react';
import {useState} from 'react';
import { useDispatch,useSelector} from 'react-redux';
import Videogames from '../Videogames/Videogames';
import Pagination from '../Pagination/Pagination';
import { getAllvideogames } from '../../redux/actions';
import Loading from "../Loading/Loading";
import './Home.css'



const Home = () => {
    const dispatch = useDispatch();
    const LoadingStatus = useSelector((state) => state.loading)
    React.useEffect(() => {
        dispatch(getAllvideogames());
      }, []);
    const videogames = useSelector((state) => state.videogames)
    if(LoadingStatus){
        return(
            <div>
                <Loading></Loading>
            </div>
        )
    }else{ 
    
    return (
            <div className='Homebg'>
            <Videogames videogames={videogames}></Videogames>
            </div> 
    );
}
};


export default Home;