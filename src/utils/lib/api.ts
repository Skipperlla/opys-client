import axios from "axios";
import Cookies from "js-cookie";
const baseURL = "https://opys.herokuapp.com/api/v1";
// const baseURL = "http://localhost:8000/api/v1";
const token = Cookies.get("token");

const api = axios.create({
  baseURL,
  headers: {
    // 'Content-Type': 'application/json',
    // 'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token}`,
  },
});

export default api;
