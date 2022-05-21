import { NextRouter } from "next/router";
import Cookies from "js-cookie";
import api from "@utils/lib/api";
import { Error, Success } from "@utils/lib/messages";
import { UserDispatch } from "types/user";
import { SetupType } from "@store/types";
import { IProfilePagePasswordFormProps } from "pages/profile";
const baseURL = "/User";
const isLoggedIn = () => async (dispatch: UserDispatch) => {
  dispatch({ type: SetupType.IS_LOGGED_IN_START });
  try {
    const { data, status } = await api.get(`${baseURL}/isLoggedIn`);
    dispatch({
      type: SetupType.IS_LOGGED_IN_SUCCESS,
      payload: data.data,
      status,
    });
    dispatch({ type: SetupType.IS_LOGGED_IN_RESET });
  } catch (e: any) {
    const { status, data } = e.response;
    if (status === 404) {
      Cookies.remove("token");
      window.location.replace("/auth/signin");
      Error(data.message);
    } else {
      Error(data.message);
    }
    dispatch({ type: SetupType.IS_LOGGED_IN_RESET });
  }
};

const updatePassword =
  (form: IProfilePagePasswordFormProps) => async (dispatch: UserDispatch) => {
    dispatch({ type: SetupType.UPDATE_USER_PASSWORD_START });
    try {
      const { data, status } = await api.put(
        `${baseURL}/Update/Password`,
        form
      );
      dispatch({
        type: SetupType.UPDATE_USER_PASSWORD_SUCCESS,
        status,
      });
      Success(data.message);
      dispatch({ type: SetupType.UPDATE_USER_PASSWORD_RESET });
    } catch (e: any) {
      const { status, data } = e.response;

      Error(data.message);
      dispatch({ type: SetupType.UPDATE_USER_PASSWORD_RESET });
    }
  };

const deleteProfilePic = () => async (dispatch: UserDispatch) => {
  dispatch({ type: SetupType.DELETE_USER_AVATAR_START });
  try {
    const { data, status } = await api.delete(
      `${baseURL}/Avatar/Delete/Avatar`
    );
    dispatch({
      type: SetupType.DELETE_USER_AVATAR_SUCCESS,
      payload: data.data,
      status,
    });
    Success(data.message);
    dispatch({ type: SetupType.DELETE_USER_AVATAR_RESET });
  } catch (e: any) {
    const { status, data } = e.response;

    Error(data.message);
    dispatch({ type: SetupType.DELETE_USER_AVATAR_RESET });
  }
};
const uploadProfilePic = (avatar: string) => async (dispatch: UserDispatch) => {
  const formData = new FormData();
  formData.append("avatar", avatar);
  dispatch({ type: SetupType.UPLOAD_USER_AVATAR_START });
  try {
    const { data, status } = await api.put(
      `${baseURL}/Avatar/Upload/Avatar`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch({
      type: SetupType.UPLOAD_USER_AVATAR_SUCCESS,
      payload: data.data,
      status,
    });
    Success(data.message);
    dispatch({ type: SetupType.UPLOAD_USER_AVATAR_RESET });
  } catch (e: any) {
    const { status, data } = e.response;

    Error(data.message);
    dispatch({ type: SetupType.UPLOAD_USER_AVATAR_RESET });
  }
};

const Logout = (router: NextRouter) => async (dispatch: UserDispatch) => {
  dispatch({ type: SetupType.LOGOUT_START });
  try {
    const { data, status } = await api.get(`${baseURL}/Logout`);
    await Cookies.remove("token");
    router.push("/auth/signin");
  } catch (e: any) {
    const { status, data } = e.response;
    Error(data.message);
    dispatch({ type: SetupType.LOGOUT_RESET });
  }
};

export default {
  isLoggedIn,
  updatePassword,
  deleteProfilePic,
  uploadProfilePic,
  Logout,
};
