import { UserController } from '../modules/accounts/usecase/createUser/createUserController'
import { UpdateUserAvatarController } from '../modules/accounts/usecase/updateUserAvatar/updateUserAvatarController'
import { Router } from 'express'
import { requireAuthentication } from '../middlewares/requireAuthentication'

import multer from 'multer'
import uploadConfig from '../config/upload'

const router = Router()
const createUser = new UserController()
const updateUser = new UpdateUserAvatarController()

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'))

router.post("/", createUser.handle)
router.patch("/avatar", requireAuthentication, uploadAvatar.single("avatar"), updateUser.handle)

export default router


