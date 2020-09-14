import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RecipeApiService from '../services/recipe-api-service';
import RecipeListContext from '../context/RecipeListContext';
import './AuthorRecipeList.css';

export default class AuthorRecipeList extends Component {
  static defaultProps = {
    recipes: [],
    history: {
      push: () => {},
    }
  };
  static contextType = RecipeListContext;
  deleteRecipe = (repId) => {
      RecipeApiService.deleteAuthorRecipe(repId)
        .then(res => {this.context.deleteRecipe(repId)})
        .catch(this.context.setError)
  }

  goToEditRecipe = (repId) => {
    this.props.history.push(`/users/recipes/${repId}`)
  }

  renderRecipes(recipes) {
    return recipes.map(recipe =>
        <li className='Publish__listItem' key={recipe.id}>
            <div className="Publish__listItemGroup">
                <div className="RecipiListItem_nameBtnGroup">
                  <Link to={`/recipe/${recipe.id}`} className="RecipeListItem_link">
                      <RecipeName recipe={recipe}/>
                  </Link>
                  <div className="Publish_handleBtnGroup">
                    <button type="button" onClick={() => this.deleteRecipe(recipe.id)}> 
                      <FontAwesomeIcon icon="trash-alt"/>
                      {' '}
                      Delete  
                    </button>
                    <button type="button" onClick={() => this.goToEditRecipe(recipe.id)}> 
                      <FontAwesomeIcon icon="edit"/>
                      {' '}
                      Edit 
                    </button>
                  </div>
                </div>
                <RecipeContent recipe={recipe}/>
            </div>
        </li>
    );
  }
  render() {
    const { recipes } = this.props;
    return (
      <ul className="Publish_recipeList">
        {this.renderRecipes(recipes)}
      </ul>
    );
  }
}


function RecipeName({ recipe }) {
    return (
      <p className='Publish_itemName Lustria bold'>
          {recipe.name}
      </p>
    );
  }
  function RecipeContent({recipe}){
    return (
      <p className='Publish_content Crimson'>
          {truncate(recipe.content, 50, 'split')}
      </p>
    );
  }
  
  function truncate(text, limitLength, method='') {
    switch(method){
      case 'split':
        const words = text.split(' ');
        if (words.length > limitLength) {
          return words.slice(0, limitLength).join(' ') + ' ...';
        }
        return text;
      default:
        if (text.length > limitLength) {
          return text.slice(0, limitLength) + ' ...';
        }
        return text;
    };
  }
  
  function RecipeAuthor({ recipe }) {
      return (
      <p className='RecipeListItem_author'>
          By <span className="bold Acme">{recipe.author.user_name}</span>
      </p>
      );
  }
  
  function RecipeNumberOfComments({recipe}){
    return (
      <p className='RecipeListItem_NumberOfComments'>
          {recipe.number_of_comments} <FontAwesomeIcon icon='comment-dots'/> 
      </p>
    );
  }
  