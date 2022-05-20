import { NextRouter } from "next/router";
import api from "@utils/lib/api";
import { Error, Success, Warning } from "@utils/lib/messages";
import { ITask, TaskDispatch } from "types/task";
import { SetupType } from "@store/types";
import { IAddTaskDataProps } from "pages/groups/[groupCode]";
const baseURL = "/Task/Teacher";

const singleTask =
  (
    groupCode: string | string[] | undefined,
    taskId: string | string[] | undefined,
    studentId: string | string[] | undefined,
    router: NextRouter
  ) =>
  async (dispatch: TaskDispatch) => {
    dispatch({ type: SetupType.GET_TASK_START });
    try {
      const { data, status } = await api.get<{ data: ITask; message: string }>(
        `${baseURL}/Single/${groupCode}/${taskId}/${studentId}`
      );
      dispatch({
        type: SetupType.GET_TASK_SUCCESS,
        payload: data.data,
        status,
      });
      Success(data.message);
      dispatch({ type: SetupType.GET_TASK_RESET });
    } catch (e: any) {
      const { status, data } = e.response;
      Warning(data.message);
      if (status === 404) router.replace("/tasks");
      dispatch({ type: SetupType.GET_TASK_RESET });
    }
  };
const allTasks = () => async (dispatch: TaskDispatch) => {
  dispatch({ type: SetupType.GET_TASKS_START });
  try {
    const { data, status } = await api.get<{ data: ITask[]; message: string }>(
      `${baseURL}/Tasks`
    );
    dispatch({
      type: SetupType.GET_TASKS_SUCCESS,
      payload: data.data,
      status,
    });
    Success(data.message);
    dispatch({ type: SetupType.GET_TASKS_RESET });
  } catch (e: any) {
    const { status, data } = e.response;

    Error(data.message);
    dispatch({ type: SetupType.GET_TASKS_RESET });
  }
};
const updateTask =
  (
    groupCode: string | string[] | undefined,
    taskId: string | string[] | undefined,
    studentId: string | string[] | undefined
  ) =>
  async (dispatch: TaskDispatch) => {
    dispatch({ type: SetupType.UPDATE_TASK_START });
    try {
      const { data, status } = await api.post<{ data: ITask; message: string }>(
        `${baseURL}/Update/${groupCode}/${taskId}/${studentId}`
      );
      dispatch({
        type: SetupType.UPDATE_TASK_SUCCESS,
        payload: data.data,
        status,
      });
      Success(data.message);
      dispatch({ type: SetupType.UPDATE_TASK_RESET });
    } catch (e: any) {
      const { status, data } = e.response;
      Error(data.message);
      dispatch({ type: SetupType.UPDATE_TASK_RESET });
    }
  };
const deleteTask =
  (
    groupCode: string | string[] | undefined,
    taskId: string | string[] | undefined,
    studentId: string | string[] | undefined
  ) =>
  async (dispatch: TaskDispatch) => {
    dispatch({ type: SetupType.DELETE_TASK_START });
    try {
      const { data, status } = await api.delete<{
        data: ITask;
        message: string;
      }>(`${baseURL}/Remove/${groupCode}/${taskId}/${studentId}`);
      dispatch({
        type: SetupType.DELETE_TASK_SUCCESS,
        payload: data.data,
        status,
      });
      Success(data.message);
      dispatch({ type: SetupType.DELETE_TASK_RESET });
    } catch (e: any) {
      const { status, data } = e.response;

      Error(data.message);
      dispatch({ type: SetupType.DELETE_TASK_RESET });
    }
  };
const createTask =
  (
    groupCode: string | string[] | undefined,
    studentId: string | string[] | undefined,
    form: IAddTaskDataProps,
    handleCloseAddTask: () => void,
    router: NextRouter
  ) =>
  async (dispatch: TaskDispatch) => {
    dispatch({ type: SetupType.CREATE_TASK_START });
    try {
      const { data, status } = await api.post<{ data: ITask; message: string }>(
        `${baseURL}/Create/${groupCode}/${studentId}`,
        form
      );
      Success(data.message);
      handleCloseAddTask();
      router.reload();
      dispatch({
        type: SetupType.CREATE_TASK_SUCCESS,
        payload: data.data,
        status,
      });

      dispatch({ type: SetupType.CREATE_TASK_RESET });
    } catch (e: any) {
      const { status, data } = e.response;

      Error(data.message);
      dispatch({ type: SetupType.CREATE_TASK_RESET });
    }
  };
const uploadTask =
  (
    groupCode: string | string[] | undefined,
    taskId: string | string[] | undefined,
    studentId: string | string[] | undefined,
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
      const { data, status } = await api.post<{ data: ITask; message: string }>(
        `${baseURL}/Upload/${groupCode}/${taskId}/${studentId}`,
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
    studentId: string | string[] | undefined,
    router: NextRouter,
    handleCloseFinishTodo: () => void
  ) =>
  async (dispatch: TaskDispatch) => {
    dispatch({ type: SetupType.END_TASK_START });
    try {
      const { data, status } = await api.get<{ data: ITask; message: string }>(
        `${baseURL}/End/${groupCode}/${taskId}/${studentId}`
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

export default {
  singleTask,
  allTasks,
  updateTask,
  createTask,
  deleteTask,
  uploadTask,
  endTask,
};
