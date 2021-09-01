const errorTypes = require("../types/error")
const User = require("../models/user")
const Notification = require("../models/notification")

exports.get = async (req, res) => {
  if (!req.user)
    return res.json({ success: false, error: "User is not logged in" })

  const { _id: id } = req.user

  try {
    const notifications = await Notification.find()
    const userNotifications = []

    for (const notification of notifications) {
      if (notification.to.includes(id)) {
        userNotifications.push(notification)
      }
    }

    return res.json({ success: true, notifications: userNotifications })
  } catch (err) {
    return res.json({
      success: false,
      error: errorTypes.ERR_DATABASE,
      message: err,
    })
  }
}

exports.add = async (req, res) => {
  const { _id: id, followers } = req.user
  const { verb, text, tweetId } = req.body

  if (!verb || !text) {
    return res.json({
      success: false,
      error: errorTypes.ERR_MISSING_PARAMETERS,
    })
  }

  try {
    const users = await User.find()
    const notifyUsers = []

    users.forEach(({ _id }) => {
      const id = _id.toString()

      if (followers.includes(id)) {
        notifyUsers.push(id)
      }
    })

    const notification = {
      verb,
      text,
      tweetId,
      to: notifyUsers,
      from: id.toString(),
      read: false,
    }

    const newNotification = await Notification.create(notification)
    return res.json({ success: true, newNotification })
  } catch (err) {
    return res.json({
      success: false,
      error: errorTypes.ERR_DATABASE,
      message: err,
    })
  }
}
