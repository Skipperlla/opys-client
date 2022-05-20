import api from "@utils/lib/api";
import { GroupDispatch, IGroup } from "types/group";
import { SetupType } from "@store/types";
import { Success, Error } from "@utils/lib/messages";
const baseURL = "/Group/Teacher";

const singleGroup =
  (groupCode: string | string[] | undefined) =>
  async (dispatch: GroupDispatch) => {
    dispatch({ type: SetupType.GET_GROUP_START });
    try {
      const { data, status } = await api.get<{ data: IGroup }>(
        `${baseURL}/Single/${groupCode}`
      );
      dispatch({
        type: SetupType.GET_GROUP_SUCCESS,
        payload: data.data,
        status,
      });

      dispatch({ type: SetupType.GET_GROUP_RESET });
    } catch (e: any) {
      const { status, data } = e.response;

      Error(data.message);
      dispatch({ type: SetupType.GET_GROUP_RESET });
    }
  };
const allGroups = () => async (dispatch: GroupDispatch) => {
  dispatch({ type: SetupType.GET_GROUPS_START });
  try {
    const { data, status } = await api.get<{ data: IGroup[] }>(
      `${baseURL}/Groups`
    );
    dispatch({
      type: SetupType.GET_GROUPS_SUCCESS,
      payload: data.data,
      status,
    });
    dispatch({ type: SetupType.GET_GROUPS_RESET });
  } catch (e: any) {
    const { status, data } = e.response;

    Error(data.message);
    dispatch({ type: SetupType.GET_GROUPS_RESET });
  }
};
const updateGroup =
  (groupCode: string | string[] | undefined) =>
  async (dispatch: GroupDispatch) => {
    dispatch({ type: SetupType.UPDATE_GROUP_START });
    try {
      const { data, status } = await api.put<{ data: IGroup; message: string }>(
        `${baseURL}/Update/${groupCode}`
      );
      dispatch({
        type: SetupType.UPDATE_GROUP_SUCCESS,
        payload: data.data,
        status,
      });
      Success(data.message);
      dispatch({ type: SetupType.UPDATE_GROUP_RESET });
    } catch (e: any) {
      const { status, data } = e.response;

      Error(data.message);
      dispatch({ type: SetupType.UPDATE_GROUP_RESET });
    }
  };
const deleteGroup =
  (groupCode: string | string[] | undefined) =>
  async (dispatch: GroupDispatch) => {
    dispatch({ type: SetupType.DELETE_GROUP_START });
    try {
      const { data, status } = await api.delete<{
        data: IGroup;
        message: string;
      }>(`${baseURL}/Remove/${groupCode}`);
      dispatch({
        type: SetupType.DELETE_GROUP_SUCCESS,
        payload: data.data,
        status,
      });
      Success(data.message);
      dispatch({ type: SetupType.DELETE_GROUP_RESET });
    } catch (e: any) {
      const { data } = e.response;

      Error(data.message);
      dispatch({ type: SetupType.DELETE_GROUP_RESET });
    }
  };
const createGroup = (groupName: string) => async (dispatch: GroupDispatch) => {
  dispatch({ type: SetupType.CREATE_GROUP_START });
  try {
    const { data, status } = await api.post<{ data: IGroup; message: string }>(
      `${baseURL}/Create`,
      {
        name: groupName,
      }
    );
    dispatch({
      type: SetupType.CREATE_GROUP_SUCCESS,
      payload: data.data,
      status,
    });
    Success(data.message);
    dispatch({ type: SetupType.CREATE_GROUP_RESET });
  } catch (e: any) {
    const { data } = e.response;

    Error(data.message);
    dispatch({ type: SetupType.CREATE_GROUP_RESET });
  }
};
const doLeader =
  (
    groupCode: string | string[] | undefined,
    studentId: string | string[] | undefined
  ) =>
  async (dispatch: GroupDispatch) => {
    dispatch({ type: SetupType.LEADER_DO_START });
    try {
      const { data, status } = await api.get<{ data: IGroup; message: string }>(
        `${baseURL}/Leader/Do/${groupCode}/${studentId}`
      );
      dispatch({
        type: SetupType.LEADER_DO_SUCCESS,
        payload: data.data,
        status,
      });
      Success(data.message);
      dispatch({ type: SetupType.LEADER_DO_RESET });
    } catch (e: any) {
      const { data } = e.response;

      Error(data.message);
      dispatch({ type: SetupType.LEADER_DO_RESET });
    }
  };
const removeLeader =
  (
    groupCode: string | string[] | undefined,
    studentId: string | string[] | undefined
  ) =>
  async (dispatch: GroupDispatch) => {
    dispatch({ type: SetupType.LEADER_REMOVE_START });
    try {
      const { data, status } = await api.get<{ data: IGroup; message: string }>(
        `${baseURL}/Leader/Remove/${groupCode}/${studentId}`
      );
      dispatch({
        type: SetupType.LEADER_REMOVE_SUCCESS,
        payload: data.data,
        status,
      });
      Success(data.message);
      dispatch({ type: SetupType.LEADER_DO_RESET });
    } catch (e: any) {
      const { data } = e.response;

      Error(data.message);
      dispatch({ type: SetupType.LEADER_DO_RESET });
    }
  };

export default {
  singleGroup,
  allGroups,
  updateGroup,
  createGroup,
  deleteGroup,
  doLeader,
  removeLeader,
};
