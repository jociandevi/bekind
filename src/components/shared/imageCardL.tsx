import React from "react";
import {
  Flexbox,
  ImageContainer,
  ResponsiveImageLarge,
  StyledText,
  laptopCardWidth,
  phoneCardWidth,
  tabletCardWidth,
} from "./sharedLayouts";
import { variables } from "../../common/variables";
import styled from "styled-components";
import { Button, Tooltip } from "antd";
import { HeartFilled } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { useMediaQueries } from "../../common/mediaQueryHook";
import { useNavigate } from "react-router-dom";
import { KindnessAction } from "../../common/interfaces";
import { transformTitleToUrl } from "../../common/util";

const CardContainer = styled.div<{
  md?: boolean;
  lg?: boolean;
}>`
  box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px;
  width: ${(props) =>
    props.lg ? laptopCardWidth : props.md ? tabletCardWidth : phoneCardWidth};
  flex-shrink: 0;
  border-radius: ${variables.borderRadius}px;
  cursor: pointer;
  flex: 0 0 auto;
  scroll-snap-align: center;
  scroll-snap-stop: always;
`;

const PaddingContainer = styled.div<{
  md?: boolean;
  lg?: boolean;
}>`
  padding: 0 ${variables.spacingXs} ${variables.spacingXs};
  height: ${(props) => (props.lg ? "15vw" : props.md ? "30vw" : "32vw")};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const OverlayIconButton = styled(Button)`
  position: absolute;
  top: 15px;
  right: 15px;
  color: ${variables.white};
  background-color: #1816188c;
`;

interface Props {
  item: KindnessAction;
  isPickEnabled: boolean;
  onPick: (event: React.MouseEvent<HTMLElement>, item: KindnessAction) => void;
}

const ImageCardL: React.FC<Props> = ({ item, isPickEnabled, onPick }) => {
  const { md, lg } = useMediaQueries();
  const navigate = useNavigate();

  const onLike = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const cardAreaClicked = () => {
    const url = transformTitleToUrl(item.title);
    navigate(`/kindness/${url}`);
  };

  return (
    <CardContainer md={md} lg={lg} onClick={cardAreaClicked}>
      <ImageContainer>
        <ResponsiveImageLarge
          src={item.imageUrl}
          alt={item.title}
          md={md}
          lg={lg}
        />
        <OverlayIconButton
          icon={<HeartFilled />}
          shape="circle"
          onClick={onLike}
        />
      </ImageContainer>
      <PaddingContainer md={md} lg={lg}>
        <Title level={5} style={{ margin: "15px 0 0" }}>
          {item.title}
        </Title>
        <StyledText color={variables.middleGray} fontSize="14px">
          {item.description}
        </StyledText>
      </PaddingContainer>
      <Flexbox style={{ padding: `${variables.spacingXxs}` }}>
        {isPickEnabled ? (
          <Button type="primary" onClick={(e) => onPick(e, item)}>
            Pick
          </Button>
        ) : (
          <Tooltip
            title="You already did your part today in making the world better!"
            trigger={"hover"}
          >
            <Button type="primary" disabled>
              Pick
            </Button>
          </Tooltip>
        )}
      </Flexbox>
    </CardContainer>
  );
};

export default ImageCardL;
