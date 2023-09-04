import { type Request, type Response } from 'express'

import { HttpError } from '@/errorHandling'
import { Team, User } from '@/schemas'

async function createTeamFunc (req: Request, res: Response): Promise<void> {
  try {
    if (
      req.body.teamName == null ||
      req.body.subscription == null
    ) {
      throw new HttpError(400, 'Missing required fields')
    }
    if (req.body.userId == null) {
      throw new HttpError(401, 'User not authenticated')
    }
    const user = await User.findOne({ _id: req.body.userId })
    if (user == null) {
      throw new HttpError(404, 'User not found')
    }

    const team = new Team({
      name: req.body.teamName,
      description: req.body.description,
      owner: req.body.userId,
      subscription: req.body.subscription,
      users: [req.body.userId],
      admins: [req.body.userId]
    })

    await team.save()

    const userTeams = user.teams
    userTeams.push(team._id)
    user.teams = userTeams
    await user.save()

    res.status(200)
    res.send({
      message: `Created new team: ${req.body.teamName as string}`
    })
  } catch (err) {
    const error = err as HttpError
    res.status(error.code)
    res.send({
      message: error.message
    })
  }
}

export const createTeam = (req: Request, res: Response): void => {
  void createTeamFunc(req, res)
}
