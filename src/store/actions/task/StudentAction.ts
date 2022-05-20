import api from "@utils/lib/api";
import { ITask, TaskDispatch } from "types/task";
import { SetupType } from "@store/types";
import { Success, Error } from "@utils/lib/messages";
import { NextRouter } from "next/router";
const baseURL = "/Task/Student";

const singleTask =
  (
    groupCode: string | string[] | undefined,
    taskId: string | string[] | undefined
  ) =>
  async (dispatch: TaskDispatch) => {
    dispatch({ type: SetupType.GET_TASK_START });
    try {
      const { data, status } = await api.get<{ data: ITask }>(
        `${baseURL}/Single/${groupCode}/${taskId}`
      );
      dispatch({
        type: SetupType.GET_TASK_SUCCESS,
        payload: data.data,
        status,
      });
      dispatch({ type: SetupType.GET_TASK_RESET });
    } catch (e: any) {
      const { status, data } = e.response;

      Error(data.message);
      dispatch({ type: SetupType.GET_TASK_RESET });
    }
  };
const allTasks = () => async (dispatch: TaskDispatch) => {
  dispatch({ type: SetupType.GET_TASKS_START });
  try {
    const { data, status } = await api.get<{ data: ITask[] }>(
      `${baseURL}/Tasks`
    );
    dispatch({
      type: SetupType.GET_TASKS_SUCCESS,
      payload: data.data,
      status,
    });
    dispatch({ type: SetupType.GET_TASKS_RESET });
  } catch (e: any) {
    const { status, data } = e.response;

    Error(data.message);
    dispatch({ type: SetupType.GET_TASKS_RESET });
  }
};

const uploadTask =
  (
    groupCode: string | string[] | undefined,
    taskId: string | string[] | undefined,
    acceptedFiles: any,
    setAcceptedFiles: any,
    router: NextRouter
  ) =>
  async (dispatch: TaskDispatch) => {
    const formData = new FormData();
    for (let i = 0; i < acceptedFiles.length; i++) {
      formData.append("uploads", acceptedFiles[i]);
    }
    dispatch({ type: SetupType.UPLOAD_TASK_START });
    try {
      const { data, status } = await api.post(
        `${baseURL}/Upload/${groupCode}/${taskId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch({
        type: SetupType.UPLOAD_TASK_SUCCESS,
        status,
      });
      Success(data.message);
      setAcceptedFiles([]);
      router.reload();
      dispatch({ type: SetupType.UPLOAD_TASK_RESET });
    } catch (e: any) {
      const { status, data } = e.response;

      Error(data.message);
      dispatch({ type: SetupType.UPLOAD_TASK_RESET });
    }
  };
const endTask =
  (
    groupCode: string | string[] | undefined,
    taskId: string | string[] | undefined,
    router: NextRouter,
    handleCloseFinishTodo: () => void
  ) =>
  async (dispatch: TaskDispatch) => {
    dispatch({ type: SetupType.END_TASK_START });
    try {
      const { data, status } = await api.get(
        `${baseURL}/End/${groupCode}/${taskId}`
      );
      dispatch({
        type: SetupType.END_TASK_SUCCESS,
        status,
      });
      Success(data.message);
      handleCloseFinishTodo();
      router.push("/tasks");
      dispatch({ type: SetupType.END_TASK_RESET });
    } catch (e: any) {
      const { status, data } = e.response;

      Error(data.message);
      dispatch({ type: SetupType.END_TASK_RESET });
    }
  };

export default { singleTask, allTasks, uploadTask, endTask };
