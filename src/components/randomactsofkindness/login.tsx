import { useEffect } from "react";
import GoogleLoginButton from "../shared/googleLoginButton";
import { useNavigate } from "react-router-dom";
import {
  CenterAlignedFlexbox,
  CenterAlignedFlexboxCol,
  StyledText,
} from "../shared/sharedLayouts";
import Title from "antd/es/typography/Title";
import SunriseImage from "../shared/sunriseImage";
import styled from "styled-components";
import { useMediaQueries } from "../../common/mediaQueryHook";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/selectors";
import Button from "antd/es/button";
import { middleGray, veryLightGray } from "../../common/variables";

const LoginContainer = styled(CenterAlignedFlexboxCol)`
  height: 100vh;
  justify-content: space-evenly;
`;

const ImageContainer = styled.div`
  width: 50vw;
  height: 120vh;
  background-color: ${veryLightGray};
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
  const user = useSelector(selectUser);
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
        <CenterAlignedFlexboxCol style={{ padding: `0 20vw` }}>
          <Title level={2}>Welcome!</Title>
          <StyledText color={middleGray} fontSize="14px">
            Outbreaks helps you become happier with small daily actions.
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
