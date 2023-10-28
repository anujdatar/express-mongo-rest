import { type Request, type Response } from 'express'
import { HttpError } from '@/errorHandling'
import { Project, Team, User } from '@/schemas'

async function createNewProject (req: Request, res: Response): Promise<void> {
  try {
    if (
      req.body.projectName == null ||
      req.body.teamId == null
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

    if (user.passwordResetFlag) {
      throw new HttpError(400, 'User must reset password')
    }

    const userTeams = user.teams.map(team => team._id.toString())

    if (!userTeams.includes(req.body.teamId)) {
      throw new HttpError(400, 'User not a part of this team')
    }

    const team = await Team.findOne({ _id: req.body.teamId })
    if (team == null) {
      throw new HttpError(404, 'Unable to find specified project team')
    }

    const projectUsers = team.users
    const projectAdmin = team.admins

    const project = new Project({
      name: req.body.projectName,
      description: req.body.description != null ? req.body.description : '',
      team: req.body.teamId,
      owner: req.body.userId,
      users: projectUsers,
      admins: projectAdmin
    })

    await project.save()

    const teamProjects = team.projects
    teamProjects.push(project._id)
    team.projects = teamProjects
    await team.save()

    const userProjects = user.projects
    userProjects.push(project._id)
    user.projects = userProjects
    await user.save()

    res.status(200)
    res.send({
      message: 'New project created'
    })
  } catch (err) {
    const error = err as HttpError
    res.status(error.code)
    res.send({
      message: error.message
    })
  }
}

export const newProject = (req: Request, res: Response): void => {
  void createNewProject(req, res)
}
