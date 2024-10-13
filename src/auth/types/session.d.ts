import { User } from './user';

export type SessionToken = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

export type Session = {
  user: User;
  token: SessionToken;
};

export type SessionLogout = {
  message: string;
  userId: string;
};
