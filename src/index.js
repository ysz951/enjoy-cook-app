import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDrumstickBite } from '@fortawesome/free-solid-svg-icons'
import { RecipeListProvider } from './context/RecipeListContext'
library.add(
  faDrumstickBite
);

ReactDOM.render(
  <BrowserRouter>
    <RecipeListProvider >
      <App />
    </RecipeListProvider > 
  </BrowserRouter>,
  document.getElementById('root')
);


