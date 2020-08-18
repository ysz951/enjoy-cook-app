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

  deleteComment = (commentId) => {
      RecipeApiService.deleteComment(commentId)
        .then(res => this.context.deleteComment(commentId))
        .catch(this.context.setError)
  }
  submitUpdateComment = ev => {
    ev.preventDefault()
    const { recipe } = this.context
    const { updateComment } = ev.target
    RecipeApiService.updateComment(recipe.id, updateComment.value, this.state.selectedCommentId)
        .then(res => this.context.updateComment(updateComment.value, this.state.selectedCommentId))
        .then(() => {
          updateComment.value = ''
            this.setState({
              textAreaActive: false,
              selectedCommentId: null,
            })
        })
        .catch(this.context.setError)
    
  }
  changeComment = (commentId) => {
      this.setState({
        textAreaActive: true,
        // textAreaActive: commentId === this.state.selectedCommentId 
        //                 ? !this.state.textAreaActive : true,
        selectedCommentId: commentId,
      })
  }
  closeTextArea = () => {
    this.setState({
      textAreaActive: false,
      selectedCommentId: null,
    })
  }

  manipulateCommentButton = (comment) => {
    return(
      <div className="Recipepage__comment_manipulateCommentButton">
        <button type='button' onClick={() => this.deleteComment(comment.id)}> 
          delete 
        </button>
        <button onClick={() => this.changeComment(comment.id)}>
          change 
        </button> 
      </div>
    )
  }
  commentContentArea = (comment, user_id) => {
    return (
      this.state.textAreaActive 
      && comment.user.id === user_id 
      && comment.id === this.state.selectedCommentId
      ? <form
          className='Recipepage__comment_manipulateCommentForm'
          onSubmit={this.submitUpdateComment}
        > 
          <textarea
            className='Recipepage__comment_manipulateCommentForm_textarea'
            required
            aria-label='Type a comment...'
            name='updateComment'
            id='updateComment'
            // cols='30'
            defaultValue={comment.content}
            rows='3'
            // placeholder='Type a comment..'
          />
          <div className="Recipepage__comment_CommentFormButton">
            <button type='button' onClick={this.closeTextArea}>
              Close
            </button>
            <button type='submit'>
              Post
            </button>
          </div>
        </form>
      : <p className="RecipePage__coment_content">{comment.content}</p>
    )
  }
  render() {
    const user_id = TokenService.hasAuthToken() ? TokenService.readJwtToken().user_id : null
    const { comments = [] } = this.context
    return (
        <ul className='RecipePage__comment_list'>
            {comments.map(comment =>
              <li key={comment.id} className='RecipePage__comment'>
                { this.commentContentArea(comment, user_id)}
                <div className="RecipePage__comment_poster_control_group">
                  <p className="RecipePage__comment_poster"> 
                    {comment.user.id === user_id 
                    ? <span className="brown"> {comment.user.full_name}</span>
                    : comment.user.full_name}
                  </p>
                  { comment.user.id === user_id 
                    ? !this.state.textAreaActive && !this.state.selectedCommentId 
                    ? this.manipulateCommentButton(comment)
                    : comment.id !== this.state.selectedCommentId && this.state.textAreaActive 
                    ? this.manipulateCommentButton(comment)
                    : ''
                    : ''
                  }
                </div>
              </li>   
            )} 
    </ul>
  )}
}
