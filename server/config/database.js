const mongoose = require('mongoose')

async function connectDB() {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log(`MongoDB Connected: ${connection.host}`)
    return connection
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

module.exports = connectDB
