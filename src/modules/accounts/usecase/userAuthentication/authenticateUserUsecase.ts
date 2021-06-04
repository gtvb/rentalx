import { AppError } from '../../../../errors/appError'
import { TUserRepository } from '../../repository/TUserRepository'
import { inject, injectable } from 'tsyringe'
import { compare } from "bcrypt"
import { sign } from 'jsonwebtoken'

type TRequestPayload = {
  email: string;
  password: string;
}

type TAuthResponse = {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
export class AuthenticateUserUsecase {
  constructor(
    @inject("UserRepository")
    private repository: TUserRepository
  ) { }

  async execute({ email, password }: TRequestPayload): Promise<TAuthResponse> {
    const user = await this.repository.findByEmail(email)

    if (!user) {
      throw new AppError("Wrong email or password")
    }

    const isPasswordCorrect = await compare(password, user.password)

    if (!isPasswordCorrect) {
      throw new AppError("Wrong email or password")
    }

    const token = sign({}, "defcd0f5633333ad07784f2aed8a542b", {
      subject: user.id,
      expiresIn: "1d"
    })

    return {
      user: {
        email: user.email,
        name: user.name
      },
      token
    }
  }
}
