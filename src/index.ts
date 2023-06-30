import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const port = process.env.PORT != null ? process.env.PORT : 5000
const FRONTEND_URL = process.env.FRONTEND_URL as string

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}))

app.get('/', (req, res) => {
  res.status(200)
  res.send({
    message: 'Hello World!'
  })
})

app.listen(port, () => {
  console.log(`⚡️[server ${new Date().toLocaleString()}]: Server is running at http://localhost:${port}`)
})
