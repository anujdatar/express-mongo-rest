import { Router } from 'express'
import { createTeam } from '@/functions/teams'
import { verifyToken } from '@/middleware'

export const teamRouter = Router()

teamRouter.post('/create-team', verifyToken, createTeam)
