import { HttpPostClientSpy } from '@/data/test';
import { AccountModel } from '@/domains/models';
import { mockAddAccountParams } from '@/domains/test';
import { AddAccountParams } from '@/domains/usecases';
import faker from 'faker';
import { RemoteAddAccount } from './remote-add-account';

type SutTypes = {
  sut: RemoteAddAccount;
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AddAccountParams,
    AccountModel
  >();
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
});