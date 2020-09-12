import React from 'react';
import ReactDOM from 'react-dom';
import AuthorRecipeListPage from './AuthorRecipeListPage';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AuthorRecipeListPage />, div)
  ReactDOM.unmountComponentAtNode(div)
});