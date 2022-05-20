import { NextRouter } from "next/router";
import api from "@utils/lib/api";
import { Error, Success } from "@utils/lib/messages";
import { ISubTask, SubTaskDispatch } from "types/subtask";
import { SetupType } from "@store/types";
import { IAddTaskDataProps } from "pages/groups/[groupCode]";
import { IAddSubTaskDataProps } from "pages/tasks/[groupCode]/[taskId]/[studentId]";
const baseURL = "/SubTask/Teacher";

const singleSubTask =
  (
    groupCode: string | string[] | undefined,
    taskId: string | string[] | undefined,
    subTaskId: string | string[] | undefined,
    studentId: string | string[] | undefined
  ) =>
  async (dispatch: SubTaskDispatch) => {
    dispatch({ type: SetupType.GET_SUB_TASK_START });
    try {
      const { data, status } = await api.get<{
        data: ISubTask;
        message: string;
      }>(`${baseURL}/Single/${groupCode}/${taskId}/${subTaskId}/${studentId}`);
      dispatch({
        type: SetupType.GET_SUB_TASK_SUCCESS,
        payload: data.data,
        status,
      });
      Success(data.message);
      dispatch({ type: SetupType.GET_SUB_TASK_RESET });
    } catch (e: any) {
      const { status, data } = e.response;

      Error(data.message);
      dispatch({ type: SetupType.GET_SUB_TASK_RESET });
    }
  };
const allSubTasks =
  (
    groupCode: string | string[] | undefined,
    taskId: string | string[] | undefined
  ) =>
  async (dispatch: SubTaskDispatch) => {
    dispatch({ type: SetupType.GET_SUB_TASKS_START });
    try {
      const { data, status } = await api.get<{
        data: ISubTask[];
        message: string;
      }>(`${baseURL}/SubTasks/${groupCode}/${taskId}`);
      dispatch({
        type: SetupType.GET_SUB_TASKS_SUCCESS,
        payload: data.data,
        status,
      });
      Success(data.message);
      dispatch({ type: SetupType.GET_SUB_TASKS_RESET });
    } catch (e: any) {
      const { status, data } = e.response;

      Error(data.message);
      dispatch({ type: SetupType.GET_SUB_TASKS_RESET });
    }
  };
const updateSubTask =
  (
    groupCode: string | string[] | undefined,
    taskId: string | string[] | undefined,
    subTaskId: string | string[] | undefined,
    studentId: string | string[] | undefined
  ) =>
  async (dispatch: SubTaskDispatch) => {
    dispatch({ type: SetupType.UPDATE_SUB_TASK_START });
    try {
      const { data, status } = await api.post<{
        data: ISubTask;
        message: string;
      }>(`${baseURL}/Update/${groupCode}/${taskId}/${subTaskId}/${studentId}`);
      dispatch({
        type: SetupType.UPDATE_SUB_TASK_SUCCESS,
        payload: data.data,
        status,
      });
      Success(data.message);
      dispatch({ type: SetupType.UPDATE_SUB_TASK_RESET });
    } catch (e: any) {
      const { data } = e.response;
      Error(data.message);
      dispatch({ type: SetupType.UPDATE_SUB_TASK_RESET });
    }
  };
const deleteSubTask =
  (
    groupCode: string | string[] | undefined,
    taskId: string | string[] | undefined,
    subTaskId: string | string[] | undefined,
    studentId: string | string[] | undefined
  ) =>
  async (dispatch: SubTaskDispatch) => {
    dispatch({ type: SetupType.DELETE_SUB_TASK_START });
    try {
      const { data, status } = await api.delete<{
        data: ISubTask;
        message: string;
      }>(`${baseURL}/Remove/${groupCode}/${taskId}/${subTaskId}/${studentId}`);
      dispatch({
        type: SetupType.DELETE_SUB_TASK_SUCCESS,
        payload: data.data,
        status,
      });
      Success(data.message);
      dispatch({ type: SetupType.DELETE_SUB_TASK_RESET });
    } catch (e: any) {
      const { data } = e.response;

      Error(data.message);
      dispatch({ type: SetupType.DELETE_SUB_TASK_RESET });
    }
  };
const createSubTask =
  (
    groupCode: string | string[] | undefined,
    taskId: string | string[] | undefined,
    studentId: string | string[] | undefined,
    addSubtaskData: IAddSubTaskDataProps,
    handleCloseSubAskTask: () => void
  ) =>
  async (dispatch: SubTaskDispatch) => {
    dispatch({ type: SetupType.CREATE_SUB_TASK_START });
    try {
      const { data, status } = await api.post<{
        data: ISubTask;
        message: string;
      }>(
        `${baseURL}/Create/${groupCode}/${taskId}/${studentId}`,
        addSubtaskData
      );
      dispatch({
        type: SetupType.CREATE_SUB_TASK_SUCCESS,
        payload: data.data,
        status,
      });
      Success(data.message);
      handleCloseSubAskTask();
      dispatch({ type: SetupType.CREATE_SUB_TASK_RESET });
    } catch (e: any) {
      const { data } = e.response;

      Error(data.message);
      dispatch({ type: SetupType.CREATE_SUB_TASK_RESET });
    }
  };
const uploadSubTask =
  (
    groupCode: string | string[] | undefined,
    taskId: string | string[] | undefined,
    subTaskId: string | string[] | undefined,
    studentId: string | string[] | undefined,
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
        `${baseURL}/Upload/${groupCode}/${taskId}/${subTaskId}/${studentId}`,
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

export default {
  singleSubTask,
  allSubTasks,
  updateSubTask,
  createSubTask,
  deleteSubTask,
  uploadSubTask,
};
