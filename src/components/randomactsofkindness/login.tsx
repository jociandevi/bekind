import { useContext, useEffect, useState } from "react";
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
import { Button, Checkbox } from "antd";
import SunriseImage from "../shared/sunriseImage";
import styled from "styled-components";
import { useMediaQueries } from "../../common/mediaQueryHook";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

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
  const [isDisabled, setIsDisabled] = useState(true);
  const [isTermAccepted, setIsTermAccepted] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/kindness");
    }
  }, [user, navigate]);

  useEffect(() => {
    setIsDisabled(!isTermAccepted);
  }, [isTermAccepted]);

  const LoginContent = () => {
    return (
      <CenterAlignedFlexboxCol
        style={{ justifyContent: "space-between", height: "70vh" }}
      >
        <CenterAlignedFlexboxCol>
          <Title level={3}>Welcome to BKind!</Title>
          <StyledText color={variables.middleGray} fontSize="14px">
            Improve your life a little bit every day.
          </StyledText>
        </CenterAlignedFlexboxCol>
        <CenterAlignedFlexboxCol>
          <GoogleLoginButton isDisabled={isDisabled} />
          {isDisabled && (
            <StyledText
              color={variables.pink3}
              fontSize="10px"
              style={{ marginTop: variables.spacingXxs }}
            >
              Please accept Terms & Conditions to login.
            </StyledText>
          )}
          <Checkbox
            onChange={(e: CheckboxChangeEvent) =>
              setIsTermAccepted(e.target.checked)
            }
            checked={isTermAccepted}
          >
            <StyledText color={variables.middleGray} fontSize="10px">
              I accept the{" "}
              <a href="/terms-and-conditions">Terms & Conditions</a> and{" "}
              <a href="/privacy-policy">Privacy policy</a>.
            </StyledText>
          </Checkbox>
        </CenterAlignedFlexboxCol>

        <Button type="link" onClick={() => navigate("/kindness")}>
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
