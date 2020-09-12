import React, { Component } from 'react';
import RecipeListItem from '../RecipeListItem/RecipeListItem';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RecipeApiService from '../services/recipe-api-service';
import TokenService from '../services/token-service';
import RecipeListContext from '../context/RecipeListContext';
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
        <li className='Recipe__list_item' key={recipe.id}>
            {/* <div role='alert'>
                {error && <p className='red'>{error}</p>}
            </div> */}
            <Link to={`/recipe/${recipe.id}`} className="RecipeListItem_link">
                <div className="RecipeListItem_image" style={{backgroundImage: `url(${recipe.img_src})`}}>
                </div>
            </Link>
            <div className="RecipeListItem_group">
                <div className="RecipeListItem_name_favorite_group">
                <Link to={`/recipe/${recipe.id}`} className="RecipeListItem_link">
                    <RecipeName recipe={recipe}/>
                </Link>
                <button type="button" onClick={() => this.deleteRecipe(recipe.id)}> delete </button>
                <button type="button" onClick={() => this.goToEditRecipe(recipe.id)}> Edit </button>
                </div>
                <Link to={`/recipe/${recipe.id}`} className="RecipeListItem_link">
                <RecipeContent recipe={recipe}/>
                </Link>
            </div>
        </li>
    );
  }
  render() {
    const { recipes } = this.props;
    return (
      <ul className="Recipe__list">
        {this.renderRecipes(recipes)}
      </ul>
    );
  }
}


function RecipeName({ recipe }) {
    return (
      <p className='RecipeListItem_name Lustria'>
          {truncate(recipe.name, 20)}
      </p>
    );
  }
  function RecipeContent({recipe}){
    return (
      <p className='RecipeListItem_content Crimson'>
          {truncate(recipe.content, 10, 'split')}
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
  