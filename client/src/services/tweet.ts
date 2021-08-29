import axios from '../config/axios'

export async function getUserTweets() {
  try {
    const { data } = await axios.get('/tweets')

    return data.error
      ? { success: false, message: data.error }
      : { success: true, tweets: data }
  } catch (err) {
    return { success: false, message: err }
  }
}

export async function getHomeTweets() {
  try {
    const { data } = await axios.get('/tweets/timeline')

    return data.error
      ? { success: false, message: data.error }
      : { success: true, tweets: data }
  } catch (err) {
    return { success: false, message: err }
  }
}

export async function createTweet(text: string) {
  try {
    const { data } = await axios.post('/tweets', { text })

    return data.error
      ? { success: false, message: data.error }
      : { success: true, tweet: data }
  } catch (err) {
    return { success: false, message: err }
  }
}
