import { useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { AuthContext } from "../../common/authProvider";
import Cookies from "js-cookie";

const GoogleLoginButton: React.FC = () => {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const handleCallbackResponse = (response: any) => {
      const userObject = jwt_decode(response.credential);
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

  return <div id="signInDiv" />;
};

export default GoogleLoginButton;
