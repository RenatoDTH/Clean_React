import { AccountModel } from '@/domains/models';
import { UpdateCurrentAccount } from '@/domains/usecases';

export class UpdateCurrentAccountMock implements UpdateCurrentAccount {
  account: AccountModel;

  async save(account: AccountModel): Promise<void> {
    this.account = account;
  }
}
