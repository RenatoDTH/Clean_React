import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SurveyResult } from '@/presentation/pages';
import { ApiContext } from '@/presentation/contexts';
import {
  LoadSurveyResultSpy,
  mockAccountModel,
  mockSurveyResultModel,
  SaveSurveyResultSpy,
} from '@/domains/test';
import { AccessDeniedError, UnexpectedError } from '@/domains/errors';
import { AccountModel } from '@/domains/models';
import { MemoryHistory, createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy;
  saveSurveyResultSpy: SaveSurveyResultSpy;
  history: MemoryHistory;
  setCurrentAccountMock: (account: AccountModel) => void;
};

type SutParams = {
  loadSurveyResultSpy?: LoadSurveyResultSpy;
  saveSurveyResultSpy?: SaveSurveyResultSpy;
};

const makeSut = ({
  loadSurveyResultSpy = new LoadSurveyResultSpy(),
  saveSurveyResultSpy = new SaveSurveyResultSpy(),
}: SutParams = {}): SutTypes => {
  const history = createMemoryHistory({
    initialEntries: ['/', '/surveys/any_id'],
    initialIndex: 1,
  });
  const setCurrentAccountMock = jest.fn();
  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountMock,
        getCurrentAccount: () => mockAccountModel(),
      }}
    >
      <Router history={history}>
        <SurveyResult
          loadSurveyResult={loadSurveyResultSpy}
          saveSurveyResult={saveSurveyResultSpy}
        />
      </Router>
    </ApiContext.Provider>,
  );

  return {
    loadSurveyResultSpy,
    history,
    setCurrentAccountMock,
    saveSurveyResultSpy,
  };
};

