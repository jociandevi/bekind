import React from "react";
import {
  CenterAlignedFlexbox,
  FlexboxCol,
  ResponsiveImage,
  StyledText,
} from "./sharedLayouts";
import { variables } from "../../common/variables";
import styled from "styled-components";
import Title from "antd/es/typography/Title";
import { Button } from "antd";
import { useMediaQueries } from "../../common/mediaQueryHook";

const CardContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px;
  flex-shrink: 0;
  border-radius: ${variables.borderRadius}px;
  scroll-snap-align: center;
  scroll-snap-stop: always;
  display: flex;
  margin-bottom: ${variables.spacingS};
  max-height: 30vw;
`;

interface Props {
  item: { id: number; title: string; description?: string; imageUrl: string };
}

const ImageCardL: React.FC<Props> = ({ item }) => {
  const { md } = useMediaQueries();

  const onPlay = () => {
    // lets accept the challenge
  };

  return (
    <CardContainer>
      <ResponsiveImage src={item.imageUrl} alt={item.title} md={md} />
      <FlexboxCol style={{ width: "30vw", padding: "15px" }}>
        <Title level={5} style={{ fontSize: "14px", margin: 0 }}>
          {item.title}
        </Title>
        {md && (
          <StyledText color={variables.middleGray} fontSize="12px">
            {item.description}
          </StyledText>
        )}
      </FlexboxCol>
      <CenterAlignedFlexbox style={{ paddingRight: variables.spacingXs }}>
        <Button onClick={onPlay}>Pick</Button>
      </CenterAlignedFlexbox>
    </CardContainer>
  );
};

export default ImageCardL;
