import { AddAccount, AddAccountParams } from '@/domains/usecases';
import { AccountModel } from '@/domains/models';
import { mockAccountModel } from '@/domains/test';

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel();

  params: AddAccountParams;

  async add(params: AddAccountParams): Promise<AccountModel> {
    this.params = params;
    return this.account;
  }
}
