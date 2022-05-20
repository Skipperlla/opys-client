import { SetupType } from "@store/types";
import { TaskAction, TaskState, ITask } from "types/task";

const defaultState: TaskState = {
  Task: {} as ITask,
  Tasks: [],
  isLoading: false,
  error: "",
  success: "",
  status: null,
};

const TaskReducer = (state = defaultState, action: TaskAction) => {
  switch (action.type) {
    case SetupType.GET_TASK_START:
      return {
        ...state,
        isLoading: true,
        error: "",
        success: "",
        status: null,
      };
    case SetupType.GET_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        status: action.status,
        Task: action.payload,
      };

    case SetupType.GET_TASK_RESET:
      return {
        ...state,
        isLoading: false,
        status: null,
        error: "",
        success: "",
      };

    case SetupType.GET_TASKS_START:
      return {
        ...state,
        isLoading: true,
        error: "",
        success: "",
        status: null,
      };
    case SetupType.GET_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        status: action.status,
        error: "",
        Tasks: action.payload,
      };

    case SetupType.GET_TASKS_RESET:
      return {
        ...state,
        isLoading: false,
        error: "",
        success: "",
        status: null,
      };

    case SetupType.CREATE_TASK_START:
      return {
        ...state,
        isLoading: true,
        error: "",
        success: "",
        status: null,
      };
    case SetupType.CREATE_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",

        status: action.status,
        Tasks: [...state.Tasks, action.payload],
      };

    case SetupType.CREATE_TASK_RESET:
      return {
        ...state,
        isLoading: false,
        error: "",
        success: "",
        status: null,
      };

    case SetupType.UPDATE_TASK_START:
      return {
        ...state,
        isLoading: false,
        error: "",
        success: "",
        status: null,
      };
    case SetupType.UPDATE_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        status: action.status,
        Tasks: state.Tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };

    case SetupType.UPDATE_TASK_RESET:
      return {
        ...state,
        isLoading: false,
        error: "",
        success: "",
        status: null,
      };

    case SetupType.DELETE_TASK_START:
      return {
        ...state,
        isLoading: true,
        error: "",
        success: "",
        status: null,
      };
    case SetupType.DELETE_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        status: action.status,
        Tasks: state.Tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };

    case SetupType.DELETE_TASK_RESET:
      return {
        ...state,
        isLoading: false,
        error: "",
        success: "",
        status: null,
      };

    case SetupType.UPLOAD_TASK_START:
      return {
        ...state,
        isLoading: true,
        error: "",
        success: "",
        status: null,
      };
    case SetupType.UPLOAD_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        status: action.status,
      };

    case SetupType.UPLOAD_TASK_RESET:
      return {
        ...state,
        isLoading: false,
        error: "",
        success: "",
        status: null,
      };

    case SetupType.END_TASK_START:
      return {
        ...state,
        isLoading: true,
        error: "",
        success: "",
        status: null,
      };
    case SetupType.END_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        status: action.status,
      };

    case SetupType.END_TASK_RESET:
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

export default TaskReducer;
