import React, { useContext, useState } from "react";
import {
  FlexboxCol,
  ImageContainer,
  StyledText,
} from "../shared/sharedLayouts";
import { Button } from "antd";
import { variables } from "../../common/variables";
import styled from "styled-components";
import { raoks } from "../../common/mockData";
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
import { transformTitleToUrl } from "../../common/util";

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

  // API: GET /kindness/:id >> get kindness with this id

  const kindness = raoks.find(
    (item) => transformTitleToUrl(item.title) === params.title
  )!;

  const onConfirmOk = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsConfirmModalOpen(false);
    // API call: lets make a backend call to add this to user's profile
    setIsFeedbackModalOpen(true);
    setIsPickEnabled(false);
  };

  const onPick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    // lets ask the user if this is today's challenge
    setIsConfirmModalOpen(true);
  };

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
          userName={user?.given_name ?? undefined}
        />
        <ArticleImage
          src={kindness?.imageUrl}
          alt={`Image of ${kindness?.title}`}
        />

        <OverlayBackButton
          icon={<ArrowLeftOutlined />}
          shape="circle"
          onClick={() => navigate("/kindness")}
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
        Image by {kindness?.credit}
      </StyledText>
      <MarginContainer>
        <Tags item={kindness} />
        <Article
          item={kindness}
          onPick={onPick}
          isPickEnabled={isPickEnabled}
        />
      </MarginContainer>
      <InstallButton />
    </FlexboxCol>
  );
};

export default KindnessDetails;
