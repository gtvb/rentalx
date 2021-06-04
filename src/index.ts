import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import router from './routes'

import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger.json'

import { AppError } from './errors/appError'

import "./database"
import "./shared/container"

const app = express()

app.use(express.json())

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message })
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`
  })
})

app.listen(4000, () => console.log("server up on 4000"))
