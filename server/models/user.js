const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, minlength: 8, trim: true },
  username: { type: String, trim: true, required: true },

  image: { type: String, trim: true, default: '' },
  cover: { type: String, trim: true, default: '' },

  location: { type: String, trim: true, default: '' },

  followers: { type: Array, default: [] },
  following: { type: Array, default: [] }
})

module.exports = mongoose.model('User', userSchema)
