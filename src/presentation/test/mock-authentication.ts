import { Authentication, AuthenticationParams } from '@/domains/usecases';
import { AccountModel } from '@/domains/models';
import { mockAccountModel } from '@/domains/test';

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel();

  params: AuthenticationParams;

  callsCount = 0;

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    this.callsCount += 1;
    return Promise.resolve(this.account);
  }
}
