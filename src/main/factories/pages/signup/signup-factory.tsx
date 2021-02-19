import React from 'react';
import { SignUp } from '@/presentation/pages';
import { makeLocalSaveAccessToken } from '@/main/factories/usercases/save-access-token/local-save-access-token-factory';
import { makeSignUpValidation } from './signup-validation-factory';
import { makeRemoteAddAccount } from '../../usercases/add-account/remote-add-account-factory';

export const makeSignUp: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  );
};
