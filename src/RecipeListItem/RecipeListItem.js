import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './RecipeListItem.css'

export default class RecipeListItem extends Component {
  static defaultProps = {
    recipe: {
      modified: '',
      author: {
        user_name: '',
      }
    },
  }
  render() {
    const { recipe } = this.props
    // console.log(recipe)
    return (
        <Link to={`/recipe/${recipe.id}`} className="RecipeListItem_link">
            <RecipeName recipe={recipe}/>
            <RecipeAuthor recipe={recipe}/>
            <RecipeDate recipe={recipe}/>
        </Link>
    )
  }
}

function RecipeName({ recipe }) {
  return (
    <p className='RecipeListItem__name'>
        {recipe.name}
    </p>
  )
}

function RecipeAuthor({ recipe }) {
    return (
    <p className='RecipeListItem__author'>
        by {recipe.author.user_name}
    </p>
    )
}

function RecipeDate({ recipe }) {
  return (
    <p className='RecipeListItem__date'>
        {recipe.date_created.slice(0, 10)}
    </p>
  )
}

