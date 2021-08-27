const User = require('../models/user')
const Tweet = require('../models/tweet')

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
    const tweets = await Tweet.find({ user: user._id })

    return res.json({ user, tweets })
  } catch (err) {
    return res.json({ error: true, message: 'Something went wrong' })
  }
}
