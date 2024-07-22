import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

export interface IPropsSignIn<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
> {
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  navigate: (to: string) => void;
  loading: boolean;
}

export interface IPropsSignUp<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
> {
  navigate: (to: string) => void;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  loading: boolean;
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
  user: {
    user: IPublicUser;
    token: string;
  };
  isLogged: boolean;
  isLoading: boolean;
}

// for redux
export interface ISignInData {
  email: string;
  password: string;
}

export interface ISignUpData {
  email: string;
  password: string;
  firstName: string;
  userName: string;
}
