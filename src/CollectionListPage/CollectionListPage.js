import React, { Component } from 'react'
import RecipeListContext from '../context/RecipeListContext'
import RecipeApiService from '../services/recipe-api-service'
import TokenService from '../services/token-service'
import CollectionList from '../CollectionList/CollectionList'
import './CollectionListPage.css'

export default class CollectionListPage extends Component {
  static contextType = RecipeListContext
  componentDidMount() {
      this.context.clearError()
      RecipeApiService.getRecipes()
      .then(this.context.setRecipeList)
      .catch(this.context.setError)
  }
  render() {
      const {recipeList = []} = this.context
      return (
      <>
        <h2 className="Favorite_title">Favorite Recipes</h2>
        <CollectionList recipes={recipeList}/>
      </>
      )
  }
}
