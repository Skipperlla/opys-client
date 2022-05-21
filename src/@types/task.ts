import { ThunkDispatch } from "redux-thunk";
import { SetupType } from "@store/types";
import { IGroup } from "./group";
import { IUploadProps } from "./subtask";

export interface IUserProps {
  _id: string;
  name: string;
  surname: string;
  email: string;
  createdAt: Date;
  avatar: { Location: string };
  role: string;
}

export interface ITask {
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
  subTasks: string[];
}
export interface TaskState {
  Task: ITask;
  Tasks: ITask[];
  isLoading: boolean;
  success: string;
  error: string;
  status: number | null;
}

interface GET_TASK_START {
  type: SetupType.GET_TASK_START;
}
interface GET_TASK_SUCCESS {
  type: SetupType.GET_TASK_SUCCESS;
  payload: ITask;
  status: number;
}

interface GET_TASK_RESET {
  type: SetupType.GET_TASK_RESET;
}

interface GET_TASKS_START {
  type: SetupType.GET_TASKS_START;
}
interface GET_TASKS_SUCCESS {
  type: SetupType.GET_TASKS_SUCCESS;
  payload: ITask[];
  status: number;
}

interface GET_TASKS_RESET {
  type: SetupType.GET_TASKS_RESET;
}

interface CREATE_TASK_START {
  type: SetupType.CREATE_TASK_START;
}
interface CREATE_TASK_SUCCESS {
  type: SetupType.CREATE_TASK_SUCCESS;
  payload: ITask;

  status: number;
}

interface CREATE_TASK_RESET {
  type: SetupType.CREATE_TASK_RESET;
}

interface UPDATE_TASK_START {
  type: SetupType.UPDATE_TASK_START;
}
interface UPDATE_TASK_SUCCESS {
  type: SetupType.UPDATE_TASK_SUCCESS;
  payload: ITask;
  status: number;
}

interface UPDATE_TASK_RESET {
  type: SetupType.UPDATE_TASK_RESET;
}

interface DELETE_TASK_START {
  type: SetupType.DELETE_TASK_START;
}
interface DELETE_TASK_SUCCESS {
  type: SetupType.DELETE_TASK_SUCCESS;
  payload: ITask;
  status: number;
}

interface DELETE_TASK_RESET {
  type: SetupType.DELETE_TASK_RESET;
}

interface UPLOAD_TASK_START {
  type: SetupType.UPLOAD_TASK_START;
}
interface UPLOAD_TASK_SUCCESS {
  type: SetupType.UPLOAD_TASK_SUCCESS;
  status: number;
}

interface UPLOAD_TASK_RESET {
  type: SetupType.UPLOAD_TASK_RESET;
}

interface END_TASK_START {
  type: SetupType.END_TASK_START;
}
interface END_TASK_SUCCESS {
  type: SetupType.END_TASK_SUCCESS;
  status: number;
}

interface END_TASK_RESET {
  type: SetupType.END_TASK_RESET;
}

export type TaskAction =
  | GET_TASK_START
  | GET_TASK_SUCCESS
  | GET_TASK_RESET
  | GET_TASKS_START
  | GET_TASKS_SUCCESS
  | GET_TASKS_RESET
  | CREATE_TASK_START
  | CREATE_TASK_SUCCESS
  | CREATE_TASK_RESET
  | UPDATE_TASK_START
  | UPDATE_TASK_SUCCESS
  | UPDATE_TASK_RESET
  | DELETE_TASK_START
  | DELETE_TASK_SUCCESS
  | DELETE_TASK_RESET
  | UPLOAD_TASK_START
  | UPLOAD_TASK_SUCCESS
  | UPLOAD_TASK_RESET
  | END_TASK_START
  | END_TASK_SUCCESS
  | END_TASK_RESET;

export type TaskDispatch = ThunkDispatch<TaskState, void, TaskAction>;
