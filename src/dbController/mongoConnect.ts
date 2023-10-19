import mongoose from 'mongoose'

const DATABASE_URI = process.env.MONGODB_URI as string
const DATABASE_NAME = process.env.PROJECT_DB as string
const DATABASE_USER = process.env.MONGODB_USER as string
const DATABASE_PASSWORD = process.env.MONGODB_PASSWORD as string

const connectToMongoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(DATABASE_URI, {
      authSource: 'admin',
      user: DATABASE_USER,
      pass: DATABASE_PASSWORD,
      dbName: DATABASE_NAME
    })
    console.log(`Database Connected: ${DATABASE_URI}`)
  } catch (error) {
    console.error('Failed to connect to MongoDB: ', error)
    // process.exit(1)
  } finally {
    process.on('unhandledRejection', (error: Error) => {
      console.log('unhandledRejection', error.message)
      // process.exit(1)
    })
  }
}

export default connectToMongoDB
