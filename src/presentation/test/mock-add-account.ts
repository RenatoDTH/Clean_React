import { AddAccount, AddAccountParams } from '@/domains/usecases';
import { AccountModel } from '@/domains/models';
import { mockAccountModel } from '@/domains/test';

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel();

  params: AddAccountParams;

  callsCount = 0;

  async add(params: AddAccountParams): Promise<AccountModel> {
    this.params = params;
    this.callsCount += 1;
    return this.account;
  }
}
