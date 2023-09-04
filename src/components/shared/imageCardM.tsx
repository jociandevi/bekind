import React from "react";
import {
  Flexbox,
  FlexboxCol,
  IconButton,
  StyledText,
  StyledTitle,
} from "./sharedLayouts";
import { variables } from "./variables";
import styled from "styled-components";
import { CaretRightOutlined } from "@ant-design/icons";

const breakpoints = {
  xs: "320px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

export const devices = {
  xs: `(min-width: ${breakpoints.xs})`,
  sm: `(min-width: ${breakpoints.sm})`,
  md: `(min-width: ${breakpoints.md})`,
  lg: `(min-width: ${breakpoints.lg})`,
  xl: `(min-width: ${breakpoints.xl})`,
  "2xl": `(min-width: ${breakpoints["2xl"]})`,
};

const CardContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px;
  @media only screen and ${devices.md} {
    width: 15vw;
  }
  flex-shrink: 0;
  border-radius: 15px;
  scroll-snap-align: center;
  scroll-snap-stop: always;
  padding: 15px;
  display: flex;
  gap: ${variables.spacingS};
  margin-bottom: ${variables.spacingS};
`;

const Image = styled.img`
  width: 20vw;
  height: 20vw;
  @media only screen and ${devices.md} {
    width: 15vw;
    height: 15vw;
  }
  object-fit: cover;
  border-radius: 15px;
`;

interface Props {
  item: { id: number; title: string; description?: string; imageUrl: string };
}

const ImageCardL: React.FC<Props> = ({ item }) => {
  const onPlay = () => {
    // lets accept the challenge
  };

  return (
    <CardContainer>
      <Image src={item.imageUrl} alt={item.title} />
      <FlexboxCol style={{ width: "30vw" }}>
        <StyledTitle level={5} style={{ margin: `0`, fontSize: "14px" }}>
          {item.title}
        </StyledTitle>
        <StyledText color={variables.middleGray} fontSize="12px">
          {item.description}
        </StyledText>
      </FlexboxCol>

      <Flexbox>
        <IconButton
          backgroundcolor={variables.black}
          icon={<CaretRightOutlined />}
          shape="circle"
          onClick={onPlay}
        />
      </Flexbox>
    </CardContainer>
  );
};

export default ImageCardL;
