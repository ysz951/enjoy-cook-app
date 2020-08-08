import React from 'react';
import ReactDOM from 'react-dom';
import MainNoteSelectedItem from './MainNoteSelectedItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainNoteSelectedItem />, div);
  ReactDOM.unmountComponentAtNode(div);
});