import useAppSelector from "./useAppSelector"

export function useUsersTweets() {
  const userTweets: any = useAppSelector(state => state.userTweets)

  return {
    loading: userTweets.loading,
    error: userTweets.error,
    tweets: userTweets.tweets,
    tweetsCount: userTweets.tweets.length,
  }
}

export function useHomeTweets() {
  const homeTweets: any = useAppSelector(state => state.homeTweets)

  return {
    loading: homeTweets.loading,
    error: homeTweets.error,
    tweets: homeTweets.tweets,
  }
}
