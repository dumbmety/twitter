const authController = require("../controllers/auth")
const usersController = require("../controllers/users")
const tweetsController = require("../controllers/tweets")
const notificationsController = require("../controllers/notifications")

function apiRoutes(app, passport) {
  // Auth
  app.get("/api/user", authController.user)
  app.post("/api/login", (req, res, next) =>
    authController.login(req, res, next, passport)
  )
  app.post("/api/register", authController.register)
  app.post("/api/logout", authController.logout)

  // User
  app.get("/api/users", usersController.list)
  app.get("/api/users/:username", usersController.get)
  app.put("/api/users/:id", usersController.update)
  app.delete("/api/users/:id/remove-cover", usersController.removeCover)
  app.get("/api/users/random/:number", usersController.random)

  // Tweet
  app.get("/api/tweets", tweetsController.getMyTweets)
  app.get("/api/tweets/timeline", tweetsController.timeline)
  app.post("/api/tweets/:id/like", tweetsController.updateLike)
  app.post("/api/tweets", tweetsController.create)

  // Notifications
  app.get("/api/notifications", notificationsController.get)
  app.post("/api/notifications", notificationsController.add)

  // Follow & Unfollow
  app.post("/api/follow", usersController.follow)
  app.post("/api/unfollow", usersController.unfollow)
}

module.exports = apiRoutes
