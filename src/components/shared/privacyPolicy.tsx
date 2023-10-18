import React from "react";
import { FlexboxCol, ImageContainer, StyledText } from "./sharedLayouts";
import { Button } from "antd";
import { variables } from "../../common/variables";
import styled from "styled-components";
import { lgBreakPoint, mdBreakPoint } from "../../common/mediaQueryHook";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Article from "./article/article";
import InstallButton from "./pwaCustomInstalls/installButton";

const MarginContainer = styled(FlexboxCol)`
  margin: ${variables.spacingM} auto;
  width: 90vw;
  @media only screen and ${mdBreakPoint} {
    width: inherit;
  }
`;

const OverlayBackButton = styled(Button)`
  position: absolute;
  top: ${variables.spacingL};
  left: ${variables.spacingM};
  color: ${variables.white};
  background-color: #1816188c;
`;

export const ArticleImage = styled.img`
  width: 100vw;
  @media only screen and ${mdBreakPoint} {
    width: 75vw;
  }
  @media only screen and ${lgBreakPoint} {
    width: 50vw;
  }
  height: ${50 / 1.618}vw;
  border-radius: 0;
  object-fit: cover;
`;

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  const item = {
    imageUrl:
      "https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1470",
    credit: "Javier Allegue Barros",
    title: "Privacy Policy",
  };

  return (
    <FlexboxCol>
      <ImageContainer style={{ margin: "0 auto" }}>
        <ArticleImage src={item?.imageUrl} alt={`Image of ${item?.title}`} />

        <OverlayBackButton
          icon={<ArrowLeftOutlined />}
          shape="circle"
          onClick={() => navigate(-1)}
        />
      </ImageContainer>
      <StyledText
        color={variables.middleGray}
        fontSize="10px"
        style={{ margin: "0 auto" }}
      >
        Image by {item?.credit}
      </StyledText>
      <MarginContainer>
        <Article item={item} isPureText />
      </MarginContainer>
      <InstallButton />
    </FlexboxCol>
  );
};

export default PrivacyPolicy;
