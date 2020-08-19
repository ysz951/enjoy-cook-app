import React, { Component } from 'react'
import RecipeContext from '../context/RecipeContext'
import RecipeApiService from '../services/recipe-api-service'
import TokenService from '../services/token-service'
import './CommentForm.css'

export default class CommentForm extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    }
  };
  static contextType = RecipeContext

  handleSubmit = ev => {
    ev.preventDefault()
    if (!TokenService.hasAuthToken()) {
      this.props.history.push('/login')
    }
    else{
      const { recipe } = this.context
      const { text } = ev.target
      RecipeApiService.postComment(recipe.id, text.value)
        .then(this.context.addComment)
        .then(() => {
          text.value = ''
        })
        .catch(this.context.setError)
    }
  }

  render() {
    return (
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
    )
  }
}
