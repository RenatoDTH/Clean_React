import { SurveyModel } from '@/domains/models';

export interface LoadSurveyList {
  loadAll: () => Promise<SurveyModel[]>;
}
