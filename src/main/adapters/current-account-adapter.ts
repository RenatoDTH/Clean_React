import { UnexpectedError } from '@/domains/errors';
import { AccountModel } from '@/domains/models';
import { makeLocalStorageAdapter } from '../factories/cache/local-storage-adapter-factory';

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  if (!account?.accessToken) {
    throw new UnexpectedError();
  }
  makeLocalStorageAdapter().set('account', account);
};
