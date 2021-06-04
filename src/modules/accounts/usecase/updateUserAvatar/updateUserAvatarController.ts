import { Request, Response } from 'express'
import { UpdateUserAvatarUsecase } from './updateUserAvatarUsecase'
import { container } from 'tsyringe'

export class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const avatar_file = req.file.filename;

    const updateUserAvatar = container.resolve(UpdateUserAvatarUsecase);
    await updateUserAvatar.execute({ avatar_file, user_id });

    return res.status(204).send();
  }
}

