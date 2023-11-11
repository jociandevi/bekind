import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { postAPI } from "../common/apiCommon";
import { setToken, setUser } from "../common/auth.reducer";
import Cookies from "js-cookie";
import { getApiCall } from "../common/apiCalls";

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
