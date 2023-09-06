import { Router } from 'express'
import { changePass, login, logout, register } from '@/functions/user'
import { verifyToken } from '@/middleware'

export const userRouter = Router()

userRouter.post('/register', register)

userRouter.post('/login', login)

userRouter.get('/logout', logout)

// TODO: add middleware to check if a user is logged in
// TODO: add these routes

userRouter.post('/reset-password', (_req, res) => {
  res.status(200)
  res.send({
    message: 'reset password'
  })
})

userRouter.post('/change-password', verifyToken, changePass)

userRouter.post('/change-email', (_req, res) => {
  res.status(200)
  res.send({
    message: 'change email'
  })
})

userRouter.post('/delete-user', (_req, res) => {
  res.status(200)
  res.send({
    message: 'delete user'
  })
})
