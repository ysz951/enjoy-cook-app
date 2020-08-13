import React, { Component } from 'react'
import RecipeContext, { nullRecipe } from '../context/RecipeContext'
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
  componentWillUnmount() {
    this.context.clearRecipe()
  }
  renderRecipe() {
    const { recipe , comments } = this.context
    // console.log(recipe.author.id)
    return (
        <>
          <h2>{recipe.name}</h2>
          
          <RecipeAuthor recipe={recipe} user_id={this.context.user_id}/>
          
          <RecipeContent recipe={recipe} />
          <RecipeComments comments={comments}/>
          <CommentForm history={this.props.history}/> 
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


function RecipeAuthor({ recipe = nullRecipe,  user_id}) {
  // console.log(recipe.author.user_id,'context_user_id', user_id)
  return (
    
    <p className='RecipePage__author'>
      {recipe.author.id === user_id ? <span className="red"> {recipe.author.user_name} </span>: recipe.author.user_name}
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
