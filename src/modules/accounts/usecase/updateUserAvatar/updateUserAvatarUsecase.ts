import { inject, injectable } from 'tsyringe'
import { TUserRepository } from '../../repository/TUserRepository'
import { User } from '../../entities/User'

import { deleteFile } from '../../../../utils/file'

type TRequestPayload = {
  user_id: string;
  avatar_file: string;
}

@injectable()
export class UpdateUserAvatarUsecase {
  constructor(
    @inject("UserRepository")
    private repository: TUserRepository
  ) { }

  async execute({ user_id, avatar_file }: TRequestPayload): Promise<void> {
    const user = await this.repository.findById(user_id) as User

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`)
    }
    user.avatar = avatar_file

    await this.repository.create(user)
  }
}
