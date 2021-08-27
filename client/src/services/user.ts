import axios from '../config/axios'

export async function getUser(username: string) {
  try {
    const { data } = await axios.get(`/users/${username}`)

    return data.error
      ? { success: false, message: data.error }
      : { success: true, user: data.user, tweets: data.tweets }
  } catch (err) {
    return { success: false, message: err }
  }
}
