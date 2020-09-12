import React from 'react';
import ReactDOM from 'react-dom';
import AuthorRecipeList from './AuthorRecipeList';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AuthorRecipeList/>, div)
  ReactDOM.unmountComponentAtNode(div)
});