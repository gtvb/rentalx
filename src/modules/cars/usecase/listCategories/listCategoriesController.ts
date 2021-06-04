import { Request, Response } from 'express'
import { ListCategoriesUsecase } from './listCategoriesUsecase'
import { container } from 'tsyringe'

export class ListCategoriesController {
  async handle(_: Request, res: Response): Promise<Response> {
    const usecase = container.resolve(ListCategoriesUsecase)
    const categories = await usecase.execute()

    return res.status(200).json(categories)
  }
}
