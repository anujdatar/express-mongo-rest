import { Router } from 'express'
import { login, logout, register } from '@/functions/user'

export const userRouter = Router()

userRouter.post('/register', register)

userRouter.post('/login', login)

userRouter.post('/logout', logout)

// TODO: add middleware to check if a user is logged in
// TODO: add these routes

userRouter.post('/reset-password', (_req, res) => {
  res.status(200)
  res.send({
    message: 'reset password'
  })
})

userRouter.post('/change-password', (_req, res) => {
  res.status(200)
  res.send({
    message: 'change password'
  })
})

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
