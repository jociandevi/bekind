import axios from "axios";
import { store } from "./store";
import { CustomError, Member } from "./interfaces";
import { baseUrl } from "./util";

type QueueItem = {
  resolve: () => void;
  reject: (error: any) => void;
};

// Flag and variable to control the refresh logic
let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: any) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      // Just resolve without passing a token, as the token is managed via cookies
      resolve();
    }
  });

  failedQueue = []; // Clear the queue after processing
};

// Configure a base Axios instance
export const apiInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => {
              // Since the updated token is in HttpOnly cookies, no need to set the Authorization header here.
              // The browser will automatically send the updated cookie with the request.
              resolve(apiInstance(originalRequest));
            },
            reject: (err: any) => {
              reject(err);
            },
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const state = store.getState();

      let currentUserEmail = "";
      try {
        currentUserEmail =
          state.authReducer.user !== null
            ? ((state.authReducer.user as Member).email as string)
            : (localStorage.getItem("email") as string);
      } catch {
        currentUserEmail = localStorage.getItem("email") as string;
      }

      // this will be needed to put back but along with backend
      /* return new Promise(function (resolve, reject) {
        apiInstance
          .get(`/api/Auth/GetRefreshToken?email=${currentUserEmail}`)
          .then(({ status }) => {
            if (status === 200) {
              processQueue(null);
              resolve(apiInstance(originalRequest));
            } else {
              processQueue(error);
              reject(error);
            }
          })
          .catch((err) => {
            if (
              err.response &&
              (err.response.status === 401 ||
                err.response.data.error === "Refresh token expired")
            ) {
              err.isAuthError = true;
              console.log("Refresh token expired. User must be logged in");
            }
            processQueue(err);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      }); */

      return new Promise(function (resolve, reject) {
        fetch(`${baseUrl}/api/Auth/GetRefreshToken?email=${currentUserEmail}`, {
          method: "GET",
          credentials: "include",
        })
          .then(async (response) => {
            const data = await response.text(); // the response is plain text
            if (response.ok) {
              console.log("Token refreshed with fetch");
              processQueue(null);
              resolve(apiInstance(originalRequest));
            } else {
              const error = new Error(data);
              if (data === "Token has expired") {
                (error as CustomError).isAuthError = true;
              }
              throw error;
            }
          })
          .catch((error) => {
            if (error.message === "Token has expired") {
              error.isAuthError = true;
            } else {
              error.isAuthError = false;
            }
            processQueue(error);
            reject(error);
            if (error.message === "Token has expired") {
              error.isError = true;
              return error;
            }
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);
