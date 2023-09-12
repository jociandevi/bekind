import { useContext, useEffect } from "react";
import GoogleLoginButton from "../shared/googleLoginButton";
import { AuthContext } from "../../common/authProvider";
import { useNavigate } from "react-router-dom";
import { CenterAlignedFlexboxCol, StyledText } from "../shared/sharedLayouts";
import Title from "antd/es/typography/Title";
import { variables } from "../../common/variables";
import { Button } from "antd";
import SunriseImage from "../shared/sunriseImage";
import styled from "styled-components";

const LoginContainer = styled(CenterAlignedFlexboxCol)`
  height: 80vh;
  justify-content: space-evenly;
`;

const Login: React.FC = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/random-act-of-kindness");
    }
  }, [user, navigate]);

  return (
    <LoginContainer>
      <SunriseImage />
      <CenterAlignedFlexboxCol>
        <Title level={3}>Welcome!</Title>
        <StyledText color={variables.middleGray} fontSize="14px">
          Ready Hero 1? Your journey begins... now!
        </StyledText>
      </CenterAlignedFlexboxCol>
      <GoogleLoginButton />
      <Button type="link" onClick={() => navigate("/random-act-of-kindness")}>
        ...or skip for now
      </Button>
    </LoginContainer>
  );
};

export default Login;
