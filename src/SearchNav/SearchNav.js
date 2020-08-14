import React, { Component } from 'react'

import RecipeListContext from '../context/RecipeListContext'
import RecipeApiService from '../services/recipe-api-service'
import CategoryLink from '../CategoryLink/CategoryLink'
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

