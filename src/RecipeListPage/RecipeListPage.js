import React, { Component } from 'react';
import RecipeListContext from '../context/RecipeListContext';
import RecipeListItem from '../RecipeListItem/RecipeListItem';
import CategoryLink from '../CategoryLink/CategoryLink';
export default class RecipeListPage extends Component {
  static contextType = RecipeListContext;

  renderRecipes() {
    const { recipes= [] } = this.context;
    return recipes.map(recipe =>
      <RecipeListItem
        key={recipe.id}
        recipe={recipe}
      />
    );
  };

  render() {

    return (
      <section>
          <CategoryLink/>
          {this.renderRecipes()}
      </section>
    );
  };
};
