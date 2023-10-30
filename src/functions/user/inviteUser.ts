import { type Request, type Response } from 'express'
import { User } from '@/schemas'

import { HttpError, type MongoDbDuplicationError } from '@/errorHandling'
import { generateRandomString, sendEmail, sendText } from '@/utils'

async function inviteFunc (req: Request, res: Response): Promise<void> {
  try {
    if (req.body.userId == null) {
      throw new HttpError(401, 'User not authenticated')
    }
    if (req.body.email == null && req.body.phone == null) {
      throw new HttpError(400, 'Missing required fields')
    }

    const inviteCode = generateRandomString(8)

    const user = new User({
      email: req.body.email != null ? req.body.email : '',
      phone: req.body.phone != null ? req.body.phone : '',
      accountState: 'invited',
      inviteCode
    })
    await user.save()

    if (req.body.email != null) {
      await sendEmail(`${process.env.FRONTEND_URL as string}/user/invited/?code=${inviteCode}&email=${req.body.email as string}`)
    }
    if (req.body.phone != null) {
      await sendText(`${process.env.FRONTEND_URL as string}/user/invited/?code=${inviteCode}&phone=${req.body.phone as string}`)
    }

    res.status(200)
    res.send({
      message: 'User invited',
      email: req.body.email,
      phone: req.body.phone,
      inviteCode
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
    res.status(error.code)
    res.send({
      message: error.message
    })
  }
}

export const inviteUser = (req: Request, res: Response): void => {
  void inviteFunc(req, res)
}
