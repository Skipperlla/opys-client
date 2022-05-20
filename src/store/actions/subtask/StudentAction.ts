import api from "@utils/lib/api";
import { ISubTask, SubTaskDispatch } from "types/subtask";
import { SetupType } from "@store/types";
import { Success, Error, Warning } from "@utils/lib/messages";
import { NextRouter } from "next/router";
const baseURL = "/SubTask/Student";

const singleSubTask =
  (
    groupCode: string | string[] | undefined,
    taskId: string | string[] | undefined,
    subTaskId: string | string[] | undefined
  ) =>
  async (dispatch: SubTaskDispatch) => {
    dispatch({ type: SetupType.GET_SUB_TASK_START });
    try {
      const { data, status } = await api.get<{
        data: ISubTask;
        message: string;
      }>(`${baseURL}/Single/${groupCode}/${taskId}/${subTaskId}`);
      dispatch({
        type: SetupType.GET_SUB_TASK_SUCCESS,
        payload: data.data,
        status,
      });
      dispatch({ type: SetupType.GET_SUB_TASK_RESET });
    } catch (e: any) {
      const { data } = e.response;

      Warning(data.message);
      dispatch({ type: SetupType.GET_SUB_TASK_RESET });
    }
  };
const allSubTasks = () => async (dispatch: SubTaskDispatch) => {
  dispatch({ type: SetupType.GET_SUB_TASKS_START });
  try {
    const { data, status } = await api.get<{
      data: ISubTask[];
      message: string;
    }>(`${baseURL}/SubTasks`);
    dispatch({
      type: SetupType.GET_SUB_TASKS_SUCCESS,
      payload: data.data,
      status,
    });
    dispatch({ type: SetupType.GET_SUB_TASKS_RESET });
  } catch (e: any) {
    const { data } = e.response;

    Error(data.message);
    dispatch({ type: SetupType.GET_SUB_TASKS_RESET });
  }
};

const uploadSubTask =
  (
    groupCode: string | string[] | undefined,
    taskId: string | string[] | undefined,
    subTaskId: string | string[] | undefined,
    acceptedFiles: any,
    setAcceptedFiles: any,
    router: NextRouter
  ) =>
  async (dispatch: SubTaskDispatch) => {
    const formData = new FormData();
    for (let i = 0; i < acceptedFiles.length; i++) {
      formData.append("uploads", acceptedFiles[i]);
    }
    dispatch({ type: SetupType.UPLOAD_SUB_TASK_START });
    try {
      const { data, status } = await api.post(
        `${baseURL}/Upload/${groupCode}/${taskId}/${subTaskId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch({
        type: SetupType.UPLOAD_SUB_TASK_SUCCESS,
        status,
      });
      Success(data.message);
      setAcceptedFiles([]);
      router.reload();
      dispatch({ type: SetupType.UPLOAD_SUB_TASK_RESET });
    } catch (e: any) {
      const { data } = e.response;

      Error(data.message);
      dispatch({ type: SetupType.UPLOAD_SUB_TASK_RESET });
    }
  };
const endSubTask =
  (
    groupCode: string | string[] | undefined,
    taskId: string | string[] | undefined,
    subTaskId: string | string[] | undefined
  ) =>
  async (dispatch: SubTaskDispatch) => {
    dispatch({ type: SetupType.END_SUB_TASK_START });
    try {
      const { data, status } = await api.get<{
        data: ISubTask;
        message: string;
      }>(`${baseURL}/End/${groupCode}/${taskId}/${subTaskId}`);
      dispatch({
        type: SetupType.END_SUB_TASK_SUCCESS,
        payload: data.data,
        status,
      });
      dispatch({ type: SetupType.END_SUB_TASK_RESET });
    } catch (e: any) {
      const { data } = e.response;

      Error(data.message);
      dispatch({ type: SetupType.END_SUB_TASK_RESET });
    }
  };
export default { singleSubTask, allSubTasks, uploadSubTask, endSubTask };
