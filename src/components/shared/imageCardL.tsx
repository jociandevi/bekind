import React, { useEffect, useState } from "react";
import {
  Flexbox,
  ImageContainer,
  laptopCardWidth,
  monitorCardWidth,
  phoneCardWidth,
  tabletCardWidth,
} from "./sharedLayouts";
import styled from "styled-components";
import Title from "antd/es/typography/Title";
import { useMediaQueries } from "../../common/mediaQueryHook";
import { useNavigate } from "react-router-dom";
import { KindnessAction } from "../../common/interfaces";
import { transformTitleToUrl } from "../../common/util";
import PickButton from "./pickButton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { borderRadius, spacingXs, spacingXxs } from "../../common/variables";
import LikeButton from "./likeButton";

const CardContainer = styled.div<{
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
}>`
  box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px;
  width: ${(props) =>
    props.lg
      ? props.xl
        ? monitorCardWidth
        : laptopCardWidth
      : props.md
      ? tabletCardWidth
      : phoneCardWidth};
  flex-shrink: 0;
  border-radius: ${borderRadius}px;
  cursor: pointer;
  flex: 0 0 auto;
`;

const PaddingContainer = styled.div<{
  md?: boolean;
  lg?: boolean;
}>`
  padding: 0 ${spacingXs} ${spacingXs};
  height: ${(props) => (props.lg ? "5vw" : props.md ? "7vw" : "18vw")};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

interface Props {
  item: KindnessAction;
  isLiked?: boolean;
  shouldPreload?: boolean;
}

const ImageCardL: React.FC<Props> = ({ item, isLiked, shouldPreload }) => {
  const { md, lg, xl } = useMediaQueries();
  const navigate = useNavigate();
  const [preloadedSrc, setPreloadedSrc] = useState<string>("");

  useEffect(() => {
    if (shouldPreload) {
      const viewportWidth = window.innerWidth;
      const sizes = [320, 400, 480, 640, 960, 1280, 1600, 1920];
      // Find the best size to preload
      const preloadSize = sizes.reduce((closest, size) => {
        if (
          closest === 0 ||
          Math.abs(size - viewportWidth) < Math.abs(closest - viewportWidth)
        ) {
          return size;
        }
        return closest;
      }, 0);

      const preloadSrc = `${item.imageUrl}&w=${preloadSize}`;
      const preloadLink = document.createElement("link");
      preloadLink.href = preloadSrc;
      preloadLink.rel = "preload";
      preloadLink.as = "image";
      document.head.appendChild(preloadLink);
      setPreloadedSrc(preloadSrc);

      return () => {
        document.head.removeChild(preloadLink);
      };
    }
  }, [item.imageUrl, shouldPreload]);

  const cardAreaClicked = () => {
    const url = transformTitleToUrl(item.title);
    navigate(`/${item.id}/${url}`);
  };

  const getSize = () => {
    if (xl) {
      return monitorCardWidth;
    }

    if (lg) {
      return laptopCardWidth;
    }

    if (md) {
      return tabletCardWidth;
    }

    return phoneCardWidth;
  };

  const generateSrcSet = (src: string) => {
    const sizes = [320, 400, 480, 640, 960, 1280, 1600, 1920];
    return sizes.map((size) => `${src}&w=${size} ${size}w`).join(", ");
  };

  return (
    <CardContainer md={md} lg={lg} xl={xl} onClick={cardAreaClicked}>
      <ImageContainer>
        {shouldPreload ? (
          <img
            alt={item.title}
            srcSet={preloadedSrc}
            style={{
              objectFit: "cover",
              borderRadius: `${borderRadius}px`,
              height: getSize(),
              width: getSize(),
            }}
          />
        ) : (
          <LazyLoadImage
            alt={item.title}
            srcSet={generateSrcSet(item.imageUrl)}
            sizes="(max-width: 320px) 160px,
           (max-width: 400px) 200px,
           (max-width: 480px) 240px,
           (max-width: 640px) 320px,
           (max-width: 960px) 320px,
           (max-width: 1280px) 320px,
           (max-width: 1600px) 400px,
           1000px"
            style={{
              objectFit: "cover",
              borderRadius: `${borderRadius}px`,
              height: getSize(),
              width: getSize(),
            }}
          />
        )}
        <LikeButton
          item={item}
          isLiked={isLiked}
          top="15px"
          right="15px"
          backgroundColor={"#1816188c"}
          position={"absolute"}
        />
      </ImageContainer>
      <PaddingContainer md={md} lg={lg}>
        <Title level={5} style={{ margin: "15px 0 0" }}>
          {item.title}
        </Title>
      </PaddingContainer>
      <Flexbox style={{ padding: `${spacingXxs}` }}>
        <PickButton item={item} />
      </Flexbox>
    </CardContainer>
  );
};

export default ImageCardL;
