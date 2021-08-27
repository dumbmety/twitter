import * as types from '../types'

interface Action {
  type: string
  user: object
  error?: string
}

const initialState = {
  loading: false,
  isExist: false,
  error: '',
  user: {}
}

export function profileReducer(state = initialState, action: Action) {
  switch (action.type) {
    case types.GET_USER_PROFILE_REQUEST:
      return { loading: true }
    case types.GET_USER_PROFILE_SUCCESS:
      return { loading: false, user: action.user, isExist: true }
    case types.GET_USER_PROFILE_FAILURE:
      return { loading: false, user: {}, error: action.error, isExist: false }
    default:
      return state
  }
}
