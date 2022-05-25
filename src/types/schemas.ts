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
  _id: string
  text: string

  likes: string[]
  replies: number
  retweet: number
}

export interface IHomeTweets {
  tweet: ITweet
  user: IUser
}

export interface INotification {
  read: boolean
  text: string
  to: IUser[]
  from: IUser
  verb: "notif" | "like" | "follow" | "mention"
}
