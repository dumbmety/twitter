const User = require('../models/user.js')

exports.list = async (req, res) => {
  try {
    return await User.find()
  } catch (err) {
    return res.json({ error: true, message: 'Something went wrong' })
  }
}

exports.get = async (req, res) => {
  const { username } = req.params

  try {
    const user = await User.findOne({ username })
    return res.json(user)
  } catch (err) {
    return res.json({ error: true, message: 'Something went wrong' })
  }
}
