import { Dispatch } from "redux"
import * as types from "../types"
import * as notificationService from "../../services/notification"

export const getNotifications = () => async (dispatch: Dispatch) => {
  dispatch({ type: types.GET_NOTIFICATIONS_REQUEST })

  try {
    const res = await notificationService.getNotifications()

    res.success
      ? dispatch({
          type: types.GET_NOTIFICATIONS_SUCCESS,
          notifications: res.notifications,
        })
      : dispatch({ type: types.GET_NOTIFICATIONS_FAILURE, error: res.message })
  } catch (error) {
    dispatch({ type: types.GET_NOTIFICATIONS_FAILURE, error })
  }
}
