import { type Request, type Response } from 'express'
import { HttpError } from '@/errorHandling'
import { User } from '@/schemas'

async function verifyEmailFunc (req: Request, res: Response): Promise<void> {
  try {
    if (
      req.query.code == null ||
      req.query.email == null
    ) {
      throw new HttpError(400, 'Incomplete request data')
    }
    const user = await User.findOne({ email: req.query.email })
    if (user == null) {
      throw new HttpError(404, 'User not found. Check verification link')
    }

    if (user.emailVerification?.verified === true) {
      throw new HttpError(400, 'Email already verified.')
    }

    if (user.emailVerification?.code !== req.query.code) {
      throw new HttpError(401, 'Verification code mismatch. Check verification link')
    }

    user.emailVerification.verified = true
    user.emailVerification.code = ''
    await user.save()

    res.status(200)
    res.send({
      message: 'Email Verified'
    })
  } catch (err) {
    const error = err as HttpError

    res.status(error.code)
    res.send({
      message: error.message
    })
  }
}

export const verifyEmail = (req: Request, res: Response): void => {
  void verifyEmailFunc(req, res)
}
