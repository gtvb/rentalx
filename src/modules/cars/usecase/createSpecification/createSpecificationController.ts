import { Request, Response } from 'express'
import { CreateSpecificationUsecase } from './createSpecificationUsecase'
import { container } from 'tsyringe'

export class CreateSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body
    const usecase = container.resolve(CreateSpecificationUsecase)

    await usecase.execute({ name, description })

    return res.status(201).send()
  }
}
