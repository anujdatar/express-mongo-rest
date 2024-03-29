import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectToDatabase } from '@/dbController'
import { userRouter, projectRouter, teamRouter } from '@/routes'

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

app.get('/', (_req, res) => {
  res.status(200)
  res.send({
    message: 'Hello from express-mongo-rest backend'
  })
})

app.use('/user', userRouter)
app.use('/team', teamRouter)
app.use('/project', projectRouter)

connectToDatabase('mongo')
  .then(() => {
    app.listen(port, () => {
      const date = new Date().toLocaleString()
      console.log(`⚡️[server ${date}]: Server is running at http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.log('Failed to connect to database: ', error)
    process.exit(1)
  })
