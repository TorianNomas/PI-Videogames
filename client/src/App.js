import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Nav from './components/NavBar/NavBar';
import VideogameDetail from './components/VideogameDetail/VideogameDetail';
import CreateVideogame from './components/CreateVideogame/CreateVideogame';
import {Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route 
        exact path='/'
        component={LandingPage}
        />
      <Route
        path='/home'
        component={Nav}
      />
      <Route
        exact path='/home'
        component={Home}
      />
      <Route
        path='/Videogame'
        component={CreateVideogame}
      />
      <Route
        path='/detail/:id'
        component={VideogameDetail}
      />
    </div>
  );
}

export default App;
