const User = require("../models/user")
const Tweet = require("../models/tweet")

exports.list = async (req, res) => {
  try {
    const tweets = await Tweet.find()
    return res.json(tweets)
  } catch (err) {
    return res.json({ error: true, message: "Something went wrong" })
  }
}

exports.get = async (req, res) => {
  const { id } = req.params

  try {
    const tweet = await Tweet.findOne({ id })
    return res.json(tweet)
  } catch (err) {
    return res.json({ error: true, message: "Something went wrong" })
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

exports.timeline = async (req, res) => {
  if (!req.user)
    return res.json({ success: false, error: "User is not logged in" })

  const { _id: id, following } = req.user

  try {
    const tweets = await Tweet.find()
    const timelineTweets = []

    for (const tweet of tweets) {
      const user = await User.findById(tweet.user)

      const isUser = id.toString() === tweet.user.toString()
      const isFollow = following.includes(tweet.user.toString())

      if (isFollow || isUser) {
        timelineTweets.push({ tweet, user })
      }
    }

    return res.json(timelineTweets)
  } catch (err) {
    return res.json({ error: true, message: err })
  }
}

exports.create = async (req, res) => {
  if (!req.user) {
    return res.json({ error: true, message: "User is not logged in" })
  }

  try {
    const newTweet = { user: req.user, text: req.body.text }
    const tweet = await Tweet.create(newTweet)
    return res.json(tweet)
  } catch (err) {
    return res.json({ error: true, message: "Something went wrong" })
  }
}

exports.updateLike = async (req, res) => {
  const tweetId = req.params.id
  const userId = req.user._id.toString()

  if (!req.user) {
    return res.json({ error: true, message: "User is not logged in" })
  }

  try {
    req.body.liked
      ? await Tweet.findByIdAndUpdate(tweetId, { $pull: { likes: userId } })
      : await Tweet.findByIdAndUpdate(tweetId, { $push: { likes: userId } })

    return res.json({ success: true })
  } catch (err) {
    return res.json({ error: true, message: "Something went wrong" })
  }
}
