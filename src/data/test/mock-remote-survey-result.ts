import faker from 'faker';
import { RemoteLoadSurveyResult } from '@/data/usecases';

export const mockRemoteSurveyResultModel = (): RemoteLoadSurveyResult.Model => {
  return {
    question: faker.random.words(10),
    date: faker.date.recent().toISOString(),
    answers: [
      {
        image: faker.internet.url(),
        answer: faker.random.word(),
        count: faker.random.number(),
        percent: faker.random.number(100),
        isCurrentAccountAnswer: faker.random.boolean(),
      },
      {
        answer: faker.random.word(),
        count: faker.random.number(),
        percent: faker.random.number(100),
        isCurrentAccountAnswer: faker.random.boolean(),
      },
    ],
  };
};
