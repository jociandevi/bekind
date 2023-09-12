import { useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { AuthContext } from "../../common/authProvider";

const GoogleLoginButton: React.FC = () => {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const handleCallbackResponse = (response: any) => {
      const userObject = jwt_decode(response.credential);
      setUser(userObject);
    };

    google.accounts.id.initialize({
      client_id:
        "1089149343789-4eck6r05fbi0nesua0lkhn4udf7d5303.apps.googleusercontent.com",
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
