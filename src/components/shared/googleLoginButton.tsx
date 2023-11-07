import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { TokenPayload } from "../../common/interfaces";
import { useLogin } from "../../common/apiCalls";
import { Spin } from "antd";

const GoogleLoginButton: React.FC = () => {
  const { login, loading, error } = useLogin();

  useEffect(() => {
    const handleCallbackResponse = (response: any) => {
      const userObject: TokenPayload = jwt_decode(response.credential);
      login(response.credential);
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
      auto_select: true,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv")!, {
      theme: "outline",
      size: "large",
      shape: "rectangular",
      text: "signin_with",
      logo_alignment: "left",
    });

    google.accounts.id.prompt();
  }, [login]);

  useEffect(() => {
    const credentialPickerContainer = document.getElementById(
      "credential_picker_container"
    );
    if (credentialPickerContainer) {
      credentialPickerContainer.style.pointerEvents = "none";
    }
  }, [login]);

  if (!google || !google.accounts || !google.accounts.id) {
    return null;
  }

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <div id="signInDiv" />;
};

export default GoogleLoginButton;
