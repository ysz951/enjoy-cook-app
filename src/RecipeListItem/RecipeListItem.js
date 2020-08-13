import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CollectionListContext  from '../context/CollectionListContext'
import RecipeApiService from '../services/recipe-api-service'
import TokenService from '../services/token-service'
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
  static contextType = CollectionListContext
  // componentDidMount() {
  //   if (TokenService.hasAuthToken()) {
  //     const userId = TokenService.readJwtToken().user_id;
  //     RecipeApiService.getCollectionList()
  //     .then(this.context.setCollectionList)
  //     .catch(this.context.setError)
  //   }
  // }
  render() {
    const { recipe } = this.props
    // console.log(recipe)
    const {collectionList = []} = this.context
    console.log(collectionList)
    return (
        <Link to={`/recipe/${recipe.id}`} className="RecipeListItem_link">
            <RecipeName recipe={recipe}/>
            <RecipeAuthor recipe={recipe}/>
            <RecipeDate recipe={recipe}/>
            {!!collectionList && collectionList.has(recipe.id) ?<p> {TokenService.readJwtToken().user_id} </p>: ''}
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

