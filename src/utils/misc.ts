import crypto from 'crypto'

export const generateRandomString = (length: number): string => {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex')
}

export const generateRandomInteger = (length: number): number => {
  const min = Math.pow(10, length - 1)
  const max = Math.pow(10, length) - 1
  return Math.floor((Math.random() * (max - min)) + min)
}
