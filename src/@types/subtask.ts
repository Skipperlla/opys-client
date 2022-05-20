import { ThunkDispatch } from "redux-thunk";
import { IGroup } from "./group";
import { SetupType } from "@store/types";

import { IUserProps } from "./task";
export interface IUploadProps {
  fullName: string;
  uploadDate: string;
  originalname: string;
  role: string;
  Location: string;
}
export interface ISubTask {
  assignTo: IUserProps;
  assigner: IUserProps;
  createdAt: Date;
  deadline: Date;
  description: string;
  group: IGroup;
  name: string;
  status: string;
  _id: string;
  uploads: IUploadProps[];
}
export interface SubTaskState {
  SubTask: ISubTask;
  SubTasks: ISubTask[];
  isLoading: boolean;
  success: string;
  error: string;
  status: number | null;
}

interface GET_SUB_TASK_START {
  type: SetupType.GET_SUB_TASK_START;
}
interface GET_SUB_TASK_SUCCESS {
  type: SetupType.GET_SUB_TASK_SUCCESS;
  payload: ISubTask;
  status: number;
}

interface GET_SUB_TASK_RESET {
  type: SetupType.GET_SUB_TASK_RESET;
}

interface GET_SUB_TASKS_START {
  type: SetupType.GET_SUB_TASKS_START;
}
interface GET_SUB_TASKS_SUCCESS {
  type: SetupType.GET_SUB_TASKS_SUCCESS;
  payload: ISubTask[];
  status: number;
}

interface GET_SUB_TASKS_RESET {
  type: SetupType.GET_SUB_TASKS_RESET;
}

interface CREATE_SUB_TASK_START {
  type: SetupType.CREATE_SUB_TASK_START;
}
interface CREATE_SUB_TASK_SUCCESS {
  type: SetupType.CREATE_SUB_TASK_SUCCESS;
  payload: ISubTask;

  status: number;
}

interface CREATE_SUB_TASK_RESET {
  type: SetupType.CREATE_SUB_TASK_RESET;
}

interface UPDATE_SUB_TASK_START {
  type: SetupType.UPDATE_SUB_TASK_START;
}
interface UPDATE_SUB_TASK_SUCCESS {
  type: SetupType.UPDATE_SUB_TASK_SUCCESS;
  payload: ISubTask;
  status: number;
}

interface UPDATE_SUB_TASK_RESET {
  type: SetupType.UPDATE_SUB_TASK_RESET;
}

interface DELETE_SUB_TASK_START {
  type: SetupType.DELETE_SUB_TASK_START;
}
interface DELETE_SUB_TASK_SUCCESS {
  type: SetupType.DELETE_SUB_TASK_SUCCESS;
  payload: ISubTask;
  status: number;
}

interface DELETE_SUB_TASK_RESET {
  type: SetupType.DELETE_SUB_TASK_RESET;
}

interface UPLOAD_SUB_TASK_START {
  type: SetupType.UPLOAD_SUB_TASK_START;
}
interface UPLOAD_SUB_TASK_SUCCESS {
  type: SetupType.UPLOAD_SUB_TASK_SUCCESS;
  status: number;
}

interface UPLOAD_SUB_TASK_RESET {
  type: SetupType.UPLOAD_SUB_TASK_RESET;
}

export type SubTaskAction =
  | GET_SUB_TASK_START
  | GET_SUB_TASK_SUCCESS
  | GET_SUB_TASK_RESET
  | GET_SUB_TASKS_START
  | GET_SUB_TASKS_SUCCESS
  | GET_SUB_TASKS_RESET
  | CREATE_SUB_TASK_START
  | CREATE_SUB_TASK_SUCCESS
  | CREATE_SUB_TASK_RESET
  | UPDATE_SUB_TASK_START
  | UPDATE_SUB_TASK_SUCCESS
  | UPDATE_SUB_TASK_RESET
  | DELETE_SUB_TASK_START
  | DELETE_SUB_TASK_SUCCESS
  | DELETE_SUB_TASK_RESET
  | UPLOAD_SUB_TASK_START
  | UPLOAD_SUB_TASK_SUCCESS
  | UPLOAD_SUB_TASK_RESET;

export type SubTaskDispatch = ThunkDispatch<SubTaskState, void, SubTaskAction>;
