import crypto from 'crypto'

export const generateRandomString = (len: number): string => {
  return crypto.randomBytes(Math.ceil(len / 2)).toString('hex')
}
