import { Request, Response } from 'express'
import { CreateUserUsecase } from './createUserUsecase'
import { container } from 'tsyringe'

export class UserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password, driver_license } = req.body
    const usecase = container.resolve(CreateUserUsecase)
    await usecase.execute({ name, email, password, driver_license })

    return res.status(201).send()
  }
}
