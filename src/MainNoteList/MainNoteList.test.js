import React from 'react';
import ReactDOM from 'react-dom';
import MainNoteList from './MainNoteList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainNoteList />, div);
  ReactDOM.unmountComponentAtNode(div);
});