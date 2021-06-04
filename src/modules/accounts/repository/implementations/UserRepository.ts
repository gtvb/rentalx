import { User } from '../../entities/User'
import { getRepository, Repository } from 'typeorm'
import { TCreateUserPayload, TUserRepository } from '../TUserRepository'

export class UserRepository implements TUserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email })
    return user!
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id)
    return user!
  }

  async create({ name, email, password, driver_license, avatar, id }: TCreateUserPayload): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
      isAdmin: false,
      avatar,
      id
    })

    await this.repository.save(user)
  }
}
