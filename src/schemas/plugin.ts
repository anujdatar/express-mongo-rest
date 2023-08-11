import { type Schema } from 'mongoose'

export const modifiedTimestamp = (schema: Schema): void => {
  schema.add({
    createdAt: Date,
    updatedAt: Date
  })
  schema.pre('save', function (next) {
    const now = new Date()
    if (this.createdAt == null) {
      this.createdAt = now
    }
    this.updatedAt = now
    next()
  })
}
