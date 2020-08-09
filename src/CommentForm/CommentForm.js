import React, { Component } from 'react'
import RecipeListContext from '../context/RecipeListContext'
import './CommentForm.css'

export default class CommentForm extends Component {
  static contextType = RecipeListContext

  handleSubmit = ev => {
    ev.preventDefault()
    const { text } = ev.target
    console.log(text.value)
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
