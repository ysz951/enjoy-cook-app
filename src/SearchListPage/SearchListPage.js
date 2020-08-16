import React, { Component } from 'react'
import RecipeListContext from '../context/RecipeListContext'
import RecipeApiService from '../services/recipe-api-service'
import SearchNav from '../SearchNav/SearchNav'
import RecipeList from '../RecipeList/RecipeList'

export default class SearchListPage extends Component {

  static contextType = RecipeListContext
  componentDidMount() {
    const { query } = this.props
    
    RecipeApiService.getSearchRecipes(query)
      .then(this.context.setRecipeList)
      .catch(this.context.setError)
  }
  
  render() {
    const { recipeList = [], error } = this.context
    return (
      <section>
          <SearchNav history={this.props.history}/>
          <RecipeList recipes = {recipeList} history={this.props.history}/>
      </section>
    )
  }
}
