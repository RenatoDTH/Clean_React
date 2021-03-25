import { mockSurveyModel } from '@/domains/test';
import { IconName } from '@/presentation/components';
import { SurveyItem } from '@/presentation/pages/survey-list/components';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    const survey = mockSurveyModel();
    survey.didAnswer = true;
    survey.date = new Date('2021-03-25T00:00:00');
    render(<SurveyItem survey={survey} />);
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp);
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
    expect(screen.getByTestId('day')).toHaveTextContent('25');
    expect(screen.getByTestId('month')).toHaveTextContent('mar');
    expect(screen.getByTestId('year')).toHaveTextContent('2021');
  });
});
