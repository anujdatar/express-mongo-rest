import { type Request, type Response } from 'express'
import bcrypt from 'bcrypt'
import { HttpError } from '@/errorHandling'
import { User } from '@/schemas'

async function resetPassFunc (req: Request, res: Response): Promise<void> {
  try {
    if (
      req.body.currPass == null ||
      req.body.newPass == null ||
      req.body.userId == null ||
      req.body.resetCode == null
    ) {
      throw new HttpError(400, 'Incomplete request data')
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
    if (!user.passwordResetFlag) {
      throw new HttpError(401, 'Improper request not authorized')
    }
    if (user.passwordResetCode?.code !== req.body.resetCode) {
      throw new HttpError(401, 'Incorrect code, not authorized')
    }

    const now = new Date()
    if (
      user.passwordResetCode?.expiresAt != null &&
      user.passwordResetCode.expiresAt < now
    ) {
      throw new HttpError(401, 'Password reset code expired, please reset again')
    }

    const isOldPassValid = await bcrypt.compare(
      req.body.currPass,
      user.password as string
    )
    if (!isOldPassValid) {
      throw new HttpError(401, 'Incorrect password, please try again')
    }

    user.password = await bcrypt.hash(req.body.newPass, 12)
    await user.save()

    res.status(200)
    res.send({
      message: 'Password reset successful'
    })
  } catch (err) {
    const error = err as HttpError

    res.status(error.code)
    res.send({
      message: error.message
    })
  }
}

export const resetPass = (req: Request, res: Response): void => {
  void resetPassFunc(req, res)
}
