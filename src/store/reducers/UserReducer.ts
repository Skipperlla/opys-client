import { SetupType } from "@store/types";
import { IUserProps } from "types/task";
import { UserAction, IUser, UserState } from "types/user";

const defaultState: UserState = {
  User: {} as IUserProps,
  isLoading: false,
  error: "",
  success: "",
  status: null,
};

const UserReducer = (state = defaultState, action: UserAction) => {
  switch (action.type) {
    case SetupType.IS_LOGGED_IN_START:
      return { ...state, isLoading: true, error: "", success: "" };
    case SetupType.IS_LOGGED_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        User: action.payload,
        error: "",
        status: action.status,
      };

    case SetupType.IS_LOGGED_IN_RESET:
      return {
        ...state,
        isLoading: false,
        error: "",
        success: "",
        status: null,
      };

    case SetupType.UPDATE_USER_PASSWORD_START:
      return { ...state, isLoading: true, error: "", success: "" };
    case SetupType.UPDATE_USER_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        status: action.status,
      };

    case SetupType.UPDATE_USER_PASSWORD_RESET:
      return {
        ...state,
        isLoading: false,
        error: "",
        success: "",
        status: null,
      };

    case SetupType.DELETE_USER_AVATAR_START:
      return { ...state, isLoading: true, error: "", success: "" };
    case SetupType.DELETE_USER_AVATAR_SUCCESS:
      return {
        ...state,
        error: "",
        isLoading: false,
        success: action.payload,
        status: action.status,
      };

    case SetupType.DELETE_USER_AVATAR_RESET:
      return {
        ...state,
        isLoading: false,
        error: "",
        success: "",
        status: null,
      };

    case SetupType.UPLOAD_USER_AVATAR_START:
      return { ...state, isLoading: true, error: "", success: "" };
    case SetupType.UPLOAD_USER_AVATAR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        User: action.payload,

        status: action.status,
      };

    case SetupType.UPLOAD_USER_AVATAR_RESET:
      return {
        ...state,
        isLoading: false,
        error: "",
        success: "",
        status: null,
      };

    case SetupType.LOGOUT_START:
      return { ...state, isLoading: true, error: "", success: "" };

    case SetupType.LOGOUT_RESET:
      return {
        ...state,
        isLoading: false,
        error: "",
        success: "",
        status: null,
      };
    default:
      return state;
  }
};

export default UserReducer;
