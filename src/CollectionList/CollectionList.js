import React, { Component } from 'react'
import CollectionListContext from '../context/CollectionListContext'
import RecipeApiService from '../services/recipe-api-service'
import TokenService from '../services/token-service'
import RecipeListItem from '../RecipeListItem/RecipeListItem'
// import './CommentForm.css'

export default class CollectionList extends Component {
  static defaultProps = {
    recipes: []
  };
  static contextType = CollectionListContext

//   handleSubmit = ev => {
//     ev.preventDefault()
//     if (!TokenService.hasAuthToken()) {
//       this.props.history.push('/login')
//     }
//     else{
//       const { recipe } = this.context
//       const { text } = ev.target
//       RecipeApiService.postComment(recipe.id, text.value)
//         .then(this.context.addComment)
//         .then(() => {
//           text.value = ''
//         })
//         .catch(this.context.setError)
//     }
//   }
    componentDidMount() {
        if (TokenService.hasAuthToken()) {
            RecipeApiService.getCollectionList()
            .then(this.context.setCollectionList)
            .catch(this.context.setError)
        }
    }
    renderRecipes(recipes) {
        return recipes.map(recipe => 
                <li className='Recipe__list_item' key={recipe.id}>
                    
                    <RecipeListItem recipe={recipe} />
                </li>
        )   
        }
    
    render() {
        const {collectionList = new Set()} = this.context
        const {recipes} = this.props
        const collectionrecipes = recipes.filter(recipe => collectionList.has(recipe.id))
        return (
            <ul className="Recipe__list">
                {this.renderRecipes(collectionrecipes)}
            </ul>
        )
    }
}
