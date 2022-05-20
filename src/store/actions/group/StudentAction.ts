import api from "@utils/lib/api";
import { GroupDispatch, IGroup } from "types/group";
import { SetupType } from "@store/types";
import { Success, Error, Warning } from "@utils/lib/messages";
import { NextRouter } from "next/router";
const baseURL = "/Group/Student";

const singleGroup =
  (groupCode: string | string[] | undefined, router: NextRouter) =>
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

      Warning(data.message);
      if (status === 404) router.replace("/tasks");
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
const joinGroup = (groupCode: string) => async (dispatch: GroupDispatch) => {
  dispatch({ type: SetupType.JOIN_GROUP_START });
  try {
    const { data, status } = await api.post<{ data: IGroup; message: string }>(
      `${baseURL}/${groupCode}`
    );
    dispatch({
      type: SetupType.JOIN_GROUP_SUCCESS,
      payload: data.data,
      status,
    });
    Success(data.message);
    dispatch({ type: SetupType.JOIN_GROUP_RESET });
  } catch (e: any) {
    const { status, data } = e.response;

    Error(data.message);
    dispatch({ type: SetupType.JOIN_GROUP_RESET });
  }
};

export default { singleGroup, allGroups, joinGroup };
