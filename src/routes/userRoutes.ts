import { Router } from 'express'
import { verifyToken } from '@/middleware'
import {
  changePass,
  login,
  logout,
  register,
  resetPass,
  resetPassInit
} from '@/functions/user'

export const userRouter = Router()

userRouter.post('/register', register)

userRouter.post('/login', login)

userRouter.get('/logout', logout)

userRouter.post('/change-password', verifyToken, changePass)

userRouter.post('/request-password-reset', resetPassInit)

userRouter.post('/reset-password', resetPass)

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
