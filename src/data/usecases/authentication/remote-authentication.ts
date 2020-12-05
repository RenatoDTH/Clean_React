import { Authentication, AuthenticationParams } from '@/domains/usecases';
import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http';
import { InvalidCredentialsError, UnexpectedError } from '@/domains/errors';
import { AccountModel } from '@/domains/models';

export default class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AuthenticationParams,
      AccountModel
    >,
  ) {}

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.unathorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}
