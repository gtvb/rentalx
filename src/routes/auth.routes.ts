import { Router } from 'express'
import { AuthenticateUserController } from '../modules/accounts/usecase/userAuthentication/authenticateUserController'

const router = Router()
const createSpecification = new AuthenticateUserController()

router.post("/sessions", createSpecification.handle)

export default router
