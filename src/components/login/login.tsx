import { StyledGrid } from "../shared/sharedLayouts";
import Title from "antd/es/typography/Title";

const Login: React.FC = () => {
  return (
    <StyledGrid>
      <Title level={3}>Hey!</Title>
      <div
        id="g_id_onload"
        data-client_id="1089149343789-4eck6r05fbi0nesua0lkhn4udf7d5303.apps.googleusercontent.com"
        data-context="use"
        data-ux_mode="popup"
        data-callback="https://nice-field-0f61b6b03.3.azurestaticapps.net/"
        data-auto_select="true"
        data-itp_support="true"
      ></div>

      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
    </StyledGrid>
  );
};

export default Login;
