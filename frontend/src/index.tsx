import 'simplebar/dist/simplebar.min.css'

import React from 'react'
import ReactDOM from 'react-dom'

import App from './containers/App'
import GlobalStyles from './styles/GlobalStyles'

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles theme="dark" />
    <App />
  </React.StrictMode>,
  document.getElementById('twitter-root')
)
