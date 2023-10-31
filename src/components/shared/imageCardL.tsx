import React, { useState } from "react";
import {
  Flexbox,
  ImageContainer,
  ResponsiveImageLarge,
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
import { glowingStyle } from "./userJourney";
import { usePostApi } from "../../common/apiCalls";
import { useDelete } from "../../hooks/useDelete";

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
`;

const PaddingContainer = styled.div<{
  md?: boolean;
  lg?: boolean;
}>`
  padding: 0 ${variables.spacingXs} ${variables.spacingXs};
  height: ${(props) => (props.lg ? "5vw" : props.md ? "7vw" : "18vw")};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const OverlayIconButton = styled(Button)`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: #1816188c;
`;

const DisabledButton = styled(Button)`
  color: ${variables.middleGray};
  background-color: ${variables.lightGray};
  box-shadow: none;
  opacity: 0.5;
`;

interface Props {
  item: KindnessAction;
  isPickEnabled: boolean;
  onPick: (event: React.MouseEvent<HTMLElement>, item: KindnessAction) => void;
  isGlowing?: boolean;
  isLiked?: boolean;
}

const ImageCardL: React.FC<Props> = ({
  item,
  isPickEnabled,
  onPick,
  isGlowing,
  isLiked,
}) => {
  const { md, lg } = useMediaQueries();
  const navigate = useNavigate();
  const { callPostApi } = usePostApi(`api/LikedKindness/${item.id}`);
  const { callDelete } = useDelete(`api/LikedKindness/${item.id}`);
  const [isItLiked, setIsItLiked] = useState(isLiked);

  const onLike = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (isItLiked) {
      callDelete();
    } else {
      callPostApi();
    }
    setIsItLiked(!isItLiked);
  };

  const onDisabledPick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const cardAreaClicked = () => {
    const url = transformTitleToUrl(item.title);
    navigate(`/${item.id}/${url}`);
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
          style={{
            color: isItLiked ? variables.pink3 : variables.white,
            borderColor: isItLiked ? variables.pink3 : variables.white,
          }}
        />
      </ImageContainer>
      <PaddingContainer md={md} lg={lg}>
        <Title level={5} style={{ margin: "15px 0 0" }}>
          {item.title}
        </Title>
      </PaddingContainer>
      <Flexbox style={{ padding: `${variables.spacingXxs}` }}>
        {isPickEnabled ? (
          <Button
            style={{ boxShadow: isGlowing ? glowingStyle : undefined }}
            type="primary"
            onClick={(e) => onPick(e, item)}
          >
            Pick
          </Button>
        ) : (
          <Tooltip
            title="You already did your part today in making the world better!"
            trigger={"hover"}
          >
            <DisabledButton onClick={onDisabledPick}>Pick</DisabledButton>
          </Tooltip>
        )}
      </Flexbox>
    </CardContainer>
  );
};

export default ImageCardL;
