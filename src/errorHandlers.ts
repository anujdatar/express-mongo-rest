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

