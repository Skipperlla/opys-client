import { IUserProps } from "./task";
import { ThunkDispatch } from "redux-thunk";
import { SetupType } from "@store/types";

export interface IGroup {
  createdAt: Date;
  groupName: string;
  groupCode: string;
  leaders: string[];
  name: string;
  owner: string;
  students: IUserProps[];
  updatedAt: Date;
  _id: string;
}
export interface GroupState {
  Group: IGroup;
  Groups: IGroup[];
  isLoading: boolean;
  success: string;
  error: string;
  status: number | null;
}

interface GET_GROUP_START {
  type: SetupType.GET_GROUP_START;
}
interface GET_GROUP_SUCCESS {
  type: SetupType.GET_GROUP_SUCCESS;
  payload: IGroup;
  status: number;
}

interface GET_GROUP_RESET {
  type: SetupType.GET_GROUP_RESET;
}

interface GET_GROUPS_START {
  type: SetupType.GET_GROUPS_START;
}
interface GET_GROUPS_SUCCESS {
  type: SetupType.GET_GROUPS_SUCCESS;
  payload: IGroup[];
  status: number;
}

interface GET_GROUPS_RESET {
  type: SetupType.GET_GROUPS_RESET;
}

interface CREATE_GROUP_START {
  type: SetupType.CREATE_GROUP_START;
}
interface CREATE_GROUP_SUCCESS {
  type: SetupType.CREATE_GROUP_SUCCESS;
  payload: IGroup;

  status: number;
}

interface CREATE_GROUP_RESET {
  type: SetupType.CREATE_GROUP_RESET;
}

interface UPDATE_GROUP_START {
  type: SetupType.UPDATE_GROUP_START;
}
interface UPDATE_GROUP_SUCCESS {
  type: SetupType.UPDATE_GROUP_SUCCESS;
  payload: IGroup;
  status: number;
}

interface UPDATE_GROUP_RESET {
  type: SetupType.UPDATE_GROUP_RESET;
}

interface DELETE_GROUP_START {
  type: SetupType.DELETE_GROUP_START;
}
interface DELETE_GROUP_SUCCESS {
  type: SetupType.DELETE_GROUP_SUCCESS;
  payload: IGroup;

  status: number;
}

interface DELETE_GROUP_RESET {
  type: SetupType.DELETE_GROUP_RESET;
}

interface LEADER_DO_START {
  type: SetupType.LEADER_DO_START;
}
interface LEADER_DO_SUCCESS {
  type: SetupType.LEADER_DO_SUCCESS;
  payload: IGroup;
  status: number;
}

interface LEADER_DO_RESET {
  type: SetupType.LEADER_DO_RESET;
}

interface LEADER_REMOVE_START {
  type: SetupType.LEADER_REMOVE_START;
}
interface LEADER_REMOVE_SUCCESS {
  type: SetupType.LEADER_REMOVE_SUCCESS;
  payload: IGroup;
  status: number;
}

interface LEADER_REMOVE_RESET {
  type: SetupType.LEADER_REMOVE_RESET;
}
interface JOIN_GROUP_START {
  type: SetupType.JOIN_GROUP_START;
}
interface JOIN_GROUP_SUCCESS {
  type: SetupType.JOIN_GROUP_SUCCESS;
  payload: IGroup;
  status: number;
}

interface JOIN_GROUP_RESET {
  type: SetupType.JOIN_GROUP_RESET;
}

export type GroupAction =
  | GET_GROUP_START
  | GET_GROUP_SUCCESS
  | GET_GROUP_RESET
  | GET_GROUPS_START
  | GET_GROUPS_SUCCESS
  | GET_GROUPS_RESET
  | CREATE_GROUP_START
  | CREATE_GROUP_SUCCESS
  | CREATE_GROUP_RESET
  | UPDATE_GROUP_START
  | UPDATE_GROUP_SUCCESS
  | UPDATE_GROUP_RESET
  | DELETE_GROUP_START
  | DELETE_GROUP_SUCCESS
  | DELETE_GROUP_RESET
  | LEADER_DO_START
  | LEADER_DO_SUCCESS
  | LEADER_DO_RESET
  | LEADER_REMOVE_START
  | LEADER_REMOVE_SUCCESS
  | LEADER_REMOVE_RESET
  | JOIN_GROUP_START
  | JOIN_GROUP_SUCCESS
  | JOIN_GROUP_RESET;

export type GroupDispatch = ThunkDispatch<GroupState, void, GroupAction>;
