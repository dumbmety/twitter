import { Dispatch } from "redux"
import * as types from "../types"

import * as profileService from "../../services/profile"
import * as userService from "../../services/user"

export const getUserProfile =
  (username: string) => async (dispatch: Dispatch) => {
    dispatch({ type: types.GET_USER_PROFILE_REQUEST })

    try {
      const res = await profileService.get(username)

      res.success
        ? dispatch({ type: types.GET_USER_PROFILE_SUCCESS, user: res.user })
        : dispatch({ type: types.GET_USER_PROFILE_FAILURE, error: res.message })
    } catch (error) {
      dispatch({ type: types.GET_USER_PROFILE_FAILURE, error })
    }
  }

export const updateUserProfile = (id: string, data: object) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: types.UPDATE_USER_PROFILE_REQUEST })

    try {
      const res = await userService.updateUser(id, data)

      res.success
        ? dispatch({ type: types.UPDATE_USER_PROFILE_SUCCESS, user: res.user })
        : dispatch({
            type: types.UPDATE_USER_PROFILE_FAILURE,
            error: res.message,
          })
    } catch (error) {
      dispatch({ type: types.UPDATE_USER_PROFILE_FAILURE, error })
    }
  }
}
