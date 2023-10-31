import { useContext, useEffect } from "react";
import GoogleLoginButton from "../shared/googleLoginButton";
import { AuthContext } from "../../common/authProvider";
import { useNavigate } from "react-router-dom";
import {
  CenterAlignedFlexbox,
  CenterAlignedFlexboxCol,
  StyledText,
} from "../shared/sharedLayouts";
import Title from "antd/es/typography/Title";
import { variables } from "../../common/variables";
import { Button } from "antd";
import SunriseImage from "../shared/sunriseImage";
import styled from "styled-components";
import { useMediaQueries } from "../../common/mediaQueryHook";

const LoginContainer = styled(CenterAlignedFlexboxCol)`
  height: 100vh;
  justify-content: space-evenly;
`;

const ImageContainer = styled.div`
  width: 50vw;
  height: 120vh;
  background-color: ${variables.veryLightGray};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContentContainer = styled.div`
  width: 50vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Login: React.FC = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { md } = useMediaQueries();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const LoginContent = () => {
    return (
      <CenterAlignedFlexboxCol
        style={{ justifyContent: "space-between", height: "70vh" }}
      >
        <CenterAlignedFlexboxCol>
          <Title level={3}>Welcome to Outbreak!</Title>
          <StyledText color={variables.middleGray} fontSize="14px">
            Improve your life a little bit every day.
          </StyledText>
        </CenterAlignedFlexboxCol>
        <CenterAlignedFlexboxCol>
          <GoogleLoginButton />
        </CenterAlignedFlexboxCol>

        <Button type="link" onClick={() => navigate("/")}>
          ...or skip for now
        </Button>
      </CenterAlignedFlexboxCol>
    );
  };

  return (
    <LoginContainer>
      {md ? (
        <CenterAlignedFlexbox>
          <LoginContentContainer>
            <LoginContent />
          </LoginContentContainer>
          <ImageContainer>
            <SunriseImage />
          </ImageContainer>
        </CenterAlignedFlexbox>
      ) : (
        <>
          <SunriseImage />
          <LoginContent />
        </>
      )}
    </LoginContainer>
  );
};

export default Login;
