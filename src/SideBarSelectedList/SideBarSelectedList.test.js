import React from 'react';
import ReactDOM from 'react-dom';
import SideBarSelectedList from './SideBarSelectedList';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SideBarSelectedList />, div);
  ReactDOM.unmountComponentAtNode(div);
});