import { useCallback, useState } from "react";
import { store } from "../common/store";
import { removeToken } from "../common/auth.reducer";
import axios from "axios";
import { Params, getTokenFromState } from "../common/apiCommon";

const deleteConfig: Params = {
  baseUrl: "https://bekind-api.azurewebsites.net",
  method: "delete",
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

export const useDelete = (url: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callDelete = useCallback(
    async (data?: any) => {
      setLoading(true);
      setError(null);

      try {
        const response = await deleteAPI(url, data);
        if (response.status === 200 || response.status === 201) {
          setLoading(false);
          return response;
        } else if (response.data.status === 401) {
          setError("Looks like you are unautorized.");
          store.dispatch(removeToken());
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
