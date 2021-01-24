import { HttpPostClientSpy } from '@/data/test';
import { AccountModel } from '@/domains/models';
import { AddAccount, AddAccountParams } from '@/domains/usecases';

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpPostClientSpy: HttpPostClientSpy<
      AddAccountParams,
      AccountModel
    >,
  ) {}

  async add(params: AddAccountParams): Promise<AccountModel> {
    await this.httpPostClientSpy.post({
      url: this.url,
      body: params,
    });
    return null;
  }
}
