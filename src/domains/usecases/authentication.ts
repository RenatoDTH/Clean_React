import { AccountModel } from '../models/account-model';

type AuthentcationParams = {
  email: string;
  password: string;
};

export interface Authentication {
  auth(params: AuthentcationParams): Promise<AccountModel>;
}