describe('SurveyResult Component', () => {
  test('Should present correct initial state', async () => {
    makeSut();
    const surveyResult = screen.getByTestId('survey-result');
    expect(surveyResult.childElementCount).toBe(0);
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    await waitFor(() => surveyResult);
  });

  test('Should call LoadSurveyResult', async () => {
    const { loadSurveyResultSpy } = makeSut();
    await waitFor(() => screen.getByTestId('survey-result'));
    expect(loadSurveyResultSpy.callsCount).toBe(1);
  });

  test('Should present SurveyResult data on success', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy();
    const surveyResult = Object.assign(mockSurveyResultModel(), {
      date: new Date('2020-05-03T00:00:00'),
    });
    loadSurveyResultSpy.surveyResult = surveyResult;
    makeSut({ loadSurveyResultSpy });
    await waitFor(() => screen.getByTestId('survey-result'));

    expect(screen.getByTestId('day')).toHaveTextContent('03');
    expect(screen.getByTestId('month')).toHaveTextContent('mai');
    expect(screen.getByTestId('year')).toHaveTextContent('2020');
    expect(screen.getByTestId('question')).toHaveTextContent(
      surveyResult.question,
    );
    expect(screen.getByTestId('answers').childElementCount).toBe(2);
    const answerWrap = screen.queryAllByTestId('answer-wrap');
    expect(answerWrap[0]).toHaveClass('active');
    expect(answerWrap[1]).not.toHaveClass('active');
    const images = screen.queryAllByTestId('image');
    expect(images[0]).toHaveAttribute('src', surveyResult.answers[0].image);
    expect(images[0]).toHaveAttribute('alt', surveyResult.answers[0].answer);
    expect(images[1]).toBeFalsy();
    const answers = screen.queryAllByTestId('answer');
    expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer);
    expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer);
    const percents = screen.queryAllByTestId('percent');
    expect(percents[0]).toHaveTextContent(
      `${surveyResult.answers[0].percent}%`,
    );
    expect(percents[1]).toHaveTextContent(
      `${surveyResult.answers[1].percent}%`,
    );
  });

  test('Should render error on UnexpectedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy();
    const error = new UnexpectedError();
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(error);
    makeSut({ loadSurveyResultSpy });
    await waitFor(() => screen.getByTestId('survey-result'));
    expect(screen.queryByTestId('question')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent(error.message);
  });

  test('Should logout on AccessDeniedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy();
    jest
      .spyOn(loadSurveyResultSpy, 'load')
      .mockRejectedValueOnce(new AccessDeniedError());
    const { history, setCurrentAccountMock } = makeSut({ loadSurveyResultSpy });
    await waitFor(() => screen.getByTestId('survey-result'));
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(history.location.pathname).toBe('/login');
  });

  test('Should call LoadSurveyResult on reload', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy();
    jest
      .spyOn(loadSurveyResultSpy, 'load')
      .mockRejectedValueOnce(new UnexpectedError());
    makeSut({ loadSurveyResultSpy });
    await waitFor(() => screen.getByTestId('survey-result'));
    fireEvent.click(screen.getByTestId('reload'));
    expect(loadSurveyResultSpy.callsCount).toBe(1);
    await waitFor(() => screen.getByTestId('survey-result'));
  });

  test('Should go to SurveyList on back button click', async () => {
    const { history } = makeSut();
    await waitFor(() => screen.getByTestId('survey-result'));
    fireEvent.click(screen.getByTestId('back-button'));
    expect(history.location.pathname).toBe('/');
  });

  test('Should not present Loading on active answer click', async () => {
    makeSut();
    await waitFor(() => screen.getByTestId('survey-result'));
    const answerWrap = screen.queryAllByTestId('answer-wrap');
    fireEvent.click(answerWrap[0]);
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });

  test('Should call SaveSurveyResult on non active answer click', async () => {
    const { saveSurveyResultSpy, loadSurveyResultSpy } = makeSut();
    await waitFor(() => screen.getByTestId('survey-result'));
    const answerWrap = screen.queryAllByTestId('answer-wrap');
    fireEvent.click(answerWrap[1]);
    expect(screen.queryByTestId('loading')).toBeInTheDocument();
    expect(saveSurveyResultSpy.params).toEqual({
      answer: loadSurveyResultSpy.surveyResult.answers[1].answer,
    });
    await waitFor(() => screen.getByTestId('survey-result'));
  });

  test('Should render error on UnexpectedError', async () => {
    const saveSurveyResultSpy = new SaveSurveyResultSpy();
    const error = new UnexpectedError();
    jest.spyOn(saveSurveyResultSpy, 'save').mockRejectedValueOnce(error);
    makeSut({ saveSurveyResultSpy });
    await waitFor(() => screen.getByTestId('survey-result'));
    const answerWrap = screen.queryAllByTestId('answer-wrap');
    fireEvent.click(answerWrap[1]);
    await waitFor(() => screen.getByTestId('survey-result'));
    expect(screen.queryByTestId('question')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent(error.message);
  });

  test('Should logout on AccessDeniedError', async () => {
    const saveSurveyResultSpy = new SaveSurveyResultSpy();
    jest
      .spyOn(saveSurveyResultSpy, 'save')
      .mockRejectedValueOnce(new AccessDeniedError());
    const { history, setCurrentAccountMock } = makeSut({ saveSurveyResultSpy });
    await waitFor(() => screen.getByTestId('survey-result'));
    const answerWrap = screen.queryAllByTestId('answer-wrap');
    fireEvent.click(answerWrap[1]);
    await waitFor(() => screen.getByTestId('survey-result'));
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(history.location.pathname).toBe('/login');
  });

  test('Should present SurveyResult data on SaveSurveySuccess success', async () => {
    const saveSurveyResultSpy = new SaveSurveyResultSpy();
    const surveyResult = Object.assign(mockSurveyResultModel(), {
      date: new Date('2018-02-20T00:00:00'),
    });
    saveSurveyResultSpy.surveyResult = surveyResult;
    makeSut({ saveSurveyResultSpy });
    await waitFor(() => screen.getByTestId('survey-result'));

    const answerWrap = screen.queryAllByTestId('answer-wrap');
    fireEvent.click(answerWrap[1]);
    await waitFor(() => screen.getByTestId('survey-result'));

    expect(screen.getByTestId('day')).toHaveTextContent('20');
    expect(screen.getByTestId('month')).toHaveTextContent('fev');
    expect(screen.getByTestId('year')).toHaveTextContent('2018');
    expect(screen.getByTestId('question')).toHaveTextContent(
      surveyResult.question,
    );
    expect(screen.getByTestId('answers').childElementCount).toBe(2);
    expect(answerWrap[0]).toHaveClass('active');
    expect(answerWrap[1]).not.toHaveClass('active');
    const images = screen.queryAllByTestId('image');
    expect(images[0]).toHaveAttribute('src', surveyResult.answers[0].image);
    expect(images[0]).toHaveAttribute('alt', surveyResult.answers[0].answer);
    expect(images[1]).toBeFalsy();
    const answers = screen.queryAllByTestId('answer');
    expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer);
    expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer);
    const percents = screen.queryAllByTestId('percent');
    expect(percents[0]).toHaveTextContent(
      `${surveyResult.answers[0].percent}%`,
    );
    expect(percents[1]).toHaveTextContent(
      `${surveyResult.answers[1].percent}%`,
    );
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });

  test('Should prevent multiple answer click', async () => {
    const { saveSurveyResultSpy } = makeSut();

    await waitFor(() => screen.getByTestId('survey-result'));
    const answerWrap = screen.queryAllByTestId('answer-wrap');
    fireEvent.click(answerWrap[1]);
    fireEvent.click(answerWrap[1]);
    await waitFor(() => screen.getByTestId('survey-result'));
    expect(saveSurveyResultSpy.callsCount).toBe(1);
  });
});
