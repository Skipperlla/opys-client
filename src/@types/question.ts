import { IUserProps } from "./task";
import { ThunkDispatch } from "redux-thunk";
import { SetupType } from "@store/types";

export interface IQuestion {
  createdAt: Date;
  group: string;
  owner: IUserProps;
  task: string;
  title: string;
  content: string;
  _id: string;
}
export interface QuestionState {
  Questions: IQuestion[];
  isLoading: boolean;
  success: string;
  error: string;
  status: number | null;
}

interface GET_QUESTIONS_START {
  type: SetupType.GET_QUESTIONS_START;
}
interface GET_QUESTIONS_SUCCESS {
  type: SetupType.GET_QUESTIONS_SUCCESS;
  payload: IQuestion[];
  status: number;
}
interface GET_QUESTIONS_RESET {
  type: SetupType.GET_QUESTIONS_RESET;
}

interface CREATE_QUESTION_START {
  type: SetupType.CREATE_QUESTION_START;
}
interface CREATE_QUESTION_SUCCESS {
  type: SetupType.CREATE_QUESTION_SUCCESS;
  payload: IQuestion;
  status: number;
}
interface CREATE_QUESTION_RESET {
  type: SetupType.CREATE_QUESTION_RESET;
}
interface CREATE_ANSWER_START {
  type: SetupType.CREATE_ANSWER_START;
}
interface CREATE_ANSWER_SUCCESS {
  type: SetupType.CREATE_ANSWER_SUCCESS;
  payload: IQuestion;
  status: number;
}
interface CREATE_ANSWER_RESET {
  type: SetupType.CREATE_ANSWER_RESET;
}

export type QuestionAction =
  | GET_QUESTIONS_START
  | GET_QUESTIONS_SUCCESS
  | GET_QUESTIONS_RESET
  | CREATE_QUESTION_START
  | CREATE_QUESTION_SUCCESS
  | CREATE_QUESTION_RESET
  | CREATE_ANSWER_START
  | CREATE_ANSWER_SUCCESS
  | CREATE_ANSWER_RESET;

export type QuestionDispatch = ThunkDispatch<
  QuestionState,
  void,
  QuestionAction
>;
