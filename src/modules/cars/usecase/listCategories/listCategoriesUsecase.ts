import { TCategoryRepository } from '../../repository/TCategoryRepository'
import { inject, injectable } from 'tsyringe'
import { Category } from '../../entities/Category'

@injectable()
export class ListCategoriesUsecase {
  constructor(
    @inject("CategoryRepository")
    private repository: TCategoryRepository
  ) { }

  async execute(): Promise<Category[]> {
    return await this.repository.list()
  }
}
