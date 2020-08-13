import React, { Component } from 'react'
import RecipeContext  from '../context/RecipeContext'
import RecipeApiService from '../services/recipe-api-service'
import TokenService from '../services/token-service'
import './RecipeComments.css'

export default class RecipeComments extends Component {
  static defaultProps = {
    // match: { params: {} },
  }

  static contextType = RecipeContext
  componentDidMount() {
    const { recipeId } = this.props
    this.context.clearError()
    RecipeApiService.getRecipeComments(recipeId)
      .then(this.context.setComments)
      .catch(this.context.setError)
  }

  handleClick = (commentId) => {
      console.log(commentId)
      RecipeApiService.deleteComment(commentId)
        .then(res => this.context.deleteComment(commentId))
        .catch(this.context.setError)
    
  }

  render() {
    const user_id = TokenService.hasAuthToken() ? TokenService.readJwtToken().user_id : null
    const { comments = [] } = this.context
    // console.log(recipe.author.id)
    return (
        <ul className='RecipePage__comment_list'>
            {comments.map(comment =>
                <li key={comment.id} className='RecipePage__comment'>
                    <p>{comment.content}</p>
                    <p> {comment.user.id === user_id ? <span className="red"> {comment.user.full_name} </span>: comment.user.full_name}</p>
                    {comment.user.id === user_id ? 
                        <button type='button' onClick={() => this.handleClick(comment.id)}> delete </button> 
                        : ''}
                </li>   
      )} 
    </ul>
    )
    }
}
