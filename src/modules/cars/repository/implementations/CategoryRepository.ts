import { Category } from '../../entities/Category'
import { Repository, getRepository } from 'typeorm'
import { TCategoryRepository, TCreateCategoryPayload } from '../TCategoryRepository';

export class CategoryRepository implements TCategoryRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async list(): Promise<Category[]> {
    return await this.repository.find();
  }

  async findByName(name: string): Promise<Category> {
    const category =  await this.repository.findOne({ name });
    return category!
  }

  async create({ name, description }: TCreateCategoryPayload): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
  }
}
