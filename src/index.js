import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from "react-router-dom"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDrumstickBite } from '@fortawesome/free-solid-svg-icons'
import { RecipeListProvider } from './context/RecipeListContext'
import { RecipeProvider } from './context/RecipeContext'
library.add(
  faDrumstickBite
)

ReactDOM.render(
  <BrowserRouter>
    <RecipeListProvider>
      <RecipeProvider>
        <App />
      </RecipeProvider>
    </RecipeListProvider> 
  </BrowserRouter>,
  document.getElementById('root')
)


