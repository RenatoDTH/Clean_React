import { HttpStatusCode } from '@/data/protocols/http';
import { HttpPostClientSpy } from '@/data/test';
import { EmailInUseError, UnexpectedError } from '@/domains/errors';
import { mockAddAccountModel, mockAddAccountParams } from '@/domains/test';
import faker from 'faker';
import { RemoteAddAccount } from './remote-add-account';

type SutTypes = {
  sut: RemoteAddAccount;
  httpPostClientSpy: HttpPostClientSpy<RemoteAddAccount.Model>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<RemoteAddAccount.Model>();
  const sut = new RemoteAddAccount(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy,
  };
};

describe('RemoteAddAccount', () => {
  test('Should call HttpPostClient with corret URL', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.add(mockAddAccountParams());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test('Should call HttpPostClient with corret body', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const AddAccountParams = mockAddAccountParams();
    await sut.add(AddAccountParams);
    expect(httpPostClientSpy.body).toEqual(AddAccountParams);
  });

  test('Should throw EmailInUseError if HttpPostClient returns 403', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new EmailInUseError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return an AddAccount.Model if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const httpResult = mockAddAccountModel();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const account = await sut.add(mockAddAccountParams());
    expect(account).toEqual(httpResult);
  });
});
