import React, { Component } from 'react'
import RecipeListContext from '../context/RecipeListContext'
import SearchNav from '../SearchNav/SearchNav'
import RecipeList from '../RecipeList/RecipeList'

export default class CategoryListPage extends Component {
  static defaultProps = {
    match: { params: {} },
  }
  static contextType = RecipeListContext
  render() {
    const { recipes= [] } = this.context
    const { categoryId } = this.props.match.params
    const cateRecipes =  recipes.filter(recipe => recipe.category_id === Number(categoryId));
    return (
      <section>
          <SearchNav />
          <RecipeList recipes = {cateRecipes}/>
      </section>
    )
  }
}
