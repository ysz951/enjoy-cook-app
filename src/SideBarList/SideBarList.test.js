import React from 'react';
import ReactDOM from 'react-dom';
import SideBarList from './SideBarList';
import { BrowserRouter } from 'react-router-dom'
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><SideBarList /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});