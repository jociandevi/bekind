import React from "react";
import {
  CenterAlignedFlexboxCol,
  CircleImage,
  StyledText,
} from "./sharedLayouts";
import { variables } from "../../common/variables";
import styled from "styled-components";
import { Button } from "antd";
import Header from "./header";
import { useNavigate } from "react-router-dom";
import BackButton from "./backButton";
import Title from "antd/es/typography/Title";
import { useMediaQueries } from "../../common/mediaQueryHook";
import image from "../../img/eva.jpg";

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(https://images.unsplash.com/photo-1598349326101-fc9e68975a52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80);
`;

const ErrorPage404: React.FC = () => {
  const navigate = useNavigate();
  const { md } = useMediaQueries();

  return (
    <PageContainer>
      <Header
        left={
          <BackButton
            style={{ color: variables.white, backgroundColor: "#1816188c" }}
          />
        }
        right={
          <Button
            style={{ color: variables.white }}
            type="link"
            onClick={() => navigate("/")}
          >
            Home
          </Button>
        }
      />
      <CenterAlignedFlexboxCol>
        <Title
          level={1}
          style={{
            margin: `${variables.spacingS} ${variables.spacingL}`,
            color: variables.white,
          }}
        >
          404
        </Title>
        <Title
          level={3}
          style={{
            margin: `${variables.spacingS} ${variables.spacingL}`,
            color: variables.white,
          }}
        >
          Oops, there is nothing here.
        </Title>
        <CircleImage src={image} alt="Profile picture of Eva" md={md} />
        <StyledText
          color={variables.white}
          fontSize="14px"
          style={{
            margin: `${variables.spacingS} ${variables.spacingL}`,
          }}
        >
          Hi!! I'm Eva. I'm the frontend lead / cofounder of BKind and if a link
          is missing, it's probably my bad. Sorry about that!
        </StyledText>
        <Button type="primary" onClick={() => navigate("/")}>
          Go To Home
        </Button>
      </CenterAlignedFlexboxCol>
    </PageContainer>
  );
};

export default ErrorPage404;
