import { Router } from 'express'

import { newAdminUser } from '@/functions/admin'

export const adminRouter = Router()

adminRouter.post('/newAdminUser', newAdminUser)
