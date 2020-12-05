import faker from 'faker';
import { AuthenticationParams } from '@/domains/usecases/authentication';
import { AccountModel } from '../models/account-model';

export const mockAuthentication = (): AuthenticationParams => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};

export const mockAccountModel = (): AccountModel => {
  return {
    accessToken: faker.random.uuid(),
  };
};
