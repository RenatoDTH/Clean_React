import faker from 'faker';
import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
  HttpStatusCode,
} from '@/data/protocols/http';

export const mockPostRequest = (): HttpPostParams => {
  return {
    url: faker.internet.url(),
    body: faker.random.objectElement(),
  };
};

export class HttpPostClientSpy<R> implements HttpPostClient<R> {
  url?: string;

  body?: any;

  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async post(params: HttpPostParams): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve(this.response);
  }
}
