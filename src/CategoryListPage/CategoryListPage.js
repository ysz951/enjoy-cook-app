import React, { Component } from 'react'
import RecipeListContext from '../context/RecipeListContext'
import RecipeApiService from '../services/recipe-api-service'
import SearchNav from '../SearchNav/SearchNav'
import RecipeList from '../RecipeList/RecipeList'

export default class CategoryListPage extends Component {

  static contextType = RecipeListContext
  componentDidMount() {
    const { categoryId } = this.props
    RecipeApiService.getCategoryRecipes(categoryId)
      .then(this.context.setRecipeList)
      .catch(this.context.setError)
  }
  
  render() {
    const { recipeList = [], error } = this.context
    return (
      <section>
          <SearchNav />
          <RecipeList recipes = {recipeList}/>
      </section>
    )
  }
}
