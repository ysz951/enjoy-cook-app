import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './Header/Header'
import RecipeListPage from './RecipeListPage/RecipeListPage'
import RecipePage from './RecipePage/RecipePage'
// import MainContent from './MainContent/MainContent';
// import FolderNoteContext from './FolderNoteContext';
// import config from './config';

class App extends Component {

  render(){
    return (
      <div className='App'>
        <header className='App__header'>
          <Header />
        </header>
        <main className='App__main'>
          {/* {this.state.hasError && <p className='red'>There was an error! Oh no!</p>} */}
          <Switch>
            <Route
              exact
              path={'/'}
              component={RecipeListPage}
            />
            <Route
              path={'/recipe/:recipeId'}
              component={RecipePage}
            />
            {/* <Route
              path={'/login'}
              component={LoginPage}
            />
            <Route
              path={'/register'}
              component={RegistrationPage}
            />
            <Route
              path={'/recipe/:recipeId'}
              component={RecipePage}
            /> */}
            {/* <Route
              component={NotFoundPage}
            /> */}
          </Switch>
        </main>
      </div>
    );
  };
};

export default App;
