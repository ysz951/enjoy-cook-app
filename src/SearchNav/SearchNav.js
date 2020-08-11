import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import RecipeListContext from '../context/RecipeListContext'
import RecipeApiService from '../services/recipe-api-service'
import './SearchNav.css'
export default class SearchNav extends Component {
  state = { query: "" }
  static contextType = RecipeListContext
  updateQuery(query){
      this.setState({query})
  }
  handleSubmit = e => {
      e.preventDefault();
      const {history} = this.props
      // console.log(history)
       history.push(this.state.query ? `/search/${this.state.query}` : '/')
      // history.push(`/search/${this.state.query}`)
  }
  componentDidMount() {
    this.context.clearError()
    RecipeApiService.getCategories()
      .then(this.context.setCategoryList)
      .catch(this.context.setError)
  }
  render() {
    const {categoryList = []} = this.context
    
    return (
      <div className="SearchNav">
        <CategoryLink categories={categoryList}/>
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <input
            id="SearchForm_search"
            name="search"
            placeholder="search"
            onKeyUp={e => this.updateQuery(e.target.value)}
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