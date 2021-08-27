import { Dispatch } from 'redux'
import * as types from '../types'
import * as tweetService from '../../services/tweet'

export const getUserTweets = () => async (dispatch: Dispatch) => {
  dispatch({ type: types.GET_USER_TWEETS_REQUEST })

  try {
    const res = await tweetService.getUserTweets()

    res.success
      ? dispatch({ type: types.GET_USER_TWEETS_SUCCESS, tweets: res.tweets })
      : dispatch({ type: types.GET_USER_TWEETS_FAILURE, error: res.message })
  } catch (error) {
    dispatch({ type: types.GET_USER_TWEETS_FAILURE, error })
  }
}
