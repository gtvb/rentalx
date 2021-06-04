import { Specification } from "../entities/Specification"

export type TCreateSpecificationPayload = {
  name: string;
  description: string;
}

export type TSpecificationRepository = {
  create({name, description}: TCreateSpecificationPayload): Promise<void>
  findByName(name: string): Promise<Specification | undefined>
}

