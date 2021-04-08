import {
  ValidationComposite,
  RequiredFieldValidation,
  MinLengthValidation,
  EmailValidation,
  CompareFieldsValidation,
} from '@/validation/validators';
import { makeSignUpValidation } from './signup-validation-factory';

describe('SignUpValidationFactory', () => {
  test('Should make ValidationComposite with correct validation', () => {
    const composite = makeSignUpValidation();
    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidation('name'),
        new MinLengthValidation('name', 3),
        new RequiredFieldValidation('email'),
        new EmailValidation('email'),
        new RequiredFieldValidation('password'),
        new MinLengthValidation('password', 5),
        new RequiredFieldValidation('passwordConfirmation'),
        new CompareFieldsValidation('passwordConfirmation', 'password'),
      ]),
    );
  });
});
