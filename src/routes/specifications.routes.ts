import { Router } from 'express'
import { CreateSpecificationController } from '../modules/cars/usecase/createSpecification/createSpecificationController'
import { requireAuthentication } from '../middlewares/requireAuthentication'

const router = Router()
const createSpecification = new CreateSpecificationController()

router.use(requireAuthentication)
router.post("/", createSpecification.handle)

export default router
