import { TUserRepository, TCreateUserPayload } from '../../repository/TUserRepository'
import { inject, injectable } from 'tsyringe'
import { hash } from 'bcrypt'
import { AppError } from '../../../../errors/appError'

@injectable()
export class CreateUserUsecase {
  constructor(
    @inject("UserRepository")
    private repository: TUserRepository
  ) { }

  async execute({ name, email, password, driver_license }: TCreateUserPayload): Promise<void> {
    const emailAlreadyTaken = await this.repository.findByEmail(email)

    if (emailAlreadyTaken) {
      throw new AppError("Email was already taken!")
    }

    const hashedPassword = await hash(password, 8)

    await this.repository.create({
      name,
      email,
      password: hashedPassword,
      driver_license
    })
  }
}
