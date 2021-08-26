import * as types from '../types'

interface Action {
  type: string
  user: object
  hasUser: boolean
  error?: string
}

const initialState = { loading: false, user: {}, error: '', hasUser: false }

export function authorizeReducer(state = initialState, action: Action) {
  switch (action.type) {
    case types.GET_USER_REQUEST:
      return { loading: true, user: {} }
    case types.GET_USER_SUCCESS:
      return { loading: false, user: action.user, hasUser: true }
    case types.GET_USER_FAILURE:
      return { loading: false, user: {}, error: action.error, hasUser: false }
    default:
      return state
  }
}

export function loginReducer(state = initialState, action: Action) {
  switch (action.type) {
    case types.LOGIN_USER_REQUEST:
      return { loading: true, user: {} }
    case types.LOGIN_USER_SUCCESS:
      return { loading: false, user: action.user }
    case types.LOGIN_USER_FAILURE:
      return { loading: false, user: {} }
    default:
      return state
  }
}

export function registerReducer(state = initialState, action: Action) {
  switch (action.type) {
    case types.REGISTER_USER_REQUEST:
      return { loading: true, user: {} }
    case types.REGISTER_USER_SUCCESS:
      return { loading: false, user: action.user }
    case types.REGISTER_USER_FAILURE:
      return { loading: false, user: {} }
    default:
      return state
  }
}
