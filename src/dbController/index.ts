import connectToMongoDB from './mongoConnect'

export async function connectToDatabase (provider: string): Promise<void> {
  if (provider === 'mongo') { await connectToMongoDB() }
}
