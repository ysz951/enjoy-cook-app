import React, { Component } from 'react'
import RecipeContext  from '../context/RecipeContext'
import RecipeApiService from '../services/recipe-api-service'
import TokenService from '../services/token-service'
import './RecipeComments.css'

export default class RecipeComments extends Component {
  static defaultProps = {
  }
  state = {
    textAreaActive: false,
    selectedCommentId: null,
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
      RecipeApiService.deleteComment(commentId)
        .then(res => this.context.deleteComment(commentId))
        .catch(this.context.setError)
  }
  handleSubmit = ev => {
    ev.preventDefault()
    const { recipe } = this.context
    const { text } = ev.target
    RecipeApiService.updateComment(recipe.id, text.value, this.state.selectedCommentId)
        .then(res => this.context.updateComment(text.value, this.state.selectedCommentId))
        .then(() => {
            text.value = ''
            this.setState({
              textAreaActive: false,
              selectedCommentId: null,
            }
            )
        })
        .catch(this.context.setError)
    
  }
  changeComment = (commentId) => {
      this.setState({
        textAreaActive: commentId === this.state.selectedCommentId 
                        ? !this.state.textAreaActive : true,
        selectedCommentId: commentId,
      })
  }
  closeTextArea = () => {
    this.setState({
      textAreaActive: false,
      selectedCommentId: null,
    })
  }
  render() {
    const user_id = TokenService.hasAuthToken() ? TokenService.readJwtToken().user_id : null
    const { comments = [] } = this.context
    // console.log(recipe.author.id)
    return (
        <ul className='RecipePage__comment_list'>
            {comments.map(comment =>
              <li key={comment.id} className='RecipePage__comment'>
                  {this.state.textAreaActive 
                  && comment.user.id === user_id 
                  && comment.id === this.state.selectedCommentId
                  ? <form
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
                        defaultValue={comment.content}
                        rows='3'
                        placeholder='Type a comment..'
                      />
                      <button type='submit'>
                        Post
                      </button>
                      <button type='button' onClick={this.closeTextArea}>
                        Close
                      </button>
                    </form>
                  : <p className="RecipePage__coment_content">{comment.content}</p>
                    }
                  <p> 
                    {comment.user.id === user_id ? <span className="red"> {comment.user.full_name} </span>: comment.user.full_name}
                  </p>
                  { comment.user.id === user_id 
                    ? !this.state.textAreaActive && !this.state.selectedCommentId 
                    ? <>
                        <button type='button' onClick={() => this.handleClick(comment.id)}> 
                          delete 
                        </button>
                        <button onClick={() => this.changeComment(comment.id)}>change </button> 
                      </>
                    : comment.id !== this.state.selectedCommentId && this.state.textAreaActive 
                    ? <>
                        <button type='button' onClick={() => this.handleClick(comment.id)}> 
                          delete 
                        </button>
                        <button onClick={() => this.changeComment(comment.id)}>change </button> 
                      </>
                    : ''
                    : ''
                  }
                  {/* {comment.user.id === user_id 
                  ? 
                  : ""} */}
              </li>   
            )} 
    </ul>
  )}
}
