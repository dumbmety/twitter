import axios from "../config/axios"

export async function getNotifications() {
  try {
    const { data } = await axios.get("/notifications")

    console.log(data)

    return data.success
      ? { success: true, notifications: data.notifications }
      : { success: false, message: data.message }
  } catch (err) {
    return { success: false, message: err }
  }
}

export async function addNotification(text: string, tweetId: string) {
  try {
    const { data } = await axios.post("/notifications", {
      verb: "notif",
      text,
      tweetId,
    })

    return data.success
      ? { success: true }
      : { success: false, message: data.message }
  } catch (err) {
    return { success: false, message: err }
  }
}
