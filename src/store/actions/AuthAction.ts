import { SetupType } from "@store/types";
import Cookies from "js-cookie";
import api from "@utils/lib/api";
import { Error } from "@utils/lib/messages";
import { AuthDispatch } from "types/auth";
import { ISignInProps } from "pages/auth/signin";
import { NextRouter } from "next/router";

const Login =
  (form: ISignInProps, router: NextRouter) =>
  async (dispatch: AuthDispatch) => {
    dispatch({ type: SetupType.LOGIN_START });
    try {
      const { data } = await api.post("/Auth/Login", form);
      Cookies.set("token", data.access_token);
      router.push("/");
    } catch (e:any) {
      const { status, data } = e.response;
      Error(data.message);
    }
  };
export default { Login };
