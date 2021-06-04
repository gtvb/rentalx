import { Category } from '../modules/cars/entities/Category';
import { Specification } from '../modules/cars/entities/Specification';
import { User } from '../modules/accounts/entities/User';
import { createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
  host: string;
}

getConnectionOptions().then(options => {
  const newOptions = options as IOptions;
  newOptions.host = 'db';
  createConnection({
    ...options,
    entities: [Category, Specification, User],
  });
});
