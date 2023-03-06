import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipesProvider from './context/RecipesProvider';
// import RecipeInProgress from './pages/RecipeInProgress';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';
// import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/profile" component={ Profile } />
        <Route
          exact
          path="/meals/:id-da-receita"
          render={ (props) => <RecipeDetails { ...props } /> }
        />
        {/* <Route exact path="/meals/:id-da-receita/in-progress" component={ Login } /> */}
        <Route exact path="/drinks/:id-da-receita" component={ RecipeDetails } />
        {/* <Route exact path="/drinks/:id-da-receita/in-progress" component={ Login } /> */}
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </RecipesProvider>
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
