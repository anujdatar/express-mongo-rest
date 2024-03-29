import { type Request, type Response } from 'express'

export const logout = (_req: Request, res: Response): void => {
  res.clearCookie('authToken')
  res.status(200)
  res.send({
    message: 'User logged out successfully'
  })
}
