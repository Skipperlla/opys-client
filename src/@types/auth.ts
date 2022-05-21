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
interface LOGIN_RESET {
  type: SetupType.LOGIN_RESET;
}

export type AuthAction = LOGIN_START | LOGIN_RESET;

export type AuthDispatch = ThunkDispatch<AuthState, void, AuthAction>;
