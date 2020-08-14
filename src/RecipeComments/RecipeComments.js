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
    //   console.log(commentId)
      RecipeApiService.deleteComment(commentId)
        .then(res => this.context.deleteComment(commentId))
        .catch(this.context.setError)
  }
  handleSubmit = ev => {
    ev.preventDefault()
    const { recipe } = this.context
    const { text } = ev.target
    RecipeApiService.updateComment(recipe.id, text.value, 1)
        .then(res => this.context.updateComment(text.value, 1))
        .then(() => {
            text.value = ''
        })
        .catch(this.context.setError)
    
  }
  changeClass() {
      console.log('ok')
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
                    <p> {comment.id}</p>
                    <p> {comment.user.id === user_id ? <span className="red"> {comment.user.full_name} </span>: comment.user.full_name}</p>
                    {comment.user.id === user_id ? 
                      <button type='button' onClick={() => this.handleClick(comment.id)}> 
                        delete 
                      </button>
                      : ''
                    }
                    <button onClick={this.changeClass}>change </button>
                    {/* {comment.user.id === user_id ? 
                        <form
                        className='CommentForm'
                        onSubmit={this.handleSubmit}
                      >
                        <textarea
                          className='text'
                          required
                          aria-label='Type a comment...'
                          name='text'
                          id='text'
                          // cols='30'
                          rows='3'
                          placeholder='Type a comment..'
                        />
                        <button type='submit'>
                          Post comment
                        </button>
                      </form>
                      : ''} */}
                </li>   
      )} 
    </ul>
    )
    }
}
