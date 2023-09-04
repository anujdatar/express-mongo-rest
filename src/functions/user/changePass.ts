import { type Request, type Response } from 'express'
import bcrypt from 'bcrypt'

import { User } from '@/schemas'
import { HttpError } from '@/errorHandling'

async function changePassFunc (req: Request, res: Response): Promise<void> {
  try {
    if (
      req.body.currPass == null ||
      req.body.newPass == null
    ) {
      throw new HttpError(400, 'Missing required fields')
    }
    if (req.body.currPass === req.body.newPass) {
      throw new HttpError(400, 'Current and new password cannot be the same')
    }
    if (req.body.userId == null) {
      throw new HttpError(401, 'User not authenticated')
    }
    const user = await User.findOne({ _id: req.body.userId })
    if (user == null) {
      throw new HttpError(404, 'User not found')
    }
    const validCurrPass = bcrypt.compareSync(
      req.body.currPass as string,
      user.password as string
    )
    if (!validCurrPass) {
      throw new HttpError(401, 'Current password does not match')
    }
    const newPassHash = bcrypt.hashSync(req.body.newPass, 12)
    user.password = newPassHash
    await user.save()

    res.status(200)
    res.send({
      message: 'Password change successful'
    })
  } catch (err) {
    const error = err as HttpError
    res.status(error.code)
    res.send({
      message: error.message
    })
  }
}

export const changePass = (req: Request, res: Response): void => {
  void changePassFunc(req, res)
}
