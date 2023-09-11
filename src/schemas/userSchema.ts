import { Schema, model } from 'mongoose'
import { modifiedTimestamp } from './plugin'

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Email is required']
  },
  phone: {
    type: String,
    unique: true,
    required: [true, 'Phone is required']
  },
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  incorrectPasswordAttempts: {
    type: Number,
    default: 0
  },
  firstName: {
    type: String,
    required: [true, 'First name is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required']
  },
  teams: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Team'
    }
  ],
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    }
  ],
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  emailVerification: {
    code: {
      type: String,
      default: ''
    },
    verified: {
      type: Boolean,
      default: false
    }
  },
  phoneVerification: {
    code: {
      type: String,
      default: ''
    },
    verified: {
      type: Boolean,
      default: false
    }
  },
  passwordResetFlag: {
    type: Boolean,
    default: false
  },
  passwordResetCode: {
    code: String,
    expiresAt: Date
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
})

UserSchema.virtual('fullName').get(function () {
  let fullName = ''
  if (this.firstName != null) {
    fullName += this.firstName
  }
  if (this.lastName != null) {
    fullName += ` ${this.lastName}`
  }
  return fullName
})

UserSchema.virtual('initials').get(function () {
  let initials = ''
  if (this.firstName != null) {
    initials += this.firstName[0]
  }
  if (this.lastName != null) {
    initials += this.lastName[0]
  }
  return initials
})

UserSchema.plugin(modifiedTimestamp)

export const User = model('User', UserSchema)
