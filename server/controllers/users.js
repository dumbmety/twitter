const User = require('../models/user.js')

exports.list = async (req, res) => {
  try {
    return await User.find()
  } catch (err) {
    return res.json({ error: true, message: 'Something went wrong' })
  }
}

exports.get = async (req, res) => {
  const { id } = req.params

  try {
    return await User.findById({ _id: id })
  } catch (err) {
    return res.json({ error: true, message: 'Something went wrong' })
  }
}
