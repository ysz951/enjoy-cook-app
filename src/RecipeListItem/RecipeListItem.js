import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RecipeListContext from '../context/RecipeListContext';
import './RecipeListItem.css';

export default class RecipeListItem extends Component {
  static contextType = RecipeListContext;
  getRecipeAuthor = (recipe) => {
      const { users } = this.context;
      return users.find(user => user.id === recipe.user_id);
  }
  render() {
    const { recipe } = this.props;
    const user = this.getRecipeAuthor(recipe);
    return (
        <Link to={`/recipe/${recipe.id}`} className="Recipe__list_item_link">
            <RecipeName recipe={recipe}/>
            <RecipeAuthor user={user}/>
            <RecipeDate recipe={recipe}/>
        </Link>
    );
  };
};

function RecipeName({ recipe }) {
  return (
    <p className='RecipeListItem__name'>
        {recipe.name}
    </p>
  );
};

function RecipeAuthor({ user }) {
    return (
    <p className='RecipeListItem__author'>
        by {user.user_name}
    </p>
    );
};

function RecipeDate({ recipe }) {
  return (
    <p className='RecipeListItem__date'>
        {recipe.modified.slice(0, 10)}
    </p>
  );
};

