import React from "react";
import {useState} from "react";
import Pagination from '../Pagination/Pagination';
import VideogameCard from "../VideogameCard/VideogameCard";
import './Videogames.css'

const Videogames = (data) => {

  const [Order, setOrder] = useState(''); 
    const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  let videogames = [];   
  const handlerPage = (page) => {
      setPage(page);
  }
  const handleOnchange = (e) => {
    setOrder(e.target.value);
  }
  const handleOnChangeFilter = (e) => {
    setFilter(e.target.value);
  }
  function comparename( a, b ){
    if ( a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if ( a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  }
  function compareRating( a, b ){
    if ( a.rating < b.rating) return -1;
    if ( a.rating > b.rating) return 1;
    return 0 
  } 
  videogames = data.videogames;


  switch(Order){
    case "A-Z": videogames?.sort(comparename); break;
    case "Z-A": videogames?.sort(comparename).reverse();  break;
    case "MayorRating": videogames?.sort(compareRating).reverse();  break;
    case "MenorRating": videogames?.sort(compareRating); break;
  }

  if(filter == "Existentes"){
    videogames = data.videogames.filter(videogame => videogame.hasOwnProperty("added") == true); 
  }else if(filter == "Creados"){
    videogames = data.videogames.filter(videogame => videogame.hasOwnProperty("added") == false); 
  }else if(filter == "Todos"){
    videogames = data.videogames
  }

  

  return (
    <div>
      <Pagination handler={handlerPage} page={page} videogames={videogames}></Pagination>
            <div>     
              <label> Ordenar: </label>           
              <select onChange={(e) => {handleOnchange(e)}}>
                <option disabled selected>Ordenamiento</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="MayorRating">Mayor rating-Menor rating</option>
                <option value="MenorRating">Menor rating-Mayor rating</option>
                </select>
                <label> Filtrar: </label> 
                <select onChange={(e)=> {handleOnChangeFilter(e)}}>
                  <option disabled selected>Filtrado</option>
                  <option value="Creados">Creados</option>
                  <option value="Existentes">Existentes</option>
                  <option value="Todos">Todos</option>
                </select>
            </div>
      <div className="row">
        {videogames.slice((page-1)*15, page*15).map((game) => {
          return (
            
            <VideogameCard
              name={game.name}
              release={game.released}
              genres={game.genres}
              sprite={game.background_image}
              id={game.id}
              rating={game.rating}
            ></VideogameCard>
          );
        })}
        
      </div>
      </div>
  );
};

export default Videogames;
