import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import {
  authorizeReducer,
  loginReducer,
  registerReducer
} from './reducers/auth'
import { profileReducer } from './reducers/profile'
import { userTweetsReducer } from './reducers/tweet'

const reducer = combineReducers({
  authorize: authorizeReducer,
  login: loginReducer,
  profile: profileReducer,
  register: registerReducer,
  userTweets: userTweetsReducer
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
