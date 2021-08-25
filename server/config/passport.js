const bcrypt = require('bcryptjs')
const passportLocal = require('passport-local')

const User = require('../models/user.js')

function passportConfig(passport) {
  passport.use(
    new passportLocal.Strategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        const user = await User.findOne({ email })
        if (!user) done(null, false, { message: 'No user with this email' })

        bcrypt
          .compare(password, user.password)
          .then(match => {
            if (match)
              return done(null, user, { message: 'Logged in succesfully' })
            return done(null, false, { message: 'Wrong email or password' })
          })
          .catch(() => {
            return done(null, false, { message: 'Something went wrong' })
          })
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
      done(error, user)
    })
  })
}

module.exports = passportConfig
