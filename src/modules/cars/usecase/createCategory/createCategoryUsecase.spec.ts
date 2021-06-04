import { AppError } from "../../../../errors/appError"
import { InMemoryCreateCategoryRepository } from "../../repository/in-memory/CreateCategoryRepository"
import { CreateCategoryUsecase } from "./createCategoryUsecase"

let createCategoryUsecase: CreateCategoryUsecase
let inMemoryCreateCategoryRepository: InMemoryCreateCategoryRepository

describe("Create a category", () => {
  beforeEach(() => {
    inMemoryCreateCategoryRepository = new InMemoryCreateCategoryRepository()
    createCategoryUsecase = new CreateCategoryUsecase(inMemoryCreateCategoryRepository)
  })

  it("should be able to create a new category", async () => {
    const category = {
      name: "Test Category",
      description: "This is a test description"
    }

    await createCategoryUsecase.execute({
      name: category.name,
      description: category.description
    })

    const createdCategory = await inMemoryCreateCategoryRepository.findByName(category.name)

    expect(createdCategory).toHaveProperty("id")
  })

  it("should not be able to create a new category with an existing name", async () => {
    expect(async () => {
    const category = {
      name: "Test Category",
      description: "This is a test description"
    }

    await createCategoryUsecase.execute({
      name: category.name,
      description: category.description
    })

    await createCategoryUsecase.execute({
      name: category.name,
      description: category.description
    })

    }).rejects.toBeInstanceOf(AppError)
  })
})
