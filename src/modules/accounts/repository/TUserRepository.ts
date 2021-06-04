import { User } from "../entities/User"

export type TCreateUserPayload = {
  name: string;
  email: string;
  password: string;
  driver_license: string;
  id?: string;
  avatar?: string;
}

export type TUserRepository = {
  create(payload: TCreateUserPayload): Promise<void>
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User>
}

