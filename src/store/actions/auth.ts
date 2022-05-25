import { Dispatch } from "redux"
import * as types from "../types"

import * as authService from "../../services/auth"
import * as tweetService from "../../services/tweet"

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
  dispatch({ type: types.GET_AUTHORIZE_USER_REQUEST })

  try {
    const res = await authService.getLoggedInUser()

    res.success
      ? dispatch({ type: types.GET_AUTHORIZE_USER_SUCCESS, user: res.user })
      : dispatch({ type: types.GET_AUTHORIZE_USER_FAILURE, error: res.message })
  } catch (error) {
    dispatch({ type: types.GET_AUTHORIZE_USER_FAILURE, error })
  }
}

export const getHomeTweets = () => async (dispatch: Dispatch) => {
  dispatch({ type: types.GET_HOME_TWEETS_REQUEST })

  try {
    const res = await tweetService.getHomeTweets()

    res.success
      ? dispatch({ type: types.GET_HOME_TWEETS_SUCCESS, tweets: res.tweets })
      : dispatch({ type: types.GET_HOME_TWEETS_FAILURE, error: res.message })
  } catch (error) {
    dispatch({ type: types.GET_HOME_TWEETS_FAILURE, error })
  }
}

export const loginUser = (user: User) => async (dispatch: Dispatch) => {
  const { email, password } = user
  dispatch({ type: types.LOGIN_USER_REQUEST })

  try {
    const { data }: any = await authService.login({ email, password })
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
      const res: any = await authService.register({
        name,
        username,
        email,
        password,
      })

      res.success
        ? dispatch({ type: types.REGISTER_USER_SUCCESS, user: res.user })
        : dispatch({ type: types.REGISTER_USER_FAILURE, error: res.message })
    } catch (error) {
      dispatch({ type: types.REGISTER_USER_FAILURE, error })
    }
  }
