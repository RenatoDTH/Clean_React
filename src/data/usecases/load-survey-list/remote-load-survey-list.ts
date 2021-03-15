import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http';
import { UnexpectedError } from '@/domains/errors';
import { SurveyModel } from '@/domains/models';
import { LoadSurveyList } from '@/domains/usecases/load-survey-list';

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<SurveyModel[]>,
  ) {}

  async loadAll(): Promise<SurveyModel[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.noContent:
        return [];
      default:
        throw new UnexpectedError();
    }
  }
}
