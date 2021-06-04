import { Repository, getRepository } from 'typeorm'
import { Specification } from '../../entities/Specification'
import { TCreateSpecificationPayload, TSpecificationRepository } from '../TSpecificationRepository'

export class SpecificationRepository implements TSpecificationRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification)
  }

  async create({ name, description }: TCreateSpecificationPayload): Promise<void> {
    const specification = this.repository.create({
      name,
      description
    })

    await this.repository.save(specification)
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.repository.findOne({ name })
    return specification
  }
}
