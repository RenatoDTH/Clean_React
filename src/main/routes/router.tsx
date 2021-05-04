import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  MakeLogin,
  MakeSignUp,
  MakeSurveyList,
  MakeSurveyResult,
} from '@/main/factories/pages/';
import { ApiContext } from '@/presentation/contexts';
import { PrivateRoute } from '@/presentation/components';
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from '../adapters/current-account-adapter';

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter,
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={MakeLogin} />
          <Route path="/signup" exact component={MakeSignUp} />
          <PrivateRoute path="/" exact component={MakeSurveyList} />
          <PrivateRoute path="/surveys/:id" component={MakeSurveyResult} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  );
};

export default Router;
