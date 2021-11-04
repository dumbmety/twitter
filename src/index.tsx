import 'simplebar/dist/simplebar.min.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './containers/App'
import GlobalStyles from './styles/GlobalStyles'
import store from './store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyles theme="dark" />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('twitter-root')
)
