import { SetupType } from "@store/types";
import { AuthAction, AuthState } from "types/auth";
import { IUserProps } from "types/task";

const defaultState: AuthState = {
  Auth: {} as IUserProps,
  isLoading: false,
  error: "",
  success: "",
  status: null,
};

const AuthReducer = (state = defaultState, action: AuthAction) => {
  switch (action.type) {
    case SetupType.LOGIN_START:
      return { ...state, isLoading: true, error: "", success: "" };
    case SetupType.LOGIN_RESET:
      return { ...state, isLoading: false, error: "", success: "" };

    default:
      return state;
  }
};

export default AuthReducer;
