const bcrypt = require('bcryptjs')
const User = require('../models/user.js')

exports.user = (req, res) => {
  req.user
    ? res.json({ user: req.user })
    : res.json({ message: 'User is not login' })
}

exports.logout = (req, res) => {
  req?.logout()
  res.json({ success: true })
}

exports.login = (req, res, next, passport) => {
  passport.authenticate('local', (error, user) => {
    if (error) throw error
    if (!user) res.json({ error: true, message: 'No user exists!' })

    req.logIn(user, error => {
      if (error) throw error
      res.json({ message: 'Successfully authenticated', user })
    })
  })(req, res, next)
}

exports.register = async (req, res) => {
  const { name, username, email, password } = req.body

  if (!name | !username | !email | !password) {
    return res.status(400).json({ error: true, message: 'Missing parameters!' })
  }

  try {
    const user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({
        error: true,
        message: 'Email address already registered'
      })
    }

    const createdUsername = username.trim().split(' ').join('_')
    const hashedPassword = await bcrypt.hash(password, 10)

    const createdUser = await User.create({
      name,
      email,
      username: createdUsername,
      password: hashedPassword,
      tweets: [],
      followers: [],
      following: []
    })

    res.status(201).json({ user: createdUser })
  } catch (error) {
    res.status(500).json({ error: true, message: error })
  }
}
