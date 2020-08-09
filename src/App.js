import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import Header from './Header/Header'
import RecipeListPage from './RecipeListPage/RecipeListPage'
import RecipePage from './RecipePage/RecipePage'
import NotFoundPage from './NotFoundPage/NotFoundPage'
import LoginPage from './LoginPage/LoginPage'
import RegistrationPage from './RegistrationPage/RegistrationPage'
import CategoryListPage from './CategoryListPage/CategoryListPage'
class App extends Component {

  render(){
    return (
      <div className='App'>
        <header className='App__header'>
          <Header />
        </header>
        <main className='App__main'>
          <Switch>
            <Route
              exact
              path={'/'}
              component={RecipeListPage}
            />
            <Route
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
            />
            <Route
              path={'/category/:categoryId'}
              component={CategoryListPage}
            />
            <Route
              component={NotFoundPage}
            /> 
          </Switch>
        </main>
      </div>
    )
  }
}

export default App
