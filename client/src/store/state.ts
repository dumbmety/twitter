export interface IUser {
  name: string
  email: string
  password: string
  cover?: string
  image?: string
  username?: string
  location?: string
  tweets?: ITweet[]
  followers?: object[]
  following?: object[]
}

export interface ITweet {
  id: string
  text: string
  likes: number
  replies: number
  retweet: number
}

export interface RootState {
  authorize: {
    loading: boolean
    error: string
    hasUser: boolean
    user: IUser
  }

  login: {
    user: object
    error: string
    loading: boolean
  }

  profile: {
    loading: boolean
    isExist: boolean
    errors: string
    user: IUser
  }

  userTweets: {
    loading: boolean
    error: string
    tweets: ITweet[]
  }
}
