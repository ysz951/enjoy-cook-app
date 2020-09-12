import React, { Component } from 'react';
import RecipeListContext from '../context/RecipeListContext';
import RecipeApiService from '../services/recipe-api-service';
import AuthorRecipeList from '../AuthorRecipeList/AuthorRecipeList';
// import './CollectionListPage.css';

export default class AuthorRecipeListPage extends Component {  
  static contextType = RecipeListContext;
  componentDidMount() {
      this.context.clearError();
      RecipeApiService.getAuthorRecipes()
      .then(this.context.setRecipeList)
      .catch(this.context.setError)
  }
  render() {
    const {recipeList = [], error} = this.context;
    return (
      <>
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <h2 className="Favorite_title">Your Recipes</h2>
        <AuthorRecipeList recipes={recipeList} history={this.props.history}/>
      </>
    );
  }
}
