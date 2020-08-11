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
import SearchListPage from './SearchListPage/SearchListPage'
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
              render={(routerProps) => 
                <RecipeListPage
                  history={routerProps.history}
                />
              }
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
              path='/recipe/:recipeId'
              render={(routerProps) => 
                <RecipePage
                  recipeId={routerProps.match.params.recipeId} 
                  history={routerProps.history}
                  key = {routerProps.match.params.recipeId}
                />
              }
            />
            <Route
              path='/category/:categoryId'
              render={(routerProps) => 
                <CategoryListPage 
                  categoryId={routerProps.match.params.categoryId} 
                  history={routerProps.history}
                  key = {routerProps.match.params.categoryId}
                />
              }
            />
            <Route
              path='/search/:query'
              render={(routerProps) =>
                <SearchListPage
                  query={routerProps.match.params.query} 
                  history={routerProps.history}
                  key = {routerProps.match.params.query}
                />
              }
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
