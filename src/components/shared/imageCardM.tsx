import React, { useEffect, useState } from "react";
import { CenterAlignedFlexbox, FlexboxCol, StyledText } from "./sharedLayouts";
import styled from "styled-components";
import Title from "antd/es/typography/Title";
import { useMediaQueries } from "../../common/mediaQueryHook";
import { KindnessAction, KindnessHistory } from "../../common/interfaces";
import { useNavigate } from "react-router-dom";
import { transformTitleToUrl } from "../../common/util";
import { useGetApi } from "../../common/apiCalls";
import Loading from "./loading";
import PickButton from "./pickButton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  borderRadius,
  middleGray,
  spacingS,
  spacingXs,
} from "../../common/variables";
import LikeButton from "./likeButton";

const CardContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px;
  flex-shrink: 0;
  border-radius: ${borderRadius}px;
  display: flex;
  margin-bottom: ${spacingS};
  max-height: 30vw;
  align-items: center;
`;

interface Props {
  item?: KindnessHistory | number;
  liked?: boolean;
}

const isKindnessHistory = (
  item: KindnessHistory | number
): item is KindnessHistory => {
  return (item as KindnessHistory).kindnessId !== undefined;
};

const ImageCardM: React.FC<Props> = ({ item, liked = false }) => {
  const { md } = useMediaQueries();
  const navigate = useNavigate();
  let id;
  if (item) {
    if (isKindnessHistory(item)) {
      id = item.kindnessId;
    } else {
      id = item;
    }
  }
  const { callGetApi, loading } = useGetApi(`api/Kindness/${id}`);
  const [kindness, setKindness] = useState<KindnessAction | undefined>();

  useEffect(() => {
    async function fetchData() {
      const response = await callGetApi();
      setKindness(response?.data);
    }
    fetchData();
  }, [callGetApi]);

  const cardAreaClicked = () => {
    const url = transformTitleToUrl(kindness!.title);
    navigate(`/${kindness?.id}/${url}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <CardContainer onClick={cardAreaClicked}>
      <div
        style={{
          position: "relative",
          height: md ? "20vw" : "30vw",
          width: md ? "20vw" : "30vw",
        }}
      >
        <LazyLoadImage
          alt={kindness?.title}
          src={kindness?.imageUrl}
          style={{
            objectFit: "cover",
            borderRadius: `${borderRadius}px`,
            height: md ? "20vw" : "30vw",
            width: md ? "20vw" : "30vw",
          }}
        />
        {kindness && item && !isKindnessHistory(item) && (
          <LikeButton
            item={kindness!}
            isLiked={liked}
            bottom="5px"
            right="5px"
            position="absolute"
          />
        )}
      </div>

      <FlexboxCol style={{ width: "30vw", padding: "15px" }}>
        <Title level={5} style={{ fontSize: "14px", margin: 0 }}>
          {kindness?.title}
        </Title>
        {md && (
          <StyledText color={middleGray} fontSize="12px">
            {kindness?.description}
          </StyledText>
        )}
      </FlexboxCol>
      <CenterAlignedFlexbox style={{ paddingRight: spacingXs }}>
        {kindness && <PickButton item={kindness} />}
      </CenterAlignedFlexbox>
    </CardContainer>
  );
};

export default ImageCardM;
