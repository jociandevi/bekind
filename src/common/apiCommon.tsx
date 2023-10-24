import axios from "axios";

interface Params {
  baseUrl: string;
  headers?: any;
  method: string;
  mode?: string;
}

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
  return await axios({
    ...postConfig,
    url: `${postConfig.baseUrl}/${url}`,
    data,
    headers: {
      Authorization: `Bearer ${authHeader}`,
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

export const getAPI = async (
  url: string,
  authHeader?: string
): Promise<any> => {
  return await axios({
    ...getConfig,
    url: `${getConfig.baseUrl}/${url}`,
    headers: {
      Authorization: `Bearer ${authHeader}`,
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
