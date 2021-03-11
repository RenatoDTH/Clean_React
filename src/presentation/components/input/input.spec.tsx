import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import Context from '@/presentation/contexts/form/form-context';
import faker from 'faker';
import Input from './input';

const makeSut = (fieldName: string): RenderResult => {
  return render(
    <Context.Provider value={{ state: {} }}>
      <Input name={fieldName} />
    </Context.Provider>,
  );
};

describe('Input Component', () => {
  test('Should begin with readOnly', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const input = sut.getByTestId(field) as HTMLInputElement;
    expect(input.readOnly).toBeTruthy();
  });

  test('Should remove readOnly on focus', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const input = sut.getByTestId(field) as HTMLInputElement;
    fireEvent.focus(input);
    expect(input.readOnly).toBeFalsy();
  });

  test('Should focus input on label click', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const input = sut.getByTestId(field);
    const label = sut.getByTestId(`${field}-label`);
    fireEvent.click(label);
    expect(document.activeElement).toBe(input);
  });
});
