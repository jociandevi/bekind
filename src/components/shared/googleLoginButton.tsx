import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { TokenPayload } from "../../common/interfaces";
import Spin from "antd/es/spin";
import { useLogin } from "../../hooks/useLogin";

const GoogleLoginButton: React.FC = () => {
  const { login, loading, error } = useLogin();
  const [googleApiLoaded, setGoogleApiLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    const intervalId = setInterval(() => {
      if ((window as any).google) {
        setGoogleApiLoaded(true);
        clearInterval(intervalId);
      }
    }, 100);

    return () => {
      document.body.removeChild(script);
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (googleApiLoaded) {
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

      (window as any).google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || "",
        callback: handleCallbackResponse,
        auto_select: true,
      });

      (window as any).google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {
          theme: "outline",
          size: "large",
        }
      );

      (window as any).google.accounts.id.prompt();
    }
  }, [login, googleApiLoaded]);

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <div id="signInDiv"></div>;
};

export default GoogleLoginButton;
