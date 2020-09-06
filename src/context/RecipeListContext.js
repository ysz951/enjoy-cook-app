import React, { Component } from 'react';

const RecipeListContext = React.createContext({
  recipeList: [],
  categoryList: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setRecipeList: () => {},
  setCategoryList: () => {},
  addRecipe: () => {},
});

export default RecipeListContext;

export class RecipeListProvider extends Component {
  state = {
    recipeList: [],
    categoryList: [],
    error: null,
  };

  setRecipeList = recipeList => {
    this.setState({ recipeList });
  }
  addRecipe = recipe => {
    this.setRecipeList([
      ...this.state.recipeList,
      recipe
    ])
  }
  setCategoryList = categoryList => {
    this.setState({ categoryList });
  }
  setError = error => {
    console.error(error);
    this.setState({ error });
  }

  clearError = () => {
    this.setState({ error: null });
  }

  render() {
    const value = {
      recipeList: this.state.recipeList,
      categoryList: this.state.categoryList,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setRecipeList: this.setRecipeList,
      setCategoryList: this.setCategoryList,
      addRecipe: this.addRecipe,
    };
    return (
      <RecipeListContext.Provider value={value}>
        {this.props.children}
      </RecipeListContext.Provider>
    );
  }
}
