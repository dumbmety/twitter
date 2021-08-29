export interface IUser {
  _id: string
  name: string
  email: string
  password: string

  bio?: string
  website?: string
  birthday?: string
  username?: string
  location?: string

  cover?: string
  image?: string

  tweets?: ITweet[]
  followers?: string[]
  following?: string[]
}

export interface ITweet {
  id: string
  text: string
  likes: number
  replies: number
  retweet: number
}

export interface IHomeTweets {
  tweet: ITweet
  user: IUser
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

  homeTweets: {
    loading: boolean
    error: string
    tweets: IHomeTweets[]
  }
}
