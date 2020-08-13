import React, { Component } from 'react'

const CollectionListContext = React.createContext({
  collectionList: new Set(),
  error: null,
  setError: () => {},
  clearError: () => {},
  setCollectionList: () => {},
  clearCollectionList: () => {},
})

export default CollectionListContext

export class CollectionListProvider extends Component {
  state = {
    collectionList: new Set(),
    error: null
  }
  setCollectionList = collectionListObject => {
    const collectionList = new Set()
    collectionListObject.forEach(item => {
        collectionList.add(Object.values(item)[0])
    })
    this.setState({ collectionList: collectionList})
  }
  clearCollectionList = () => {
    this.setCollectionList([])
  }
  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  render() {
    const value = {
      collectionList: this.state.collectionList,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setCollectionList: this.setCollectionList,
      clearCollectionList: this.clearCollectionList,
    }
    return (
      <CollectionListContext.Provider value={value}>
        {this.props.children}
      </CollectionListContext.Provider>
    )
  }
}
