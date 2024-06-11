import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

export interface IPropsSignIn<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
> {
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  navigate: (to: string) => void;
}

export interface IPropsSignUp {
  setPassword: (value: string) => void;
  setEmail: (value: string) => void;
  setRepeatPassword: (value: string) => void;
  setFirstName: (value: string) => void;
  setUserName: (value: string) => void;
  navigate: (to: string) => void;
}

export interface IWatchList {
  id: number | null;
  name: string;
  assetId: string;
  createdAt: string;
  updatedAt: string;
  user: number | null;
}

export interface IPublicUser {
  id: number | null;
  firstName: string;
  userName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  watchList: IWatchList[];
}

export interface IAuthState {
  user: IPublicUser;
  isLogged: boolean;
}
