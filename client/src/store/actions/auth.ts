import { Dispatch } from 'redux'
import * as types from '../types'
import * as authService from '../../services/auth'

interface User {
  email: string
  password: string
}

interface RegisterUser {
  name: string
  username: string
  email: string
  password: string
}

export const getUser = () => async (dispatch: Dispatch) => {
  dispatch({ type: types.GET_USER_REQUEST })

  try {
    const res = await authService.getLoggedInUser()

    res.success
      ? dispatch({ type: types.GET_USER_SUCCESS, user: res.user })
      : dispatch({ type: types.GET_USER_FAILURE, error: res.message })
  } catch (error) {
    dispatch({ type: types.GET_USER_FAILURE, error })
  }
}

export const loginUser = (user: User) => async (dispatch: Dispatch) => {
  const { email, password } = user
  dispatch({ type: types.LOGIN_USER_REQUEST })

  try {
    const { data } = await authService.login({ email, password })
    dispatch({ type: types.LOGIN_USER_SUCCESS, user: data.user })
  } catch (error) {
    dispatch({ type: types.LOGIN_USER_FAILURE, error })
  }
}

export const registerUser =
  (user: RegisterUser) => async (dispatch: Dispatch) => {
    const { name, username, email, password } = user
    dispatch({ type: types.REGISTER_USER_REQUEST })

    try {
      const res = await authService.register({
        name,
        username,
        email,
        password
      })

      res.success
        ? dispatch({ type: types.REGISTER_USER_SUCCESS, user: res.user })
        : dispatch({ type: types.REGISTER_USER_FAILURE, error: res.message })
    } catch (error) {
      dispatch({ type: types.REGISTER_USER_FAILURE, error })
    }
  }
