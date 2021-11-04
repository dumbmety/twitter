import axios from '../config/axios'

export async function get(username: string) {
  try {
    const { data } = await axios.get(`/users/${username}`)

    return data.error
      ? { success: false, message: data.message }
      : { success: true, user: data.user }
  } catch (err) {
    return err
  }
}
