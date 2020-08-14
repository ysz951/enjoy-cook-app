import React, { Component } from 'react'
import RecipeListContext from '../context/RecipeListContext'
import RecipeApiService from '../services/recipe-api-service'
import TokenService from '../services/token-service'
import CollectionList from '../CollectionList/CollectionList'
// import './CommentForm.css'

export default class CollectionListPage extends Component {
//   static defaultProps = {
//     history: {
//       push: () => {},
//     }
//   };
  static contextType = RecipeListContext

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
        this.context.clearError()
        RecipeApiService.getRecipes()
        .then(this.context.setRecipeList)
        .catch(this.context.setError)
    }
    render() {
        const {recipeList = []} = this.context
        return (
          // <p>{TokenService.readJwtToken().user_id}</p>
        <CollectionList recipes={recipeList}/>
        )
    }
}
