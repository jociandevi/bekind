import React, { useContext, useEffect, useState } from "react";
import {
  FlexboxCol,
  ImageContainer,
  StyledText,
} from "../shared/sharedLayouts";
import { Button } from "antd";
import { variables } from "../../common/variables";
import styled from "styled-components";
import { lgBreakPoint, mdBreakPoint } from "../../common/mediaQueryHook";
import { AuthContext } from "../../common/authProvider";
import { useNavigate, useParams } from "react-router-dom";
import { HeartFilled, ArrowLeftOutlined } from "@ant-design/icons";
import UserProfileIcon from "../shared/userProfileIcon";
import Article from "../shared/article/article";
import ConfirmModal from "./modals/confirmModal";
import FeedbackModal from "./modals/feedbackModal";
import InstallButton from "../shared/pwaCustomInstalls/installButton";
import Tags from "../shared/tags";
import { useGetApi, usePostApi } from "../../common/apiCalls";
import { KindnessAction } from "../../common/interfaces";
import Loading from "../shared/loading";
import PageError from "../shared/pageError";
import useKindnessHistory from "../../hooks/useKindnessHistory";

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

const OverlayHeartButton = styled(Button)`
  position: absolute;
  bottom: -${variables.spacingXs};
  right: ${variables.spacingM};
  color: ${variables.pink3};
  background-color: ${variables.white};
  box-shadow: ${variables.shadow1};
`;

const OverlayProfileContainer = styled.div`
  position: absolute;
  top: ${variables.spacingL};
  right: ${variables.spacingM};

  & button {
    padding: 0;
    background-color: transparent;
  }
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

const KindnessDetails: React.FC = () => {
  const params = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isPickEnabled, setIsPickEnabled] = useState(true);
  const [kindness, setKindness] = useState<KindnessAction | undefined>();
  const id = params.id;
  const { callGetApi, loading, error } = useGetApi(`api/Kindness/${id}`);
  const [daily, setDaily] = useState<KindnessAction | undefined>();
  const { callPostApi: callPostKindnessHistory } = usePostApi(
    `api/KindnessHistory/${daily?.id}`
  );
  const { userStreak } = useKindnessHistory(
    callPostKindnessHistory,
    isPickEnabled,
    setIsPickEnabled
  );

  useEffect(() => {
    async function fetchData() {
      const daily = await callGetApi();
      setKindness(daily?.data);
    }
    fetchData();
  }, [callGetApi]);

  const onConfirmOk = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsConfirmModalOpen(false);
    callPostKindnessHistory().then((res: any) => {
      console.log(res);
    });
    setIsFeedbackModalOpen(true);
    setIsPickEnabled(false);
  };

  const onPick = (
    event: React.MouseEvent<HTMLElement>,
    item: KindnessAction
  ) => {
    event.stopPropagation();
    setDaily(item);
    setIsConfirmModalOpen(true);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <FlexboxCol>
      <ImageContainer style={{ margin: "0 auto" }}>
        <ConfirmModal
          isModalOpen={isConfirmModalOpen}
          setIsModalOpen={setIsConfirmModalOpen}
          onOk={onConfirmOk}
        />
        <FeedbackModal
          isModalOpen={isFeedbackModalOpen}
          setIsModalOpen={setIsFeedbackModalOpen}
          userName={user?.firstName ?? undefined}
          userStreak={userStreak}
        />
        <ArticleImage
          src={kindness?.imageUrl}
          alt={`Image of ${kindness?.title}`}
        />

        <OverlayBackButton
          icon={<ArrowLeftOutlined />}
          shape="circle"
          onClick={() => navigate("/")}
        />
        <OverlayHeartButton icon={<HeartFilled />} shape="circle" />
        {user && (
          <OverlayProfileContainer>
            <UserProfileIcon user={user} />
          </OverlayProfileContainer>
        )}
      </ImageContainer>
      <StyledText
        color={variables.middleGray}
        fontSize="10px"
        style={{ margin: "0 auto" }}
      >
        {kindness?.imageCredit}
      </StyledText>
      {error && <PageError message="An error happened, sorry!" />}
      <MarginContainer>
        {kindness && <Tags item={kindness} />}
        {kindness && (
          <Article
            kindness={kindness}
            onPick={onPick}
            isPickEnabled={isPickEnabled}
          />
        )}
      </MarginContainer>

      <InstallButton />
    </FlexboxCol>
  );
};

export default KindnessDetails;
