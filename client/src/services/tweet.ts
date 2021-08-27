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
