import * as types from "../types"

interface Action {
  type: string
  notifications: object[]
  error?: string
}

const initialState = { loading: false, error: "", notifications: [] }

export function notificationsReducer(state = initialState, action: Action) {
  switch (action.type) {
    case types.GET_NOTIFICATIONS_REQUEST:
      return { loading: true }
    case types.GET_NOTIFICATIONS_SUCCESS:
      return { loading: false, notifications: action.notifications }
    case types.GET_NOTIFICATIONS_FAILURE:
      return { loading: false, notifications: [], error: action.error }
    default:
      return state
  }
}
