import { TSpecificationRepository } from '../../repository/TSpecificationRepository'
import { inject, injectable } from "tsyringe"
import { AppError } from '../../../../errors/appError'

type TRequestPayload = {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationUsecase {
  constructor(
    @inject("SpecificationRepository")
    private repository: TSpecificationRepository
  ) { }

  async execute({ description, name }: TRequestPayload) {
    const specificationAlreadyExists = await this.repository.findByName(name)

    if (specificationAlreadyExists) {
      throw new AppError("This specification is already registered")
    }

    await this.repository.create({ name, description })
  }
}
