import faker from 'faker';
import { LoadSurveyResult, SaveSurveyResult } from '@/domains/usecases';

export const mockSaveSurveyResultParams = (): SaveSurveyResult.Params => ({
  answer: faker.random.words(),
});

export const mockSurveyResultModel = (): LoadSurveyResult.Model => {
  return {
    question: faker.random.words(10),
    date: faker.date.recent(),
    answers: [
      {
        image: faker.internet.url(),
        answer: faker.random.word(),
        count: faker.random.number(),
        percent: faker.random.number(100),
        isCurrentAccountAnswer: true,
      },
      {
        answer: faker.random.word(),
        count: faker.random.number(),
        percent: faker.random.number(100),
        isCurrentAccountAnswer: false,
      },
    ],
  };
};

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callsCount = 0;

  surveyResult = mockSurveyResultModel();

  async load(): Promise<LoadSurveyResult.Model> {
    this.callsCount += 1;
    return this.surveyResult;
  }
}

export class SaveSurveyResultSpy implements SaveSurveyResult {
  callsCount = 0;

  params: SaveSurveyResult.Params;

  surveyResult = mockSurveyResultModel();

  async save(params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    this.params = params;
    this.callsCount += 1;
    return this.surveyResult;
  }
}
