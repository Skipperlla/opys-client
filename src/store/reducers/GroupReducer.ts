import { SetupType } from "@store/types";
import { GroupAction, GroupState, IGroup } from "types/group";

const defaultState: GroupState = {
  Group: {} as IGroup,
  Groups: [],
  isLoading: false,
  error: "",
  success: "",
  status: null,
};

const GroupReducer = (state = defaultState, action: GroupAction) => {
  switch (action.type) {
    case SetupType.GET_GROUP_START:
      return {
        ...state,
        isLoading: true,
        error: "",
        success: "",
        status: null,
      };
    case SetupType.GET_GROUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        status: action.status,
        Group: action.payload,
      };

    case SetupType.GET_GROUP_RESET:
      return {
        ...state,
        isLoading: false,
        status: null,
        error: "",
        success: "",
      };

    case SetupType.GET_GROUPS_START:
      return {
        ...state,
        isLoading: true,
        error: "",
        success: "",
        status: null,
      };
    case SetupType.GET_GROUPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        status: action.status,
        error: "",
        Groups: action.payload,
      };

    case SetupType.GET_GROUPS_RESET:
      return {
        ...state,
        isLoading: false,
        error: "",
        success: "",
        status: null,
      };

    case SetupType.CREATE_GROUP_START:
      return {
        ...state,
        isLoading: true,
        error: "",
        success: "",
        status: null,
      };
    case SetupType.CREATE_GROUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        status: action.status,

        Groups: [...state.Groups, action.payload],
      };

    case SetupType.CREATE_GROUP_RESET:
      return {
        ...state,
        isLoading: false,
        error: "",
        success: "",
        status: null,
      };

    case SetupType.UPDATE_GROUP_START:
      return {
        ...state,
        isLoading: true,
        error: "",
        success: "",
        status: null,
      };
    case SetupType.UPDATE_GROUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        status: action.status,
        Groups: state.Groups.map((group) => {
          return group._id === action.payload._id ? action.payload : group;
        }),
      };

    case SetupType.UPDATE_GROUP_RESET:
      return {
        ...state,
        isLoading: false,
        error: "",
        success: "",
        status: null,
      };

    case SetupType.DELETE_GROUP_START:
      return {
        ...state,
        isLoading: true,
        error: "",
        success: "",
        status: null,
      };
    case SetupType.DELETE_GROUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        status: action.status,
        Groups: state.Groups.filter((group: IGroup) => {
          return group._id !== action.payload._id;
        }),
      };

    case SetupType.DELETE_GROUP_RESET:
      return {
        ...state,
        isLoading: false,
        error: "",
        success: "",
        status: null,
      };

    case SetupType.LEADER_DO_START:
      return {
        ...state,
        isLoading: true,
        error: "",
        success: "",
        status: null,
      };
    case SetupType.LEADER_DO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        status: action.status,
        Group: action.payload,
      };

    case SetupType.LEADER_DO_RESET:
      return {
        ...state,
        isLoading: false,
        error: "",
        success: "",
        status: null,
      };

    case SetupType.LEADER_REMOVE_START:
      return {
        ...state,
        isLoading: true,
        error: "",
        success: "",
        status: null,
      };
    case SetupType.LEADER_REMOVE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        status: action.status,
        Group: action.payload,
      };

    case SetupType.LEADER_REMOVE_RESET:
      return {
        ...state,
        isLoading: false,
        error: "",
        success: "",
        status: null,
      };

    case SetupType.JOIN_GROUP_START:
      return {
        ...state,
        isLoading: true,
        error: "",
        success: "",
        status: null,
      };
    case SetupType.JOIN_GROUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        status: action.status,
        Groups: [...state.Groups, action.payload],
      };

    case SetupType.JOIN_GROUP_RESET:
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

export default GroupReducer;
