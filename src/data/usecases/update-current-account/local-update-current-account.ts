import { SetStorage } from '@/data/protocols/cache/set-storage';
import { UnexpectedError } from '@/domains/errors';
import { AccountModel } from '@/domains/models';
import { UpdateCurrentAccount } from '@/domains/usecases/update-current-account';

export class LocalUpdateCurrentAccount implements UpdateCurrentAccount {
  constructor(private readonly setStorage: SetStorage) {}

  async save(account: AccountModel): Promise<void> {
    if (!account?.accessToken) {
      throw new UnexpectedError();
    }

    await this.setStorage.set('account', JSON.stringify(account));
  }
}
