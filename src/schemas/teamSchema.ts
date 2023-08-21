import { Schema, model } from 'mongoose'
import { modifiedTimestamp } from './plugin'

const TeamSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  description: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Owner is required']
  },
  subscription: {
    type: String,
    enum: ['free', 'premium'],
    default: 'free'
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  admins: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }],
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
})

TeamSchema.plugin(modifiedTimestamp)

export const Team = model('Org', TeamSchema)
