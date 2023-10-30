import { Router } from 'express'
import { isAdmin, verifyToken } from '@/middleware'
import {
  changePass,
  inviteUser,
  login,
  logout,
  register,
  resetPass,
  resetPassInit,
  verifyEmail,
  verifyPhone
} from '@/functions/user'

export const userRouter = Router()

userRouter.post('/invite-user', verifyToken, isAdmin, inviteUser)

userRouter.post('/register', register)

userRouter.post('/login', login)

userRouter.get('/logout', logout)

userRouter.post('/change-password', verifyToken, changePass)

userRouter.post('/request-password-reset', resetPassInit)

userRouter.post('/reset-password', resetPass)

userRouter.get('/verify-email', verifyEmail)
userRouter.get('/verify-phone', verifyPhone)

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
