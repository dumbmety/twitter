const authController = require('../controllers/auth')
const usersController = require('../controllers/users')

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
  app.get('/api/users/:id', usersController.get)
}

module.exports = apiRoutes
