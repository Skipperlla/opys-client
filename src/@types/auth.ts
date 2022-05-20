import { ThunkDispatch } from "redux-thunk";
import { SetupType } from "@store/types";
import { IUserProps } from "./task";

export interface AuthState {
  Auth: IUserProps;
  isLoading: boolean;
  success: string;
  error: string;
  status: number | null;
}

interface LOGIN_START {
  type: SetupType.LOGIN_START;
}

export type AuthAction = LOGIN_START;

export type AuthDispatch = ThunkDispatch<AuthState, void, AuthAction>;
