import { type Request, type Response } from 'express'
import bcrypt from 'bcrypt'

import { User } from '@/schemas'
import { HttpError, type MongoDbDuplicationError } from '@/errorHandling'
import { generateRandomInteger, sendEmail, sendText } from '@/helpers'

async function registerFunc (req: Request, res: Response): Promise<void> {
  try {
    if (
      req.body.email == null ||
      req.body.password == null ||
      req.body.firstName == null ||
      req.body.lastName == null ||
      req.body.phone == null
    ) {
      throw new HttpError(400, 'Missing required fields')
    }
    if (req.body.username == null) req.body.username = req.body.email

    const emailVerificationCode = generateRandomInteger(6)
    const phoneVerificationCode = generateRandomInteger(6)

    const user = new User({
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 12),
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      emailVerification: { code: emailVerificationCode, verified: false },
      phoneVerification: { code: phoneVerificationCode, verified: false }
    })
    await user.save()

    const backendUrl = process.env.BACKEND_URL as string
    await sendEmail(`${backendUrl}/user/verify-email/?code=${emailVerificationCode}&email=${req.body.email as string}`)
    await sendText(`${backendUrl}/user/verify-phone/?code=${phoneVerificationCode}&phone=${req.body.phone as string}`)

    res.status(201)
    res.send({
      message: 'User created'
    })
  } catch (err) {
    const error = err as HttpError
    if (error.code === 11000) {
      const tempError = err as MongoDbDuplicationError
      const field = Object.keys(tempError.keyValue)[0]
      const value = tempError.keyValue[field] as string

      error.code = 409
      error.message = `An account is already associated with '${field}: ${value}'`
    }
    // error.code = 500
    res.clearCookie('authToken')
    res.status(error.code)
    res.send({
      message: error.message
    })
  }
}

export const register = (req: Request, res: Response): void => {
  void registerFunc(req, res)
}
