import React, { Component } from 'react';
import RecipeListContext from '../context/RecipeListContext';
import RecipeListItem from '../RecipeListItem/RecipeListItem';
import CategoryLink from '../CategoryLink/CategoryLink';
export default class CategoryListPage extends Component {
  static contextType = RecipeListContext;

  renderRecipes() {
    const { recipes= [] } = this.context;
    const { categoryId } = this.props.match.params;
    return recipes.filter(recipe => recipe.category_id === Number(categoryId)).map(recipe =>
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
