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
import { Button } from "antd";
import { HeartFilled } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { useMediaQueries } from "../../common/mediaQueryHook";
import { useNavigate } from "react-router-dom";
import { KindnessAction } from "../../common/interfaces";
import { transformTitleToUrl } from "../../common/util";
import { usePostApi } from "../../common/apiCalls";
import { useDelete } from "../../hooks/useDelete";
import PickButton from "./pickButton";

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

interface Props {
  item: KindnessAction;
  isGlowing?: boolean;
  isLiked?: boolean;
}

const ImageCardL: React.FC<Props> = ({ item, isLiked }) => {
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
        <PickButton item={item} />
      </Flexbox>
    </CardContainer>
  );
};

export default ImageCardL;
