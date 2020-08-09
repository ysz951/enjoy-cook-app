import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RecipeListContext from '../context/RecipeListContext';
import CommentForm from '../CommentForm/CommentForm';
import './RecipePage.css';

export default class RecipePage extends Component {
  static defaultProps = {
    match: { params: {} },
  };

  static contextType = RecipeListContext;


  renderRecipe() {
    const { recipes , comments, users } = this.context;
    const { recipeId } = this.props.match.params;
    const recipe = recipes.find(recipe => recipe.id === Number(recipeId));
    const user =  users.find(user => user.id === recipe.user_id);
    const recipeComments = comments.filter(comment => comment.recipe_id === Number(recipeId));
    return (
        <>
          <h2>{recipe.name}</h2>
          <p>
              <RecipeAuthor user={user}/>
          </p>
          <RecipeContent recipe={recipe} />
          <RecipeComments comments={recipeComments} users={users}/>
          <CommentForm />
        </>
    );
  };

  render() {
    return (
      <section className='RecipePage'>
        {this.renderRecipe()}
      </section>
    );
  };
};


function RecipeAuthor({ user}) {
  return (
    <span className='RecipePage__author'>
      {user.name}
    </span>
  );
};

function RecipeContent({ recipe }) {
  return (
    <p className='RecipePage__content'>
      {recipe.content}
    </p>
  );
};

function RecipeComments({ comments, users  }) {
  return (
    <ul className='RecipePage__comment_list'>
      {comments.map(comment =>
        {
            const user = users.find(user => user.id === comment.user_id);
            
            return (
            <li key={comment.id} className='RecipePage__comment'>
                <p>{comment.content}</p>
                <p> {user.user_name}</p>
            </li>
            );
        }
      )}
    </ul>
  );
};
