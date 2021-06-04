import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AuthenticateUserUsecase } from './authenticateUserUsecase'

export class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    const usecase = container.resolve(AuthenticateUserUsecase)

    const authPayload = await usecase.execute({ email, password })

    return res.status(200).json(authPayload)
  }
}
