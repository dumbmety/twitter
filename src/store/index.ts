import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"

import {
  authorizeReducer,
  loginReducer,
  registerReducer,
} from "./reducers/auth"
import { notificationsReducer } from "./reducers/notifications"
import { profileReducer } from "./reducers/profile"
import { userTweetsReducer, homeTweetsReducer } from "./reducers/tweet"

const reducer = combineReducers({
  authorize: authorizeReducer,
  login: loginReducer,
  profile: profileReducer,
  register: registerReducer,
  userTweets: userTweetsReducer,
  homeTweets: homeTweetsReducer,
  notifications: notificationsReducer,
})

const initialState = {}
const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
