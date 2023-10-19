import { Router } from 'express'
import { newProject } from '@/functions/projects'
import { verifyToken } from '@/middleware'

export const projectRouter = Router()
projectRouter.post('/new-project', verifyToken, newProject)
