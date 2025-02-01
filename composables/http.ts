// http.js
import axios, { AxiosInstance, AxiosError } from "axios";

export const baseApiUrl = "http://127.0.0.1:5000";

let userToken;
if (import.meta.client) {
  const tokenLocal = localStorage.getItem("token");

  if (tokenLocal) {
    userToken = tokenLocal;
  } else {
    userToken = null;
  }
}

const http: AxiosInstance = axios.create({
  baseURL: baseApiUrl,
    headers: {
     Authorization: `Bearer ${userToken}`,
    },
});

http.interceptors.request.use((config) => {
  config.params = { ...config.params };
  return config;
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // if (
    //   error.response?.status === 401 &&
    //   !error.request.responseURL.includes("login") &&
    //   !error.request.responseURL.includes("registration") &&
    //   !error.request.responseURL.includes("refresh") &&
    //   !error.request.responseURL.includes("create-application")
    // ) {
    //   const authStore = useAuthStore();
    //   authStore.refreshToken();
    // }
    if (error.response) {
      console.error("Response Error:", error.response.data);
    } else if (error.request) {
      console.error("Request Error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default http;
