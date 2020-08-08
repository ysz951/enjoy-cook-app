import React from 'react';
import ReactDOM from 'react-dom';
import EditFolder from './EditFolder';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditFolder />, div);
  ReactDOM.unmountComponentAtNode(div);
});