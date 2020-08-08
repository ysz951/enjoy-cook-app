import React from 'react';
import ReactDOM from 'react-dom';
import MainNoteSelectedList from './MainNoteSelectedList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainNoteSelectedList />, div);
  ReactDOM.unmountComponentAtNode(div);
});