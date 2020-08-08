import React from 'react';
import ReactDOM from 'react-dom';
import MainContent from './MainContent';
import { BrowserRouter } from 'react-router-dom'
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><MainContent /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});