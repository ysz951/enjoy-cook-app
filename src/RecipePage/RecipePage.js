import React, { Component } from 'react'
import RecipeContext from '../context/RecipeContext'
import RecipeApiService from '../services/recipe-api-service'
import CommentForm from '../CommentForm/CommentForm'
import './RecipePage.css'

export default class RecipePage extends Component {
  static defaultProps = {
    // match: { params: {} },
  }

  static contextType = RecipeContext
  componentDidMount() {
    const { recipeId } = this.props
    this.context.clearError()
    RecipeApiService.getRecipe(recipeId)
      .then(this.context.setRecipe)
      .catch(this.context.setError)
    RecipeApiService.getRecipeComments(recipeId)
      .then(this.context.setComments)
      .catch(this.context.setError)
  }

  renderRecipe() {
    const { recipe , comments } = this.context
    return (
        <>
          <h2>{recipe.name}</h2>
          
          <RecipeAuthor recipe={recipe}/>
          
          <RecipeContent recipe={recipe} />
          <RecipeComments comments={comments}/>
          <CommentForm /> 
        </>
    )
  }

  render() {
    return (
      <section className='RecipePage'>
        {this.renderRecipe()}
      </section>
    )
  }
}


function RecipeAuthor({ recipe }) {
  return (
    <p className='RecipePage__author'>
      {recipe.author.user_name}
    </p>
  )
}

function RecipeContent({ recipe }) {
  return (
    <p className='RecipePage__content'>
      {recipe.content}
    </p>
  )
}

function RecipeComments({ comments = [] }) {
  return (
    <ul className='RecipePage__comment_list'>
      {comments.map(comment =>
        <li key={comment.id} className='RecipePage__comment'>
            <p>{comment.content}</p>
            <p> {comment.user.full_name}</p>
        </li>   
      )}
    </ul>
  )
}
