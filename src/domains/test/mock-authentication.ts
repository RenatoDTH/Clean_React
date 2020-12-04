import faker from 'faker';
import { AuthenticationParams } from '@/domains/usecases/authentication';

export const mockAuthentication = (): AuthenticationParams => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};
