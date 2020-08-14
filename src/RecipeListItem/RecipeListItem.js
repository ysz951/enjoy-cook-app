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
  componentDidMount() {
    if (TokenService.hasAuthToken()) {
      RecipeApiService.getCollectionList()
      .then(this.context.setCollectionList)
      .catch(this.context.setError)
    }
  }
  handleClick = (recId) => {
    if (TokenService.hasAuthToken()) {
      const {collectionList = new Set()} = this.context
      if (!collectionList.has(recId)){
        RecipeApiService.postCollectionList(recId)
        .then(this.context.addCollection)
        .catch(this.context.setError)
      }
      else{
        RecipeApiService.deleteCollectionList(recId)
        .then(this.context.deleteCollection(recId))
        .catch(this.context.setError)
      }
    }
  }
  render() {
    const { recipe } = this.props
    // console.log(recipe)
    const {collectionList = new Set(), error} = this.context
    // console.log(error)
    return (
      <>
      
        <button  onClick={() => this.handleClick(recipe.id)}> 
        {!!collectionList && collectionList.has(recipe.id) ? 'delete' : 'add'}
        </button>
        <Link to={`/recipe/${recipe.id}`} className="RecipeListItem_link">
            <RecipeName recipe={recipe}/>
            <RecipeAuthor recipe={recipe}/>
            <RecipeDate recipe={recipe}/>
            
            {/* {TokenService.hasAuthToken() && !!collectionList && collectionList.has(recipe.id) 
            ? <p> {TokenService.readJwtToken().user_id} </p>: ''} */}
        </Link>
      </>
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

