import React from 'react';
import { Login } from '@/presentation/pages';
import { makeRemoteAuthentication } from '@/main/factories/usercases/authentication/remote-authentication-factory';
import { makeLocalSaveAccessToken } from '@/main/factories/usercases/save-access-token/local-save-access-token-factory';
import { makeLoginValidation } from './login-validation-factory';

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  );
};
