import { Request, Response } from 'express'
import { CreateCategoryUsecase } from './createCategoryUsecase'
import { container } from 'tsyringe'

export class CreateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body
    const usecase = container.resolve(CreateCategoryUsecase)

    await usecase.execute({ name, description })

    return res.status(201).send()
  }
}
