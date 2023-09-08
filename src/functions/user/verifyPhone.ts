import { type Request, type Response } from 'express'
import { HttpError } from '@/errorHandling'
import { User } from '@/schemas'

async function verifyPhoneFunc (req: Request, res: Response): Promise<void> {
  try {
    if (
      req.query.code == null ||
      req.query.phone == null
    ) {
      throw new HttpError(400, 'Incomplete request data')
    }
    const user = await User.findOne({ phone: req.query.phone })
    if (user == null) {
      throw new HttpError(404, 'User not found. Check verification link')
    }

    if (user.phoneVerification?.verified === true) {
      throw new HttpError(400, 'Phone already verified.')
    }

    if (user.phoneVerification?.code !== req.query.code) {
      throw new HttpError(401, 'Verification code mismatch. Check verification link')
    }

    user.phoneVerification.verified = true
    user.phoneVerification.code = ''
    await user.save()

    res.status(200)
    res.send({
      message: 'Phone Verified'
    })
  } catch (err) {
    const error = err as HttpError

    res.status(error.code)
    res.send({
      message: error.message
    })
  }
}

export const verifyPhone = (req: Request, res: Response): void => {
  void verifyPhoneFunc(req, res)
}
