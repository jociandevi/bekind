import React from "react";
import { FlexboxCol, ImageContainer, StyledText } from "./sharedLayouts";
import Button from "antd/es/button";
import styled from "styled-components";
import { mdBreakPoint } from "../../common/mediaQueryHook";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Article from "./article/article";
import InstallButton from "./pwaCustomInstalls/installButton";
import { ArticleImage } from "../randomactsofkindness/kindnessDetails";
import { middleGray, spacingL, spacingM, white } from "../../common/variables";

const MarginContainer = styled(FlexboxCol)`
  margin: ${spacingM} auto;
  width: 90vw;
  @media only screen and ${mdBreakPoint} {
    width: inherit;
  }
`;

const OverlayBackButton = styled(Button)`
  position: absolute;
  top: ${spacingL};
  left: ${spacingM};
  color: ${white};
  background-color: #1816188c;
`;

const TermsAndConditions: React.FC = () => {
  const navigate = useNavigate();

  const item = {
    imageUrl:
      "https://images.unsplash.com/photo-1586856635275-af01918579ba?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1470",
    credit: "Markus Winkler",
    title: "Terms and Conditions",
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
        color={middleGray}
        fontSize="10px"
        style={{ margin: "0 auto" }}
      >
        Image by {item?.credit}
      </StyledText>
      <MarginContainer>
        <Article kindness={item} isPureText />
      </MarginContainer>
      <InstallButton />
    </FlexboxCol>
  );
};

export default TermsAndConditions;
