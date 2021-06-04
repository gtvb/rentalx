import { container } from 'tsyringe'

import { TCategoryRepository, CategoryRepository } from '../../modules/cars/repository/CategoryRepository'
import { TSpecificationRepository, SpecificationRepository } from '../../modules/cars/repository/SpecificationRepository'
import { TUserRepository, UserRepository } from '../../modules/accounts/repository/UserRepository'

container.registerSingleton<TCategoryRepository>("CategoryRepository", CategoryRepository)
container.registerSingleton<TSpecificationRepository>("SpecificationRepository", SpecificationRepository)
container.registerSingleton<TUserRepository>("UserRepository", UserRepository)


