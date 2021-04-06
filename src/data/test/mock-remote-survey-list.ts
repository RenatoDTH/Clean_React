import faker from 'faker';
import { RemoteLoadSurveyList } from '@/data/usecases';

export const mockRemoteSurveyModel = (): RemoteLoadSurveyList.Model => {
  return {
    id: faker.random.uuid(),
    question: faker.random.words(10),
    didAnswer: faker.random.boolean(),
    date: faker.date.recent().toISOString(),
  };
};

export const mockRemoteSurveyListModel = (): RemoteLoadSurveyList.Model[] => {
  return [
    mockRemoteSurveyModel(),
    mockRemoteSurveyModel(),
    mockRemoteSurveyModel(),
  ];
};
