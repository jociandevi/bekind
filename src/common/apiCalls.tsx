import Cookies from "js-cookie";
import { getAPI, postAPI } from "./apiCommon";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { clearUser, removeToken, setToken, setUser } from "./auth.reducer";
import { store } from "./store";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const login = useCallback(
    async (payload: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await postAPI("api/Auth/Login", undefined, payload);

        if (response.status === 200 || response.status === 201) {
          const backendToken = response.data;
          dispatch(setToken(backendToken));
          Cookies.set("backendToken", response.data, {
            expires: 1,
            secure: true,
            httpOnly: true,
          });

          const userResponse = await getApiCall("api/Member/Me");
          const userData = userResponse.data;

          dispatch(setUser(userData));

          // localStorage.setItem("user", JSON.stringify(userData));

          setLoading(false);
          return userData;
        } else {
          console.log(response);
          setError("Failed to login.");
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred during login.");
        setLoading(false);
      }
    },
    [dispatch]
  );

  return { login, loading, error };
};

export const getApiCall = (url: string) =>
  getAPI(url).then((res) => {
    if (res.status === 200 || res.status === 201) {
      return res;
    } else if (res.data?.status === 401) {
      console.log("User seems to be unauthenticated.");
      store.dispatch(removeToken());
      store.dispatch(clearUser());
      // localStorage.removeItem("user");
    }
  });

export const usePostApi = (url: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callPostApi = useCallback(
    async (data?: any) => {
      setLoading(true);
      setError(null);

      try {
        const response = await postAPI(url, data);
        if (response.status === 200 || response.status === 201) {
          setLoading(false);
          return response;
        } else if (response.data.status === 401) {
          setError("Looks like you are unautorized.");
          store.dispatch(removeToken());
          localStorage.removeItem("user");
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

  return { callPostApi, loading, error };
};

export const useGetApi = (url: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const callGetApi = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getAPI(url);
      if (response.status === 200 || response.status === 201) {
        setLoading(false);
        return response;
      } else if (response?.data?.status === 401) {
        setError("Looks like you are unauthorized.");
        store.dispatch(removeToken());
        dispatch(clearUser());
      } else if (response?.status === 400 || response?.data?.status === 400) {
        const errorMessage = response?.data?.data?.errorMessages?.[0];
        setError(errorMessage || "This seems like a bad request");
      } else {
        const errorMessage = response?.data?.data?.errorMessages?.[0];
        setError(errorMessage || "Failed to make the POST request.");
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("An error occurred during the GET request.");
      setLoading(false);
    }
  }, [url, dispatch]);
  return { callGetApi, loading, error };
};
