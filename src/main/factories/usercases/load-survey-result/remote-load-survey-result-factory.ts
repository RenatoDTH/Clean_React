import { makeApiUrl } from '@/main/factories/http';
import { makeAuthorizeHttpGetClientDecorator } from '@/main/factories/decorators';
import { LoadSurveyResult } from '@/domains/usecases';
import { RemoteLoadSurveyResult } from '@/data/usecases';

export const makeRemoteLoadSurveyResult = (id: string): LoadSurveyResult => {
  return new RemoteLoadSurveyResult(
    makeApiUrl(`/surveys/${id}/results`),
    makeAuthorizeHttpGetClientDecorator(),
  );
};
