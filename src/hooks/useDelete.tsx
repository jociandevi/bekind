import { useCallback, useState } from "react";
import axios from "axios";
import { Params } from "../common/apiCommon";
import { apiInstance } from "../common/axiosInterceptor";
import { baseUrl } from "../common/util";

const deleteConfig: Params = {
  baseUrl,
  method: "delete",
};

export const deleteApi = async (url: string, data?: any): Promise<any> => {
  try {
    const response = await apiInstance({
      ...deleteConfig,
      url,
      data,
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

export const useDelete = (url: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callDelete = useCallback(
    async (data?: any) => {
      setLoading(true);
      setError(null);

      try {
        const response = await deleteApi(url, data);
        if (response.status === 200 || response.status === 201) {
          setLoading(false);
          return response;
        } else if (response.data.status === 401) {
          setError("Looks like you are unautorized.");
        } else if (response.status === 400 || response.data.status === 400) {
          const errorMessage = response?.data?.data?.errorMessages[0];
          setError(errorMessage || "This seems like a bad request");
          setLoading(false);
        } else {
          const errorMessage = response?.data?.data?.errorMessages[0];
          setError(errorMessage || "Failed to make the POST request.");
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred during the POST request.");
        setLoading(false);
      }
    },
    [url]
  );

  return { callDelete, loading, error };
};
