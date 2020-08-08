import React from 'react';
import ReactDOM from 'react-dom';
import EditNote from './EditNote';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditNote />, div);
  ReactDOM.unmountComponentAtNode(div);
});