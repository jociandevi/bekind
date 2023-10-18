import { useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { AuthContext } from "../../common/authProvider";
import Cookies from "js-cookie";

interface Props {
  isDisabled?: boolean;
}

const GoogleLoginButton: React.FC<Props> = ({ isDisabled }) => {
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
