import faker from 'faker';
import { LoadSurveyList } from '@/domains/usecases';

export const mockSurveyModel = (): LoadSurveyList.Model => {
  return {
    id: faker.random.uuid(),
    question: faker.random.words(10),
    didAnswer: faker.random.boolean(),
    date: faker.date.recent(),
  };
};

export const mockSurveyListModel = (): LoadSurveyList.Model[] => {
  return [mockSurveyModel(), mockSurveyModel(), mockSurveyModel()];
};

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;

  surveys = mockSurveyListModel();

  async loadAll(): Promise<LoadSurveyList.Model[]> {
    this.callsCount += 1;
    return this.surveys;
  }
}
