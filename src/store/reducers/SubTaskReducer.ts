import { SetupType } from "@store/types";
import { SubTaskAction, SubTaskState, ISubTask } from "types/subtask";

const defaultState: SubTaskState = {
  SubTask: {} as ISubTask,
  SubTasks: [],
  isLoading: false,
  error: "",
  success: "",
  status: null,
};

const SubTaskReducer = (state = defaultState, action: SubTaskAction) => {
  switch (action.type) {
    case SetupType.GET_SUB_TASK_START:
      return {
        ...state,
        isLoading: true,
        error: "",
        success: "",
        status: null,
      };
    case SetupType.GET_SUB_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        status: action.status,
        SubTask: action.payload,
      };

    case SetupType.GET_SUB_TASK_RESET:
      return {
        ...state,
        isLoading: false,
        status: null,
        error: "",
        success: "",
      };

    case SetupType.GET_SUB_TASKS_START:
      return {
        ...state,
        isLoading: true,
        error: "",
        success: "",
        status: null,
      };
    case SetupType.GET_SUB_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        status: action.status,
        error: "",
        SubTasks: action.payload,
      };

    case SetupType.GET_SUB_TASKS_RESET:
      return {
        ...state,
        isLoading: false,
        error: "",
        success: "",
        status: null,
      };

    case SetupType.CREATE_SUB_TASK_START:
      return {
        ...state,
        isLoading: true,
        error: "",
        success: "",
        status: null,
      };
    case SetupType.CREATE_SUB_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",

        status: action.status,
        SubTasks: [...state.SubTasks, action.payload],
      };

    case SetupType.CREATE_SUB_TASK_RESET:
      return {
        ...state,
        isLoading: false,
        error: "",
        success: "",
        status: null,
      };

    case SetupType.UPDATE_SUB_TASK_START:
      return {
        ...state,
        isLoading: false,
        error: "",
        success: "",
        status: null,
      };
    case SetupType.UPDATE_SUB_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        status: action.status,
        SubTasks: state.SubTasks.map((subTask: ISubTask) =>
          subTask._id === action.payload._id ? action.payload : subTask
        ),
      };

    case SetupType.UPDATE_SUB_TASK_RESET:
      return {
        ...state,
        isLoading: false,
        error: "",
        success: "",
        status: null,
      };

    case SetupType.DELETE_SUB_TASK_START:
      return {
        ...state,
        isLoading: true,
        error: "",
        success: "",
        status: null,
      };
    case SetupType.DELETE_SUB_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        status: action.status,
        SubTasks: state.SubTasks.map((subTask) =>
          subTask._id === action.payload._id ? action.payload : subTask
        ),
      };

    case SetupType.DELETE_SUB_TASK_RESET:
      return {
        ...state,
        isLoading: false,
        error: "",
        success: "",
        status: null,
      };

    case SetupType.UPLOAD_SUB_TASK_START:
      return {
        ...state,
        isLoading: true,
        error: "",
        success: "",
        status: null,
      };
    case SetupType.UPLOAD_SUB_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        status: action.status,
      };

    case SetupType.UPLOAD_SUB_TASK_RESET:
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

export default SubTaskReducer;
