const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')

const server = express()

const postsRoute = require('./routes/posts')

// middleware for cors
server.use(cors())

// middleware for body-parser
server.use(bodyParser.json())

// middleware for routes
server.use('/posts', postsRoute)

// Routes
server.get('/', (req, res) => {
  res.send('Home page')
})

mongoose.connect(
  process.env.TEST_DB_CONNECTION,
  { useNewUrlParser: true },
  () => { console.log('Connected to DB') })

// start server
server.listen(3000, () => {
  console.log('Express server running at http://localhost:3000')
})
