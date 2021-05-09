import { makeApiUrl } from '@/main/factories/http';
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators';
import { SaveSurveyResult } from '@/domains/usecases';
import { RemoteSaveSurveyResult } from '@/data/usecases';

export const makeRemoteSaveSurveyResult = (id: string): SaveSurveyResult => {
  return new RemoteSaveSurveyResult(
    makeApiUrl(`/surveys/${id}/results`),
    makeAuthorizeHttpClientDecorator(),
  );
};
