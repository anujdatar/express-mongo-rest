import { type NextFunction, type Request, type Response } from 'express'

import { User } from '@/schemas'
import { HttpError } from '@/errorHandling'

async function isAdminFunc (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (req.body.userId == null) {
      throw new HttpError(401, 'User not authenticated')
    }
    const user = await User.findOne({ _id: req.body.userId })

    if (user == null) {
      throw new HttpError(404, 'User not found')
    }
    if (user.role !== 'admin') {
      throw new HttpError(403, 'User not authorized')
    }

    next()
  } catch (err) {
    const error = err as HttpError
    req.body.userId = undefined

    res.status(error.code)
    res.send({
      message: error.message
    })
  }
}

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  void isAdminFunc(req, res, next)
}
