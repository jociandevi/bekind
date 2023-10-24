import axios from "axios";

interface Params {
  baseUrl: string;
  headers: any;
  method: string;
  mode?: string;
}

const postConfig: Params = {
  baseUrl: "https://bekind-api.azurewebsites.net",
  headers: {
    Authorization: "",
  },
  method: "post",
};

const getConfig: Params = {
  baseUrl: "https://bekind-api.azurewebsites.net",
  headers: {
    // Authorization: "",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers":
      "X-Requested-With, content-type, Authorization",
    "Access-Control-Allow-Credentials": true,
  },
  method: "get",
  mode: "no-cors",
};

export const postAPI = async (url: string, data: any): Promise<any> => {
  return await axios({
    ...postConfig,
    url: `${postConfig.baseUrl}/${url}`,
    data,
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
  return await axios({
    ...getConfig,
    url: `${getConfig.baseUrl}/${url}`,
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
