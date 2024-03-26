import axios from "axios";
import { BASEURL } from "../utils/constants";

export const api = axios.create({
  baseURL: BASEURL + "/api/v1/",
});


api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);