import Cookies from "js-cookie";
import { getAPI, postAPI } from "./apiCommon";
import { useContext, useState } from "react";
import { AuthContext } from "./authProvider";
import { useDispatch } from "react-redux";
import { setToken } from "./auth.reducer";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useContext(AuthContext);
  const dispatch = useDispatch();

  const login = async (payload: string) => {
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

        const userResponse = await getUser();
        const userData = userResponse.data;

        // Store the user data in Redux
        setUser(userData);

        // Store the user data in localStorage
        localStorage.setItem("user", JSON.stringify(userData));

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
  };

  return { login, loading, error };
};

export const getUser = () =>
  getAPI("api/Member/Me").then((res) => {
    if (res.status === 200 || res.status === 201) {
      console.log(res);
      return res;
    } else if (res.status === 401) {
      console.log("User seems to be unauthenticated.");
      // todo: implement a function to handle unauthenticated cases.
    } else {
      console.log(res);
    }
  });

export const getActions = () =>
  getAPI("api/Kindness").then((res) => {
    if (res.status === 200 || res.status === 201) {
      console.log(res);
      return res;
    } else if (res.status === 401) {
      console.log("User seems to be unauthenticated.");
      // todo: implement a function to handle unauthenticated cases.
    } else {
      console.log(res);
    }
  });
