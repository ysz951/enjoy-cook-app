import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RecipeListContext from '../context/RecipeListContext';
import { format as formatDate } from 'date-fns'
import './RecipeListItem.css';

export default class RecipeListItem extends Component {
  static contextType = RecipeListContext
  getRecipeAuthor = (recipe) => {
      const { users } = this.context
      return users.find(user => user.id === recipe.user_id)

  }
  render() {
    const { recipe } = this.props
    const user = this.getRecipeAuthor(recipe)
   
    return (
        <Link to={`/recipe/${recipe.id}`} className='RecipeListItem'>
            <RecipeName recipe={recipe}/>
            <RecipeAuthor user={user}/>
            <RecipeDate recipe={recipe}/>
        </Link>
    //   <Link to={`/recipe/${recipe.id}`} className='RecipeListItem'>
    //     <header className='RecipeListItem__header'>
    //       <h2 className='RecipeListItem__heading'>
    //         {recipe.title}
    //       </h2>
    //       <RecipeDate recipe={recipe} />
    //     </header>
    //     <footer className='RecipeListItem__footer'>
    //       <RecipeStyle recipe={recipe} />
    //       {recipe.author.id && <>
    //         <Hyph />
    //         <RecipeAuthor recipe={recipe} />
    //       </>}
    //       <RecipeCommentCount recipe={recipe} />
    //     </footer>
    //   </Link>
    )
  }
}

function RecipeName({ recipe }) {
  return (
    <p className='RecipeListItem__name'>
        by {recipe.name}
    </p>
  )
}

function RecipeAuthor({ user }) {
    return (
    <p className='RecipeListItem__author'>
        {user.user_name}
    </p>
    )
}

function RecipeDate({ recipe }) {
  return (
    <p className='RecipeListItem__date'>
        {recipe.modified.slice(0, 10)}
    </p>
  )
}

// function RecipeAuthor({ recipe }) {
//   return (
//     <span className='RecipeListItem__author'>
//       {recipe.author.full_name}
//     </span>
//   )
// }

// function RecipeCommentCount({ recipe }) {
//   return (
//     <span
//       className='RecipeListItem__comment-count fa-layers fa-fw'
//     >
//       <FontAwesomeIcon size='lg' icon='comment' />
//       <span
//         className='fa-layers-text fa-inverse'>
//         {recipe.number_of_comments}
//       </span>
//     </span>
//   )
// }
