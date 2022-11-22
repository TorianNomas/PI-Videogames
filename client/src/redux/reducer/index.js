import {GET_ALL_VIDEOGAMES, CREATE_VIDEOGAMES,GET_VIDEOGAME_BY_ID, GET_VIDEOGAME_BY_NAME, GET_GENRE,DELETE_VIDEOGAME, GET_PLATFORMS} from "../actions"

const initialState = {
    videogames: [],
    videogame: [],
    genres: [],
    loading: true,
    platforms: []
  };


  const rootReducer = (state = initialState, action) => {
    switch(action.type) {
      case GET_ALL_VIDEOGAMES:
        return {
          ...state,
          videogames: action.payload,
          loading: false
        }
        case GET_VIDEOGAME_BY_NAME:
          return{
            ...state,
            videogames: action.payload,
          }
          case GET_VIDEOGAME_BY_ID:
            return{
              ...state,
              videogame: action.payload,
            }
            case GET_PLATFORMS: 
            return{
              ...state,
              platforms: action.payload
            }
          case CREATE_VIDEOGAMES:
          return{
            ...state,
            videogames: [...state.videogames, action.payload]
          }
          case DELETE_VIDEOGAME:
            return{
              ...state,
              videogames: state.videogames.filter(videogame => videogame.id !== action.payload)
            }
            case GET_GENRE:
              return {
                ...state,
                genres: action.payload
              }
          default:
            return state  
    };
  };
  
  export default rootReducer;