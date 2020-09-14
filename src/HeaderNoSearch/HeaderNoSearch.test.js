import React from 'react';
import ReactDOM from 'react-dom';
import HeaderNoSearch from './HeaderNoSearch';
import { BrowserRouter } from 'react-router-dom';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
        <HeaderNoSearch />
    </BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
});