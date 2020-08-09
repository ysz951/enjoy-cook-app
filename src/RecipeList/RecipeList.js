import React, { Component } from 'react'
import RecipeListItem from '../RecipeListItem/RecipeListItem'
import './RecipeList.css'
export default class RecipeList extends Component {
  renderRecipes(recipes) {
    return recipes.map(recipe =>
        <li className='Recipe__list_item' key={recipe.id}>
            <RecipeListItem
                recipe={recipe}
            />
        </li>
    );
  };
  render() {
    const { recipes } = this.props
    return (
          <ul className="Recipe__list">
            {this.renderRecipes(recipes)}
          </ul>
    );
  };
};
