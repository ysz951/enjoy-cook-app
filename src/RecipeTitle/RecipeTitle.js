import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CollectionListContext  from '../context/CollectionListContext'
import RecipeApiService from '../services/recipe-api-service'
import TokenService from '../services/token-service'
import './RecipeTitle.css'

export default class RecipeTitle extends Component {
  static defaultProps = {
    recipe: {
      name: ''
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
    // console.log(recipe)
    return (
      <div className="RecipePage_title_collect_group">
        {recipe.name && <RecipeName recipe={recipe}/>}
        <button className="RecipePage_collect_btn" 
            onClick={() => this.handleClick(recipe.id)}
        > 
            {!!collectionList && collectionList.has(recipe.id) 
            ? <FontAwesomeIcon icon='star'/> 
            : <FontAwesomeIcon icon='star' className="light-grey" />}
        </button>
      </div>
    )
  }
}

function RecipeName({ recipe }) {
  return (
    <h2 className='Lustria RecipePage_title'>
        {recipe.name}
        {/* {truncate(recipe.name, 20)} */}
    </h2>
  )
}


function truncate(text, limitLength, method='') {
  switch(method){
    case 'split':
      const words = text.split(' ')
      if (words.length > limitLength) {
        return words.slice(0, limitLength).join(' ') + ' ...'
      }
      return text
    default:
      if (text.length > limitLength) {
        return text.slice(0, limitLength) + ' ...'
      }
      return text
  }
 
}
