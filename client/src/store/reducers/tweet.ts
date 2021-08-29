import * as types from '../types'

interface Action {
  type: string
  error: ''
  tweets: object[]
}

interface State {
  loading: boolean
  tweets: object[]
}

const initialState: State = { loading: false, tweets: [] }

export function homeTweetsReducer(state = initialState, action: Action) {
  switch (action.type) {
    case types.GET_HOME_TWEETS_REQUEST:
      return { loading: true, tweets: [] }
    case types.GET_HOME_TWEETS_SUCCESS:
      return { loading: false, tweets: action.tweets }
    case types.GET_HOME_TWEETS_FAILURE:
      return { loading: false, error: action.error }
    default:
      return state
  }
}

export function userTweetsReducer(state = initialState, action: Action) {
  switch (action.type) {
    case types.GET_USER_TWEETS_REQUEST:
      return { loading: true, tweets: [] }
    case types.GET_USER_TWEETS_SUCCESS:
      return { loading: false, tweets: action.tweets }
    case types.GET_USER_TWEETS_FAILURE:
      return { loading: false, error: action.error }
    default:
      return state
  }
}
