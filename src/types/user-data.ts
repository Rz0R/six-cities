import { AuthorizationStatus } from '../const';

export type User = {
  avatarUrl: string;
  email: string;
  id: string;
  isPro: boolean;
  name: string;
  token: string;
};

export type BackendUser = {
  avatar_url: string;
  email: string;
  id: string;
  is_pro: boolean;
  name: string;
  token: string;
};

export type UserState = {
  userData: UserData;
  authorizationStatus: AuthorizationStatus;
};

export type UserData = User | null;
