import { Category } from '../../entities/Category';
import { TCategoryRepository, TCreateCategoryPayload } from '../TCategoryRepository'

export class InMemoryCreateCategoryRepository implements TCategoryRepository {
  categories: Category[] = []

  async create({ name, description }: TCreateCategoryPayload): Promise<void> {
    const category = new Category()

    Object.assign(category, {
      name,
      description
    })

    this.categories.push(category)
  }

  async list(): Promise<Category[]> {
    return this.categories
  }

  async findByName(name: string): Promise<Category> {
     const category = this.categories.find(category => category.name === name)
     return category!
  }
}
