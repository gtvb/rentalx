import { TCategoryRepository } from '../../repository/TCategoryRepository'
import { inject, injectable } from "tsyringe"
import { AppError } from '../../../../errors/appError'

type TRequestPayload = {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryUsecase {
  constructor(
    @inject("CategoryRepository")
    private repository: TCategoryRepository
  ) { }

  async execute({ description, name }: TRequestPayload): Promise<void> {
    const categoryAlreadyExists = await this.repository.findByName(name)

    if (categoryAlreadyExists) {
      throw new AppError("This category is already registered")
    }

    await this.repository.create({ name, description })
  }
}
