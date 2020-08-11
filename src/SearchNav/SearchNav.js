import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import RecipeListContext from '../context/RecipeListContext'
import RecipeApiService from '../services/recipe-api-service'
import './SearchNav.css'
export default class SearchNav extends Component {
  state = { search: "" }
  static contextType = RecipeListContext
  updateName(search){
      this.setState({search});
  }
  handleSubmit = e => {
      e.preventDefault();
      console.log(this.state.search);
  }
  componentDidMount() {
    this.context.clearError()
    RecipeApiService.getCategories()
      .then(this.context.setCategoryList)
      .catch(this.context.setError)
  }
  render() {
    const {categoryList = []} = this.context
    // console.log(categoryList)
    return (
      <div className="SearchNav">
        <CategoryLink categories={categoryList}/>
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <input
            id="SearchForm_search"
            name="search"
            placeholder="search"
            onKeyUp={e => this.updateName(e.target.value)}
            type="text"
          />
          <button type="submit">search</button>
        </form>
      </div>
    )
  }
}
function CategoryLink({categories}) {
  return (
      <div className="Categorylink">
            <NavLink key="all" exact to='/' activeClassName="selected">
              All
            </NavLink>     
          {categories.map(categorie => 
            <Fragment key={categorie.name}>
              <span> </span>
              <NavLink exact to={`/category/${categorie.id}`} activeClassName="selected">
                {categorie.name}
              </NavLink>
            </Fragment>
          )}
      </div>
  )
}