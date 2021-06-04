import { AppError } from "../../../../errors/appError"
import { InMemoryUserRepository } from "../../repository/in-memory/InMemoryUserRepository"
import { TCreateUserPayload } from "../../repository/TUserRepository"
import { CreateUserUsecase } from "../createUser/createUserUsecase"
import { AuthenticateUserUsecase } from "./authenticateUserUsecase"


let inMemoryUserRepository: InMemoryUserRepository
let authenticateUserUsecase: AuthenticateUserUsecase
let createUserUsecase: CreateUserUsecase

describe("Authenticate a user", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    authenticateUserUsecase = new AuthenticateUserUsecase(inMemoryUserRepository)
    createUserUsecase = new CreateUserUsecase(inMemoryUserRepository)
  })

  it("should be able to authenticate a user", async () => {
    const user: TCreateUserPayload = {
      driver_license: "000123",
      email: "bob@bob.com",
      name: "Bob",
      password: "BobIsCool"
    }

    await createUserUsecase.execute(user)

    const response = await authenticateUserUsecase.execute({
      email: user.email,
      password: user.password
    })

    expect(response).toHaveProperty("token")
  })

  it("should not be able to authenticate an non existant user", () => {
    expect(async () => {
      await authenticateUserUsecase.execute({
      email: "false@email.com",
      password: "12345" 
    })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to authenticate a wrongly typed password", () => {
    expect(async () => {
      const user: TCreateUserPayload = {
        driver_license: "000123",
        email: "bob@bob.com",
        name: "Bob",
        password: "BobIsCool"
      }

      await createUserUsecase.execute(user)

      await authenticateUserUsecase.execute({
        email: user.email,
        password: "wrong-pass" 
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
