import React from 'react';
import { SurveyList } from '@/presentation/pages';
import { makeRemoteLoadSurveyList } from '@/main/factories/usercases';

export const makeSurveyList: React.FC = () => {
  return <SurveyList loadSurveyList={makeRemoteLoadSurveyList()} />;
};
