import api from "@utils/lib/api";
import { Error, Success } from "@utils/lib/messages";
import { SetupType } from "@store/types";
import { IQuestion, QuestionDispatch } from "types/question";
const baseURL = "/Question";

const createQuestionTask =
  (
    groupCode: string | string[] | undefined,
    taskId: string | string[] | undefined,
    title: string,
    handleClose: () => void
  ) =>
  async (dispatch: QuestionDispatch) => {
    dispatch({ type: SetupType.CREATE_QUESTION_START });
    try {
      const { data, status } = await api.post<{
        data: IQuestion;
        message: string;
      }>(`${baseURL}/Create/Task/${groupCode}/${taskId}`, { title });
      dispatch({
        type: SetupType.CREATE_QUESTION_SUCCESS,
        payload: data.data,
        status,
      });
      Success(data.message);
      handleClose();
      dispatch({ type: SetupType.CREATE_QUESTION_RESET });
    } catch (e: any) {
      const { status, data } = e.response;
      Error(data.message);
      dispatch({ type: SetupType.CREATE_QUESTION_RESET });
    }
  };
const createQuestionSubTask =
  (
    groupCode: string | string[] | undefined,
    subTaskId: string | string[] | undefined,
    title: string,
    handleClose: () => void
  ) =>
  async (dispatch: QuestionDispatch) => {
    dispatch({ type: SetupType.CREATE_QUESTION_START });
    try {
      const { data, status } = await api.post<{
        data: IQuestion;
        message: string;
      }>(`${baseURL}/Create/SubTask/${groupCode}/${subTaskId}`, { title });
      dispatch({
        type: SetupType.CREATE_QUESTION_SUCCESS,
        payload: data.data,
        status,
      });
      Success(data.message);
      handleClose();
      dispatch({ type: SetupType.CREATE_QUESTION_RESET });
    } catch (e: any) {
      const { status, data } = e.response;
      Error(data.message);
      dispatch({ type: SetupType.CREATE_QUESTION_RESET });
    }
  };
// const deleteQuestion =
//   (
//     groupCode: string | string[] | undefined,
//     taskId: string | string[] | undefined
//   ) =>
//   async (dispatch: QuestionDispatch) => {
//     dispatch({ type: SetupType.DELETE_POST_START });
//     try {
//       const { data, status } = await api.delete<>(
//         `${baseURL}/Delete/${groupCode}/${postId}`
//       );
//       dispatch({
//         type: SetupType.DELETE_POST_SUCCESS,
//         payload: data,
//         status,
//       });
//       Success(data.message);
//       dispatch({ type: SetupType.DELETE_POST_RESET });
//     } catch (e:any) {
//       const { status, data } = e.response;
//       Error(data.message);
//       dispatch({ type: SetupType.DELETE_POST_RESET });
//     }
//   };
const allQuestionsTask =
  (
    groupCode: string | string[] | undefined,
    taskId: string | string[] | undefined
  ) =>
  async (dispatch: QuestionDispatch) => {
    dispatch({ type: SetupType.GET_QUESTIONS_START });
    try {
      const { data, status } = await api.get<{
        data: IQuestion[];
        message: string;
      }>(`${baseURL}/Questions/Task/${groupCode}/${taskId}`);
      dispatch({
        type: SetupType.GET_QUESTIONS_SUCCESS,
        payload: data.data,
        status,
      });
      Success(data.message);
      dispatch({ type: SetupType.GET_QUESTIONS_RESET });
    } catch (e: any) {
      const { status, data } = e.response;
      Error(data.message);
      dispatch({ type: SetupType.GET_QUESTIONS_RESET });
    }
  };
const allQuestionsSubTask =
  (
    groupCode: string | string[] | undefined,
    subTaskId: string | string[] | undefined
  ) =>
  async (dispatch: QuestionDispatch) => {
    dispatch({ type: SetupType.GET_QUESTIONS_START });
    try {
      const { data, status } = await api.get<{
        data: IQuestion[];
        message: string;
      }>(`${baseURL}/Questions/subTask/${groupCode}/${subTaskId}`);
      dispatch({
        type: SetupType.GET_QUESTIONS_SUCCESS,
        payload: data.data,
        status,
      });
      Success(data.message);
      dispatch({ type: SetupType.GET_QUESTIONS_RESET });
    } catch (e: any) {
      const { status, data } = e.response;
      Error(data.message);
      dispatch({ type: SetupType.GET_QUESTIONS_RESET });
    }
  };
const createAnswer =
  (
    groupCode: string | string[] | undefined,
    taskId: string | string[] | undefined,
    questionId: string | string[] | undefined,
    content: string,
    handleClose: () => void
  ) =>
  async (dispatch: QuestionDispatch) => {
    dispatch({ type: SetupType.CREATE_ANSWER_START });
    try {
      const { data, status } = await api.post<{
        data: IQuestion;
        message: string;
      }>(`${baseURL}/Create/Answer/${groupCode}/${taskId}/${questionId}`, {
        content,
      });
      dispatch({
        type: SetupType.CREATE_ANSWER_SUCCESS,
        payload: data.data,
        status,
      });
      Success(data.message);
      handleClose();
      dispatch({ type: SetupType.CREATE_ANSWER_RESET });
    } catch (e: any) {
      const { status, data } = e.response;
      Error(data.message);
      dispatch({ type: SetupType.CREATE_ANSWER_RESET });
    }
  };

export default {
  createQuestionTask,
  createQuestionSubTask,
  allQuestionsTask,
  allQuestionsSubTask,
  createAnswer,
};
