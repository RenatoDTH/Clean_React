import faker from 'faker';
import { AuthenticationParams } from '@/domains/usecases';
import { AccountModel } from '../models';

export const mockAuthentication = (): AuthenticationParams => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};

export const mockAccountModel = (): AccountModel => {
  return {
    accessToken: faker.random.uuid(),
    name: faker.name.findName(),
  };
};
