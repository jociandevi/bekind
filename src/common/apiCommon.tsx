import axios from "axios";
import { store } from "./store";

interface Params {
  baseUrl: string;
  headers?: any;
  method: string;
  mode?: string;
}

const getTokenFromState = () => {
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

const deleteConfig: Params = {
  baseUrl: "https://bekind-api.azurewebsites.net",
  method: "delete",
};

const putConfig: Params = {
  baseUrl: "https://bekind-api.azurewebsites.net",
  method: "put",
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

export const deleteAPI = async (
  url: string,
  authHeader?: string
): Promise<any> => {
  const token = getTokenFromState();
  return await axios({
    ...deleteConfig,
    url: `${deleteConfig.baseUrl}/${url}`,
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

export const putApi = async (
  url: string,
  data?: any,
  authHeader?: string
): Promise<any> => {
  const token = getTokenFromState();
  return await axios({
    ...putConfig,
    url: `${putConfig.baseUrl}/${url}`,
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
