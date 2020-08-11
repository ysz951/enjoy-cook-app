import React, { Component } from 'react'
import RecipeListContext from '../context/RecipeListContext'
import RecipeApiService from '../services/recipe-api-service'
import SearchNav from '../SearchNav/SearchNav'
import RecipeList from '../RecipeList/RecipeList'
import './RecipeListPage.css'
export default class RecipeListPage extends Component {
  static contextType = RecipeListContext
  componentDidMount() {
    // console.log('log')
    this.context.clearError()
    RecipeApiService.getRecipes()
      .then(this.context.setRecipeList)
      .catch(this.context.setError)
  }
  render() {
    const { recipeList = [], error } = this.context
    return (
      <section>
          <SearchNav />
          <RecipeList recipes={recipeList}/>
      </section>
    )
  }
}
