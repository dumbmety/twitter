const Tweet = require('../models/tweet.js')

exports.list = async (req, res) => {
  try {
    const tweets = await Tweet.find()
    return res.json(tweets)
  } catch (err) {
    return res.json({ error: true, message: 'Something went wrong' })
  }
}

exports.get = async (req, res) => {
  const { id } = req.params

  try {
    const tweet = await Tweet.findOne({ id })
    return res.json(tweet)
  } catch (err) {
    return res.json({ error: true, message: 'Something went wrong' })
  }
}

exports.getMyTweets = async (req, res) => {
  const { _id: id } = req.user

  try {
    const tweets = await Tweet.find({ user: id })
    return res.json(tweets)
  } catch (err) {
    return res.json({ error: true, message: err })
  }
}

exports.create = async (req, res) => {
  if (!req.user) {
    return res.json({ error: true, message: 'User is not logged in' })
  }

  try {
    const newTweet = { user: req.user, text: req.body.text }
    const tweet = await Tweet.create(newTweet)
    return res.json(tweet)
  } catch (err) {
    return res.json({ error: true, message: 'Something went wrong' })
  }
}
