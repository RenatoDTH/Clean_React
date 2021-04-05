import { AccountModel } from '@/domains/models';
import faker from 'faker';

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.uuid(),
  name: faker.name.findName(),
});
