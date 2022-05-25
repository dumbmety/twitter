import axios from "../config/axios"
import { ITweet } from "../types/schemas"

export async function getUserTweets() {
  try {
    const { data } = await axios.get("/tweets")

    return data.error
      ? { success: false, message: data.error }
      : { success: true, tweets: data }
  } catch (err) {
    return { success: false, message: err }
  }
}

export async function getHomeTweets(): Promise<{
  success: boolean
  tweets?: ITweet[]
  message?: any
}> {
  try {
    const { data } = await axios.get("/tweets/timeline")

    return data.error
      ? { success: false, message: data.error }
      : { success: true, tweets: data }
  } catch (err) {
    return { success: false, message: err }
  }
}

export async function createTweet(text: string) {
  try {
    const { data } = await axios.post("/tweets", { text })

    return data.error
      ? { success: false, message: data.error }
      : { success: true, tweet: data }
  } catch (err) {
    return { success: false, message: err }
  }
}

export async function updateLikeStatusTweet(tweetId: string, liked: boolean) {
  try {
    const { data } = await axios.post(`/tweets/${tweetId}/like`, { liked })

    return data.error
      ? { success: false, message: data.error }
      : { success: true }
  } catch (err) {
    return { success: false, message: err }
  }
}
