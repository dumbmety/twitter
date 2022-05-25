import axios from "../config/axios"

export async function get(username: string): Promise<{
  success: boolean
  user?: any
  message?: any
}> {
  try {
    const { data } = await axios.get(`/users/${username}`)

    return data.error
      ? { success: false, message: data.message }
      : { success: true, user: data.user }
  } catch (err) {
    return { success: false, message: err }
  }
}
