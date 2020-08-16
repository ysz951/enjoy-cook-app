import React, { Component } from 'react'
import RecipeContext, { nullRecipe } from '../context/RecipeContext'
import RecipeApiService from '../services/recipe-api-service'
import CommentForm from '../CommentForm/CommentForm'
import RecipeComments from '../RecipeComments/RecipeComments'
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
    // RecipeApiService.getRecipeComments(recipeId)
    //   .then(this.context.setComments)
    //   .catch(this.context.setError)
  }
  componentWillUnmount() {
    this.context.clearRecipe()
  }
  renderRecipe() {
    const { recipe } = this.context
    
    return (
        <>
          <h2>{recipe.name}</h2>
          
          <RecipeAuthor recipe={recipe}/>
          
          <RecipeContent recipe={recipe} />
          <RecipeComments recipeId={this.props.recipeId}/>
          <CommentForm history={this.props.history} location = {this.props.location}/> 
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


function RecipeAuthor({ recipe = nullRecipe}) {
  // console.log(recipe.author.user_id,'context_user_id', user_id)
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

// function RecipeComments({ comments = [] ,user_id}) {
//   return (
//     <ul className='RecipePage__comment_list'>
//       {comments.map(comment =>
//         <li key={comment.id} className='RecipePage__comment'>
//             <p>{comment.content}</p>
//             <p> {comment.user.id === user_id ? <span className="red"> {comment.user.full_name} </span>: comment.user.full_name}</p>
//             
//         </li>   
//       )}
//     </ul>
//   )
// }
