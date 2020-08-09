import React, { Component } from 'react';
import RecipeListContext from '../context/RecipeListContext';
import SearchNav from '../SearchNav/SearchNav';
import RecipeList from '../RecipeList/RecipeList'
import './RecipeListPage.css'
export default class RecipeListPage extends Component {
  static contextType = RecipeListContext;

  render() {
    const { recipes= [] } = this.context;
    return (
      <section>
          <SearchNav />
          <RecipeList recipes={recipes}/>
      </section>
    );
  };
};
