import React, { useEffect, useState } from "react";
import {
  FlexboxCol,
  ImageContainer,
  StyledText,
} from "../shared/sharedLayouts";
import {
  middleGray,
  spacingL,
  spacingM,
  spacingXs,
  white,
} from "../../common/variables";
import styled from "styled-components";
import { lgBreakPoint, mdBreakPoint } from "../../common/mediaQueryHook";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import UserProfileIcon from "../shared/userProfileIcon";
import Article from "../shared/article/article";
import InstallButton from "../shared/pwaCustomInstalls/installButton";
import Tags from "../shared/tags";
import { useGetApi } from "../../common/apiCalls";
import { KindnessAction } from "../../common/interfaces";
import Loading from "../shared/loading";
import PageError from "../shared/pageError";
import ProgressBar from "../shared/progressBar";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/selectors";
import Button from "antd/es/button";
import LikeButton from "../shared/likeButton";

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

const OverlayProfileContainer = styled.div`
  position: absolute;
  top: ${spacingL};
  right: ${spacingM};

  & button {
    padding: 0;
    background-color: transparent;
  }
`;

export const ArticleImage = styled.img`
  width: 100vw;
  height: ${100 / 1.618}vw;
  @media only screen and ${mdBreakPoint} {
    width: 75vw;
    height: ${75 / 1.618}vw;
  }
  @media only screen and ${lgBreakPoint} {
    width: 50vw;
    height: ${50 / 1.618}vw;
  }
  border-radius: 0;
  object-fit: cover;
`;

const KindnessDetails: React.FC = () => {
  const params = useParams();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [action, setAction] = useState<KindnessAction | undefined>();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const id = params.id;
  const { callGetApi, loading, error } = useGetApi(`api/Kindness/${id}`);
  const { callGetApi: getLikedActions, loading: isLikedLoading } =
    useGetApi(`api/LikedKindness`);

  useEffect(() => {
    async function fetchData() {
      const daily = await callGetApi();
      setAction(daily?.data);
    }
    fetchData();
  }, [callGetApi]);

  useEffect(() => {
    if (!user) {
      return;
    }
    async function fetchData() {
      const response = await getLikedActions();
      const liked = response?.data?.includes(id ? parseInt(id) : 0);
      setIsLiked(liked);
    }
    fetchData();
  }, [getLikedActions, id, user]);

  if (loading || isLikedLoading) {
    return <Loading />;
  }

  return (
    <FlexboxCol>
      <ProgressBar />
      <ImageContainer style={{ margin: "0 auto" }}>
        <ArticleImage
          src={action?.imageUrl}
          alt={`Image of ${action?.title}`}
        />

        <OverlayBackButton
          icon={<ArrowLeftOutlined />}
          shape="circle"
          onClick={() => navigate("/")}
        />
        {action && (
          <LikeButton
            item={action}
            isLiked={isLiked}
            position={"absolute"}
            bottom={`-${spacingXs}`}
            right={spacingM}
          />
        )}
        {user && (
          <OverlayProfileContainer>
            <UserProfileIcon user={user} />
          </OverlayProfileContainer>
        )}
      </ImageContainer>
      <StyledText
        color={middleGray}
        fontSize="10px"
        style={{ margin: "0 auto" }}
      >
        {action?.imageCredit}
      </StyledText>
      {error && <PageError message="An error happened, sorry!" />}
      <MarginContainer>
        {action && <Tags item={action} />}
        {action && <Article kindness={action} />}
      </MarginContainer>
      <InstallButton />
    </FlexboxCol>
  );
};

export default KindnessDetails;
