import { type Request, type Response } from 'express'
import bcrypt from 'bcrypt'

import { User } from '@/schemas'
import { HttpError, type MongoDbDuplicationError } from '@/errorHandling'
import { generateRandomInteger, sendEmail, sendText } from '@/utils'

async function registerFunc (req: Request, res: Response): Promise<void> {
  try {
    if (process.env.INVITATION_ONLY === 'true' && req.body.inviteCode == null) {
      throw new HttpError(
        401,
        'Invitation required to register. Please contact admin'
      )
    }
    if (
      req.body.email == null ||
      req.body.password == null ||
      req.body.firstName == null ||
      req.body.lastName == null ||
      req.body.phone == null
    ) {
      throw new HttpError(400, 'Missing required fields')
    }

    const user = await User.findOne({
      $or: [
        { email: req.body.email },
        { phone: req.body.phone }
      ]
    })
    if (user == null) {
      throw new HttpError(404, 'User not found')
    }
    if (user.accountState !== 'invited') {
      throw new HttpError(401, 'User not invited or already registered')
    }
    if (user.inviteCode !== req.body.inviteCode) {
      throw new HttpError(401, 'Invalid invitation code')
    }

    if (req.body.username == null) req.body.username = req.body.email

    const emailVerificationCode = generateRandomInteger(6).toString()
    const phoneVerificationCode = generateRandomInteger(6).toString()

    user.email = req.body.email
    user.phone = req.body.phone
    user.password = await bcrypt.hash(req.body.password, 12)
    user.username = req.body.username
    user.firstName = req.body.firstName
    user.lastName = req.body.lastName
    user.accountState = 'active'
    user.emailVerification = { code: emailVerificationCode, verified: false }
    user.phoneVerification = { code: phoneVerificationCode, verified: false }

    await user.save()

    // TODO: change to frontend url when ready
    const frontendUrl = process.env.BACKEND_URL as string
    await sendEmail(`${frontendUrl}/user/verify-email/?code=${emailVerificationCode}&email=${req.body.email as string}`)
    await sendText(`${frontendUrl}/user/verify-phone/?code=${phoneVerificationCode}&phone=${req.body.phone as string}`)

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
