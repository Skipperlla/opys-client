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
      return { ...state, loading: true, error: "", success: "" };

    default:
      return state;
  }
};

export default AuthReducer;
