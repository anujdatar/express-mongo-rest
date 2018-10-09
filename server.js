import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import mongojs from 'mongojs'
import os from 'os'

// init express app/server
let app = express()

// start server and log server address and port
app.listen(3000, () => {
  const networkInterfaces = os.networkInterfaces()
  const networkIp = networkInterfaces['Wi-Fi'][1]['address']
  const localIp = networkInterfaces['Loopback Pseudo-Interface 1'][1]['address']
  console.log('Express.js server running at')
  console.log('- Local:   http://'+localIp +':3000/  or  http://localhost:3000/')
  console.log('- Network: http://'+networkIp +':3000/')
  // console.log(os.networkInterfaces())
})

// Body Parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// enable CORS on server
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// connect to mongodb database
const db = mongojs('MealPlanner')
// let ObjectId = mongojs.ObjectId

// render home page just in case
app.get('/', (req, res) => {
  db.menuList.find( (err, docs) => {
    res.send(docs)
  })
})

// read database documents and send to web page
app.get('/getListOfItems', (req, res) => {
  db.menuList.find( (err, docs) => {
    if (err) {
      throw err
    }
    res.send(docs)
  })
})

app.post('/addItemToDb', (req, res) => {
  console.log(req.body)
  // console.log(req.body.selected)
  res.send('success')
})
