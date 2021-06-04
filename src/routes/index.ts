import { Router } from 'express'

import categoryRouter from './categories.routes'
import specificationRouter from './specifications.routes'
import userRouter from './users.routes'
import authRouter from './auth.routes'

const router = Router()

router.use("/categories", categoryRouter)
router.use("/specifications", specificationRouter)
router.use("/users", userRouter)
router.use(authRouter)

export default router
