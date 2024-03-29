import { LoadSurveyResult } from '@/domains/usecases';
import { Calendar } from '@/presentation/components';
import React from 'react';
import { useHistory } from 'react-router';
import { SurveyResultAnswer } from '@/presentation/pages/survey-result/components';
import Styles from './result-styles.scss';

type Props = {
  surveyResult: LoadSurveyResult.Model;
};

const Result: React.FC<Props> = ({ surveyResult }: Props) => {
  const { goBack } = useHistory();

  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} className={Styles.calendarWrap} />
        <h2 data-testid="question">{surveyResult.question}</h2>
      </hgroup>

      <ul data-testid="answers" className={Styles.answersList}>
        {surveyResult.answers.map((answer) => (
          <SurveyResultAnswer key={answer.answer} answer={answer} />
        ))}
      </ul>
      <button
        className={Styles.button}
        data-testid="back-button"
        type="button"
        onClick={goBack}
      >
        Voltar
      </button>
    </>
  );
};

export default Result;
