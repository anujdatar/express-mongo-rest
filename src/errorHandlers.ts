import { type Response } from 'express'

export class HttpError extends Error {
  code: number

  constructor (
    code: number,
    message: string
  ) {
    super(message)
    this.code = code
  }
}

export class MongoDbDuplicationError extends Error {
  code: number
  keyValue: Record<string, unknown>

  constructor (
    code: number,
    message: string,
    keyValue: Record<string, unknown>
  ) {
    super(message)
    this.code = code
    this.keyValue = keyValue
  }
}

export function handleDuplicateDbEntry (err: Error, res: Response): void {
  const error = err as MongoDbDuplicationError
  const field = Object.keys(error.keyValue)[0]
  const value = error.keyValue[field] as string
  res.status(409)
  res.send({
    message: `An account is already associated with '${field}: ${value}'`
  })
}
