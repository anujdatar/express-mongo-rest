import { Schema, model } from 'mongoose'
import { modifiedTimestamp } from './plugin'

const ProjectSchema = new Schema({
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
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
    // required: [true, 'Team is required']
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  admins: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
})

ProjectSchema.plugin(modifiedTimestamp)

export const Project = model('Project', ProjectSchema)
