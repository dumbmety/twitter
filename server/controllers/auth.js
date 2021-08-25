const bcrypt = require('bcryptjs')
const User = require('../models/user.js')

exports.user = (req, res) => {
  res.json({ user: req.user })
}

exports.logout = req => {
  req.logout()
}

exports.login = (req, res, next, passport) => {
  passport.authenticate('local', (error, user) => {
    if (error) throw error
    if (!user) res.json({ error: true, message: 'No user exists!' })

    req.logIn(user, error => {
      if (error) throw error
      res.json({ message: 'Successfully authenticated' })
    })
  })(req, res, next)
}

exports.register = async (req, res) => {
  const { name, email, password } = req.body

  if (!name | !email | !password) {
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

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = { name, username: '', email, password: hashedPassword }
    const userCreated = await User.create(newUser)

    res.status(201).json({ user: userCreated })
  } catch (error) {
    res.status(500).json({ error: true, message: error })
  }
}
