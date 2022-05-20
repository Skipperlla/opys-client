import { IUserProps } from "./task";
import { ThunkDispatch } from "redux-thunk";
import { SetupType } from "@store/types";

export interface IPost {
  createdAt: string;
  content: string;
  author: IUserProps;
}
export interface PostState {
  Posts: IPost[];
  isLoading: boolean;
  success: string;
  error: string;
  status: number | null;
}

interface GET_POSTS_START {
  type: SetupType.GET_POSTS_START;
}
interface GET_POSTS_SUCCESS {
  type: SetupType.GET_POSTS_SUCCESS;
  payload: IPost[];
  status: number;
}
interface GET_POSTS_RESET {
  type: SetupType.GET_POSTS_RESET;
}

interface CREATE_POST_START {
  type: SetupType.CREATE_POST_START;
}
interface CREATE_POST_SUCCESS {
  type: SetupType.CREATE_POST_SUCCESS;
  payload: IPost;
  status: number;
}
interface CREATE_POST_RESET {
  type: SetupType.CREATE_POST_RESET;
}

interface DELETE_POST_START {
  type: SetupType.DELETE_POST_START;
}
interface DELETE_POST_SUCCESS {
  type: SetupType.DELETE_POST_SUCCESS;
  payload: IPost;
  status: number;
}
interface DELETE_POST_RESET {
  type: SetupType.DELETE_POST_RESET;
}

export type PostAction =
  | GET_POSTS_START
  | GET_POSTS_SUCCESS
  | GET_POSTS_RESET
  | CREATE_POST_START
  | CREATE_POST_SUCCESS
  | CREATE_POST_RESET
  | DELETE_POST_START
  | DELETE_POST_SUCCESS
  | DELETE_POST_RESET;

export type PostDispatch = ThunkDispatch<PostState, void, PostAction>;
