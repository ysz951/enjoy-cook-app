import React, { Component } from 'react'
import RecipeListContext from '../context/RecipeListContext'
import RecipeListItem from '../RecipeListItem/RecipeListItem'

export default class RecipeListPage extends Component {
  static contextType = RecipeListContext

  renderRecipes() {
    const { recipes= [] } = this.context
    return recipes.map(recipe =>
      <RecipeListItem
        key={recipe.id}
        recipe={recipe}
      />
    )
  }

  render() {
    // const { recipeList, categories, users } = this.context
    // console.log(recipeList, categories, users)
    return (
      <section>
          
          {this.renderRecipes()}
      </section>
    )
  }
}
