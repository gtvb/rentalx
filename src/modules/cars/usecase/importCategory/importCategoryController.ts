import { Request, Response } from 'express'
import { ImportCategoryUsecase } from './importCategoryUsecase'
import { container } from 'tsyringe'

export class ImportCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { file } = req
    const usecase = container.resolve(ImportCategoryUsecase)

    await usecase.execute(file)

    return res.send()
  }
}
