import Title from "antd/es/typography/Title";
import React from "react";
import styled from "styled-components";
import {
  borderRadius,
  spacingL,
  spacingM,
  white,
} from "../../common/variables";
import GoogleLoginButton from "./googleLoginButton";
import Button from "antd/es/button/button";
import { ReactComponent as Logo } from "../../img/outbreaktransparentlogo.svg";

const Container = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0;
  flex-direction: column;
  gap: 30px;
`;

const WhiteBox = styled.div`
  position: fixed;
  z-index: 1001;
  background-color: ${white};
  display: flex;
  border-radius: ${borderRadius}px;
  flex-direction: column;
  padding: ${spacingL};
  align-items: center;
`;

const HomePageLogoBtn = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: ${white};
  opacity: 0.85;
`;

const Blurred = () => {
  return (
    <Container>
      <WhiteBox>
        <HomePageLogoBtn
          icon={<Logo style={{ width: 70, height: 70 }} />}
          shape="circle"
        />
        <Title level={4}>Welcome!</Title>
        <Title level={5} style={{ marginBottom: spacingM }}>
          Login to see all our ideas for a happier life
        </Title>
        <GoogleLoginButton />
      </WhiteBox>
    </Container>
  );
};

export default Blurred;
