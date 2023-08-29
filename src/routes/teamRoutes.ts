import { Router } from 'express'
import { createTeam } from '@/functions/teams'
import { verifyToken } from '@/middleware'

export const teamRouter = Router()

teamRouter.post('/createTeam', verifyToken, createTeam)
