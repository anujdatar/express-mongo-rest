import { type Request, type Response } from 'express'
import { HttpError } from '@/errorHandling'
import { User } from '@/schemas'
import { generateRandomString, sendEmail } from '@/helpers'

async function resetPassInitFunc (req: Request, res: Response): Promise<void> {
  try {
    if (req.body.login === null) {
      throw new HttpError(400, 'Incomplete password reset request')
    }
    const user = await User.findOne({
      $or: [
        { email: req.body.login },
        { phone: req.body.login },
        { username: req.body.login }
      ]
    })

    if (user == null) {
      throw new HttpError(404, 'User not found, check email/mobile/username')
    }

    user.passwordResetFlag = true
    const resetCode = generateRandomString(8)
    const codeExpiration = new Date(new Date().getTime() + 30 * 60000) // valid for 30 minutes
    user.passwordResetCode = {
      code: resetCode,
      expiresAt: codeExpiration
    }
    await user.save()

    const frontendUrl = process.env.FRONTEND_URL as string
    const resetLink = `${frontendUrl}/user/reset-password/?userId=${user._id.toString()}&resetCode=${resetCode}`
    await sendEmail(resetLink)

    res.status(200)
    res.send({
      message: 'Password reset initiated',
      resetLink
    })
  } catch (err) {
    const error = err as HttpError
    res.status(error.code)
    res.send({
      message: error.message
    })
  }
}

export const resetPassInit = (req: Request, res: Response): void => {
  void resetPassInitFunc(req, res)
}
