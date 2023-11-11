import axios from "axios";
import { store } from "./store";

export interface Params {
  baseUrl: string;
  headers?: any;
  method: string;
  mode?: string;
}

export const getTokenFromState = () => {
  const state = store.getState();
  return state.authReducer?.token;
};

const postConfig: Params = {
  baseUrl: "https://bekind-api.azurewebsites.net",
  method: "post",
};

const getConfig: Params = {
  baseUrl: "https://bekind-api.azurewebsites.net",
  method: "get",
};

export const postAPI = async (
  url: string,
  data?: any,
  authHeader?: string
): Promise<any> => {
  const token = getTokenFromState();
  return await axios({
    ...postConfig,
    url: `${postConfig.baseUrl}/${url}`,
    data,
    headers: {
      Authorization: authHeader
        ? `Bearer ${authHeader}`
        : token
        ? `Bearer ${token}`
        : null,
    },
  })
    .then((response) => {
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      return {
        status: error.status,
        data: error.response,
      };
    });
};

export const getAPI = async (url: string): Promise<any> => {
  const token = getTokenFromState();
  return await axios({
    ...getConfig,
    url: `${getConfig.baseUrl}/${url}`,
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  })
    .then((response) => {
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      return {
        status: error.status,
        data: error.response,
      };
    });
};
