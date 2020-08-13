import React, { Component } from 'react'

export const nullRecipe = {
  author: {},
  tags: [],
}

const RecipeContext = React.createContext({
  recipe: nullRecipe,
  comments: [],
  error: null,
  user_id: null,
  setError: () => {},
  clearError: () => { },
  setRecipe: () => {},
  clearRecipe: () => {},
  setComments: () => {},
  addComment: () => {},
  setLogInUser: () => {},
  clearLogInUser: () => {},
})

export default RecipeContext

export class RecipeProvider extends Component {
  state = {
    recipe: nullRecipe,
    error: null,
    user_id: null,
  };

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setLogInUser = user_id => {
    this.setState({ user_id })
  }

  clearLogInUser = () => {
    this.setState({user_id: null})
  }

  setRecipe = recipe => {
    this.setState({ recipe })
  }

  setComments = comments => {
    this.setState({ comments })
  }

  clearRecipe = () => {
    this.setRecipe(nullRecipe)
    this.setComments([])
  }

  addComment = comment => {
    this.setComments([
      ...this.state.comments,
      comment
    ])
  }

  render() {
    const value = {
      recipe: this.state.recipe,
      comments: this.state.comments,
      error: this.state.error,
      user_id: this.state.user_id,
      setError: this.setError,
      clearError: this.clearError,
      setRecipe: this.setRecipe,
      setComments: this.setComments,
      clearRecipe: this.clearRecipe,
      addComment: this.addComment,
      setLogInUser: this.setLogInUser,
      clearLogInUser: this.clearLogInUser,
    }
    return (
      <RecipeContext.Provider value={value}>
        {this.props.children}
      </RecipeContext.Provider>
    )
  }
}
