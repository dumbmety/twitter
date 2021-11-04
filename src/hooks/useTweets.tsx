import { useSelector } from 'react-redux'
import { RootState } from '../store/state'

export function useUsersTweets() {
  const userTweets = useSelector((state: RootState) => state.userTweets)

  return {
    loading: userTweets.loading,
    error: userTweets.error,
    tweets: userTweets.tweets,
    tweetsCount: userTweets.tweets.length
  }
}

export function useHomeTweets() {
  const homeTweets = useSelector((state: RootState) => state.homeTweets)

  return {
    loading: homeTweets.loading,
    error: homeTweets.error,
    tweets: homeTweets.tweets
  }
}
