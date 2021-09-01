const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const notificationSchema = new mongoose.Schema({
  read: { type: Boolean, default: false },
  verb: {
    type: String,
    enum: [
      'notif',
      'like',
      'follow',
      'mention'
      // 'topic'
    ]
  },

  text: { type: String, required: true },
  to: [{ type: ObjectId, ref: 'User', required: true }],
  from: { type: ObjectId, ref: 'User', required: true },

  tweetId: { type: ObjectId, ref: 'Tweet' }, // verb === 'notif'
  userLiked: { type: ObjectId, ref: 'User' }, // verb === 'like'
  userFolloed: { type: ObjectId, ref: 'User' }, // verb === 'follow'
  userMentioned: { type: ObjectId, ref: 'User' } // verb === 'mention'
  // topicId: { type: ObjectId, ref: 'Topic' }, // verb === 'topic'
})

module.exports = mongoose.model('Notification', notificationSchema)
