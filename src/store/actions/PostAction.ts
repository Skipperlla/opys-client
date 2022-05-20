import api from "@utils/lib/api";
import { Error, Success } from "@utils/lib/messages";
import { SetupType } from "@store/types";
import { IPost, PostDispatch } from "types/post";
const baseURL = "/Post";

const createPost =
  (
    groupCode: string | string[] | undefined,
    content: string | string[] | undefined,
    handleClose: () => void
  ) =>
  async (dispatch: PostDispatch) => {
    dispatch({ type: SetupType.CREATE_POST_START });
    try {
      const { data, status } = await api.post<{ data: IPost; message: string }>(
        `${baseURL}/Create/${groupCode}`,
        {
          content,
        }
      );
      dispatch({
        type: SetupType.CREATE_POST_SUCCESS,
        payload: data.data,
        status,
      });
      Success(data.message);
      handleClose();
      dispatch({ type: SetupType.CREATE_POST_RESET });
    } catch (e: any) {
      const { status, data } = e.response;
      Error(data.message);
      dispatch({ type: SetupType.CREATE_POST_RESET });
    }
  };
const deletePost =
  (
    groupCode: string | string[] | undefined,
    postId: string | string[] | undefined
  ) =>
  async (dispatch: PostDispatch) => {
    dispatch({ type: SetupType.DELETE_POST_START });
    try {
      const { data, status } = await api.delete<{
        data: IPost;
        message: string;
      }>(`${baseURL}/Delete/${groupCode}/${postId}`);
      dispatch({
        type: SetupType.DELETE_POST_SUCCESS,
        payload: data.data,
        status,
      });
      Success(data.message);
      dispatch({ type: SetupType.DELETE_POST_RESET });
    } catch (e: any) {
      const { status, data } = e.response;
      Error(data.message);
      dispatch({ type: SetupType.DELETE_POST_RESET });
    }
  };
const allPosts =
  (groupCode: string | string[] | undefined) =>
  async (dispatch: PostDispatch) => {
    dispatch({ type: SetupType.GET_POSTS_START });
    try {
      const { data, status } = await api.get<{
        data: IPost[];
        message: string;
      }>(`${baseURL}/Posts/${groupCode}`);
      dispatch({
        type: SetupType.GET_POSTS_SUCCESS,
        payload: data.data,
        status,
      });
      Success(data.message);
      dispatch({ type: SetupType.GET_POSTS_RESET });
    } catch (e: any) {
      const { status, data } = e.response;
      Error(data.message);
      dispatch({ type: SetupType.GET_POSTS_RESET });
    }
  };

export default { createPost, deletePost, allPosts };
