const User = require('../models/user')
const Tweet = require('../models/tweet')
const random = require('../utils/random')

exports.list = async (req, res) => {
  try {
    const users = await User.find()
    return res.json(users)
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

exports.update = async (req, res) => {
  const { id } = req.params
  const { name, bio, location, website, birthday } = req.body

  try {
    const user = await User.findByIdAndUpdate(id, {
      name,
      bio,
      location,
      website,
      birthday
    })

    return res.json(user)
  } catch (err) {
    return res.json({ error: true, message: err })
  }
}

exports.removeCover = async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findByIdAndUpdate(id, { cover: '' })
    return res.json(user)
  } catch (err) {
    return res.json({ error: true, message: err })
  }
}

exports.follow = async (req, res) => {
  const { userId, followerId } = req.body

  try {
    const user = await User.findById(userId)
    if (user.following.includes(followerId)) {
      return res.json({ error: true, message: 'The user already followed' })
    }

    await User.findByIdAndUpdate(userId, { $push: { following: followerId } })
    await User.findByIdAndUpdate(followerId, { $push: { followers: userId } })

    return res.json({ success: true })
  } catch (err) {
    return res.json({ error: true, message: err })
  }
}

exports.unfollow = async (req, res) => {
  const { userId, followerId } = req.body

  try {
    const user = await User.findById(userId)
    if (!user.following.includes(followerId)) {
      return res.json({ error: true, message: 'The user has not followed' })
    }

    await User.findByIdAndUpdate(userId, { $pull: { following: followerId } })
    await User.findByIdAndUpdate(followerId, { $pull: { followers: userId } })

    return res.json({ success: true })
  } catch (err) {
    return res.json({ error: true, message: err })
  }
}

exports.random = async (req, res) => {
  const { number } = req.params

  try {
    const users = await User.find()
    const userIndex = users.findIndex(
      user => user._id.toString() === req.user._id.toString()
    )
    users.splice(userIndex, 1)

    const randomNumbers = random(number, users.length)
    let randomUsers = []
    randomUsers = randomNumbers.map(number => users[number - 1])

    return res.json(randomUsers)
  } catch (err) {
    return res.json({ error: true, message: err })
  }
}
