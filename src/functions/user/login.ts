import { type Request, type Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User } from '@/schemas'
import { HttpError } from '@/errorHandling'

async function loginFunc (req: Request, res: Response): Promise<void> {
  try {
    if (
      req.body.login == null ||
      req.body.password == null
    ) {
      throw new HttpError(400, 'Missing required fields')
    }
    const user = await User.findOne({
      $or: [
        { email: req.body.login },
        { phone: req.body.login },
        { username: req.body.login }
      ]
    })

    if (user == null) {
      throw new HttpError(404, 'User not found')
    }
    if (user.passwordResetFlag) {
      throw new HttpError(400, 'User must reset password')
    }
    if (user.incorrectPasswordAttempts > 2) {
      throw new HttpError(401, 'Too many incorret password attempts. Please reset password')
    }
    const validPassword = await bcrypt.compare(
      req.body.password as string,
      user.password as string
    )

    if (!validPassword) {
      user.incorrectPasswordAttempts += 1
      await user.save()
      throw new HttpError(401, 'Incorrect credentials')
    }
    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    )
    res.cookie('authToken', token, {
      httpOnly: true
    })

    user.incorrectPasswordAttempts = 0
    await user.save()
    res.status(200)
    res.send({
      message: 'Logged in',
      user: {
        phone: user.phone
      }
    })
  } catch (err) {
    const error = err as HttpError
    res.clearCookie('authToken')
    res.status(error.code)
    res.send({
      message: error.message
    })
  }
}

export const login = (req: Request, res: Response): void => {
  void loginFunc(req, res)
}
