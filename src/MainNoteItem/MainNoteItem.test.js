import React from 'react';
import ReactDOM from 'react-dom';
import MainNoteItem from './MainNoteItem';
import { BrowserRouter } from 'react-router-dom'
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter><MainNoteItem /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});