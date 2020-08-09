import React, { Component } from 'react'
import STORE from '../dummy-story'
const RecipeListContext = React.createContext({
  recipes: [],
  categories: [],
  comments: [],
  users: [],
})

export default RecipeListContext

export class RecipeListProvider extends Component {
  state = {
    recipes: STORE.recipes,
    categories: STORE.categories,
    users: STORE.users,
    comments: STORE.comments,
  }

  render() {
    const value = {
      recipes: this.state.recipes,
      categories: this.state.categories,
      users: this.state.users,
      comments: this.state.comments
    }
    return (
      <RecipeListContext.Provider value={value}>
        {this.props.children}
      </RecipeListContext.Provider>
    )
  }
}
