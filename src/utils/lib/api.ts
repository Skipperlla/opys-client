import axios from "axios";
import Cookies from "js-cookie";
import { Error } from "./messages";
const baseURLProduction = "https://opys.herokuapp.com/api/v1";
const baseURLDev = "http://localhost:8000/api/v1";
const token = Cookies.get("token");
const baseURL =
  process.env.NODE_ENV !== "development" ? baseURLDev : baseURLProduction;
const api = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getAllTaskLeader = async (
  groupCode: string | string[] | undefined
) => {
  try {
    const { data, status } = await api.get(
      `/Task/Student/Tasks/Leader/${groupCode}`
    );
    return {
      data: data.data,
      status,
    };
  } catch (e: any) {
    const { status, data } = e.response;
    Error(data.message);
  }
};
export default api;
