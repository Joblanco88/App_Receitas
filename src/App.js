import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
// import DoneRecipes from './pages/DoneRecipes';
// import FavoriteRecipes from './pages/FavoriteRecipes';
// import RecipeInProgress from './pages/RecipeInProgress';
// import Recipes from './pages/Recipes';
// import Profile from './pages/Profile';
// import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      {/* <Route exact path="/profile" component={ Profile } /> */}
      <Route exact path="/meals" component={ Login } />
      {/* <Route exact path="/drinks" component={ Login } /> */}
      {/* <Route exact path="/meals/:id-da-receita" component={ Login } /> */}
      {/* <Route exact path="/meals/:id-da-receita/in-progress" component={ Login } /> */}
      {/* <Route exact path="/drinks/:id-da-receita" component={ Login } /> */}
      {/* <Route exact path="/drinks/:id-da-receita/in-progress" component={ Login } /> */}
      {/* <Route exact path="/done-recipes" component={ DoneRecipes } /> */}
      {/* <Route exact path="/favorite-recipes" component={ FavoriteRecipes } /> */}
    </Switch>
    // <div className="meals">
    //   <span className="logo">TRYBE</span>
    //   <object
    //     className="rocksGlass"
    //     type="image/svg+xml"
    //     data={ rockGlass }
    //   >
    //     Glass
    //   </object>
    // </div>
  );
}

export default App;
