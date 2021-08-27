const mongoose = require('mongoose')

const tweetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: { type: String, required: true },

  comments: { type: Object, default: {} },
  retweet: { type: Object, default: {} },
  likes: { type: Object, default: {} }
})

module.exports = mongoose.model('Tweet', tweetSchema)
