import axios from "axios";
import { apiInstance } from "./axiosInterceptor";
import { baseUrl } from "./util";

export interface Params {
  baseUrl: string;
  headers?: any;
  method: string;
  mode?: string;
}

const postConfig: Params = {
  baseUrl,
  method: "post",
};

export const postAPI = async (
  url: string,
  data?: any,
  authHeader?: string
): Promise<any> => {
  const headers = authHeader ? { Authorization: `Bearer ${authHeader}` } : {};
  try {
    const response = await apiInstance({
      ...postConfig,
      url,
      data,
      headers,
    });
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    let errorMessage = "An unknown error occurred.";
    if (error.isAuthError) {
      errorMessage = "Refresh token expired";
    } else if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message || errorMessage;
    }

    // Log the error message or handle it as needed
    console.error(errorMessage);

    return {
      status: error.response?.status || "Unknown error",
      data: {},
      message: errorMessage,
      isAuthError: error.isAuthError || false,
    };
  }
};

export const getAPI = async (url: string): Promise<any> => {
  try {
    const response = await apiInstance.get(url);
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    let errorMessage = "An unknown error occurred.";
    if (error.isAuthError) {
      errorMessage = "Refresh token expired";
    } else if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message || errorMessage;
    }

    // Log the error message or handle it as needed
    console.error(errorMessage);

    return {
      status: error.response?.status || "Unknown error",
      data: {},
      message: errorMessage,
      isAuthError: error.isAuthError || false,
    };
  }
};
