import { ThunkDispatch } from "redux-thunk";
import { SetupType } from "@store/types";
import { IUserProps } from "./task";

export interface IUser {
  avatar: { Location: string };
  createdAt: Date;
  email: string;
  name: string;
  role: string;
  surname: string;
  _id: string;
}
export interface UserState {
  User: IUserProps;
  isLoading: boolean;
  success: string;
  error: string;
  status: number | null;
}

interface IS_LOGGED_IN_START {
  type: SetupType.IS_LOGGED_IN_START;
}
interface IS_LOGGED_IN_SUCCESS {
  type: SetupType.IS_LOGGED_IN_SUCCESS;
  status: number;
  payload: IUser;
}

interface IS_LOGGED_IN_RESET {
  type: SetupType.IS_LOGGED_IN_RESET;
}

interface UPDATE_USER_PASSWORD_START {
  type: SetupType.UPDATE_USER_PASSWORD_START;
}
interface UPDATE_USER_PASSWORD_SUCCESS {
  type: SetupType.UPDATE_USER_PASSWORD_SUCCESS;
  status: number;
}

interface UPDATE_USER_PASSWORD_RESET {
  type: SetupType.UPDATE_USER_PASSWORD_RESET;
}

interface DELETE_USER_AVATAR_START {
  type: SetupType.DELETE_USER_AVATAR_START;
}
interface DELETE_USER_AVATAR_SUCCESS {
  type: SetupType.DELETE_USER_AVATAR_SUCCESS;
  payload: IUserProps;
  status: number;
}

interface DELETE_USER_AVATAR_RESET {
  type: SetupType.DELETE_USER_AVATAR_RESET;
}

interface UPLOAD_USER_AVATAR_START {
  type: SetupType.UPLOAD_USER_AVATAR_START;
}
interface UPLOAD_USER_AVATAR_SUCCESS {
  type: SetupType.UPLOAD_USER_AVATAR_SUCCESS;
  payload: IUser;
  status: number;
}

interface UPLOAD_USER_AVATAR_RESET {
  type: SetupType.UPLOAD_USER_AVATAR_RESET;
}

interface LOGOUT_START {
  type: SetupType.LOGOUT_START;
}

interface LOGOUT_RESET {
  type: SetupType.LOGOUT_RESET;
}

export type UserAction =
  | IS_LOGGED_IN_START
  | IS_LOGGED_IN_SUCCESS
  | IS_LOGGED_IN_RESET
  | UPDATE_USER_PASSWORD_START
  | UPDATE_USER_PASSWORD_SUCCESS
  | UPDATE_USER_PASSWORD_RESET
  | DELETE_USER_AVATAR_START
  | DELETE_USER_AVATAR_SUCCESS
  | DELETE_USER_AVATAR_RESET
  | UPLOAD_USER_AVATAR_START
  | UPLOAD_USER_AVATAR_SUCCESS
  | UPLOAD_USER_AVATAR_RESET
  | LOGOUT_START
  | LOGOUT_RESET;

export type UserDispatch = ThunkDispatch<UserState, void, UserAction>;
