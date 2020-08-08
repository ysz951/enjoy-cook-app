import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFrog, faDrumstickBite, faListUl, faListOl, faPenAlt, faGlobeAmericas, faBookOpen, faComment, faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { RecipeListProvider } from './context/RecipeListContext'
library.add(
  faFrog,
  faListUl, // style: listicle
  faListOl, // style: howto
  faGlobeAmericas, // style: news
  faPenAlt, // style: interview
  faBookOpen, // style: story
  faComment,
  faQuoteLeft,
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


