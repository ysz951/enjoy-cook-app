import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import CollectionListContext  from '../context/CollectionListContext'
import RecipeApiService from '../services/recipe-api-service'
import TokenService from '../services/token-service'
import './RecipeListItem.css'

export default class RecipeListItem extends Component {
  static defaultProps = {
    recipe: {
      date_created: '',
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
    else{
      this.props.history.push('/login')
    }
  }
  render() {
    const { recipe } = this.props
    const {collectionList = new Set(), error} = this.context
    // console.log(recipe.img_src)
    return (
      <>
      {/* <img src= 'https://upload.wikimedia.org/wikipedia/commons/4/47/Fried_double-yolk_egg.jpg'/> */}
        <button  className="RecipeListItem_collect_btn" onClick={() => this.handleClick(recipe.id)}> 
        {!!collectionList && collectionList.has(recipe.id) 
          ? <FontAwesomeIcon icon={faStar}/> 
          : <FontAwesomeIcon icon={faStar} className="light-grey" />}
        </button>
        <Link to={`/recipe/${recipe.id}`} className="RecipeListItem_link">
          <div className="RecipeListItem_image">
            {recipe.img_src ? <img src={recipe.img_src} alt='err'/> : ''}
          </div>
          <RecipeName recipe={recipe}/>
          <RecipeAuthor recipe={recipe}/>
          <RecipeDate recipe={recipe}/>
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

