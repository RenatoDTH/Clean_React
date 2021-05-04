import React from 'react';
import { SignUp } from '@/presentation/pages';
import { makeSignUpValidation } from './signup-validation-factory';
import { makeRemoteAddAccount } from '../../usercases/add-account/remote-add-account-factory';

export const MakeSignUp: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
    />
  );
};
