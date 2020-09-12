import React from 'react';
import ReactDOM from 'react-dom';
import EditAuthorRecipe from './EditAuthorRecipe';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditAuthorRecipe />, div)
  ReactDOM.unmountComponentAtNode(div)
});