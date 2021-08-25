const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const connectDB = require('./config/database.js')
const passportConfig = require('./config/passport.js')
const apiRoutes = require('./routes/index.js')

// Config
dotenv.config()
connectDB()

const app = express()
const port = process.env.PORT || 8000

// Middlewares
if (process.env.NODE_ENV === 'development') app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
)
app.use(
  session({
    secret: 'secretcode',
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: 'sessions'
    }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }
  })
)
app.use(cookieParser('secretcode'))
app.use(passport.initialize())
app.use(passport.session())
passportConfig(passport)

// Routes
apiRoutes(app, passport)

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
})
