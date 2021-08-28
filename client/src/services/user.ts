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

export async function followUser(userId: string, followerId: string) {
  try {
    const { data } = await axios.post('/follow', { userId, followerId })

    return data.error
      ? { success: false, message: data.error }
      : { success: true }
  } catch (err) {
    return { success: false, message: err }
  }
}

export async function unfollowUser(userId: string, followerId: string) {
  try {
    const { data } = await axios.post('/unfollow', { userId, followerId })

    return data.error
      ? { success: false, message: data.error }
      : { success: true }
  } catch (err) {
    return { success: false, message: err }
  }
}

export async function randomUsers(number: number) {
  try {
    const { data } = await axios.get(`/users/random/${number}`)

    return data.error
      ? { success: false, message: data.error }
      : { success: true, users: data }
  } catch (err) {
    return { success: false, message: err }
  }
}
