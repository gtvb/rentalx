import { Category } from "../entities/Category"

export type TCreateCategoryPayload = {
  name: string;
  description: string;
}

export type TCategoryRepository = {
  create({ name, description }: TCreateCategoryPayload): Promise<void>;
  list(): Promise<Category[]>;
  findByName(name: string): Promise<Category>;
}

