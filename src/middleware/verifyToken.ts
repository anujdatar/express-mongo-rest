import { type NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const decoded = jwt.verify(
      req.cookies.authToken,
      process.env.JWT_SECRET as string)
    req.body.userId = (decoded as jwt.JwtPayload)._id
    req.body.authError = undefined
    next()
  } catch (err) {
    const error = err as Error
    req.body.userId = undefined
    req.body.authError = error.message

    res.status(401)
    res.send({
      message: 'Authentication error. Please login again'
    })
  }
}
