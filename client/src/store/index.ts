import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import {
  authorizeReducer,
  loginReducer,
  registerReducer
} from './reducers/auth'

const reducer = combineReducers({
  authorize: authorizeReducer,
  login: loginReducer,
  register: registerReducer
})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, applyMiddleware(...middleware))

export default store
