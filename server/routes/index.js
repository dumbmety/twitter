const authController = require('../controllers/auth')
const usersController = require('../controllers/users')
const tweetsController = require('../controllers/tweets')

function apiRoutes(app, passport) {
  // Auth
  app.get('/api/user', authController.user)
  app.post('/api/login', (req, res, next) =>
    authController.login(req, res, next, passport)
  )
  app.post('/api/register', authController.register)
  app.post('/api/logout', authController.logout)

  // User
  app.get('/api/users', usersController.list)
  app.get('/api/users/:username', usersController.get)

  // Tweet
  app.get('/api/tweets', tweetsController.getMyTweets)
  app.post('/api/tweets', tweetsController.create)

  // Follow & Unfollow
  app.post('/api/follow', usersController.follow)
  app.post('/api/unfollow', usersController.unfollow)
}

module.exports = apiRoutes
