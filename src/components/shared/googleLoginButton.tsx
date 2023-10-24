import { useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { postAPI } from "../../common/apiCommon";
import { TokenPayload } from "../../common/interfaces";
import { AuthContext } from "../../common/authProvider";

interface Props {
  isDisabled?: boolean;
}

const GoogleLoginButton: React.FC<Props> = ({ isDisabled }) => {
  const { setUser } = useContext(AuthContext);
  const login = (payload: TokenPayload) =>
    postAPI("/api/Auth/Login", { ...payload }).then((res) => {
      if (res.status === 200 || res.status === 201) {
        console.log(res);
        // get token
        // include in the Authorization as Bearer
      } else {
        console.log(res);
      }
    });

  useEffect(() => {
    const handleCallbackResponse = (response: any) => {
      const userObject: TokenPayload = jwt_decode(response.credential);
      login(userObject);
      setUser(userObject);
      const serializedData = JSON.stringify(userObject);

      Cookies.set("googleResponseData", serializedData, {
        expires: 1,
        secure: true,
        httpOnly: true,
      });
    };

    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || "",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv")!, {
      theme: "outline",
      size: "large",
      shape: "rectangular",
      text: "signin_with",
      logo_alignment: "left",
    });

    google.accounts.id.prompt();
  }, [setUser]);

  if (!google || !google.accounts || !google.accounts.id) {
    return null;
  }

  return (
    <div
      id="signInDiv"
      style={{
        pointerEvents: isDisabled ? "none" : "auto",
        opacity: isDisabled ? 0.5 : 1,
      }}
      aria-disabled={isDisabled}
    />
  );
};

export default GoogleLoginButton;
